##App para criar e apagar cursos.

Instale dependências do servidor com o comando
### `npm install`
e rode com o comando
### `npm start`

Na pasta front, instale dependências com
### `yarn install`
e rode com o comando
### `yarn start`

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

