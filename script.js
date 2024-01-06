const containerVideos = document.querySelector('.videos__container');

async function buscarEmostrarVideos(){
  try{
    const busca = await fetch('http://localhost:3000/videos')
    const videos = await busca.json()

    videos.forEach((video)=>{
      if(video.categoria == ""){
        throw new Error("Vídeo sem categoria ")
      }
      containerVideos.innerHTML += `
      <li class="videos__item">
        <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
        <div class="descricao-video">
          <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
          <h3 class="titulo-video">${video.titulo}</h3>
          <p class="titulo-canal">${video.descricao}</p>
          <p class="categoria" hidden>${video.categoria}</p>
        </div>
      </li>
      `
    })
  }catch(error){
    containerVideos.innerHTML = `
      <p> Houve um erro ao carregar os videos: ${error} </p>
    `
  }
}
buscarEmostrarVideos()


const barraPesquisa = document.querySelector('.pesquisar__input')
barraPesquisa.addEventListener('input', filtrarPesquisa)

function filtrarPesquisa() {
  const videos = document.querySelectorAll('.videos__item')
  if(barraPesquisa.value != ''){
    for(let video of videos){
      let titulo = video.querySelector('.titulo-video').textContent.toLowerCase()
      let filtro = barraPesquisa.value.toLowerCase()

      if(!titulo.includes(filtro)){
        video.style.display = 'none'
      }
      else{
        video.style.display = 'block'
      }
    }
  }else{
    videos.style.display = 'block'
  }
}


const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
      let categoria = video.querySelector('.categoria').textContent.toLowerCase()
      let valorFiltro = filtro.toLowerCase()
      if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
        video.style.display = 'none'
      }else{
        video.style.display = 'block'
      }
    }
}

