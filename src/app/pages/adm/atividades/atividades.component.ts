import { Component, OnInit } from '@angular/core';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { GrupoAtividadesJson } from 'src/app/shared/json/grupo-atividades.json';

declare var $: any;

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {
  grupos: Array<GrupoAtividadesJson>;
  idGrupoSelecionado: number;
  desabilitaButton: boolean;
  alertas: Alertas;

  constructor(
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.grupos = [];
    this.idGrupoSelecionado = 0;
    this.desabilitaButton = true;
    this.alertas = new Alertas();
    this.loadGrupos();
  }

  loadGrupos() {   
    this.testeArqService.getGruposAtividades()
    .subscribe(
      response => {
        this.grupos = response
      },
      error => {
        console.log(error);
        this.alertas.grupo = true;
      }
    );
  }

  selectGrupo(selected: string) {
    for(let i = 0; i < this.grupos.length; i++) {
      if(selected == this.grupos[i].nome) {
        this.idGrupoSelecionado = this.grupos[i].id;
        i = this.grupos.length;
      } else {
        this.idGrupoSelecionado = 0;
      }
    }

    this.desabilitaButton = (this.idGrupoSelecionado == 0);
  }

  openModalAddGrupo() {
    $("#modal-add-grupo").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }
}


class Alertas {
  grupo: boolean;
 
  grupoMensagem: string;

  constructor() {
    this.grupo = false;
    this.grupoMensagem = 'Erro ao carregar a lista de grupos de atividades.';
  }
}