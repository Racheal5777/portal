from django.shortcuts import render,redirect
from .models import Users
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def user_form(request):
    if request.method == 'POST':
        # Use .get to safely access POST and FILES data and match model/template field names
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        dob = request.POST.get('dob')
        state = request.POST.get('state')
        country = request.POST.get('country')
        profile_picture = request.FILES.get('profile_picture')
        video_resume = request.FILES.get('video_resume')

        user = Users(
            first_name=first_name,
            last_name=last_name,
            dob=dob,
            state=state,
            country=country,
            profile_picture=profile_picture,
            video_resume=video_resume
        )
        user.save()
        # Return a JSON response on success; you can also redirect to a success page here
        return JsonResponse({'message': 'user saved successfully'})

    # Render the template that exists in the project app 'user' templates directory
    return render(request, 'user/user_form.html')
@login_required
def admin(request):
    users = Users.objects.all()
    return render(request, 'admin.html', {'users': users})
def admin_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('admin')
        else:
            return render(request, 'admin_login.html', {'error': 'Invalid credentials'})
    return render(request, 'admin_login.html')

# Create your views here.
