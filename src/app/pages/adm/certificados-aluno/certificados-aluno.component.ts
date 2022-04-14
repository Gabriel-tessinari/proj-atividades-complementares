import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { AlunoJson } from 'src/app/shared/json/aluno.json';
import { HorasComplementaresJson } from 'src/app/shared/json/horas-complementares.json';
import { HorasComplementaresAtualizaStatusJson } from 'src/app/shared/json/horas-complementares-atualiza-status.json';

declare var $: any;

@Component({
  selector: 'app-certificados-aluno',
  templateUrl: './certificados-aluno.component.html',
  styleUrls: ['./certificados-aluno.component.scss']
})
export class CertificadosAlunoComponent implements OnInit {
  aluno: AlunoJson;
  horasComplementares: Array<HorasComplementaresJson>;
  atualizaStatus: HorasComplementaresAtualizaStatusJson;

  constructor(
    private testeArqService: TesteArqService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
    .subscribe(params => {
      this.aluno = new AlunoJson;
      this.aluno.id = params.aluno;
    });
  }

  ngOnInit(): void {
    this.horasComplementares = [];
    this.atualizaStatus = {} as HorasComplementaresAtualizaStatusJson;
    this.loadAluno();
  }

  loadAluno() {   
    this.testeArqService.getAlunoById(this.aluno.id)
    .subscribe(
      response => {
        this.aluno = response;
        this.loadHorasComplementares();
      },
      error => {
        console.log(error);
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
      }
    );
  }

  filterHorasComplementaresFromAluno(horas: Array<HorasComplementaresJson>) {
    horas.forEach(hc => {
      if(hc.alunoId == this.aluno.id) {
        this.horasComplementares.push(hc);
      }
    });
  }

  setStatusPendenteOuAprovado(hc: HorasComplementaresJson, newStatusId: number) {
    this.atualizaStatus.id = hc.id;
    this.atualizaStatus.statusId = newStatusId;
    this.atualizaStatus.observacao = '';

    this.postNewStatus();
  }

  postNewStatus() {
    this.testeArqService.updateHoraComplementarStatus(this.atualizaStatus)
    .subscribe(
      response => {
        for(let i = 0; i < this.horasComplementares.length; i++) {
          if(response.id == this.horasComplementares[i].id) {
            this.horasComplementares[i] = response;
            i = this.horasComplementares.length;
          }
        }
      },
      error => {  
        console.log(error);
      }
    );
  }

  openModal(hc: HorasComplementaresJson) {
    this.atualizaStatus.id = hc.id;
    this.atualizaStatus.statusId = 2;
    this.atualizaStatus.observacao = hc.observacao;
    
    $("#modal-recusar").modal({
      show: true,
      keyboard: false,
      backdrop: 'static'
    });
  }
}
