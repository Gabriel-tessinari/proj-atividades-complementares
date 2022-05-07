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
  atividadeToDeleteId: number;

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
    this.atividadeToDeleteId = 0;
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

    this.alertas = new Alertas();
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

    this.alertas.zeroAtividade = (this.atividades.length == 0);
  }

  saveGrupo() {
    if(this.validaGrupo()) {
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
    } else this.alertas.saveGrupo = true;
  }

  validaGrupo(): boolean {
    let valida: boolean = true;
    this.grupos.forEach(grupo => {
      if(grupo.nome == this.novoGrupo.nome) valida = false;
    });

    return valida;
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
        this.deleteAtividadeFromTable(id);
      },
      error => {
        console.log(error);
        this.alertas.deleteAtividade = true;
      }
    );
  }

  deleteAtividadeFromTable(atividadeId: number) {
    this.atividades.forEach((atividade, index) => {
      if(atividade.id == atividadeId) {
        this.atividades.splice(index, 1);
      }
    });
  }

  createAtividade() {
    if(this.validaAtividade()) {
      this.novaAtividade.grupoAtividadesId = this.grupoSelecionado.id;
      this.novaAtividade.converterHoras = false;
      
      this.testeArqService.createAtividade(this.novaAtividade)
      .subscribe(
        () => {
          this.novaAtividade.nome = '';
          this.loadAtividades();
        },
        error => {
          console.log(error);
          this.alertas.saveAtividade = true;
        }
      );
    } else this.alertas.saveAtividade = true;
  }

  validaAtividade(): boolean {
    let valida: boolean = true;
    this.atividades.forEach(atividade => {
      if(atividade.nome == this.novaAtividade.nome) valida = false;
    });

    return valida;
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

  openModalDeleteAtividade(atividadeId: number) {
    this.atividadeToDeleteId = atividadeId;

    $("#modal-delete-atividade").modal({
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
  atividade: boolean;
  zeroAtividade: boolean;
  deleteAtividade: boolean;
  saveAtividade: boolean;
 
  grupoMensagem: string;
  saveGrupoMensagem: string;
  deleteGrupoMensagem: string;
  atividadeMensagem: string;
  zeroAtividadeMensagem: string;
  deleteAtividadeMensagem: string;
  saveAtividadeMensagem: string;

  constructor() {
    this.grupo = false;
    this.saveGrupo = false;
    this.deleteGrupo = false;
    this.atividade = false;
    this.zeroAtividade = false;
    this.deleteAtividade = false;
    this.saveAtividade = false;
    this.grupoMensagem = 'Erro ao carregar a lista de grupos de atividades.';
    this.saveGrupoMensagem = 'Erro ao criar novo grupo de atividades. Tente novamente.';
    this.deleteGrupoMensagem = 'Erro ao deletar grupo de atividades. Tente novamente.';
    this.atividadeMensagem = 'Erro ao carregar as atividades do grupo selecionado.';
    this.zeroAtividadeMensagem = 'Não há atividade no grupo selecionado.';
    this.deleteAtividadeMensagem = 'Erro ao deletar atividade. Tente novamente.';
    this.saveAtividadeMensagem = 'Erro ao criar nova atividade no grupo selecionado. Tente novamente.';
  }
}