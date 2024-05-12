# Generated by Django 5.0.4 on 2024-05-12 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SalusEcommerce', '0004_alter_paciente_foto'),
    ]

    operations = [
        migrations.AddField(
            model_name='especialidad',
            name='descripcion',
            field=models.CharField(blank=True, default='lorem', max_length=254),
        ),
        migrations.AddField(
            model_name='especialidad',
            name='foto',
            field=models.ImageField(default='especialidades/no-especialidad.jpg', upload_to='especialidades', verbose_name='foto especialidad'),
        ),
    ]
