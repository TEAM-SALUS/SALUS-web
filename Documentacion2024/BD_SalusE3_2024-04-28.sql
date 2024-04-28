DROP DATABASE IF EXISTS abm_SalusE3;
CREATE DATABASE IF NOT EXISTS abm_SalusE3;
USE abm_SalusE3;
/*CREANDO TABLAS*/
-- Paciente 1
CREATE TABLE IF NOT EXISTS Paciente(
dni_paciente VARCHAR(8) NOT NULL,
nombre VARCHAR(150) NOT NULL DEFAULT '',
apellido VARCHAR(150) NOT NULL DEFAULT '',
email VARCHAR(254) NOT NULL,
clave VARCHAR(128) NOT NULL,
telefono VARCHAR(15) NOT NULL,
CONSTRAINT Pk_Paciente PRIMARY KEY(dni_paciente)
);
-- Especialidad 2
CREATE TABLE IF NOT EXISTS Especialidad(
id_especialidad INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(150) NOT NULL,
precio DECIMAL(10,2) NOT NULL DEFAULT 0,
CONSTRAINT Pk_Especialidad PRIMARY KEY(id_especialidad),
CONSTRAINT CHECK_Especialidad CHECK (precio >= 0)
);
-- Medico 3
CREATE TABLE IF NOT EXISTS Medico(
matricula VARCHAR(11) NOT NULL,
nombre VARCHAR(150) NOT NULL DEFAULT '',
apellido VARCHAR(150) NOT NULL NOT NULL DEFAULT '',
email VARCHAR(254) NOT NULL,
clave VARCHAR(128) NOT NULL,
telefono VARCHAR(15) NOT NULL,
dias_atencion DATE NOT NULL DEFAULT '1900-01-01',
horarios_atencion TIME NOT NULL DEFAULT '00:00:00',
id_especialidad INT NOT NULL,
CONSTRAINT Pk_Medico PRIMARY KEY(matricula),
CONSTRAINT Fk_Medico_Especialidad FOREIGN KEY(id_especialidad) REFERENCES Especialidad(id_especialidad)
);
-- Atiende 4
CREATE TABLE IF NOT EXISTS Atiende(
matricula VARCHAR(11) NOT NULL,
dni_paciente VARCHAR(8) NOT NULL,
CONSTRAINT Pk_Atiende PRIMARY KEY(matricula,dni_paciente),
CONSTRAINT Fk_Atiende_Medico FOREIGN KEY(matricula) REFERENCES Medico(matricula),
CONSTRAINT Fk_Atiende_Paciente FOREIGN KEY(dni_paciente) REFERENCES Paciente(dni_paciente)
);
-- Turno 5
CREATE TABLE IF NOT EXISTS Turno(
id_turno INT NOT NULL AUTO_INCREMENT,
fecha DATE NOT NULL DEFAULT '1900-01-01',
horario TIME NOT NULL DEFAULT '00:00:00',
pagado bool NOT NULL DEFAULT FALSE,
estado VARCHAR(50) NOT NULL DEFAULT 'RECHAZADO',
id_paciente VARCHAR(8) NOT NULL,
id_especialidad INT NOT NULL,
CONSTRAINT Pk_Turno PRIMARY KEY(id_turno),
CONSTRAINT Fk_Turno_Paciente FOREIGN KEY(id_paciente) REFERENCES Paciente(dni_paciente),
CONSTRAINT Fk_Turno_Especialidad FOREIGN KEY(id_especialidad) REFERENCES Especialidad(id_especialidad),
CONSTRAINT CHECK_Turno_Estado CHECK(estado='RECHAZADO' OR estado="PENDIENTE" OR estado='REALIZADO')
);
-- Pago 6
CREATE TABLE IF NOT EXISTS Pago(
id_pago INT NOT NULL AUTO_INCREMENT,
fecha DATE NOT NULL DEFAULT '1900-01-01',
hora TIME NOT NULL DEFAULT '00:00:00',
estado VARCHAR(50) NOT NULL DEFAULT 'RECHAZADO',
monto DECIMAL(10,2) NOT NULL DEFAULT 0,
id_turno INT NOT NULL,
CONSTRAINT Pk_Pago PRIMARY KEY(id_pago),
CONSTRAINT Fk_Pago_Turno FOREIGN KEY(id_turno) REFERENCES Turno(id_turno),
CONSTRAINT CHECK_Pago_Estado CHECK(estado='RECHAZADO' OR estado='ACEPTADO')
);
-- HistorialMedico 7
CREATE TABLE IF NOT EXISTS RegistroDeConsulta(
id_consulta INT NOT NULL AUTO_INCREMENT,
fecha DATE NOT NULL DEFAULT '1900-01-01',
hora TIME NOT NULL DEFAULT '00:00:00',
sintomas VARCHAR(254) NOT NULL,
diagnostico VARCHAR(254) NOT NULL,
tratamiento VARCHAR(254) NOT NULL,
id_turno INT NOT NULL,
CONSTRAINT Pk_CONSULTA PRIMARY KEY(id_consulta),
CONSTRAINT Fk_CONSULTA_turno FOREIGN KEY(id_consulta) REFERENCES TURNO(id_turno)
);

