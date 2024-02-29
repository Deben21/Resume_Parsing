# views.py

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import os
import tempfile
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .resume import extract_text_from_pdf, nlp
from .serializers import ParsedResumeSerializer
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile
from .models import Parse

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def parse_resume(request):
    if request.method == 'POST':
        resume_file = request.FILES.get('resume')

        # Validate uploaded file
        if not isinstance(resume_file, UploadedFile):
            return JsonResponse({'error': 'Invalid file format'}, status=400)
        
        # Save the uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            for chunk in resume_file.chunks():
                temp_file.write(chunk)
            temp_file_path = temp_file.name
        
        try:
            resume_text = extract_text_from_pdf(temp_file_path)
            doc = nlp(resume_text)
            entities = [[ent.label_,ent.text] for ent in doc.ents]
        except Exception as e:
            # Handle parsing errors
            os.unlink(temp_file_path)  # Delete the temporary file
            return JsonResponse({'error': f'Error parsing resume: {str(e)}'}, status=500)

        os.unlink(temp_file_path)  # Delete the temporary file
        if entities:
            # Save extracted data to Parse model instance
            name = ""
            college_name = ""
            skills = []
            companies = ""
            experience = ""
            certification = ""
            
            for entity in entities:
                  if entity[0] == 'Name':
                      name = entity[1]
                  elif entity[0] == 'College Name':
                      college_name = entity[1]
                  elif entity[0] == 'Skills':
                      skills.extend(entity[1].split(', '))
                  elif entity[0] == 'Companies worked at':
                      companies = entity[1]
                  elif entity[0] == 'Years of experience':
                      experience = entity[1]
                  elif entity[0] == 'Degree' or entity[0] == 'Certification':
                      certification = entity[1]
            
            parse_instance = Parse.objects.create(name=name ,college_name=college_name,skills=skills.split(', '), experience=experience, companies=companies, certification=certification, extracted_data=entities)
            return JsonResponse({'success': 'Data extracted and saved successfully', 'id': parse_instance.id})
            
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_parsed_data(request):
    if request.method == 'GET':
        # Retrieve all stored parsed data
        parsed_data = Parse.objects.all()
        data_list = [{'id': item.id, 'name': item.name, 'skills':item.skills, 'college_name':item.college_name, 'experience':item.experience, 'companies':item.companies, 'certification':item.certification,'extracted_data': item.extracted_data,} for item in parsed_data]
        return JsonResponse({'parsed_data': data_list})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)




@csrf_exempt
@api_view(['GET'])   
def get_ranked_data(request):
    if request.method == 'GET':
        parsed_data = Parse.objects.all()

        # Define the functions for normalizing data and calculating scores

        def normalize_years_of_experience(experience):
            return float(experience.split()[0]) if experience else 0

        def normalize_skills(resume_skills, required_skills):
            matching_skills = 0
            for skill in resume_skills:
                if skill in required_skills:
                    matching_skills += 1
            return matching_skills

        def normalize_certification(certification):
            return 1 if certification else 0

        def normalize_companies_worked_at(resume_companies, required_companies):
            matching_companies = 0
            for company in resume_companies:
                if company in required_companies:
                    matching_companies += 1
            return matching_companies

        def calculate_score(resume, job_description, weights):
            normalized_experience = normalize_years_of_experience(resume['experience'])
            normalized_skills = normalize_skills(resume['skills'], job_description['required_skills'])
            normalized_certification = normalize_certification(resume['certification'])
            normalized_companies_worked_at = normalize_companies_worked_at(resume['companies'], job_description['required_companies'])

            required_experience = normalize_years_of_experience(job_description['required_experience'])
            experience_difference = normalized_experience - required_experience

            score = (weights['experience'] * experience_difference) + (weights['skills'] * normalized_skills) + (weights['certification'] * normalized_certification) + (weights['companies'] * normalized_companies_worked_at)
            return score

        def rank_resumes(resumes, job_description, weights):
            ranked_resumes = []
            for resume in resumes:
                score = calculate_score(resume, job_description, weights)
                ranked_resumes.append({'id': resume['id'], 'score': score})
            ranked_resumes.sort(key=lambda x: x['score'], reverse=True)
            return ranked_resumes

        # Sample resume and job description data
        
        resume_entities = []

            # Iterate through the parsed_data queryset and construct resume entities
        for item in parsed_data:
                resume_entity = {
                    'id': item.id,
                    'name': item.name,
                    'skills': item.skills.split(', '),  # Assuming skills are stored as comma-separated strings in the database
                    'college_name': item.college_name,
                    'experience': item.experience,
                    'companies': item.companies.split(', '),  # Assuming companies worked at are stored as comma-separated strings
                    'certification': item.certification,
                    # 'companies_worked_at': item.companies_worked_at.split(', ') if item.companies_worked_at else []  # Assuming companies worked at are stored as comma-separated strings
                }
                resume_entities.append(resume_entity)
            
                          

        job_description_entities = {
            'required_skills': ['Machine Learning', 'Python', 'Data Analysis'],
            'required_experience': '3 years',
            'required_certification': 'Data Science Certification',
            'required_companies': ['ABC Corp', 'DEF Corp']
        }

        # Define weights
        weights = {'experience': 0.3, 'skills': 0.4, 'certification': 0.2, 'companies': 0.1}

        # Rank resumes
        ranked_resumes = rank_resumes(resume_entities, job_description_entities, weights)
        
        printed_data = []
        for i, resume in enumerate(ranked_resumes, 1):
            printed_data.append(f"Rank {i}: Resume ID: {resume['id']}, Score: {resume['score']}")

        # Prepare the response data
        response_data = {'ranked_list': ranked_resumes, 'printed_data': printed_data}
        print(response_data)
        # Return the response as a JsonResponse
        return JsonResponse(response_data)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
