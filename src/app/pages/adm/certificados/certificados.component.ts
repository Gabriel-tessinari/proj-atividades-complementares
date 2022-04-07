import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AlunoJson } from 'src/app/shared/json/aluno.json';
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
  horasComplementares: Array<HorasComplementaresJson>;
  idCursoSelecionado: number;
  alunos: Array<Aluno>;
  buttonFlag: boolean;
  textValue: string;
  tabelaAuxiliar: Array<Aluno>;
  

  constructor( 
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.cursos = [];
    this.loadCursos();
    this.alunos = [];
    this.buttonFlag = true;
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

  loadButton(){
   if( this.textValue == null|| this.textValue ==""){
        this.buttonFlag= true; 
      } else 
        this.buttonFlag = false;

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

  sortTable(coluna: number) {
    var table;
    
    if(this.alunos.length > 0){
      if(coluna=0){
        //ordenar por nome
        for(var i=0; i< this.alunos.length; i++){
          
        }
        this.alunos[0].nome
      }
      if(coluna=1){
        //ordenar por matricula
      }
      if(coluna=2){
        //ordenar por certificados pendentes (maior para menor)
      }
    

    
   
  }}



}

class Aluno{
  nome: string;
  matricula: number;
  certificadosPendentes: number;

  constructor(){
    this.nome = '';
    this.matricula = 0;
    this.certificadosPendentes = 0;
  }
}


  

