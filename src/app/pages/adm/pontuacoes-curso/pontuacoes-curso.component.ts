import { Component, OnInit } from '@angular/core';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { AreaJson } from 'src/app/shared/json/area.json';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { GrupoAtividadesJson } from 'src/app/shared/json/grupo-atividades.json';

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

  constructor(
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.grupoAtividades = [];
    this.cursos = [];
    this.areas = [];
    this.idAreaSelecionada = 0;
    this.idCursoSelecionado = 0;
    this.inputCursoSelecionado = '';
    this.desabilitaButton = true;
    this.loadArea();
  }

  loadArea() {   
    this.testeArqService.getArea()
    .subscribe(
      response => {
        this.areas = response
      },
      error => {
        console.log(error);
        //this.alertas.grupo = true;
      }
    );
  }


  loadCursos() {   
    this.testeArqService.getCursosByArea(this.idAreaSelecionada)
    .subscribe(
      response => {
        this.cursos = response
      },
      error => {
        console.log(error);
        //this.alertas.curso = true;
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

  loadGrupoAtividades() {   

    this.testeArqService.getGruposAtividades()
    .subscribe(
      response => {
        this.grupoAtividades = response
      },
      error => {
        console.log(error);
        //this.alertas.curso = true;
      }
    );
    console.log(this.grupoAtividades)
  }


}
