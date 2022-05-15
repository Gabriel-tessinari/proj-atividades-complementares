import { Component, OnInit } from '@angular/core';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { AreaJson } from 'src/app/shared/json/area.json';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { GrupoAtividadesJson } from 'src/app/shared/json/grupo-atividades.json';
import { AtividadeJson } from 'src/app/shared/json/atividade.json';
import { PontuacaoJson } from 'src/app/shared/json/pontuacao.json';

@Component({
  selector: 'app-pontuacoes-curso',
  templateUrl: './pontuacoes-curso.component.html',
  styleUrls: ['./pontuacoes-curso.component.scss']
})
export class PontuacoesCursoComponent implements OnInit {
  cursos: Array<CursoJson>;
  areas: Array<AreaJson>;
  idAreaSelecionada: number;
  inputCursoSelecionado: string;
  idCursoSelecionado: number;
  desabilitaButton: boolean;
  grupoAtividades: Array<GrupoAtividadesJson>;
  atividades: Array<AtividadeJson>;
  cursoSelecionado: CursoJson;
  tabela: Array<AtividadeTabela>;

  constructor(
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.grupoAtividades = [];
    this.cursos = [];
    this.areas = [];
    this.atividades = [];
    this.tabela = [];
    this.idAreaSelecionada = 0;
    this.idCursoSelecionado = 0;
    this.inputCursoSelecionado = '';
    this.desabilitaButton = true;
    this.cursoSelecionado = new CursoJson;
    this.loadAreas();
  }

  loadAreas() {   
    this.testeArqService.getAreas()
    .subscribe(
      response => {
        this.areas = response;
        this.loadGrupoAtividades();
        this.loadAtividades();
      },
      error => {
        console.log(error);
        //TO DO: mensagem de erro
      }
    );
  }

  loadCursos() {
    this.inputCursoSelecionado = '';
    this.idCursoSelecionado = 0;
    this.desabilitaButton = (this.idCursoSelecionado == 0);

    this.testeArqService.getCursosByArea(this.idAreaSelecionada)
    .subscribe(
      response => {
        this.cursos = response;
      },
      error => {
        console.log(error);
        //TO DO: mensagem de erro
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

  setSelectedCurso() {
    for(let i = 0; i < this.cursos.length; i++) {
      if(this.idCursoSelecionado == this.cursos[i].id) {
        this.cursoSelecionado = this.cursos[i];
        i = this.cursos.length;
      }
    }

    this.inputCursoSelecionado = '';
    this.idCursoSelecionado = 0;
    this.desabilitaButton = (this.idCursoSelecionado == 0);
    this.setTabela();
  }

  loadGrupoAtividades() {
    this.testeArqService.getGruposAtividades()
    .subscribe(
      response => {
        this.grupoAtividades = response;
      },
      error => {
        console.log(error);
        //TO DO: mensagem de erro
      }
    );
  }

  loadAtividades() { 
    this.testeArqService.getAtividades()
    .subscribe(
      response => {
        this.atividades = response;
      },
      error => {  
        console.log(error);
        //TO DO: mensagem de erro
      }
    );
  }

  setTabela() {
    this.grupoAtividades.forEach(grupo => {
      let itemTabela: AtividadeTabela = new AtividadeTabela;
      itemTabela.grupo = grupo;
      this.tabela.push(itemTabela);
    });
  }
}


class AtividadeTabela {
  grupo: GrupoAtividadesJson;
  atividades: Array<Atividade>;

  constructor() {
    this.grupo = new GrupoAtividadesJson;
    this.atividades = [];
  }
}


class Atividade {
  atividade: AtividadeJson;
  pontuacao: PontuacaoJson;

  constructor() {
    this.atividade = new AtividadeJson;
    this.pontuacao = new PontuacaoJson;
  }
}