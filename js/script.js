const privateKey = '3da5108fcffe42e52fd4a86d63f61cfb0074c47a',
      publicKey  = '077af09c8bf8503d3b9865be5d7f8aec',
      content = document.getElementById('content');
      search = document.getElementById('search');

const getConection = () => {
  const ts = Date.now(),
        hash = md5(ts + privateKey + publicKey),
        URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      response.data.results.forEach(e => { // Recorro todos los elementos del array resultados
        drawHero(e); // Proceso los resultados con la funcion drawHero
      });
    })
    .catch(e => console.log(e)); // Solo muestra por consola algún error
};

// Crea elementos HTML para organizar info de objeto y darles estilos
const drawHero = e => {
  const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`; // Trae la imagen
  const hero = `
    <div class="hero ed-item l-1-3">
      <h3>${e.name}</h3>
      <div class="hero-img">
        <img class="thumbnail" src="${image}">
        <p class="description">${e.description}</p>
      </div>
    </div>
  `;
  content.insertAdjacentHTML('beforeEnd', hero) // Agrega elemento HTML en una parte especifica
};

const searchHero = name => {
  const ts = Date.now(),
        hash = md5(ts + privateKey + publicKey),
        hero = encodeURIComponent(name),
        URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      response.data.results.forEach(e => {
        drawHero(e);
      });
  })
  .catch(e => console.log(e));
};

search.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    content.innerHTML = '';
    searchHero(e.target.value.trim());
  }
});
getConection();