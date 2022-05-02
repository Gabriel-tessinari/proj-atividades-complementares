import { Component, OnInit } from '@angular/core';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { GrupoAtividadesJson } from 'src/app/shared/json/grupo-atividades.json';
import { AtividadeJson } from 'src/app/shared/json/atividade.json';

declare var $: any;

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {
  grupos: Array<GrupoAtividadesJson>;
  idGrupoSelecionado: number;
  inputGrupoSelecionado: string;
  grupoSelecionado: GrupoAtividadesJson;
  desabilitaButton: boolean;
  alertas: Alertas;
  novoGrupo: GrupoAtividadesJson;
  novaAtividade: AtividadeJson;
  atividades: Array<AtividadeJson>;

  constructor(
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.grupos = [];
    this.idGrupoSelecionado = 0;
    this.inputGrupoSelecionado = '';
    this.grupoSelecionado = new GrupoAtividadesJson();
    this.desabilitaButton = true;
    this.atividades = [];
    this.alertas = new Alertas();
    this.novoGrupo = new GrupoAtividadesJson();
    this.novaAtividade = new AtividadeJson();
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

  searchAtividadesByGrupo() {
    this.grupos.forEach(grupo => {
      if(grupo.id == this.idGrupoSelecionado) {
        this.grupoSelecionado = grupo;
      }
    });

    this.loadAtividades();
  }

  loadAtividades() {
    this.testeArqService.getAtividades()
    .subscribe(
      response => {
        this.filterAtividadesFromGrupo(response);
      },
      error => {  
        console.log(error);
      }
    );
  }

  filterAtividadesFromGrupo(atividades: Array<AtividadeJson>) {
    this.atividades = [];

    atividades.forEach(atividade => {
      if(atividade.grupoAtividadesId == this.grupoSelecionado.id) {
        this.atividades.push(atividade);
      }
    });

    console.log(this.atividades)
  }

  saveGrupo() {
    this.testeArqService.createGrupoAtividades(this.novoGrupo)
    .subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
        this.alertas.saveGrupo = true;
      }
    );
  }

  deleteGrupo() {
    this.deleteAtividadesFromGrupo();

    this.testeArqService.deleteGrupoAtividades(this.grupoSelecionado.id)
    .subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
        this.alertas.deleteGrupo = true;
      }
    );
  }

  deleteAtividadesFromGrupo() {
    if(this.atividades.length > 0){
      this.atividades.forEach(atividade => {
        console.log(atividade);
        this.testeArqService.deleteAtividade(atividade.id)
        .subscribe(
          () => {
            console.log('Deletada com sucesso.')
          },
          error => {
            console.log(error);
          }
        );
      });
    }
  }

  deleteAtividade(id: number){
    this.testeArqService.deleteAtividade(id)
    .subscribe(
      () => {
        this.loadAtividades()
      },
      error => {
        console.log(error);
        this.alertas.grupo = true;
      }
    );
  }

  createAtividade(){
    this.testeArqService.createAtividade(this.novaAtividade)
    .subscribe(
      response => {
        this.loadAtividades()
      },
      error => {
        console.log(error);
      }
    );

  }

  openModalAddGrupo() {
    $("#modal-add-grupo").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  openModalDeleteGrupo() {
    $("#modal-delete-grupo").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }
}


class Alertas {
  grupo: boolean;
  saveGrupo: boolean;
  deleteGrupo: boolean;
 
  grupoMensagem: string;
  saveGrupoMensagem: string;
  deleteGrupoMensagem: string;

  constructor() {
    this.grupo = false;
    this.saveGrupo = false;
    this.deleteGrupo = false;
    this.grupoMensagem = 'Erro ao carregar a lista de grupos de atividades.';
    this.saveGrupoMensagem = 'Erro ao criar novo grupo de atividades. Tente novamente.';
    this.deleteGrupoMensagem = 'Erro ao deletar grupo de atividades. Tente novamente.'
  }
}