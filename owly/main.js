function init(){
    document.getElementById("aniadir").addEventListener("click", function(){
        aniadir();
    })
    document.getElementById("eliminar").addEventListener("click", function(){
        eliminar();
    })
    document.getElementById("mostrar").addEventListener("click", function(){
        mostrar();
        setTableVisibility();
    })
    
    document.getElementById("limpiar").addEventListener("click", function(){
        limpiar();
    })
}
function limpiarCampos(){
    document.getElementById("clave").value = "";
    document.getElementById("valor").value = "";
}

function aniadir(){
    const clave = document.getElementById("clave").value;
    const valor = document.getElementById("valor").value;
    if(clave != ""){
        if(localStorage.getItem(clave)){
            document.getElementById("mensaje").innerHTML = "<p>Value has been modified</p>";
            limpiarCampos();
        }
        else{
            document.getElementById("mensaje").innerHTML = "<p>Successfully added!</p>";
            limpiarCampos();
        }
        localStorage.setItem(clave, valor);
        mostrar();
        setTableVisibility();
    }
    else{
        document.getElementById("mensaje").innerHTML = "<p>*Title is required</p>";
        document.getElementById("owly").classList.add("shake");
        setTimeout(function(){
            document.getElementById("owly").classList.remove("shake");
        }, 900);
        setTimeout(function(){
            document.getElementById("mensaje").innerHTML = "";
        }, 2000);

    }
}

function eliminar(){
    const clave = document.getElementById("clave").value;
    if(localStorage.getItem(clave)){
        document.getElementById("mensaje").innerHTML = "<p>Successfully deleted!</p>";
        limpiarCampos();
        localStorage.removeItem(clave);
        mostrar();
    }    
    else{
        document.getElementById("mensaje").innerHTML = "<p>Sorry... I couldn't find it :(</p>";
        document.getElementById("owly").classList.add("shake");
        setTimeout(function(){
            document.getElementById("owly").classList.remove("shake");
        }, 900);
        setTimeout(function(){
            document.getElementById("mensaje").innerHTML = "";
        }, 2000);
    }
}

function mostrar(){

    const divDatos = document.getElementById("datos");
    divDatos.innerHTML = "";

    if(localStorage.length === 0){
        document.getElementById("mensaje").innerHTML = "<p>I'm empty!</p>";
        setTimeout(function(){
            document.getElementById("mensaje").innerHTML = "";
        }, 2000);
    }
    else{
        let tabla = document.createElement("table");
        tabla.setAttribute("border", "0");
        tabla.setAttribute("class", "cinereousTable");
        
        let tr = document.createElement("tr");
        
        let th = document.createElement("th");
        let thTexto = document.createTextNode("Title");
        
        th.appendChild(thTexto);
        tr.appendChild(th);
    
        th = document.createElement("th");
        thTexto = document.createTextNode("Description");
    
        th.appendChild(thTexto);
        tr.appendChild(th);
    
        tabla.appendChild(tr);
    
        for(let index=0; index <localStorage.length; index++){
            const key = localStorage.key(index);
    
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let tdText = document.createTextNode(key);
            
            td.appendChild(tdText);
            tr.appendChild(td);
    
            td = document.createElement("td");
            tdText = document.createTextNode(localStorage.getItem(key));
    
            td.appendChild(tdText);
            tr.appendChild(td);
    
            tabla.appendChild(tr);
        }
        divDatos.appendChild(tabla);
        setTimeout(function(){
            document.getElementById("mensaje").innerHTML = "";
        }, 2000);

    }
    
}

function setTableVisibility(){
    document.getElementById("datos").classList.toggle("tableVisible");
}

function notCleaning(){
    document.getElementById("mensaje").innerHTML = "";
}
function cleaning(){
    document.getElementById("mensaje").innerHTML = "";
    document.getElementById("datos").innerHTML = "";
    limpiarCampos();
    document.getElementById("mensaje").innerHTML = "<p>I'm empty!</p>";
    setTimeout(function(){
        document.getElementById("mensaje").innerHTML = "";
    }, 2000);
    localStorage.clear();
}

function limpiar(){
    //document.getElementById("mensaje").innerHTML = "<p></p>";
    if(localStorage.length === 0){
        document.getElementById("mensaje").innerHTML = "<p>I'm empty!</p>";
        setTimeout(function(){
            document.getElementById("mensaje").innerHTML = "";
        }, 2000);
        localStorage.clear();
    }
    else{
        document.getElementById("mensaje").innerHTML = "Are you sure? <br>";
        let confirmationYES = document.createElement("img");
        let confirmationNO = document.createElement("img");
        
        confirmationYES.src="images/icons/yes.png";
        confirmationYES.id="btn_yes";
        confirmationYES.innerHTML = "si";

        confirmationNO.src="images/icons/no.png";
        confirmationNO.id="btn_no";
        confirmationNO.innerHTML = "no";
        
        document.getElementById("mensaje").appendChild(confirmationYES);
        document.getElementById("mensaje").appendChild(confirmationNO);
        document.getElementById("btn_yes").addEventListener("click", cleaning);
        document.getElementById("btn_no").addEventListener("click", notCleaning);
        

    }
}

window.onload = init;