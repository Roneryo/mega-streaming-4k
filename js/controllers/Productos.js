import { miStorage } from './Storage.js';
export class Products extends miStorage {
    misproductos = [];
    constructor() {
        super(Products.name)
        if (!this.exists()) {
            fetch("/js/productos.json")
                .then(jsonProductos => jsonProductos.json())
                .then(productos => {
                    this.crearProductos(productos);
                    if (this.create(this.misproductos)) {
                        this.misproductos = productos;
                        console.log(true)
                    }
                    this.mostrarProductos();
                })

        } else {
            this.mostrarProductos();
        }
    }
    crearProductos(productos) {
        let listajSON = Object.entries(productos);
        listajSON.forEach(caracteristicasProducto => {
            let [nombre, producto] = caracteristicasProducto;
            for (let i = 0; i < 3; i++) {
                let precio = producto.precio * producto.tipo[i];
                console.log(precio);
                this.misproductos.push({
                    nombre,
                    tipo: `${producto.tipo[i]}P`,
                    image: `img/${nombre}.png`,
                    precio,
                })
            }
        })
    }
    mostrarProductos() {
        let cartas = document.querySelector('#my-cards');
        this.misproductos = this.getAll();
        console.log("xd", this.misproductos);
        this.misproductos[0].forEach(element => {
            cartas.innerHTML += `
            <div class="my-3 col-md-6 col-lg-3 col-sm-4 col-xs-6">
              <div class="card text-center" style="width: 15rem;">
                <img class="card-img-top" src="${element.image}" alt="Card image cap">
                <div class="card-body">
                  <h6 class="card-title">${element.nombre.toUpperCase()} ${element.tipo}</h6>
                  <a id="${element.tipo}" class="btn btn-primary ${element.nombre}" onclick=''>${element.precio}</a>
                </div>
              </div>
            </div>`
        })
        this.agregarCarrito();
    }
    agregarCarrito() {
        let netflix = document.querySelectorAll(".netflix")
        let plex = document.querySelectorAll(".plex");
        let HBO = document.querySelectorAll(".Hbo.Max");
        let Disney = document.querySelectorAll(".disney");
        let crunchyrol = document.querySelectorAll(".crunchyrol");
        let primevideo = document.querySelectorAll(".primevideo");
        netflix.forEach(element => {
            element.addEventListener("click", () => {
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                let datos = document.querySelector(".toast-body");
                datos.innerText=`Se ha agregado al carrito Netflix ${element.id}`;
                toast.show();
                console.log(element)
            });
        });
        plex.forEach(element => {
            element.addEventListener("click", () => {
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                let datos = document.querySelector(".toast-body");
                datos.innerText=`Se ha agregado al carrito Plex ${element.id}`;
                toast.show();
                console.log(element)
            });
        });
        HBO.forEach(element => {
            element.addEventListener("click", () => {
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                let datos = document.querySelector(".toast-body");
                datos.innerText=`Se ha agregado al carrito HBO ${element.id}`;
                toast.show();
                console.log(element)
            });
        });
        Disney.forEach(element => {
            element.addEventListener("click", () => {
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                let datos = document.querySelector(".toast-body");
                datos.innerText=`Se ha agregado al carrito Disney ${element.id}`;
                toast.show();
                console.log(element)
            });
        });

        crunchyrol.forEach(element => {
            element.addEventListener("click", () => {
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                let datos = document.querySelector(".toast-body");
                datos.innerText=`Se ha agregado al carrito Crunchyroll ${element.id}`;
                toast.show();
                console.log(element)
            });
        });

        primevideo.forEach(element => {
            element.addEventListener("click", () => {
                const toastLiveExample = document.getElementById('liveToast')
                const toast = new bootstrap.Toast(toastLiveExample)
                let datos = document.querySelector(".toast-body");
                datos.innerText=`Se ha agregado al carrito Prime Video ${element.id}`;
                toast.show();
                console.log(element)
            });
        });

        console.log(netflix, plex, HBO);

    }

}
