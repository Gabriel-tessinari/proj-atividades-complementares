import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoJson } from 'src/app/shared/json/aluno.json';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';

@Component({
  selector: 'app-certificados-aluno',
  templateUrl: './certificados-aluno.component.html',
  styleUrls: ['./certificados-aluno.component.scss']
})
export class CertificadosAlunoComponent implements OnInit {
  aluno: AlunoJson;

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
    this.loadAluno();
  }

  loadAluno() {   
    this.testeArqService.getAlunoById(this.aluno.id)
    .subscribe(
      response => {
        this.aluno = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
