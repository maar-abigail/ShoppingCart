// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear= document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones= document.getElementById("alertValidaciones");
let alertValidacionesTexto= document.getElementById("alertValidacionesTexto");

let tablaListaCompras= document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //Sobre el elemento tabla lista de compras va a ampezar a añadir en tbody 


//Definimos las variables de la parte derecha
let contadorProductos=document.getElementById("contadorProductos");
let productosTotal= document.getElementById("productosTotal");
let precioTotal= document.getElementById("precioTotal");


let precio=0; //Definimos la variable precio
let isValid=true; //Definimos una variable para validar 
let contador=0; //Definimos un contador para la tabla;
let costoTotal=0; //Definimos la variable para el costo total
let totalEnProductos=0; //Definimos la variable para el total de productos


let datos= new Array(); //Definimos el arreglo Datos



//Limpia toda la lista de compras incluyendo los campos  
btnClear.addEventListener("click",function(event){
    event.preventDefault(); //Evita la funcionalidad por defautl del boton
    txtNombre.value=""; //Limpia el valor que se le asigno
    txtNumber.value=""; //Limpia el valor que se le asigno
    txtNombre.focus();  //Pone otra vez el cursor en la variable nombre al dar click en btn.clear
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    contador=0;
    costoTotal=0;
    totalEnProductos=0;
    contadorProductos.innerText=contador;
    productosTotal.innerText =totalEnProductos;
    precioTotal.innerText= `$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal",costoTotal);
    localStorage.removeItem("datos");
    datos= new Array ();
    cuerpoTabla.innerHTML="";
    
});

//Validar cantidad tenga un dato por ello es que se pone que length sea mayor a cero
function validarCantidad(){
    if(txtNumber.value.length==0){
        console.log("length==0");
        return false;
    }
//Valida si es un numero o no     
    if(isNaN(txtNumber.value)){
        console.log("isNaN");
        return false;
    }

//Validar que el numero sea positivo y mayor a uno
    if(Number(txtNumber.value)<=0){
        console.log("Menor que 0");
        return false;
    }    

    return true;
}
//Se crea la función dame un precio para que sea y como Math.random te da entre cero y uno lo multiplicas por el numero que quieres que te de
// y se divide y multiplica por 100 para que solo entregue 2 decimales
function getPrecio(){
    return parseInt((Math.random()*150)*100)/100
}



//Limpia el campo de agregar
btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    //Validaciones de texto, ya que si la longitud es menor a 3, aparecera 
    //la alerta 
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=true;
    txtNombre.value=txtNombre.value.trim(); //Este trim se ocupa para quitar los espacios y que solo cuente el valor del trim 
    txtNumber.value=txtNumber.value.trim();
    if(txtNombre.value.length <3){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        El <strong> Nombre </strong> no es correcto <br>`); //Este alert mostrara el texto
        alertValidaciones.style.display="block"; //Este alert mostrara el bloque de ese texto 
        txtNombre.style.border=" dashed purple 2px ";
        isValid=false;
    }
    
    //Validacion de cantidad
    if(!validarCantidad()){
        alertValidacionesTexto.insertAdjacentHTML("beforeend",`
        La <strong> Cantidad </strong> no es correcta <br>`); //Este alert mostrara el texto
        alertValidaciones.style.display="block"; //Este alert mostrara el bloque de ese texto 
        txtNumber.style.border=" dashed purple 2px"; //Le damos al borde el color solido y purple
        isValid=false;
    }
    
    //Se valida la función isValid solamente si es valido
    if(isValid){
        contador ++;
        precio=getPrecio(); //Una vez que se pasan todas las validaciones se guarda en la variable precio la variable getPrecio
        row =`<tr>
                  <td>${contador}</td>
                  <td>${txtNombre.value}</td>
                  <td>${txtNumber.value}</td>
                  <td>${precio}</td>
              </tr>
               `;
     
     //Se crea la variable elemento para integrarla al arreglo datos          
        let=elemento= `{"id": ${contador},
                     "nombre":"${txtNombre.value}",
                     "cantidad": ${txtNumber.value},
                     "precio": ${precio}
                      }`;   
                      
        datos.push(JSON.parse(elemento));
        console.log(datos);  
        localStorage.setItem("datos",JSON.stringify(datos));            
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        
        //Se le agrega el contador a la parte de resumen mediante su id 
        contadorProductos.innerText=contador;
       
        //Se definen los valores para las variables ocupadas en el total de productos
        totalEnProductos+=parseFloat(txtNumber.value);
        productosTotal.innerText=totalEnProductos;

        //Se definen los valores para las variables ocupadas en el costo total de productos
        costoTotal+= precio*parseFloat(txtNumber.value);
        precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
        
        //Aplicamos el localStorage para guardar datos en las sesiones del navegador
        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal",costoTotal);



        //Borra los elementos en la pagina una vez que le das agregar y te pone el cursor nuevamente en el campo nombre con el focus
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

    }
    
})
 //Cuando la pagina termine de cargar quiero que la informacion que ya tiene en el localStorage me la asignes
 window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("contadorProductos") !=null){
        contador= Number(this.localStorage.getItem("contadorProductos"));
        totalEnProductos= Number(this.localStorage.getItem("totalEnProductos"));
        costoTotal= Number(this.localStorage.getItem("costoTotal"));

        contadorProductos.innerText=contador;
        productosTotal.innerText=totalEnProductos;
        precioTotal.innerText= `$ ${costoTotal.toFixed(2)}`;
    }

 //Validamos el arreglo de datos 
 if(this.localStorage.getItem("datos")!=null){
    datos= JSON.parse(this.localStorage.getItem("datos"));
    datos.forEach((r) => {
        let row =`<tr>
        <td>${r.id}</td>
        <td>${r.nombre}</td>
        <td>${r.cantidad}</td>
        <td>${r.precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
    });
 }




 });