!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

**DISCONTINUED - no support or security/feature patches!**

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

# Pubquiz

The motivation of the project is to bring people back together in a fun and engaging online-activity, 
no matter if you are in quarantine or meeting each other in person.
The web application should allow for the popular Pub Quizzes to happen regardless of the current pandemic. 
Participants will be able to face off against other participants by themselves or in groups.

## Team Members
* David Hasenhüttl (https://github.com/hasenhuettl)
* Michael Hörmann  (https://github.com/Mhoermann97)
* Paul Kunisch     (https://github.com/paulkunisch)



## Project Proposal
Click on the link to see the proposal: <a href="https://github.com/hasenhuettl/Pubquiz/blob/main/Project%20Proposal%20Online%20Pubquiz.docx">Pubquiz</a>

## Installation:
* Host this application:

   ### Frontend: 
   This project is made with Angular CLI version 12.2.13.
   
   - Libraries: Material Design (https://material.angular.io/)
   - Additional Requirements: NodeJS (https://nodejs.org/en/download/)
   - Server: 
                  Run "ng serve" for a server. > 
                  Navigate to http://localhost:4200/ >
                  Run "ng build" to build the project. >
                  For more help on the Angular CLI use "ng help".  
          
    
   ### Backend: 
   This project is made with Django v3.2.9.
   
   - Additional Requirements: Django REST Framework (https://jpadilla.github.io/django-rest-framework-jwt/)
   - Setup for API:

		1. Install dependencies via backend/requirements.txt
            
			aa. Optionally, install packets manually with "pip install django==3.2.9"
		
			ab. as well as rest_framework and security: "pip install djangorestframework==3.12.4" and "pip install djangorestframework-jwt==1.11.0"
		
		2. Migrate migrations files "python manage.py migrate"
            
		3. Import Database data: navigate to project\backend\pubquiz_api\pubquiz\fixtures\, then issue: "python manage.py loaddata data.xml"
    
        4. Use "python manage.py createsuperuser" to create admin and user profiles
	    
		5. Run the development server on localhost "python manage.py runserver"
            
		6. Integrate new Models with migrations "python manage.py makemigrations" and "python manage.py migrate"
            

* Access the website:
    - An up to date web browser, for example Google Chrome or Microsoft Edge.
