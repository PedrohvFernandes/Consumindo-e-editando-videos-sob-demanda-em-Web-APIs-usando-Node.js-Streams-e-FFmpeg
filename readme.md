# Consumindo e editando videos sob demanda em Web APIs usando Node.js Streams e FFmpeg

## O que é Node.js Streams:

Um fluxo de nó é um método de transferência de grandes quantidades de dados em dispositivos móveis ou sites, dividindo o arquivo ou os dados em partes gerenciáveis.

## Do que o projeto aborda:

O projeto em si tem um lado de editar videos com a lib FFmpeg feita em c++, mas essa não é o foco principal, o foco principal é como usar o Node.js Streams para consumir e editar videos sob demanda em Web APIs. Utilizando o máximo do JS, evitando colocar uma lista em memoria ou baixar um tanto de dados para depois executar tudo de uma vez. O Node.js Streams é uma API poderosa para isso, pois nos iremos consumir pouco a pouco de dados, ou seja recortar o video em pedacinhos menores sob demanda, conforme a gente pede, e ir processando esses dados/videos aos poucos e somente depois de processar aquela parte, a gente da continuidade fazendo o mesmo processo e ir liberando aquela parte pro usuario. Na Netflix é um pouco diferente, eles processam tudo, recortando o video em pedacinhos e vai entregando esses pedacinhos conforme vai sendo chamando. E o FFmpeg é uma ferramenta poderosa para editar videos. Caso quisesse fazer isso do lado do front-end, em processar dados gigantescos tenho um exemplo aqui [performance-multithreading-em-navegadores-ECMAScript-Modules-em-Web-Workers](https://github.com/PedrohvFernandes/performance-multithreading-em-navegadores-ECMAScript-Modules-em-Web-Workers).


## Como rodar o projeto:

- Back-end ```npm run start``` ou ```npm start```
- Front-end ```npm run web```
- FFmpeg: Para comprimir o video de acordo com as suas configs em assets/prepare.sh, basta entrar na pasta a onde esta o arquivo e executar o comando ```bash prepare.sh``` isso para Linux e Mac, para Windows teria que refazer os comandos para o Win em .bat e executa-lo. Caso não queria executar ou refazer os comandos, ja temos o video comprimido de exemplo para testar a aplicação em assets/video-ready.mp4.

## Tecnologias principais usadas no back-end:

- Node stream API
- [FFmpeg binary](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiF2Nfnr7P9AhVQq5UCHdW1BPgQFnoECBMQAQ&url=https%3A%2F%2Fffmpeg.org%2F&usg=AOvVaw19lCX0sMAnAOlyM2Pvp5-v)
 - [FFmpeg Download](https://ffmpeg.org/download.html)
  - [FFmpeg Download](https://www.gyan.dev/ffmpeg/builds/#release-builds)
- Alternativa de fazer os comandos na mão:
  - [FFmpeg NPM](https://www.npmjs.com/package/ffmpeg)
  - [FFmpeg NPM](https://www.npmjs.com/package/fluent-ffmpeg)

## Sub Tecnologias usadas na web:

- http-server (para rodar o front-end)

## Referencia:

- [How To Process Video With FFmpeg and NodeJs](https://betterprogramming.pub/how-to-process-video-with-ffmpeg-and-nodejs-940a8e510791)
- [Erick Wendel](https://www.youtube.com/watch?v=RixFzeltO68)
- [O que é node stream](https://www.google.com/search?client=opera&q=node+stream&sourceid=opera&ie=UTF-8&oe=UTF-8)
  - [Node.js Streams](https://nodejs.org/api/stream.html)
  - [Streams API para WEB](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [Como instalar e utilizar o FFmpeg no Windows](https://www.youtube.com/watch?v=Q267RF1I3GE&t=162s)

- Caso queira refazer os comandos do FFmpeg para Windows em .bat:
  - [How to batch convert/multiplex any files with ffmpeg](https://forum.videohelp.com/threads/356314-How-to-batch-convert-multiplex-any-files-with-ffmpeg)
  - [ffmpeg Bat Collection](https://l0lock.github.io/FFmpeg-bat-collection/)

- Ou executar com o bash no Windows:
  - [https://clmgf.be/pt/como-executar-arquivos-sh-no-windows/](https://clmgf.be/pt/como-executar-arquivos-sh-no-windows/)
  - [Tem alguma maneira de rodar o script bash no windows?](https://pt.stackoverflow.com/questions/469435/tem-alguma-maneira-de-rodar-o-script-bash-no-windows)

- Caso de erro:
  - [error-spawn-ffmpeg-enoent](https://stackoverflow.com/questions/37678703/error-spawn-ffmpeg-enoent)
