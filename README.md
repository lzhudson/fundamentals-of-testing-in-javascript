# Fundamentos de Teste em JavaScript

## 01  - Escrevendo um simples teste em JavaScript
Teste em javascript se baseiam em expectativa e resultado, ou seja temos um determinado trecho de código que executa e gera um resultado, os testes obviamente esperam que esse resultado seja avaliado de acordo com que nós desenvolvedores esperamos.

Abaixo segue um exemplos simples:
```javascript
const sum = (a, b) => a - b;
let result = sum(3, 7);
let expected = 10;
if(result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```

O código acima possui uma função chamada **sum** que realiza uma soma entre dois números, a mesma retorna um resultado, em seguida temos atribuido a variável **result** o resultado da função **sum**, logo após isso temos a variável **expected** que armazena o valor do que esperamos a partir da execução daquele código.

Ou seja simplesmente criamos uma condição onde comparamos se os valores são diferentes, caso sejam temos um erro em tela.

Código final:
```javascript
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

let result = sum(3, 7);
let expected = 10;

if(result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

result = subtract(7, 3);
expected = 4;

if(result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```
## 02 - Aprendendo a construir uma biblioteca de Asserção com Javascript
Na aula anterior verificamos se um resultado é igual ao esperado a partir de uma condição **if**, caso não seja disparamos um erro dentro do JavaScript, porém podemos notar que temos uma repetição de código ao tentarmos testar duas funções ou até mesmo dois resultados da mesma função, para isso criamos uma simples (mais bem simples mesmo hahahaha), uma biblioteca que testa o nosso código.

```javascript
const { sum, subtract } = require('./math');

let result, expected;

result = sum(3, 7);
expected = 10;
expect(result).toBe(expected);

result = subtract(7, 3);
expected = 4;
expect(result).toBe(expected);

function expect(actual) {
  return {
    toBe(expected) {
      if(actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected){},
    toBeGreatherThan(expected){}
  }
}
```

Repare que remove os if's e também retiramos as funções e colocamos em um arquivo chamado ```math.js```, a função **expect**, recebe um parâmetro chamado **actual**, que é o valor atual do código que queremos testar, em seguida retorna um objeto com diversas funções, porém usaremos a **toBe**, que é uma função que compara o valor atual(**actual**) com o valor esperado(**expected**) que é valor que recebemos por parâmetro, caso o valor seja diferente temos um erro em tela.

## 04 - Aprendendo como criar uma biblioteca de testes com JavaScript
Nessa aula temos o seguinte a construção e aprimoramento do código da aula passada onde construimos uma lib bem simples de teste. Dessa vez abstraimos algumas partes do nosso código e delegamos algumas funcionalidades.

```javascript
const { sum, subtract } = require('./math');

function sumTest() {
  const result = sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
}

test('sum adds numbers', sumTest);

function subtractTest() {
  const result = subtract(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
}

test('subtract subtracts numbers', subtractTest);


function test(title, callback) {
  try {
    callback();
    console.log(`✔ ${title}`);
  } catch(error) {
    console.log(`✗ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if(actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected){},
    toBeGreatherThan(expected){}
  }
}
```

No código acima criamos a função **test**, onde a mesma recebe um **title** e um **callback**, o title representa a descrição do código que queremos testar ou seja o que aquele código está fazendo, o **callback**, representa o código em si, dentro da função temos um bloco **try catch**, o mesmo é responsável por delegar se a função ocorreu bem, caso não ele mostra qual erro temos a partir do bloco **catch**. Criamos a função **sumTest** e **subtractTest**, abstraindo o código do nosso escopo e depois chamamos as mesmas a partir da função **test**, para que elas sejam executadas e testadas.

## 04 - Aprendendo a dar suporte em testes assíncronos com JavaScript e Promises
No JavaScript também temos códigos que são síncronos e assíncronos, nesse caso nossa biblioteca por padrão só suporta o teste de códigos assíncronos, porém no dia a dia temos em nossas aplicações algumas chamadas assíncronas, pois uma requisição a uma API terceira, inserção ao banco de dados e etc, são coisas que demoram e de certa forma precisamos testa-las caso sejam essenciais dentro de nossa aplicação.

```javascript
const { sumAsync, subtractAsync } = require('./math');

async function sumTest() {
  const result = await sumAsync(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
}

test('sum adds numbers', sumTest);

async function subtractTest() {
  const result = await subtractAsync(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
}

test('subtract subtracts numbers', subtractTest);


async function test(title, callback) {
  try {
    await callback();
    console.log(`✔ ${title}`);
  } catch(error) {
    console.log(`✗ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if(actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected){},
    toBeGreatherThan(expected){}
  }
}
```

No código acima importamos a função **sumAsync** e **subtractAsync**, onde as mesmas são Promises que retornam um código assíncrono onde precisamos resolvar os mesmos. Note que mudamos dentro da função **test** tornamos a função assíncrona e adicionamos o **await** na função de **callback**, isso faz com que o nosso código espere a execução dessa função para em seguida avaliar o bloco **try catch**.

## 05 - Aprendendo a fonrnerncer as funções auxiliares como globais em nossa aplicação.
Agora vamos imaginar um cenário, onde temos diversas funções em nosso código a serem testadas, então seria necessário criar ou importar o arquivo que contém as funções **test** e **expect** em diversos arquivos para serem usados. Mas nesse caso criaremos um arquivo chamado 
``global.js`` que contarám com essas auxiliares e que poderemos usar em todos os nossos códigos com um simples comando.

```global.js```
```javascript
async function test(title, callback) {
  try {
    await callback();
    console.log(`✔ ${title}`);
  } catch(error) {
    console.log(`✗ ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if(actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toEqual(expected){},
    toBeGreatherThan(expected){}
  }
}

global.test = test;
global.expect = expect;
```

```javascript
const { sumAsync, subtractAsync } = require('./math');

async function sumTest() {
  const result = await sumAsync(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
}

test('sum adds numbers', sumTest);

async function subtractTest() {
  const result = await subtractAsync(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
}

test('subtract subtracts numbers', subtractTest);
```

Ao rodarmos o comando:
```bash
node --require ./setup-global.js global.js
```

Ele executará nosso código atribuindo globalmente as funções **test** e **expecte** para o arquivo ```global.js``` que consequentemente usa as mesmas porém não é necessário importamos ou até mesmo escreve-las dentro do arquivo para que possamos usar.