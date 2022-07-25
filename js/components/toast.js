export function toast(){
  let ruta = document.location.pathname.split('/').find(html=>html==="index.html");
  let path = "../img/";
  if(ruta==="index.html"){
    path="img/"
  }  
    let content=`
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="${path}/favicon/favicon-16x16.png" class="rounded me-2" alt="...">
        <strong class="me-auto">MEGA 4K STREAMING</strong>
        <small>Ahora mismo</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
      </div>
    </div>
  </div>
    `
    let element = document.querySelector('#toast');
    element.innerHTML=content;
}