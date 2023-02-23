from django.db import models
from django.contrib.auth.models import User

# from .views import myuser

# Create your models here.
class category(models.Model):
    cat_id=models.AutoField(primary_key=True)
    cat_name=models.CharField(max_length=50)
    cat_img=models.ImageField(upload_to="main/images",default=" ")

    def __str__(self):
        return self.cat_name
class selling(models.Model):
    user_id=models.IntegerField(default=0)
    prod_name=models.CharField(max_length=50)
    prod_img=models.FileField(upload_to="main/images",default=" ")
    prod_com_name=models.CharField(max_length=50)
    prod_desc=models.CharField(max_length=50)
    prod_price=models.IntegerField()

    def __str__(self):
        return self.prod_name