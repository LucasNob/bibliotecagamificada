const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:40073';

const PROXY_CONFIG = [
  { context: ["/v1/classificacao",], target: target, secure: false },
  { context: ["/v1/turma",], target: target, secure: false },
  { context: ["/v1/instituicao",], target: target, secure: false },
  { context: ["/v1/livro",], target: target, secure: false },
  { context: ["/v1/aluno",],target: target,secure: false}
]

module.exports = PROXY_CONFIG;
