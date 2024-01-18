from django.http import JsonResponse
from django.shortcuts import render
from django.db import connection
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import HeartAttackInputSerializer
import pickle
from .models import HeartAttackInput
from datetime import datetime, date



# Load the trained model
with open('D:\\Research\\Django\\prediction\\fullprediction\\predictor.pickle', 'rb') as model_file:
    model = pickle.load(model_file)


@api_view(['POST'])
def predict_heart_attack(request):
    serializer = HeartAttackInputSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        input_data = [data['age'], data['sex'], data['pain'], data['pressure'], data['chol'],
                      data['fbs'], data['restecg'], data['beats'], data['exercise'],
                      data['oldpeak'], data['slope'], data['vessels'], data['thall']]
        prediction = model.predict([input_data])
        return Response({'prediction': prediction[0]}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InsertPrediction(APIView):
    def post(self, request, *args, **kwargs):
        # Extract data from the request
        data = request.data

        # Call the stored procedure using the cursor
        with connection.cursor() as cursor:
            cursor.callproc('sp_insertPrediction', [
                data['age'],
                data['sex'],
                data['pain'],
                data['pressure'],
                data['chol'],
                data['fbs'],
                data['restecg'],
                data['beats'],
                data['exercise'],
                data['oldpeak'],
                data['slope'],
                data['vessels'],
                data['thall'],
                data['prediction'],
                data['user_id'],
            ])

            # Fetch the result from the stored procedure
            result = cursor.fetchone()

        # Assuming the stored procedure executed successfully
        # You can now return a response or handle the result as needed

        return Response({'message': result[0]}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_history(request, user_id):
    try:
        user_data = HeartAttackInput.objects.filter(user_id=user_id)
        serializer = HeartAttackInputSerializer(user_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        # Handle any exceptions, e.g., invalid date format
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)






