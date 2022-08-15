export function header() {
  let ruta = document.location.pathname
    .split("/")
    .find((html) => html === "index.html");
  let path = "./";
  if (ruta === "index.html") {
    path = "./html/";
  }

  let content = `
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/index.html">MEGA</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="${path}formcontacto.html">Contactenos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${path}totalapagar.html">Facturar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="logOut" href="${path}ogin.html">Salir</a>
        </li>
        <li class="nav-item"  >
          <a class="nav-link" 
          data-bs-toggle="tooltip" data-bs-placement="bottom"
          data-bs-custom-class="custom-tooltip"
          data-bs-title="¡Tienes 0 Productos actualmente!"
            >🛒</a>
        </li>
        <li class="nav-item">
          <a id="user" class="nav-link"></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;
  let element = document.querySelector("header");
  element.innerHTML = content;
}
// header();
