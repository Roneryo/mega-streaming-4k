var divtabla=document.getElementById('cuadro')
var i = 1;
var botonenviar=document.getElementById('btnagregar')
var botoneditar=document.getElementById('btneditar')
botoneditar.disabled=true;
var infoForm={};
function procesar() {
var tipo=document.getElementById('txttipo').value
var pantallas=document.getElementById('txtpantallas').value
var precio=document.getElementById('txtprecio').value
if(pantallas ==""|| precio ==""){
    alert("Debe ingresar la informacion en todos los campos")
}else{
    var precio_f=parseFloat(pantallas)*parseFloat(precio);
 alert(precio_f)

    infoForm["id"]=i++;
    infoForm["tipo de pantalla"]=tipo;
    infoForm["cantidad de pantallas"]=pantallas;
    infoForm["precio"]=precio;
    infoForm["total"]=precio_f;

var tabla=document.getElementById("mitabla");
var nuevaFila=tabla.insertRow(tabla.lenght);

cell1=nuevaFila.insertCell(0);
cell1.innerHTML=infoForm.id;

cell2=nuevaFila.insertCell(1);
cell2.innerHTML=infoForm.tipo;

cell3=nuevaFila.insertCell(2);
cell3.innerHTML=infoForm.pantallas;

cell4=nuevaFila.insertCell(3);
cell4.innerHTML=infoForm.precio;

cell4=nuevaFila.insertCell(4);
cell4.innerHTML=infoForm.precio_f;

cell4=nuevaFila.insertCell(5);
cell4.innerHTML= `<a class="btn btn-warning mx-5" onClick="onEdit(this)"> Edit </a>
<a class="btn btn-danger" onclick="onDelete (this)"> Delete </a>`;

document.getElementById("miForm").reset();
divtabla.style.display=''; 

}
}
function onEdit(td){
    botoneditar.disabled=false;
    botonenviar.disabled=true;
    selectedRow=td.parentElement.parentElement;
    document.getElementById("txttipo").value=selectedRow.cells[1].innerHTML;
    document.getElementById("txtpantallas").value=selectedRow.cells[2].innerHTML;
    document.getElementById("txtprecio").value=selectedRow.cells[3].innerHTML;
}

 function actualizarfila() {
    
    tipo=document.getElementById('txttipo').value
    pantallas=document.getElementById('txtpantallas').value
    precio=document.getElementById('txtprecio').value
    if(pantallas=""|| precio ==""){
        alert("Debe ingresar la informacion en todos los campos")
    }else{
        var precio_f=parseFloat(pantallas)*parseFloat(precio);
        alert(precio_f)
       
           infoForm["id"]=i++;
           infoForm["tipo de pantalla"]=tipo;
           infoForm["cantidad de pantallas"]=pantallas;
           infoForm["precio"]=precio;
           infoForm["total"]=precio_f;
       
        selectedRow.cells[1].innerHTML=infoForm.tipo;
        selectedRow.cells[2].innerHTML=infoForm.pantallas;
        selectedRow.cells[3].innerHTML=infoForm.precio;
        selectedRow.cells[4].innerHTML=infoForm.precio_f;
        
        botoneditar.disabled=true;
        botonenviar.disabled=false;
        alert("Fila editada exitosamente");
        document.getElementById("miForm").reset();

    }
}

function onDelete(td){
    if (confirm('¿Estas seguro de esto?si lo borras perderas la informacion?')){
         row=td.parentElement.parentElement;
         document.getElementById("mitabla").deleteRow(row.rowIndex);

         var num=document.getElementById( 'mitabla').rows.length;

        if(num ==1){
             divtabla.style.display='none';
        }

    }
}