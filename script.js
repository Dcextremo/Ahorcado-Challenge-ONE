

// MENU

function opcionJugar()
{
    document.getElementById("menu").style.display="none";
    document.getElementById("footer").style.display="none";
    document.body.className='juego';

    document.getElementById("juego").style.display="";
    
} 
function atrasMenu()
{
    document.getElementById("juego").style.display="none";
    document.body.className='menu';
    document.getElementById("menu").style.display="";
    document.getElementById("footer").style.display="";
    game_over();
}

// JUEGO

let palabra;
let errores;
let aciertos;
const palabras=[
    'dulce',
    'truco',
    'disfraz',
    'caramelos',
    'murcielagos',
    'brujas',
    'esqueleto',
    'halloween',
    'cementerio',
    'calabaza',

    
]

const imagen= document.getElementById('esqueleto');
const btn_letras = document.querySelectorAll("#letras button");
const btn = document.getElementById('obtenerPalabra');


function jugar()
{
    //Cargo palabra y desabilito boton
    
    btn.addEventListener('click',jugar);
    btn.disabled=true;
    
    imagen.src= `/Imagenes/Esqueleto/0.png`;
   
    errores=0;
    aciertos=0;

    const parrafo = document.getElementById('palabraCorrecta');
    parrafo.innerHTML=''; // Vacio el campo de los span

    const tamaño= palabras.length;
    const random = Math.floor(Math.random() * tamaño);   

    palabra=palabras[random].toUpperCase();

    console.log(palabra);

    //creacion de campos para la letra
    const lineas=palabra.length;
    for (let i=0; i< lineas; i++)
    {
        const span = document.createElement('span');
        parrafo.appendChild( span );
    }
    for(let i=0; i<btn_letras.length;i++)
    {
        btn_letras[i].disabled=false;
    }
    
}

/* CLick adivinar letra */
for(let i=0; i<btn_letras.length;i++)
{
    btn_letras[i].addEventListener('click',click_letras);
}

function click_letras(event)
{
    const spans=document.querySelectorAll('#palabraCorrecta span');
    const button=event.target; // que letra toque
    button.disabled=true;
    const letra= button.innerHTML;
    
    let acerto=false;
    for( let i=0; i<palabra.length;i++)
    {
        if(letra==palabra[i])
        { //la variable i es la posicion de la letra en la palabra,
            //que coincide con el span al que tenemos que mostrar..
            spans[i].innerHTML=letra;
            acerto=true;
            aciertos++;
        }
        
    }
    if(acerto==false)
    {
        errores++;
        
        const source= `/Imagenes/Esqueleto/${errores}.png`;
        imagen.src = source;
    }
    if(errores==6)
    {
        perdiste(); 
        game_over();
    }
    else
    {
        if(aciertos==palabra.length)
        {
            ganaste();
            game_over();
        }
    }   
}
function perdiste() {
    Swal.fire({ 
      title: "Perdiste! La palabra secreta era: " + palabra,
      icon: "error",
      confirmButtonColor:"#0B5345",
    }
    )
  }

  function ganaste() {
    Swal.fire({ 
      title: "Ganaste!",
      icon: "success",
      confirmButtonColor:"#0B5345",
    }
    )
  } 
function game_over()
{
    jugar();
    for(let i=0; i<btn_letras.length;i++)
    {
        btn_letras[i].disabled=true;
    }
    btn.disabled=false;
    
}
game_over();