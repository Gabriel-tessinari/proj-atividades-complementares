import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { AlunoJson } from 'src/app/shared/json/aluno.json';
import { HorasComplementaresJson } from 'src/app/shared/json/horas-complementares.json';
import { HorasComplementaresAtualizaStatusJson } from 'src/app/shared/json/horas-complementares-atualiza-status.json';
import { AtividadeJson } from 'src/app/shared/json/atividade.json';
import { DateUtil } from 'src/app/shared/util/date.util';

declare var $: any;

@Component({
  selector: 'app-certificados-aluno',
  templateUrl: './certificados-aluno.component.html',
  styleUrls: ['./certificados-aluno.component.scss']
})
export class CertificadosAlunoComponent implements OnInit {
  aluno: AlunoJson;
  horasComplementares: Array<HorasComplementaresJson>;
  atividades: Array<AtividadeJson>;
  horasEnviadas: Array<HoraEnviada>;
  atualizaStatus: HorasComplementaresAtualizaStatusJson;
  ordenacaoTabela: string[];
  alertas: Alertas;

  constructor(
    private testeArqService: TesteArqService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
    .subscribe(params => {
      this.aluno = new AlunoJson();
      this.aluno.id = params.aluno;
    });
  }

  ngOnInit(): void {
    this.horasComplementares = [];
    this.atividades = [];
    this.horasEnviadas = [];
    this.atualizaStatus = {} as HorasComplementaresAtualizaStatusJson;
    this.ordenacaoTabela = ['', '', ''];
    this.alertas = new Alertas();
    this.loadAluno();
  }

  loadAluno() {   
    this.testeArqService.getAlunoById(this.aluno.id)
    .subscribe(
      response => {
        this.aluno = response;
        this.loadAtividades();
      },
      error => {
        console.log(error);
        this.alertas.aluno = true;
      }
    );
  }

  loadAtividades() {
    this.testeArqService.getAtividades()
    .subscribe(
      response => {
        this.atividades = response;
        this.loadHorasComplementares();
      },
      error => {  
        console.log(error);
        this.alertas.horaEnviada = true;
      }
    );
  }

  loadHorasComplementares() {
    this.testeArqService.getHorasComplementaresByCurso(this.aluno.cursoId)
    .subscribe(
      response => {
        this.filterHorasComplementaresFromAluno(response);
      },
      error => {  
        console.log(error);
        this.alertas.horaEnviada = true;
      }
    );
  }

  filterHorasComplementaresFromAluno(horas: Array<HorasComplementaresJson>) {
    horas.forEach(hc => {
      if(hc.alunoId == this.aluno.id) {
        this.horasComplementares.push(hc);
      }
    });
    this.orderPendentesFirst();
    this.setHorasEnviadas();
  }

  orderPendentesFirst() {
    this.horasComplementares.sort((a, b) => this.pendentesFirstCompare(a, b));
  }

  pendentesFirstCompare(horaA: HorasComplementaresJson, horaB: HorasComplementaresJson): number {
    let aPendente: boolean = horaA.status.descricao == 'Pendente';
    let bPendente: boolean = horaB.status.descricao == 'Pendente';

    if(aPendente && !bPendente) return -1;
    if(!aPendente && bPendente) return 1;
    return 0;
  }

  setHorasEnviadas() {
    this.horasComplementares.forEach(hora => {
      let horaEnviada: HoraEnviada = new HoraEnviada();
      horaEnviada.horaComplementar = hora;
      horaEnviada.setDataEnvio();

      for(let i = 0; i < this.atividades.length; i++) {
        if(hora.pontuacao.atividadeId == this.atividades[i].id) {
          horaEnviada.atividade = this.atividades[i];
          i = this.atividades.length;
        }
      }

      this.horasEnviadas.push(horaEnviada);
    });
  }

  setStatusPendente(hc: HorasComplementaresJson) {
    this.atualizaStatus.id = hc.id;
    this.atualizaStatus.statusId = 1;
    this.atualizaStatus.observacao = '';

    this.postNewStatus();
  }

