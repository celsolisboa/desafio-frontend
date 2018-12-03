# Desafio Celso Lisboa para FrontEnd

### App para criar e apagar cursos.

- Instale dependências do servidor com o comando `npm install`
- e rode com o comando `npm start`

- Na pasta front, instale dependências com `yarn install`
- e rode com o comando `yarn start`

Se tudo der certo, você deve ver a página de login.

Atualmente o front está usando a porta 8000, isso pode ser mudado no package.json.

Observações: Para ser capaz de apagar cursos (ou seja, utilizar o método DELETE),
tive de modificar o server.js adicionando esta linha:

### `res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")`

Este aplicativo utiliza Material Design, CSS Flex, CSS Grid, mobile-first & media queries.

To Do:
- Determinar duração mínima de um curso (atualmente você pode ter um curso de 1 minuto);
- Impedir cursos de utilizar a mesma sala ao mesmo tempo.
- Impedir professores de dar mais de uma aula ao mesmo tempo.

Limitações a serem corrigidas:
- O método utilizado para validação (react-material-ui-form-validator) não aceita selects
do tipo 'multiple'. Consertei isso parcialmente, aceitando uma array no state e mostrando os itens selecionados no campo. Porém a navegação por teclado e a experiência do usuário poderiam ser melhoradas, possivelmente utilizando outro método para a validação.

### Cenário

**Como** Coordenador Acadêmico de uma Instituição de Ensino  
**Eu preciso** realizar a gestão dos cursos oferecidos pela Instituição, com seus respectivos professores, salas e horários  
**Para** que o setor de Marketing possa vender os cursos online.

### Segue instruções para realizar o desafio

1. Faça um fork deste repositório.
2. Utilize o comando `npm start` para instanciar a API.
3. Baseado nas imagens `layouts/mobile_login.png` e `layouts/desktop_login.png`, crie a tela de login da aplicação. 
    * A autenticação é feita através de uma requisição `POST` para o endpoint `http://localhost:3000/api/user/login`.
    * Você pode testar a autenticação com os seguintes usuários: 
    ```
    [{
       'email': 'john@gmail.com',
       'password': 'passwd'
     },
     {
       'email': 'bill@gmail.com',
       'password': 'test123'
    }]
    ```
    * Os campos devem ser validados e falhas na autenticação devem ser tratadas, em ambos os casos com feedback para o usuário.
3. Baseado nas imagens `layouts/mobile_cursos.png` e `layouts/desktop_cursos.png`, crie a tela de visualização e deleção de cursos. 
    * Você pode conseguir o objeto de cursos através de uma requisição `GET` para o endpoint `http://localhost:3000/api/curso`.
    * Você pode deletar um curso através de uma requisição `DELETE` para o endpoint `http://localhost:3000/api/curso/:id`.
   
4. Baseado nas imagens `layouts/mobile_criar_curso.png` e `layouts/desktop_criar_curso.png`, crie a tela de criação e alteração de cursos.
    * Os campos de Professor e Sala deverão ser um multi-select.
    * Você pode pegar a lista de professores através de uma requisição `GET` para o endpoint `http://localhost:3000/api/professor`
    * Você pode pegar a lista de salas através de uma requisição `GET` para o endpoint `http://localhost:3000/api/sala`
    * Para a criação considere:    
        * Você pode salvar o curso através de uma requisição  `POST` para o endpoint `http://localhost:3000/api/curso`
    * Para a alteração considere:
        * Você pode salvar a alteração do curso através de uma requisição  `PATCH` para o endpoint `http://localhost:3000/api/curso/:id`
6. Você tem acesso a todos os assets utilizados nos layouts no diretório `/assets`
5. Realize um Pull Request para este repositório.


### O que será avaliado 

1. Fidelidade às instruções e ao cenário.
2. Fidelidade com o layout.
3. Clean Code e boas práticas.
4. Boas práticas de versionamento.
