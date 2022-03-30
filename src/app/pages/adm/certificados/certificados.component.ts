import { Component, OnInit } from '@angular/core';
import { AreaJson } from 'src/app/shared/json/area.json';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { HorasComplementaresJson } from 'src/app/shared/json/horas-complementares.json';
import { PontuacaoJson } from 'src/app/shared/json/pontuacao.json';
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
  
  constructor( 
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.cursos = [];
    this.loadCursos();
    this.alunos = [];
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
        //console.log(error);
      }
    );
  }

  loadHorasComplementares() {
    this.testeArqService.getHorasComplementaresByCurso(this.idCursoSelecionado)
    .subscribe(
      response => {
        this.horasComplementares = response;
        this.loadAlunos();
      },
      error => {
        this.horasComplementares = [{id: 10,
          certificado: 'string',
          observacao: 'null',
          horas: 10,
          alunoId: 2,
          aluno: {id: 2,
            matricula: 334,
            nome: 'string',
            cursoId: 3,
            curso: new CursoJson},
          pontuacaoId: 4,
          pontuacao: new PontuacaoJson,
          statusId: 2,
          status:{id: 3,
            descricao: 'string',} },
          {id: 10,
            certificado: 'string',
            observacao: 'null',
            horas: 10,
            alunoId: 2,
            aluno: {id: 2,
              matricula: 18,
              nome: 'Gabriel Tessinari Carregozi Miranda',
              cursoId: 3,
              curso: new CursoJson},
            pontuacaoId: 4,
            pontuacao: new PontuacaoJson,
            statusId: 2,
            status:{id: 3,
              descricao: 'string',} }]
         this.loadAlunos();   
        //console.log(error);
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
    })
    console.log(this.alunos);
  }
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