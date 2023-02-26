// Node js puro sem framework, ou seja, sem express, fastify, etc
// Node:lib é para diferenciar de um pacote externo instalado via npm de nativas do proprio node
import { createServer } from 'node:http'

import { createReadStream } from 'node:fs'
import { spawn } from 'node:child_process'

// Cria um servidor http
createServer(async (req, res) => {
  // CORS puro
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  // A gente fala pro cliente que vamos mandar o conteudo do tipo mp4
  res.writeHead(200, {
    'Content-type': 'video/mp4'
  })

  // Aqui basicamente eu vou pegar o video e vou editar ele, e vou mandar pra quem chamou, mesma coisa no prepare.sh, so que nesse caso via node com o streams. Poderia passar via comando shell em vez do spawn
  const ffmpegProcess = spawn(
    'ffmpeg',
    [
      '-i',
      'pipe:0',
      '-f',
      'mp4',
      '-vcodec',
      'h264',
      '-acodec',
      'aac',
      '-movflags',
      'frag_keyframe+empty_moov+default_base_moof',
      '-b:v',
      '1500k',
      '-maxrate',
      '1500k',
      '-bufsize',
      '1000k',
      '-f',
      'mp4',
      '-vf',
      "monochrome,drawtext=text='xuxadasilva@gmail.com':x=10:y=H-th-10:fontsize=50:fontcolor=yellow:shadowcolor=black:shadowx=5:shadowy=5",
      'pipe:1'
    ],
    {
      // 0, 1 e 2 são os canais de entrada e saida do ffmpeg, 0 é o stdin entrada, 1 é o stdout saida e 2 é o stderr erro
      stdio: ['pipe', 'pipe', 'pipe']
    }
  )
  // A medida que eu leio o arquivo, eu vou mandar pra quem chamou, fazendo processamento sobre demanda
  // Em vez de mandar direto o response com o pipe, eu mando pro ffmpegProcess, que vai editar o video e mandar o response com o pipe '-' ou 'pipe:0' isso ja diz que é uma streams, ou seja um objeto vindo a partir de um pipe e o pipe:1 é o output
  // .pipe(ffmpegProcess.stdin) entrada do nosso objeto. A medida que estou lendo esse arquivo ja estou passando pra ele
  createReadStream('./assets/video-ready.mp4').pipe(ffmpegProcess.stdin)

  // Aqui eu retorno
  ffmpegProcess.stderr.on('data', msg => console.log(msg.toString()))
  ffmpegProcess.stdout.pipe(res)
  
  // Caso o cliente desconecte ou quando termine o video, eu disconecto os canais de comunicação e vou matar o processo do ffmpeg. Com isso a gente garante que não tenha nenhuma memoria perdida no nosso servidor. Isso a gente pode fazer com py, php etc dentro do node com o spawn
  req.once('close', () => {
    ffmpegProcess.stdout.destroy()
    ffmpegProcess.stdin.destroy()
    console.log('disconnected!', ffmpegProcess.kill())
  })

}).listen(3000, () => console.log('Server is running on port 3000'))
