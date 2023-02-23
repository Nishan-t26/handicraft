# Generated by Django 3.2.15 on 2022-09-03 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='category',
            fields=[
                ('cat_id', models.AutoField(primary_key=True, serialize=False)),
                ('cat_name', models.CharField(max_length=50)),
                ('cat_img', models.ImageField(default=' ', upload_to='main/images')),
            ],
        ),
    ]
