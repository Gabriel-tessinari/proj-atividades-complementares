import { Component, OnInit } from '@angular/core';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
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
        console.log(this.cursos);
      },
      error => {
        console.log(error);
      }
    );
  }
}
