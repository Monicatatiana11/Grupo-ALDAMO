const data = await fetch("./src/datos.json");
const pomodoros = await data.json();

//LLENAR LAS LISTAS
let sectionCompletados = document.querySelector('.sectionCompletados');
let sectionEnProceso = document.querySelector('.sectionEnProceso');
let sectionPendientes = document.querySelector('.sectionPendientes');
pomodoros.forEach(p => {
    let divPomodoro = document.createElement('div');
    let txtPomodoro = document.createElement('p');
    divPomodoro.classList.add('divPomodoro');
    txtPomodoro.classList.add('txtPomodoro');
    txtPomodoro.textContent=p.tarea;
    divPomodoro.append(txtPomodoro);
    if (p.estado === "Pendiente") {
        divPomodoro.classList.add('pomodoroPendiente');
        sectionPendientes.append(divPomodoro);
    }else if(p.estado === "Completado"){
        divPomodoro.classList.add('pomodoroCompletado');
        sectionCompletados.append(divPomodoro);
    }else{
        divPomodoro.classList.add('pomodoroProceso');
        sectionEnProceso.append(divPomodoro);
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
        if (boton.id === "Agregar Nuevo") {
            mainAgregar.style.display="flex";
            mainPrincipal.style.display="none";
        }else if (boton.id === "En Proceso") {
            sectionEnProceso.style.display="flex";
            sectionCompletados.style.display="block";
            mainAgregar.style.display="none";
            mainPrincipal.style.display="flex";
            sectionPendientes.style.display="block";
        }else if (boton.id === "Pendientes") {
            mainAgregar.style.display="none";
            mainPrincipal.style.display="flex";
            sectionEnProceso.style.display="none";
            sectionCompletados.style.display="none";
            sectionPendientes.style.display="block";
        }else if (boton.id === "Completados"){
            mainAgregar.style.display="none";
            mainPrincipal.style.display="flex";
            sectionEnProceso.style.display="none";
            sectionPendientes.style.display="none";
            sectionCompletados.style.display="block";
        }
    })
// pues lloro // 
    
})
//Boton completados






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
