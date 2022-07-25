export function footer(){
    let content=`
    <div class="container">
      <div class="row">
        <div class="col-xs-6 col-md-6 text-left">
          <h6 class="text-white">CONTACTO:</h6>
          <h6 class="text-white">
            Colombia<br>
            Barranquilla<br>
            Teléfonos: 3213859698 – 3112641818.<br>
            zhavierjvm@gmail.com <br>
            angelirodriguez@gmail.com <br>
          </h6>
        </div>
        <div class="col-5 col-md-5 col-sm-5  col-xs-5 text-right position-relative bottom">
          <p class="text-white small">Angeline Rodriguez <br> Zhavier José Vega<br> Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
    </div>
    `
    let element = document.querySelector('footer');
    element.innerHTML=content;
}