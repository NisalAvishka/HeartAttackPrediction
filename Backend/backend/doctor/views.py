from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import connection
from django.http import JsonResponse


@api_view(['GET'])
def get_doctors(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("CALL sp_getDoctors()")
            result = cursor.fetchall()
            doctors = [{'user_id': row[0],
                        'first_name': row[1],
                        'last_name': row[2],
                        'email': row[3],
                        'gender': row[4],
                        'doctor_id':row[5],
                        'doctor_type': row[6],
                        'mbbs_number': row[7],
                        'phone_number': row[8]
                        } for row in result]

        return Response(doctors)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def get_users(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("CALL sp_getUsers()")
            result = cursor.fetchall()
            users = [{'id': row[0],
                      'email': row[1],
                      'first_name': row[2],
                      'last_name': row[3],
                      'city': row[4],
                      'dob': row[5],
                      'gender': row[6]
                      } for row in result]

        return Response(users)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def get_doctor_profile(request, uid):
    with connection.cursor() as cursor:
        cursor.callproc('sp_getDoctorProfile', [uid])
        results = cursor.fetchall()

    if results:
        doctor_type, mbbs_number, phone_number = results[0]
        response_data = {
            'doctor_type': doctor_type,
            'mbbs_number': mbbs_number,
            'phone_number': phone_number,
        }
        return Response(response_data)
    else:
        return Response({'error': 'Doctor not found'}, status=404)


@api_view(['POST'])
def change_doctor_profile(request):
    if request.method == 'POST':
        # Get parameters from the request data
        p_user_id = request.data.get('user_id')
        p_mbbs_number = request.data.get('mbbs_number')
        p_doctor_type = request.data.get('doctor_type')
        p_phone_number = request.data.get('phone_number')

        with connection.cursor() as cursor:
            # Call the stored procedure
            cursor.callproc('sp_changeDoctorProfile', [p_user_id, p_mbbs_number, p_doctor_type, p_phone_number])

        return JsonResponse({'message': 'Doctor profile changed successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
