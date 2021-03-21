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
