import { Component, OnInit } from '@angular/core';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { HorasComplementaresJson } from 'src/app/shared/json/horas-complementares.json';

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
  ordenacaoTabela: string[];
  
  constructor( 
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.cursos = [];
    this.idCursoSelecionado = 0;
    this.alunos = [];
    this.desabilitaButton = true;
    this.ordenacaoTabela = ['', '', ''];
    this.loadCursos();
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
        aluno.id = hc.alunoId;
        aluno.nome = hc.aluno.nome;
        aluno.matricula = hc.aluno.matricula;
        if(hc.status.descricao == 'Pendente') {
          aluno.certificadosPendentes++;
        }
        this.alunos.push(aluno);
      }     
    });
  }

  sortTable(coluna: number) {
    switch(coluna) {
      case 0:
        if(this.ordenacaoTabela[0] == '' || this.ordenacaoTabela[0] == 'decresc') {
          this.alunos.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', {ignorePunctuation: true}));
          this.ordenacaoTabela = ['cresc', '', ''];
        } else {
          this.alunos.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', {ignorePunctuation: true})*-1);
          this.ordenacaoTabela = ['decresc', '', ''];
        }
        break;
      case 1:
        if(this.ordenacaoTabela[1] == '' || this.ordenacaoTabela[1] == 'decresc') {
          this.alunos.sort((a, b) => this.sortTableNumberCompare(a.matricula, b.matricula));
          this.ordenacaoTabela = ['', 'cresc', ''];
        } else {
          this.alunos.sort((a, b) => this.sortTableNumberCompare(a.matricula, b.matricula)*-1);
          this.ordenacaoTabela = ['', 'decresc', ''];
        }
        break;
      default:
        if(this.ordenacaoTabela[2] == '' || this.ordenacaoTabela[2] == 'decresc') {
          this.alunos.sort((a, b) => this.sortTableNumberCompare(a.certificadosPendentes, b.certificadosPendentes));
          this.ordenacaoTabela = ['', '', 'cresc'];
        } else {
          this.alunos.sort((a, b) => this.sortTableNumberCompare(a.certificadosPendentes, b.certificadosPendentes)*-1);
          this.ordenacaoTabela = ['', '', 'decresc'];
        }
        break;
    }
  }

  sortTableNumberCompare(numA: number, numB: number): number {
    if(numA > numB) return 1;
    if(numA < numB) return -1;
    return 0;
  }
}

class Aluno {
  id: number;
  nome: string;
  matricula: number;
  certificadosPendentes: number;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.matricula = 0;
    this.certificadosPendentes = 0;
  }
}