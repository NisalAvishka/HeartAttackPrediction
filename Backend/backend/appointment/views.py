from rest_framework.decorators import api_view
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
from django.http import JsonResponse

@api_view(['POST'])
def user_appointment(request):
    if request.method == 'POST':
        p_userId = request.data.get('p_userId')
        p_doctorId = request.data.get('p_doctorId')
        p_date = request.data.get('p_date')

        try:
            with connection.cursor() as cursor:
                cursor.callproc('sp_userAppoint', [p_userId, p_doctorId, p_date])
                cursor.close()
                return JsonResponse({'message': 'Appointment successful.'}, status=200)
        except Exception as e:
            print("Error:", str(e))  # Add this line to print the error details
            return JsonResponse({'error': 'Internal Server Error'}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)


@api_view(['GET'])
def get_user_appointment(request, user_id):
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # Call the stored procedure with the provided user_id
                cursor.callproc('sp_getAppointment', [user_id])
                appointments = cursor.fetchall()
                cursor.close()

            # Process the retrieved appointments as needed
            appointment_list = [
                {
                    'id': appointment[0],
                    'date': appointment[1],
                    'status': appointment[2],
                    'time': appointment[3],
                    'number': appointment[4],
                    'doctor_first_name': appointment[5],
                    'doctor_last_name': appointment[6],
                } for appointment in appointments]

            return Response({'appointments': appointment_list}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Invalid request method.'}, status=400)


@api_view(['DELETE'])
def delete_user_appointment(request, appointment_id):
    if request.method == 'DELETE':
        try:
            with connection.cursor() as cursor:
                # Call the stored procedure with the provided appointment_id
                cursor.callproc('sp_deleteUserAppointment', [appointment_id])
                result = cursor.fetchone()
                message = result[0]  # Assuming the message is the first column in the result
                cursor.close()

            return Response({'message': message}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Invalid request method.'}, status=400)


@api_view(['GET'])
def get_admin_appointments(request):
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # Call the stored procedure
                cursor.callproc('sp_getAdminAppointments')
                appointments = cursor.fetchall()

            # Process the retrieved appointments as needed
            appointment_list = [
                {
                    'id': appointment[0],
                    'date': appointment[1],
                    'status': appointment[2],
                    'time': appointment[3],
                    'number': appointment[4],
                    'doctor_first_name': appointment[5],
                    'doctor_last_name': appointment[6],
                } for appointment in appointments]

            return Response({'appointments': appointment_list}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Invalid request method.'}, status=400)


@api_view(['POST'])
def update_admin_appointments(request):
    if request.method == 'POST':
        try:
            # Get parameters from the request data
            a_id = request.data.get('a_id')
            a_time = request.data.get('a_time')
            a_number = request.data.get('a_number')

            with connection.cursor() as cursor:
                # Call the stored procedure
                cursor.callproc('sp_updateAdminAppointments', [a_id, a_time, a_number])
                cursor.close()

            return Response({'message': 'Appointment updated successfully.'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Invalid request method.'}, status=400)


@api_view(['GET'])
def get_doctor_appointments(request, user_id):
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # Call the stored procedure with the provided user_id
                cursor.callproc('sp_getDoctorAppoinments', [user_id])
                appointments = cursor.fetchall()

            # Process the retrieved appointments as needed
            appointment_list = [
                {
                    'id': appointment[0],
                    'user': appointment[1],
                    'date': appointment[2],
                    'time': appointment[3],
                    'status': appointment[4],
                    'number': appointment[5],
                } for appointment in appointments]

            return Response({'appointments': appointment_list}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Invalid request method.'}, status=400)


@api_view(['POST'])
def input_report(request):
    if request.method == 'POST':
        try:
            app_id = request.data.get('app_id')
            n_report = request.data.get('n_report')
            n_medicine = request.data.get('n_medicine')
            with connection.cursor() as cursor:
                cursor.callproc('sp_inputReport', [app_id, n_report, n_medicine])
                cursor.close()
                return JsonResponse({'message': 'Reported'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)


@api_view(['POST'])
def update_appointment(request):
    if request.method == 'POST':
        a_id = request.data.get('a_id')

        try:
            with connection.cursor() as cursor:
                cursor.callproc('sp_updateAppointment', [a_id])
                cursor.close()
                return JsonResponse({'message': 'Appointment updated successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@api_view(['GET'])
def count_prediction(request):
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                cursor.callproc('sp_countPred')
                result = cursor.fetchone()
                cursor.close()

                return JsonResponse({'row_count': result[0]}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)

def count_prediction(request):
    try:
        with connection.cursor() as cursor:
            # Call the stored procedure
            cursor.callproc('sp_countPred')
            row_count = cursor.fetchone()[0]

        return JsonResponse({'row_count': row_count}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)





