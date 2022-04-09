import { Component, OnInit } from '@angular/core';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { HorasComplementaresJson } from 'src/app/shared/json/horas-complementares.json';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {
  cursos: Array<CursoJson>;
  idCursoSelecionado: number;
  horasComplementares: Array<HorasComplementaresJson>;
  alunos: Array<Aluno>;
  desabilitaButton: boolean;
  
  constructor( 
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.cursos = [];
    this.idCursoSelecionado = 0;
    this.alunos = [];
    this.loadCursos();
    this.desabilitaButton = true;
  }

  loadCursos() {   
    this.testeArqService.getCursos()
    .subscribe(
      response => {
        this.cursos = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectCurso(selected: string) {
    for(let i = 0; i < this.cursos.length; i++) {
      if(selected == this.cursos[i].name) {
        this.idCursoSelecionado = this.cursos[i].id;
        i = this.cursos.length;
      } else {
        this.idCursoSelecionado = 0;
      }
    }

    this.desabilitaButton = (this.idCursoSelecionado == 0);
  }

  loadHorasComplementares() {
    this.testeArqService.getHorasComplementaresByCurso(this.idCursoSelecionado)
    .subscribe(
      response => {
        this.horasComplementares = response;
        this.loadAlunos();
      },
      error => {  
        console.log(error);
      }
    );  
  }

  loadAlunos() {
    this.alunos = [];

    this.horasComplementares.forEach(hc=>{
      let alunoNaLista: boolean = false;
      this.alunos.forEach(aluno =>{
        if(hc.aluno.matricula == aluno.matricula){
          alunoNaLista = true;
          if(hc.status.descricao == 'Pendente') {
            aluno.certificadosPendentes++;
          }
        }
      });
      if(!alunoNaLista){
        let aluno: Aluno = new Aluno();
        aluno.nome = hc.aluno.nome;
        aluno.matricula = hc.aluno.matricula;
        if(hc.status.descricao == 'Pendente') {
          aluno.certificadosPendentes++;
        }
        this.alunos.push(aluno);
      }     
    });
  }

  sortTable(column: number) {
    let alunosAux: Array<Aluno> = [];

    
  }

  /*customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1;
      let value2;
      switch (event.field) {
        case "origin.productionOrder.product.code":
          value1 = data1.origin.productionOrder.product.code;
          value2 = data2.origin.productionOrder.product.code;
          break;
        case "origin.productionOrder.product.derivation.code":
          value1 = data1.origin.productionOrder.product.derivation.code;
          value2 = data2.origin.productionOrder.product.derivation.code;
          break;
        case "origin.productionOrder.opNumber":
          value1 = data1.origin.productionOrder.opNumber;
          value2 = data2.origin.productionOrder.opNumber;
          break;
        case "quality.code":
          value1 = data1.quality.code;
          value2 = data2.quality.code;
          break;
        default:
          value1 = data1[event.field];
          value2 = data2[event.field];
          break;
      }
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      }
      else if (value1 != null && value2 == null) {
        result = 1;
      }
      else if (value1 == null && value2 == null) {
        result = 0;
      }
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      }
      else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.order * result);
    });
    this.checkOrderMovement(this.movementChanged, true);
  }*/
}

class Aluno {
  nome: string;
  matricula: number;
  certificadosPendentes: number;

  constructor() {
    this.nome = '';
    this.matricula = 0;
    this.certificadosPendentes = 0;
  }
}