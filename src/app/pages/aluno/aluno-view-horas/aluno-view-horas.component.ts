import { Component, OnInit } from '@angular/core';
import { AtividadeJson } from 'src/app/shared/json/atividade.json';
import { HorasComplementaresJson } from 'src/app/shared/json/horas-complementares.json';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { DateUtil } from 'src/app/shared/util/date.util';

@Component({
  selector: 'app-aluno-view-horas',
  templateUrl: './aluno-view-horas.component.html',
  styleUrls: ['./aluno-view-horas.component.scss']
})
export class AlunoViewHorasComponent implements OnInit {
  pontosApr: number;
  pontosPdt: number;
  pontosMin: number;
  tabela: Array<LinhaTabela>;
  atividades: Array<AtividadeJson>;
  horas: Array<HorasComplementaresJson>;

  alunoId: number = 1;
  alunoCursoId: number = 1;

  constructor(
    private service: TesteArqService
  ) { }

  ngOnInit(): void {
    this.pontosApr = 0;
    this.pontosPdt = 0;
    this.pontosMin = 0;
    this.tabela = [];
    this.loadAtividades();
  }

  loadAtividades() {
    this.service.getAtividades()
    .subscribe(
      response => {
        this.atividades = response;
        this.loadHoras();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadHoras() {
    this.service.getHorasComplementaresByCurso(this.alunoCursoId)
    .subscribe(
      response => {
        this.horas = response;
        this.setHorasTabela();
      },
      error => {
        console.log(error);
      }
    );
  }

  setHorasTabela() {
    this.horas.forEach(hora => {
      if(hora.alunoId == this.alunoId) {
        let linha: LinhaTabela = new LinhaTabela;
        linha.hora = hora;
        this.tabela.push(linha);
      }
    });

    this.setLinhasTabela();
  }

  setLinhasTabela() {
    this.tabela.forEach(linha => {
      linha.setData();
      linha.setPontos();

      for(let i = 0; i < this.atividades.length; i++) {
        if(linha.hora.pontuacao.atividadeId == this.atividades[i].id) {
          linha.atividade = this.atividades[i];
          i = this.atividades.length;
        }
      }

      this.setPontos(linha.hora);
    });
  }

  setPontos(hora: HorasComplementaresJson) {
    if(hora.status.descricao == 'Pendente') {
      this.pontosPdt += hora.pontuacao.pontos;
    } else if(hora.status.descricao == 'Aprovado') {
      this.pontosApr += hora.pontuacao.pontos;
    }
  }
}


class LinhaTabela {
  data: string;
  atividade: AtividadeJson;
  hora: HorasComplementaresJson;
  pontos: number;
  
  constructor() {
    this.data = '18/02/2022';
    this.atividade = new AtividadeJson;
    this.hora = new HorasComplementaresJson;
    this.pontos = 0;
  }

  setData() {
    this.data = DateUtil.formatDateToString(new Date(this.hora.data));
  }

  setPontos() {
    if(this.hora.statusId == 2) {
      this.pontos = 0;
    } else {
      this.pontos = this.hora.pontuacao.pontos;
    }
  }
}