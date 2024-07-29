import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EspecialidadInterface } from 'src/app/model/especialidad';
import { ProfesionalInterface } from 'src/app/model/profesional';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { ProfesionalesService } from 'src/app/services/profesionales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-especialidad',
  templateUrl: './c-especialidad.component.html',
  styleUrls: ['./c-especialidad.component.css'],
})
export class CEspecialidadComponent implements OnInit{

  rol: string | null = 'invitado';
  public especialidadLista: EspecialidadInterface[] = [];
  public profesionalLista: ProfesionalInterface[] = [];
  especialidadId?: number;

  constructor(
    private especialidadesService: EspecialidadesService,
    private profesionalesService: ProfesionalesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem('rol') != null
      ? (this.rol = sessionStorage.getItem('rol'))
      : (this.rol = 'invitado');
    this.getEspecialidad();
  }

  // Obtenemos el servicio de la especialidad
  public getEspecialidad() {
    this.especialidadesService.getEspecialidad().subscribe((respuesta) => {
      this.especialidadLista = respuesta;
      console.log(respuesta);
    });
  }

  // Obtenemos el id del servicio para mostrar los datos en el componente detalle-servicio
  public getEspecialidadId(id: number|undefined) {
    this.router.navigate(['/detalle-servicio', id]);
  }

  public redirectToEdit(id: number|undefined) {
    this.router.navigate(['editar-servicio',id]);
  }

  public irAgreagarEspecialidad() {
    this.router.navigate(['agregar-servicio']);
  }

  public eliminarEspecialidad(id:number|undefined) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadesService.borrarEspecialidad(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El servicio ha sido eliminado.', 'success')
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Error', 'No se pudo eliminar el perfil.', 'error');
          },
          complete: () => {
            window.location.reload();
          }
        });
      }
    });    
  }
  
}
