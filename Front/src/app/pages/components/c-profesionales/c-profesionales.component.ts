import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-profesional',
  templateUrl: './c-profesionales.component.html',
  styleUrls: ['./c-profesionales.component.css']
})
export class CProfesionalComponent implements OnInit {
  public medicos: Array<any> = [];
item: any;
  constructor(private httpClient: HttpClient) {
    this.medicos = [
      "item 1",
      "item 2",
      "item 3",
      "item 4",
      "item 5",
    ]
  }
  ngOnInit(): void {
    this.httpClient.get("http://127.0.0.1:8000/api/v1/medico/").subscribe((x:any) => {
      console.log("🚀 ~ CProfesionalComponent ~ this.httpClient.get ~ x:", x);
      this.medicos=x;
    })
}
}

