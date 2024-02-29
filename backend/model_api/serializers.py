# serializers.py
from rest_framework import serializers

class ParsedResumeSerializer(serializers.Serializer):
    entities = serializers.ListField(child=serializers.ListField(child=serializers.CharField()))

    def create(self, validated_data):
        return validated_data

    def update(self, instance, validated_data):
        pass