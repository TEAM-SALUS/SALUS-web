# Generated by Django 5.0.6 on 2024-06-02 06:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SalusEcommerce', '0005_rename_id_pacienteuser_paciente_pacienteuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paciente',
            name='foto',
        ),
    ]
