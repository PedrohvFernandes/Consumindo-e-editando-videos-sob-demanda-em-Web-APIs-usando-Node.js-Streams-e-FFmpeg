# config/flags do ffmpeg para editar o video, formato do video, tamanho do video, etc
# -movflags frag_keyframe+empty_moov+default_base_moof picota o video em pedaços/mp4 fragmentado
ffmpeg \
  -i ./video.mp4 \
  -vcodec h264 \
  -acodec aac \
  -movflags frag_keyframe+empty_moov+default_base_moof \
  # Velocidade do video para o cliente
  -b:v 1500k \
  # Velocidade do audio para o cliente
  -maxrate 1500k \
  # Tamanho do buffer, dos pedacinhos que a gente vai usar para montar o video
  -bufsize 1000k \
  -f mp4 \
  video-ready.mp4