  postNewStatus() {
    this.testeArqService.updateHoraComplementarStatus(this.atualizaStatus)
    .subscribe(
      response => {
        for(let i = 0; i < this.horasEnviadas.length; i++) {
          if(response.id == this.horasEnviadas[i].horaComplementar.id) {
            this.horasEnviadas[i].horaComplementar = response;
            i = this.horasEnviadas.length;
          }
        }
      },
      error => {  
        console.log(error);
      }
    );
  }

  openModalRecusar(hc: HorasComplementaresJson) {
    this.atualizaStatus.id = hc.id;
    this.atualizaStatus.statusId = 2;
    this.atualizaStatus.observacao = hc.observacao;
    
    $("#modal-recusar").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  openModalValidar(hc: HorasComplementaresJson) {
    this.atualizaStatus.id = hc.id;
    this.atualizaStatus.statusId = 3;
    this.atualizaStatus.observacao = '';
    
    $("#modal-validar").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  sortTable(coluna: number) {
    if(this.horasEnviadas.length > 0) {
      switch(coluna) {
        case 0:
          if(this.ordenacaoTabela[0] == '' || this.ordenacaoTabela[0] == 'decresc') {
            this.horasEnviadas.sort((a, b) => a.atividade.nome.localeCompare(b.atividade.nome, 'pt-BR', {ignorePunctuation: true}));
            this.ordenacaoTabela = ['cresc', '', ''];
          } else {
            this.horasEnviadas.sort((a, b) => a.atividade.nome.localeCompare(b.atividade.nome, 'pt-BR', {ignorePunctuation: true})*-1);
            this.ordenacaoTabela = ['decresc', '', ''];
          }
          break;
        case 1:
          if(this.ordenacaoTabela[1] == '' || this.ordenacaoTabela[1] == 'decresc') {
            this.horasEnviadas.sort((a, b) => this.sortTableDateCompare(a.horaComplementar.data, b.horaComplementar.data));
            this.ordenacaoTabela = ['', 'cresc', ''];
          } else {
            this.horasEnviadas.sort((a, b) => this.sortTableDateCompare(a.horaComplementar.data, b.horaComplementar.data)*-1);
            this.ordenacaoTabela = ['', 'decresc', ''];
          }
          break;
        default:
          if(this.ordenacaoTabela[2] == '' || this.ordenacaoTabela[2] == 'decresc') {
            this.horasEnviadas.sort((a, b) => a.horaComplementar.status.descricao.localeCompare(b.horaComplementar.status.descricao, 'pt-BR', {ignorePunctuation: true}));
            this.ordenacaoTabela = ['', '', 'cresc'];
          } else {
            this.horasEnviadas.sort((a, b) => a.horaComplementar.status.descricao.localeCompare(b.horaComplementar.status.descricao, 'pt-BR', {ignorePunctuation: true})*-1);
            this.ordenacaoTabela = ['', '', 'decresc'];
          }
          break;
      }
    }
  }

  sortTableDateCompare(dateA: Date, dateB: Date): number {
    dateA = new Date(dateA);
    dateB = new Date(dateB);
    if(DateUtil.isNewer(dateA, dateB)) return 1;
    if(DateUtil.isNewer(dateB, dateA)) return -1;
    return 0;
  }
}


class HoraEnviada {
  horaComplementar: HorasComplementaresJson;
  dataEnvio: string;
  atividade: AtividadeJson;

  constructor() {
    this.horaComplementar = {} as HorasComplementaresJson;
    this.dataEnvio = '00/00/0000 00:00'
    this.atividade = {} as AtividadeJson;
  }

  setDataEnvio() {
    this.dataEnvio = DateUtil.formatDateToString(new Date(this.horaComplementar.data));
  }
}


class Alertas {
  aluno: boolean;
  horaEnviada: boolean;

  alunoMensagem: string;
  horaEnviadaMensagem: string;

  constructor() {
    this.aluno = false;
    this.horaEnviada = false;
    this.alunoMensagem = 'Erro ao carregar informações do aluno.';
    this.horaEnviadaMensagem = 'Erro ao carregar as horas complementares do aluno.';
  }
}