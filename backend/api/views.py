from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from rest_framework.response import Response
from .serializers import *

# Create your views here.

def home(request):
    return HttpResponse("Hello, world! This is the home page of the API.")

class ProjectViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        project = self.queryset.filter(pk=pk)
        serializers = self.serializer_class(Project)
        return Response(serializers.data)

    def create(self, request):
        serializers = self.serializer_class(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        else:
            return Response(serializers.errors, status=400)
        

    def update(self, request, pk=None):
        project = self.queryset.filter(pk=pk)
        serializers = self.serializer_class(project, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        else:
            return Response(serializers.errors, status=400)
        

    def destroy(self, request, pk=None):
        project = self.queryset.filter(pk=pk)
        project.delete()
        return Response(status=204)