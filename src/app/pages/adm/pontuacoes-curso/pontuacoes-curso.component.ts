import { Component, OnInit } from '@angular/core';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { AreaJson } from 'src/app/shared/json/area.json';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { GrupoAtividadesJson } from 'src/app/shared/json/grupo-atividades.json';
import { AtividadeJson } from 'src/app/shared/json/atividade.json';

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

  constructor(
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.grupoAtividades = [];
    this.cursos = [];
    this.areas = [];
    this.atividades = [];
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
        this.areas = response
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
    this.loadGrupoAtividades();
  }

  loadGrupoAtividades() {
    this.testeArqService.getGruposAtividades()
    .subscribe(
      response => {
        this.grupoAtividades = response
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
      }
    );
  }

  filterAtividadesFromGrupo(atividades: Array<AtividadeJson>, selected: number) {//carrega atividades quando clica no collapse, enviando o grupo clicado como parametro
    this.atividades = [];

    atividades.forEach(atividade => {
      if(atividade.grupoAtividadesId == selected) {
        this.atividades.push(atividade);
      }
      console.log(atividades)
    });

  }

}
