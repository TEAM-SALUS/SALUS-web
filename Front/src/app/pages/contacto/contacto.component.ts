import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs  from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  form: FormGroup = this.fb.group({
    from_name: '',
    from_apellido: '',
    to_name: 'Admin',
    from_email: '',
    message: '',
  })

  constructor(private fb: FormBuilder) {}

  async send(){
    emailjs.init('sr7GSu-IX8U11Tleh');
    let response = await emailjs.send("service_6xb0uim","template_nkvgz7b",{
      from_name: this.form.value.from_name,
      from_apellido: this.form.value.from_apellido,
      to_name: this.form.value.to_name,
      from_email: this.form.value.from_email,
      subject: "Aviso de mensaje",
      message: this.form.value.message,
      reply_to: "salusturnos@gmail.com",
      });      

      alert ('El mensaje fue enviado.');
      this.form.reset();
  }

}
