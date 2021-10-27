//CARGA AL LOCAL STORAGE
if (localStorage.length == 0) {
alert("se cargaron los datos")
    const data = await fetch("./src/datos.json");
    const pomodorosdata = await data.json();    
localStorage.setItem("pomodoros",JSON.stringify(pomodorosdata));
}
//LLENAR LAS LISTAS
let pomodoros = JSON.parse(localStorage.getItem("pomodoros"))
let sectionCompletados = document.querySelector('.sectionCompletados');
let sectionEnProceso = document.querySelector('.sectionEnProceso');
let sectionPendientes = document.querySelector('.sectionPendientes');
pomodoros.forEach(p => {
    let divPomodoro = document.createElement('div');
    let txtPomodoro = document.createElement('p');
    let sub = p.subtareas != "" ? "images/CardChecklistOk.svg" : "images/checkno.svg"
    divPomodoro.classList.add('divPomodoro');
    txtPomodoro.classList.add('txtPomodoro');
    txtPomodoro.textContent=p.tarea;
    divPomodoro.append(txtPomodoro);
    if (p.estado === "Pendiente") {
        divPomodoro.classList.add('pomodoroPendiente');
        sectionPendientes.append(divPomodoro);
        divPomodoro.innerHTML+=`
        <div class="divControles oculto">
        <img id="borrar" src="images/Delete Bin.png">
        <img id="editar" src="images/Edit.png">
        <img id="subtareas" src="${sub}">
        </div>`
    }else if(p.estado === "Completado"){
        divPomodoro.classList.add('pomodoroCompletado');
        sectionCompletados.append(divPomodoro);
        divPomodoro.innerHTML+=`
        <div class="divControles oculto">
        <img id="borrar" src="images/Delete Bin.png">
        <img id="subtareas" src="${sub}">
        </div>`
    }else{
        let sub = p.subtareas != "" ? "images/CardChecklistOk.svg" : "images/checkno.svg"
        divPomodoro.classList.add('pomodoroProceso');
        sectionEnProceso.append(divPomodoro);
        divPomodoro.innerHTML+=`<img src="${sub}">`
        sectionEnProceso.innerHTML+=`
        <p>${p.descripcion}</p>
        <img id="btnVolume" src="images/volume.svg" alt="volumen">
        <img id="btnSubtareas" src="images/flecha.svg" alt="mas">
        `;
    }
})
//DESPLEGAR BOTONES MENU LATERAL
let botonesMenuLateral = Array.from(document.querySelectorAll('.divItemMenu'));
botonesMenuLateral.map((boton)=>{
    let divHover = document.createElement('div');
    divHover.classList.add('divHover');
    divHover.innerHTML=`<p>${boton.id}</p>`;
    boton.addEventListener('mouseenter',()=>{
        boton.append(divHover);
        boton.classList.toggle('divItemActivo')
    })
    boton.addEventListener('mouseleave',()=>{
        boton.classList.toggle('divItemActivo')
        divHover.remove(this)
    })
    boton.addEventListener('click',()=>{
        let mainAgregar = document.querySelector('.mainAgregar');
        let mainPrincipal = document.querySelector('.mainPrincipal');
        sectionCompletados.style.display="block";
        sectionEnProceso.style.display="flex";
        sectionPendientes.style.display="block";
        mainPrincipal.style.display="flex";
        mainAgregar.style.display="flex";
        if (boton.id === "Agregar Nuevo") {
            mainPrincipal.style.display="none";
        }else if (boton.id === "Ver Todos") {
            mainAgregar.style.display="none";
        }else if (boton.id === "Pendientes") {
            mainAgregar.style.display="none";
            sectionEnProceso.style.display="none";
            sectionCompletados.style.display="none";
        }else if (boton.id === "Completados"){
            mainAgregar.style.display="none";
            sectionEnProceso.style.display="none";
            sectionPendientes.style.display="none";
        }else if (boton.id === "En Proceso") {
            sectionPendientes.style.display="none";
            sectionCompletados.style.display="none";
            mainAgregar.style.display="none";
        }
    })
})
//BOTON CONFIGURACION //////////////////////////esto/////////////
document.querySelector('.btnConfig').addEventListener('click',()=>{
    document.querySelector('.sectionConfiguracion').classList.toggle('oculto');
})
let tempo;
let total=15*60;
//BOTON PLAY PARA INICIAR TEMPORIZADOR
document.getElementById('play').addEventListener('click',()=>{
    tempo = setInterval(settime,1000);
    setInterval(tempo)
})
//BOTON PAUSE
document.getElementById('pause').addEventListener('click',()=>{
    clearInterval(tempo);
})
//BOTON STOP
document.getElementById('stop').addEventListener('click',()=>{
    clearInterval(tempo);
    porcentaje= 100;
    restante = total;
    timer.style.width=`${porcentaje}%`;
    document.getElementById('alarma').pause();
})
//TEMPORIZADOR MASTER PRO EXTREME PREMIUM
let porcentaje;
let timer = document.querySelector('.Timer');
let restante = total;
function settime() {
    porcentaje = 100/total*restante
    if (porcentaje>=0) {
        restante = restante-1;
        timer.style.width=`${porcentaje}%`;
            if (porcentaje <= 2) {
                document.getElementById('alarma').play();
            }
    }
}
//HOVER POMODOROS PENDIENTES /////////////////////////////////////////////
let pendientes = Array.from(document.querySelectorAll('.pomodoroPendiente'));
pendientes.map((pendiente)=>{
    pendiente.addEventListener('mouseenter',()=>{
        pendiente.querySelector('.oculto').style.display="flex";
        pendiente.querySelector('.oculto').querySelector('#borrar').addEventListener('click',()=>{
            pendiente.remove()
        })
    })
    pendiente.addEventListener('mouseleave',()=>{
        pendiente.querySelector('.oculto').style.display="none";
    })
})
//HOVER POMODOROS COMPLETADOS ///////////////////////////////////////////
let completados = Array.from(document.querySelectorAll('.pomodoroCompletado'));
completados.map((completo)=>{
    completo.addEventListener('mouseenter',()=>{
        completo.querySelector('.oculto').style.display="flex";
        completo.querySelector('.oculto').querySelector('#borrar').addEventListener('click',()=>{
            completo.remove()
        })
    })
    completo.addEventListener('mouseleave',()=>{
        completo.querySelector('.oculto').style.display="none";
    })
})





//VERSION MOVIL //////////////////////////////////////////////////////////////////////////////////////////
let menu = document.querySelector('.asideMenu')
let menuMovil = document.querySelector('.divItemMenu1');
let menuWhite = document.querySelector('.divItemMenu2')
menuMovil.addEventListener('click', ()=>{
    menu.classList.add('mostrar');
    menuWhite.classList.add('mostrar');
})
menuWhite.addEventListener('click', ()=>{
  menu.classList.remove('mostrar');
  menuWhite.classList.remove('mostrar');
})

//BOTON SUBTAREAS///////////////////////////
function subtareas() {
    let ingresar = document.querySelector('.subtareas');
    let tituloSub = document.querySelector('.tituloSub');
    tituloSub.style.display= 'block';
    ingresar.innerHTML += `
         <div class="check1">
            <input type="checkbox" name="" id="check">
            <input type="text" name="" id="ingSubtarea">
        </div>
    `
    
}; 

document.getElementById('botonSubtareas').addEventListener('click', subtareas());
