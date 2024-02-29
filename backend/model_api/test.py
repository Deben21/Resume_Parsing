import os
import sys
from .models import Parse





# Now you can import your Django models
from model_api.models import Parse

# Access your models and perform operations
your_objects = Parse.objects.all()

for obj in your_objects:
    print(obj)
