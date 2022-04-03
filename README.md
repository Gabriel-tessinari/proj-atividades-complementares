# proj-atividades-complementares

Projeto da disciplina de Laboratório de Engenharia de Software 2022/1.

### Instruções de uso para o grupo:
1. Clonar repositório no pc: `git clone https://github.com/Gabriel-tessinari/proj-atividades-complementares.git`;
2. Dentro do repositório, usar comando `npm install`;
3. Teste se tudo deu certo subindo o programa com o `npm start`. E no navegador, acesse http://localhost:4200;
4. Com o projeto já instalado na máquina, pode-se pular os passos anteriores;
5. O passo 3 é necessário para testar e visualizar as mudanças que for fazendo.

### Instruções para começar a fazer sua parte:
1. Atualize a branch **main** local com o `git pull`;
2. Crie então uma nova branch com `git checkout -b <NOME DA BRANCH>`;
	2.1. **Exemplo:** git checkout -b *tela-atividades*;
3. Feitas as alterações necessárias, utilize os comandos `git add .` e depois `git commit -m "<DESCRIÇÃO BREVE DA ALTERAÇÃO>"`;
	3.1. **Exemplo:** git commit -m "Adicionando página de atividades";
4. Enviar para o repositório no github com `git push`.

### Rodando o programa:
1. Com o BACKEND e o banco de pé, usar o comando `npm start`. As chamadas serão feitas ao endpoint em src/environments/environment.ts;
2. Enquanto apenas desenvolvendo, usar comando `npm start mock`. As chamadas serão direcionadas para os services com resultados aleatórios em src/app/shared/mock.