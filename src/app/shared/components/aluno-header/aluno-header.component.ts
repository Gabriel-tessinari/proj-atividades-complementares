import { Component, OnInit } from '@angular/core';
import { AlunoJson } from '../../json/aluno.json';

@Component({
  selector: 'app-aluno-header',
  templateUrl: './aluno-header.component.html',
  styleUrls: ['./aluno-header.component.scss']
})
export class AlunoHeaderComponent implements OnInit {
  aluno: AlunoJson;

  constructor() { }

  ngOnInit(): void {
    this.aluno = {
      matricula: 201879639,
      nome: 'GABRIEL TESSINARI CARREGOZI MIRANDA',
      id: 1,
      cursoId: 1,
      curso: {
        id: 1,
        name: 'Ciência da Computação'
      }
    } as AlunoJson;
  }
}
