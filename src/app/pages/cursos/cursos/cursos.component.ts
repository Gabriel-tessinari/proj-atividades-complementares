import { Component, OnInit } from '@angular/core';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { CursosService } from 'src/app/shared/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  cursos: Array<CursoJson>;

  constructor(
    private cursosService: CursosService
  ) { }

  ngOnInit(): void {
    this.cursos = [];
    this.loadCursos();
  }

  loadCursos() {
    this.cursos = this.cursosService.getCursosFake();
  }
}
