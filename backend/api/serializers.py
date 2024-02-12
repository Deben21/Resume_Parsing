from rest_framework import serializers
from .models import AppUser
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        username = validated_data.pop('username')  # Extract username
        password = validated_data.pop('password')  # Extract password
        user_obj = AppUser.objects.create_user(username=username, password=password, **validated_data)
        return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')