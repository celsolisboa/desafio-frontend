# Desafio Celso Lisboa para FrontEnd

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
