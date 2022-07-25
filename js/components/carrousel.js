export let carrousel=()=>{
    let ruta = document.location.pathname.split('/').find(html=>html==="index.html");
    let path = "../img/";
    if(ruta==="index.html"){
      path="img/"
    }  
    let content=`
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${path}megast.png" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item ">
        <img src="${path}encaspotify.png" class="d-block w-100" alt="spotifyimage">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
  let element = document.querySelector('#carrousel');
  element.innerHTML=content;
}