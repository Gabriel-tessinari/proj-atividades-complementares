import { Component, OnInit } from '@angular/core';
import { AtividadeJson } from 'src/app/shared/json/atividade.json';
import { GrupoAtividadesJson } from 'src/app/shared/json/grupo-atividades.json';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';

@Component({
  selector: 'app-aluno-add-horas',
  templateUrl: './aluno-add-horas.component.html',
  styleUrls: ['./aluno-add-horas.component.scss']
})
export class AlunoAddHorasComponent implements OnInit {
  grupos: Array<GrupoAtividadesJson>;
  idGrupoSelecionado: number;
  atividades: Array<AtividadeJson>;
  idAtividadeSelecionada: number;

  constructor(
    private service: TesteArqService
  ) { }

  ngOnInit(): void {
    this.grupos = [];
    this.idGrupoSelecionado = 0;
    this.atividades = [];
    this.idAtividadeSelecionada = 0;
    this.loadGrupos();
  }

  loadGrupos() {
    this.service.getGruposAtividades()
    .subscribe(
      response => {
        this.grupos = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadAtividades() {
    this.service.getAtividades()
    .subscribe(
      response => {
        this.setAtividadesFromGrupo(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  setAtividadesFromGrupo(atividades: Array<AtividadeJson>) {
    this.atividades = [];
    this.idAtividadeSelecionada = 0;

    atividades.forEach(atv => {
      if(atv.grupoAtividadesId == this.idGrupoSelecionado) {
        this.atividades.push(atv);
      }
    })
  }
}
