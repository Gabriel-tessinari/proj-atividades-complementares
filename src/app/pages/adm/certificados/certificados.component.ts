import { Component, OnInit } from '@angular/core';
import { AreaJson } from 'src/app/shared/json/area.json';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {

  cursos: Array<CursoJson>;

  constructor( 
    private testeArqService: TesteArqService
    ) { }

  ngOnInit(): void {
    this.cursos = [];
    this.loadCursos();
  }
  loadCursos() {
    this.testeArqService.getCursos()
    .subscribe(
      response => {
        this.cursos = response;
      },
      error => {
        this.cursos = [{id: 10, name: "abacaxi", areaId: 10, area: new AreaJson}, {id: 10, name: "limão", areaId: 10, area: new AreaJson},
         {id: 10, name: "uva", areaId: 10, area: new AreaJson}]
        console.log(this.cursos);

      }
    );
  }
}
