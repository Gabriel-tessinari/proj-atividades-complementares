import { Component, OnInit } from '@angular/core';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { AreaJson } from 'src/app/shared/json/area.json';
import { CursoJson } from 'src/app/shared/json/curso.json';
import { GrupoAtividadesJson } from 'src/app/shared/json/grupo-atividades.json';
import { AtividadeJson } from 'src/app/shared/json/atividade.json';
import { PontuacaoJson } from 'src/app/shared/json/pontuacao.json';

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
  tabela: Array<AtividadeTabela>;
  pontuacoes: Array<PontuacaoJson>;
  alertas: Alertas;

  constructor(
    private testeArqService: TesteArqService
  ) { }

  ngOnInit(): void {
    this.grupoAtividades = [];
    this.cursos = [];
    this.areas = [];
    this.atividades = [];
    this.tabela = [];
    this.pontuacoes = [];
    this.idAreaSelecionada = 0;
    this.idCursoSelecionado = 0;
    this.inputCursoSelecionado = '';
    this.desabilitaButton = true;
    this.cursoSelecionado = new CursoJson;
    this.alertas = new Alertas();
    this.loadAreas();
  }

  loadAreas() {   
    this.testeArqService.getAreas()
    .subscribe(
      response => {
        this.areas = response;
        this.loadGrupoAtividades();
        this.loadAtividades();
      },
      error => {
        console.log(error);
        this.alertas.loadAreaError = true;
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
        this.alertas.loadCursosError = true;
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
    this.setTabela();
  }

  loadGrupoAtividades() {
    this.testeArqService.getGruposAtividades()
    .subscribe(
      response => {
        this.grupoAtividades = response;
      },
      error => {
        console.log(error);
        this.alertas.loadGrupoError = true;
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
        this.alertas.loadAtividadeError = true;
      }
    );
  }

  loadPontuacoes() {
    this.testeArqService.getPontuacoes()
    .subscribe(
      response => {
        this.pontuacoes = response;
        this.setTabelaPontuacoes();
      },
      error => {  
        console.log(error);
        this.alertas.loadPontuacoesError = true;
      }
    );

    this.setTabelaPontuacoes();
  }

  setTabela() {
    this.tabela = [];

    this.grupoAtividades.forEach(grupo => {
      let itemTabela: AtividadeTabela = new AtividadeTabela;
      itemTabela.grupo = grupo;
      this.tabela.push(itemTabela);
    });

    this.atividades.forEach(atividade => {
      for(let i = 0; i < this.tabela.length; i++) {
        if(atividade.grupoAtividadesId == this.tabela[i].grupo.id) {
          let atv: Atividade = new Atividade;
          atv.atividade = atividade;
          this.tabela[i].atividades.push(atv);
          i = this.tabela.length;
        }
      }
    });

    this.loadPontuacoes();
  }

  setTabelaPontuacoes() {
    let isInList: boolean;
    this.tabela.forEach(item => {
      item.atividades.forEach(atv => {
        isInList = false;

        for(let i = 0; i < this.pontuacoes.length; i++) {
          if(this.pontuacoes[i].cursoId == this.cursoSelecionado.id &&
            this.pontuacoes[i].atividadeId == atv.atividade.id) {
            atv.pontuacao = this.pontuacoes[i];
            isInList = true;
            i = this.pontuacoes.length;
          }
        }

        if(!isInList) {
          let pontuacao: PontuacaoJson = new PontuacaoJson;
          pontuacao.pontos = 0;
          pontuacao.numeroMaximo = 0;
          pontuacao.atividadeId = atv.atividade.id;
          pontuacao.cursoId = this.cursoSelecionado.id;
          atv.pontuacao = pontuacao;
        }
      });
    });
  }

  save() {
    let erros: number = 0;

    this.tabela.forEach(item => {
      item.atividades.forEach(atv => {
        this.testeArqService.saveOrUpdatePontuacao(atv.pontuacao)
        .subscribe(
          () => {
            console.log('Sucesso ao salvar ou atualizar:');
            console.log(atv.pontuacao);
          },
          error => {  
            console.log(error);
            erros++;
          }
        );
      });
    });

    if(erros == 0) {
      this.alertas.savePontuacoesSuccess = true;
      this.alertSuccessTimer();
    } else {
      this.alertas.savePontuacoesError = true;
    }
  }

  alertSuccessTimer() {
    setTimeout(() => {
      this.alertas.savePontuacoesSuccess = false;
    }, 3500);
  }
}


class AtividadeTabela {
  grupo: GrupoAtividadesJson;
  atividades: Array<Atividade>;

  constructor() {
    this.grupo = new GrupoAtividadesJson;
    this.atividades = [];
  }
}


class Atividade {
  atividade: AtividadeJson;
  pontuacao: PontuacaoJson;

  constructor() {
    this.atividade = new AtividadeJson;
    this.pontuacao = new PontuacaoJson;
  }
}


class Alertas {
  loadAreaError: boolean;
  loadGrupoError: boolean;
  loadAtividadeError: boolean;
  loadCursosError: boolean;
  loadPontuacoesError: boolean;
  savePontuacoesError: boolean;

  savePontuacoesSuccess: boolean;
 
  loadAreaErrorMensagem: string;
  loadGrupoErrorMensagem: string;
  loadAtividadeErrorMensagem: string;
  loadCursosErrorMensagem: string;
  loadPontuacoesErrorMensagem: string;
  savePontuacoesErrorMensagem: string;

  savePontuacoesSuccessMensagem: string;

  constructor() {
    this.loadAreaError = false;
    this.loadGrupoError = false;
    this.loadAtividadeError = false;
    this.loadCursosError = false;
    this.loadPontuacoesError = false;
    this.savePontuacoesError = false;
    this.loadAreaErrorMensagem = 'Erro ao carregar a lista de áreas. Tente novamente.';
    this.loadGrupoErrorMensagem = 'Erro ao carregar a lista de grupos de atividades. Tente novamente.';
    this.loadAtividadeErrorMensagem = 'Erro ao carregar a lista de atividades. Tente novamente.';
    this.loadCursosErrorMensagem = 'Erro ao carregar os cursos da área selecionada. Tente novamente.';
    this.loadPontuacoesErrorMensagem = 'Erro ao carregar as pontuações do curso selecionado. Tente novamente.';
    this.savePontuacoesErrorMensagem = 'Erro ao salvar as pontuações. Tente novamente.';

    this.savePontuacoesSuccess = false;
    this.savePontuacoesSuccessMensagem = 'Pontuações salvas com sucesso.';
  }
}