import datetime
import jwt
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from django.db import connection
from django.http import JsonResponse
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True, secure=False, samesite=None)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

        user_data['picture'] = user.picture.url if user.picture else None

        return Response(user_data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


class GetUserDetails(APIView):
    def get(self, request, id):
        try:
            with connection.cursor() as cursor:
                cursor.execute("CALL sp_getUserDetails(%s)", [id])
                result = cursor.fetchone()

                if result:
                    # Assuming the stored procedure returns email, first_name, last_name, city, dob, gender
                    data = {
                        'email': result[0],
                        'first_name': result[1],
                        'last_name': result[2],
                        'city': result[3],
                        'dob': result[4],
                        'gender': result[5],
                    }
                    return JsonResponse(data)
                else:
                    return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class UpdateUserView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                cursor.callproc('sp_updateUsers', [request.data['id'],
                                                   request.data['first_name'],
                                                   request.data['last_name'],
                                                   request.data['gender'],
                                                   request.data['city'],
                                                   request.data['dob']])
                result = cursor.fetchall()
                cursor.close()
                return Response({'message': result[0][0]}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetAdminView(APIView):
    def get(self, request):
        # Assuming you want to retrieve all users with the role 'admin'
        users = User.objects.filter(role='admin')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class DeleteUserView(APIView):
    def delete(self, request, userid):
        try:
            # Retrieve the user to be deleted if it exists
            user_to_delete = User.objects.get(id=userid)

            # Delete the user
            user_to_delete.delete()

            return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@permission_classes([AllowAny])
class ChangePasswordView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        try:
            # Retrieve the user
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the current password matches
        if not user.check_password(current_password):
            return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        # Change the password
        user.change_password(new_password)

        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)



