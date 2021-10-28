// CARGA AL LOCAL STORAGE
if (localStorage.length == 0) {
    alert("se cargaron los datos")
    const data = await fetch("./src/datos.json");
    const pomodorosdata = await data.json();
    localStorage.setItem("pomodoros", JSON.stringify(pomodorosdata));
}
// LLENAR LAS LISTAS
let pomodoros = JSON.parse(localStorage.getItem("pomodoros"))
const sectionCompletados = document.querySelector('.sectionCompletados');
const sectionEnProceso = document.querySelector('.sectionEnProceso');
const sectionPendientes = document.querySelector('.sectionPendientes');
pomodoros.forEach(p => {
    let divPomodoro = document.createElement('div');
    let txtPomodoro = document.createElement('p');
    let sub = p.subtareas != "" ? "images/CardChecklistOk.svg" : "images/checkno.svg"
    divPomodoro.classList.add('divPomodoro');
    txtPomodoro.classList.add('txtPomodoro');
    txtPomodoro.textContent = p.tarea;
    divPomodoro.append(txtPomodoro);
    if (p.estado === "Pendiente") {
        divPomodoro.classList.add('pomodoroPendiente');
        sectionPendientes.append(divPomodoro);
        divPomodoro.innerHTML += `
        <div class="divControles oculto">
        <img id="borrar" src="images/Delete Bin.png">
        <img id="editar" src="images/Edit.png">
        <img id="subtareas" src="${sub}">
        </div>`
    } else if (p.estado === "Completado") {
        divPomodoro.classList.add('pomodoroCompletado');
        sectionCompletados.append(divPomodoro);
        divPomodoro.innerHTML += `
        <div class="divControles oculto">
        <img id="borrar" src="images/Delete Bin.png">
        <img id="subtareas" src="${sub}">
        </div>`
    } else {
        let sub = p.subtareas != "" ? "images/CardChecklistOk.svg" : "images/checkno.svg"
        divPomodoro.classList.add('pomodoroProceso');
        sectionEnProceso.append(divPomodoro);
        divPomodoro.innerHTML += `<img src="${sub}">`
        sectionEnProceso.innerHTML += `
        <p class="txtDescripcion">${
            p.descripcion
        }</p>
        <img id="btnVolume" src="images/volume.svg" alt="volumen">
        <img id="btnSubtareas" src="images/flecha.svg" alt="mas">
        `;
    }
})
// DESPLEGAR BOTONES MENU LATERAL
Array.from(document.querySelectorAll('.divItemMenu')).map((boton) => {
    let divHover = document.createElement('div');
    divHover.classList.add('divHover');
    divHover.innerHTML = `<p>${
        boton.id
    }</p>`;
    boton.addEventListener('mouseenter', () => {
        boton.append(divHover);
        boton.classList.toggle('divItemActivo')
    })
    boton.addEventListener('mouseleave', () => {
        boton.classList.toggle('divItemActivo')
        divHover.remove(this)
    })
    boton.addEventListener('click', () => {
        const mainAgregar = document.querySelector('.mainAgregar');
        const mainPrincipal = document.querySelector('.mainPrincipal');
        const mainHome = document.querySelector('.mainHome');
        sectionCompletados.style.display = "block";
        sectionEnProceso.style.display = "flex";
        sectionPendientes.style.display = "block";
        mainPrincipal.style.display = "flex";
        mainAgregar.style.display = "flex";
        mainHome.style.display = "none";
        if (boton.id === "Agregar Nuevo") {
            mainPrincipal.style.display = "none";
        } else if (boton.id === "Ver Todos") {
            mainAgregar.style.display = "none";
        } else if (boton.id === "Pendientes") {
            mainAgregar.style.display = "none";
            sectionEnProceso.style.display = "none";
            sectionCompletados.style.display = "none";
        } else if (boton.id === "Completados") {
            mainAgregar.style.display = "none";
            sectionEnProceso.style.display = "none";
            sectionPendientes.style.display = "none";
        } else if (boton.id === "En Proceso") {
            sectionPendientes.style.display = "none";
            sectionCompletados.style.display = "none";
            mainAgregar.style.display = "none";
        } else if (boton.id === "Inicio") {
            mainAgregar.style.display = "none";
            mainPrincipal.style.display = "none";
            mainHome.style.display = "flex";
        }
    })
})
let tempo;
// BOTON PLAY PARA INICIAR TEMPORIZADOR
document.getElementById('play').addEventListener('click', () => {
    tempo = setInterval(settime, 1000);
    document.getElementById('alarma').pause();
    setInterval(tempo)
})
// BOTON PAUSE
document.getElementById('pause').addEventListener('click', () => {
    clearInterval(tempo);
})
// BOTON STOP
document.getElementById('stop').addEventListener('click', () => {
    restante = total;
    timer.style.width = `100%`;
    document.getElementById('alarma').pause();
    clearInterval(tempo);
})
let total = 1 * 60;
// TEMPORIZADOR MASTER PRO EXTREME PREMIUM
let porcentaje;
const timer = document.querySelector('.Timer');
let restante = total;
function settime() {
    porcentaje = 100 / total * restante
    if (porcentaje >= 0) {
        restante = restante - 1;
        timer.style.width = `${porcentaje}%`;
        console.log(porcentaje)
        if (porcentaje <= 0) {
            clearInterval(tempo);
            document.getElementById('alarma').play();
            document.querySelector('#tomTrabajando').classList.toggle('oculto');
            document.querySelector('#tomDescanzando').classList.toggle('oculto');
            restante = total;
            timer.style.width = `100%`;
            if (document.querySelector('#tomDescanzando').classList.contains('oculto') == true) {
                total = 1 * 60;
                console.log("trabajando")
                console.log(total / 60)
                restante = total;
            } else {
                total = 5 * 60;
                console.log("descanzando")
                console.log(total / 60)
                restante = total;
            }
        }
    }
}
// BOTON MUTE ///////////////////////////////////////////////////////////
document.querySelector('#btnVolume').addEventListener('click', () => {
    document.getElementById('alarma').muted = !document.getElementById('alarma').muted;
    document.querySelector('#btnVolume').classList.toggle("muted");
})
// BOTON VER SUBTAREAS ////////////////////////////////////////////////////
document.querySelector('#btnSubtareas').addEventListener('click', () => {
    pomodoros.forEach(pomodoro => {
        if (pomodoro.estado === "Proceso") {
            if (pomodoro.subtareas != "") {
                pomodoro.subtareas.forEach(sub => {
                sectionEnProceso.innerHTML+=`
                    <div class="mostrarSubtareas">
                        <input type="checkbox" name="" id="">
                        <p>${sub.subtarea}</p>
                    </div>`
                });
            } else {                
                sectionEnProceso.innerHTML+=`
            <div class="mostrarSubtareas">
                <p>NO HAY SUBTAREAS ASIGNADAS</p>
            </div>`
            }
        }
    });
})
// HOVER POMODOROS PENDIENTES /////////////////////////////////////////////
Array.from(document.querySelectorAll('.pomodoroPendiente')).map((pendiente) => {
    pendiente.addEventListener('mouseenter', () => {
        pendiente.querySelector('.oculto').style.display = "flex";
        pendiente.querySelector('.oculto').querySelector('#borrar').addEventListener('click', () => {
            pendiente.remove()
        })
    })
    pendiente.addEventListener('mouseleave', () => {
        pendiente.querySelector('.oculto').style.display = "none";
    })
})
// HOVER POMODOROS COMPLETADOS ///////////////////////////////////////////
Array.from(document.querySelectorAll('.pomodoroCompletado')).map((completo) => {
    completo.addEventListener('mouseenter', () => {
        completo.querySelector('.oculto').style.display = "flex";
        completo.querySelector('.oculto').querySelector('#borrar').addEventListener('click', () => {
            completo.remove()
        })
    })
    completo.addEventListener('mouseleave', () => {
        completo.querySelector('.oculto').style.display = "none";
    })
})
// VERSION MOVIL ////////////////////////////////////////////////////////////////////////////////
let menu = document.querySelector('.asideMenu')
let menuMovil = document.querySelector('.divItemMenu1');
let menuWhite = document.querySelector('.divItemMenu2')
menuMovil.addEventListener('click', () => {
    menu.classList.add('mostrar');
    menuWhite.classList.add('mostrar');
})
menuWhite.addEventListener('click', () => {
    menu.classList.remove('mostrar');
    menuWhite.classList.remove('mostrar');
})
// BOTON SUBTAREAS//////////////////////////
let agregarSubtareas = document.querySelector('.subtareas');
let tituloSub = document.querySelector('.tituloSub');
document.getElementById('botonSubtareas').addEventListener('click', () => {
    tituloSub.style.display = 'block';
    agregarSubtareas.innerHTML += `
    <div class="agregarSubtareas">
        <input type="checkbox" name="" id="check">
        <input type="text" name="" class="ingSubtarea" id="tareaNueva">
    </div>
    `
})
// BOTON AGREGAR//////
document.getElementById('agregar').addEventListener('click', () => {
    let nuevo = [];
    Array.from(document.querySelectorAll('#tareaNueva')).map((e) => {
        if (e.value == '') {
            alert('Completa los campos')
        } else {
            nuevo.push(e.value);
        }
    })
    localStorage.setItem(localStorage.length + 1, JSON.stringify(nuevo));
});
document.getElementById('botonSubtareas').addEventListener('click', subtareas());
