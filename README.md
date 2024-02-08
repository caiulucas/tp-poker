# TP de Redes - Backend

Este é um projeto desenvolvido em Typescript usando o `pnpm` como package manager. Caso queira, é possível rodá-lo usando o `npm` também.

## Como rodar
Após baixar e instalar o `pnpm` ou o `npm`  execute o seguinte código no diretório do projeto:
```
pnpm i
```
ou
```
npm i
```

Isto irá baixar as dependências de bibliotecas usadas no código.

Para executá-lo, basta rodar:
```
pnpm dev
```
ou
```
npm run dev
```
O servidor será iniciado no `localhost`, na porta `8080`.

## Building

Caso deseje, também é possível rodar uma `build` do projeto executando:
```
pnpm build
```
ou
```
npm run build
```
A pasta build será gerada e após isso, será possível executar o servidor usando o próprio node:
```
node build/server.js
```

## Testes
O código também conta com testes feitos usando o `vitest` e se encontram no diretório `tests`.
Para rodá-los, execute o comando:
```
pnpm test
```
ou
```
npm run test
```
