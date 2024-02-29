from django.db import models
# Create your models here.
class  Parse(models.Model):
    name = models.CharField(max_length= 255)
    skills = models.CharField(max_length= 500)
    companies = models.CharField(max_length= 255)
    certification = models.CharField(max_length= 255)
    experience = models.CharField(max_length= 255)
    college_name = models.CharField(max_length=255)
    extracted_data = models.TextField(blank = True)

    def __str__(self):
        return self.name