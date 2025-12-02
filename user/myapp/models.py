from django.db import models

# Create your models here.
class Users(models.Model):
    # field names use snake_case to match template input names
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=50)
    profile_picture = models.FileField(upload_to='profilepicture/', blank=True, null=True)
    video_resume = models.FileField(upload_to='videoresume/', blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
