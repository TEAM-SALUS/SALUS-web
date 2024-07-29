# Generated by Django 5.0.6 on 2024-07-12 04:32

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Especialidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=150)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('duracion', models.TimeField(blank=True, default=datetime.timedelta(seconds=3600))),
                ('descripcion', models.CharField(blank=True, default='sin descripcion', max_length=254)),
                ('foto', models.ImageField(blank=True, default='especialidades/no-especialidad.jpg', upload_to='especialidades', verbose_name='foto especialidad')),
                ('is_active', models.BooleanField(blank=True, default=True)),
            ],
            options={
                'verbose_name': 'Especialidad',
                'verbose_name_plural': 'Especialidad',
                'db_table': 'Especialidad',
            },
        ),
        migrations.CreateModel(
            name='HorarioDeAtencion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia_de_la_semana', models.CharField(max_length=150)),
                ('hora_entrada', models.TimeField(blank=True, default=datetime.time(8, 0))),
                ('hora_salida', models.TimeField(blank=True, default=datetime.time(16, 0))),
                ('is_active', models.BooleanField(blank=True, default=True)),
            ],
            options={
                'verbose_name': 'HorarioDeAtencion',
                'verbose_name_plural': 'HorarioDeAtencion',
                'db_table': 'HorarioDeAtencion',
            },
        ),
        migrations.CreateModel(
            name='Medico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matricula', models.CharField(max_length=11)),
                ('nombre', models.CharField(blank=True, default='Sin Nombre', max_length=150)),
                ('apellido', models.CharField(blank=True, default='Sin Apellido', max_length=150)),
                ('email', models.CharField(blank=True, default='Sin Email', max_length=254)),
                ('clave', models.CharField(blank=True, default='sin clave', max_length=128)),
                ('telefono', models.CharField(blank=True, default='Sin Telefono', max_length=15)),
                ('foto', models.ImageField(blank=True, default='medico/perfil/no-medic-img.jpg', upload_to='medico/perfil', verbose_name='foto perfil medico')),
                ('is_active', models.BooleanField(blank=True, default=True)),
            ],
            options={
                'verbose_name': 'Medico',
                'verbose_name_plural': 'Medicos',
                'db_table': 'Medico',
            },
        ),
        migrations.CreateModel(
            name='ObraSocial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=150)),
                ('is_active', models.BooleanField(blank=True, default=True)),
            ],
            options={
                'verbose_name': 'ObraSocial',
                'verbose_name_plural': 'ObrasSociales',
                'db_table': 'ObraSocial',
            },
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dni_paciente', models.CharField(max_length=8)),
                ('nombre', models.CharField(blank=True, default='Sin nombre', max_length=150)),
                ('apellido', models.CharField(blank=True, default=' Sin Apellido', max_length=150)),
                ('email', models.CharField(blank=True, default='sin email', max_length=254)),
                ('clave', models.CharField(blank=True, default='sin clave', max_length=128)),
                ('telefono', models.CharField(blank=True, default='sin telefono', max_length=15)),
                ('foto', models.ImageField(blank=True, default='paciente/perfil/no-img.png', upload_to='paciente/perfil', verbose_name='foto perfil paciente')),
                ('is_active', models.BooleanField(blank=True, default=True)),
            ],
            options={
                'verbose_name': 'Paciente',
                'verbose_name_plural': 'Pacientes',
                'db_table': 'Paciente',
            },
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('monto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('fecha', models.DateField(blank=True, default=datetime.datetime.now)),
                ('hora', models.TimeField(blank=True, default=datetime.datetime.now)),
                ('estado', models.CharField(blank=True, choices=[('Rechazado', 'Rechazado'), ('Aceptado', 'Aceptado'), ('Pendiente', 'Pendiento')], default='Rechazado', max_length=45)),
                ('is_active', models.BooleanField(blank=True, default=True)),
            ],
            options={
                'verbose_name': 'Pago',
                'verbose_name_plural': 'Pagos',
                'db_table': 'Pago',
            },
        ),
        migrations.CreateModel(
            name='Turno',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('horario', models.TimeField()),
                ('pagado', models.BooleanField()),
                ('estado', models.CharField(blank=True, choices=[('Presente', 'Presente'), ('Ausente', 'Ausente'), ('Pendiente', 'Pendiente')], default='Pendiente', max_length=45)),
                ('sintomas', models.CharField(blank=True, default='sin sintomas', max_length=1000)),
                ('diagnostico', models.CharField(blank=True, default='sin diagnostico', max_length=1000)),
                ('tratamiento', models.CharField(blank=True, default='sin tratamiento', max_length=1000)),
                ('is_active', models.BooleanField(blank=True, default=True)),
            ],
            options={
                'verbose_name': 'Turno',
                'verbose_name_plural': 'Turnos',
                'db_table': 'Turno',
            },
        ),
        migrations.AddConstraint(
            model_name='especialidad',
            constraint=models.UniqueConstraint(fields=('nombre',), name='Uk_Especialidad_nombre'),
        ),
        migrations.AddConstraint(
            model_name='horariodeatencion',
            constraint=models.UniqueConstraint(fields=('dia_de_la_semana', 'hora_entrada', 'hora_salida'), name='Uk_HorarioDeAtencion_dia_de_la_semana-hora_entrada-hora_salida'),
        ),
        migrations.AddField(
            model_name='medico',
            name='id_especialidad',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='SalusEcommerce.especialidad'),
        ),
        migrations.AddField(
            model_name='medico',
            name='id_horario',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='SalusEcommerce.horariodeatencion'),
        ),
        migrations.AddField(
            model_name='medico',
            name='medicoUser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddConstraint(
            model_name='obrasocial',
            constraint=models.UniqueConstraint(fields=('nombre',), name='Uk_ObraSocial_nombre'),
        ),
        migrations.AddField(
            model_name='paciente',
            name='id_obra_social',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='SalusEcommerce.obrasocial'),
        ),
        migrations.AddField(
            model_name='paciente',
            name='pacienteUser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='turno',
            name='id_medico',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SalusEcommerce.medico'),
        ),
        migrations.AddField(
            model_name='turno',
            name='id_paciente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SalusEcommerce.paciente'),
        ),
        migrations.AddField(
            model_name='pago',
            name='id_turno',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SalusEcommerce.turno'),
        ),
        migrations.AddConstraint(
            model_name='medico',
            constraint=models.UniqueConstraint(fields=('matricula',), name='Uk_Medico_matricula'),
        ),
        migrations.AddConstraint(
            model_name='medico',
            constraint=models.UniqueConstraint(fields=('matricula', 'id_especialidad'), name='Uk_Medico_matricula-id_especialidad'),
        ),
        migrations.AddConstraint(
            model_name='medico',
            constraint=models.UniqueConstraint(fields=('matricula', 'id_horario'), name='Uk_Medico_matricula-id_horario'),
        ),
        migrations.AddConstraint(
            model_name='medico',
            constraint=models.UniqueConstraint(fields=('medicoUser',), name='Uk_Medico_medicoUser'),
        ),
        migrations.AddConstraint(
            model_name='paciente',
            constraint=models.UniqueConstraint(fields=('dni_paciente',), name='Uk_Paciente_dni_paciente'),
        ),
        migrations.AddConstraint(
            model_name='paciente',
            constraint=models.UniqueConstraint(fields=('dni_paciente', 'id_obra_social'), name='Uk_Paciente_dni_paciente-id_obra_social'),
        ),
        migrations.AddConstraint(
            model_name='paciente',
            constraint=models.UniqueConstraint(fields=('pacienteUser',), name='Uk_Paciente_pacienteUser'),
        ),
        migrations.AddConstraint(
            model_name='pago',
            constraint=models.UniqueConstraint(fields=('id_turno',), name='Uk_Pago_id_turno'),
        ),
    ]
