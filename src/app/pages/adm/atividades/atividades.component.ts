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
  atividadeToUpdate: AtividadeJson;

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
    this.atividadeToUpdate = new AtividadeJson();
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
        this.alertas.grupoError = true;
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

    this.inputGrupoSelecionado = '';
    this.alertas.zeroAtividadeError = (this.atividades.length == 0);
  }

  saveGrupo() {
    if(this.validaGrupo()) {
      this.testeArqService.createGrupoAtividades(this.novoGrupo)
      .subscribe(
        () => {
          this.ngOnInit();
          this.alertas.saveGrupoSuccess = true;
          this.alertSuccessTimer('grupo');
        },
        error => {
          console.log(error);
          this.alertas.saveGrupoError = true;
        }
      );
    } else this.alertas.saveGrupoError = true;
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
        this.alertas.deleteGrupoError = true;
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
        this.alertas.deleteAtividadeError = true;
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
          this.alertas.saveAtividadeSuccess = true;
          this.alertSuccessTimer('atividade');
          this.loadAtividades();
        },
        error => {
          console.log(error);
          this.alertas.saveAtividadeError = true;
        }
      );
    } else this.alertas.saveAtividadeError = true;
  }

  validaAtividade(): boolean {
    let valida: boolean = true;
    this.atividades.forEach(atividade => {
      if(atividade.nome == this.novaAtividade.nome) valida = false;
    });

    return valida;
  }

  updateAtividade() {
    this.testeArqService.updateAtividade(this.atividadeToUpdate)
    .subscribe(
      () => {
        this.atividadeToUpdate = new AtividadeJson;
        this.alertas.updateAtividadeSuccess = true;
        this.alertSuccessTimer('updateAtividade');
        this.loadAtividades();
      },
      error => {
        console.log(error);
        this.alertas.updateAtividadeError = true;
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

  openModalDeleteAtividade(atividadeId: number) {
    this.atividadeToDeleteId = atividadeId;

    $("#modal-delete-atividade").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  openModalUpdateAtividade(atividade: AtividadeJson) {
    this.atividadeToUpdate = atividade;

    $("#modal-update-atividade").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  alertSuccessTimer(alert: string) {
    setTimeout(() => {
      alert == 'grupo' ?
      this.alertas.saveGrupoSuccess = false :
      alert == 'atividade' ?
      this.alertas.saveAtividadeSuccess = false :
      alert == 'updateAtividade' ?
      this.alertas.updateAtividadeSuccess = false :
      {}
    }, 3500);
  }
}


class Alertas {
  grupoError: boolean;
  saveGrupoError: boolean;
  deleteGrupoError: boolean;
  atividadeError: boolean;
  zeroAtividadeError: boolean;
  deleteAtividadeError: boolean;
  saveAtividadeError: boolean;
  updateAtividadeError: boolean;

  saveGrupoSuccess: boolean;
  saveAtividadeSuccess: boolean;
  updateAtividadeSuccess: boolean;
 
  grupoErrorMensagem: string;
  saveGrupoErrorMensagem: string;
  deleteGrupoErrorMensagem: string;
  atividadeErrorMensagem: string;
  zeroAtividadeErrorMensagem: string;
  deleteAtividadeErrorMensagem: string;
  saveAtividadeErrorMensagem: string;
  updateAtividadeErrorMensagem: string;

  saveGrupoSuccessMensagem: string;
  saveAtividadeSuccessMensagem: string;
  updateAtividadeSuccessMensagem: string;

  constructor() {
    this.grupoError = false;
    this.saveGrupoError = false;
    this.deleteGrupoError = false;
    this.atividadeError = false;
    this.zeroAtividadeError = false;
    this.deleteAtividadeError = false;
    this.saveAtividadeError = false;
    this.updateAtividadeError = false;
    this.grupoErrorMensagem = 'Erro ao carregar a lista de grupos de atividades.';
    this.saveGrupoErrorMensagem = 'Erro ao criar novo grupo de atividades. Tente novamente.';
    this.deleteGrupoErrorMensagem = 'Erro ao deletar grupo de atividades. Tente novamente.';
    this.atividadeErrorMensagem = 'Erro ao carregar as atividades do grupo selecionado.';
    this.zeroAtividadeErrorMensagem = 'Não há atividade no grupo selecionado.';
    this.deleteAtividadeErrorMensagem = 'Erro ao deletar atividade. Tente novamente.';
    this.saveAtividadeErrorMensagem = 'Erro ao criar nova atividade no grupo selecionado. Tente novamente.';
    this.updateAtividadeErrorMensagem = 'Erro ao salvar alterações da atividade no grupo selecionado. Tente novamente.'
    
    this.saveGrupoSuccess = false;
    this.saveAtividadeSuccess = false;
    this.updateAtividadeSuccess = false;
    this.saveGrupoSuccessMensagem = 'Grupo de Atividades criado com sucesso.';
    this.saveAtividadeSuccessMensagem = 'Atividade criada com sucesso.';
    this.updateAtividadeSuccessMensagem = 'Atividade atualizada com sucesso.';
  }
}