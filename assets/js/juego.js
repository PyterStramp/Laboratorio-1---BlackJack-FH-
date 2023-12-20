/*
    2C = 2 de Tréboles (Clubs)
    2D = 2 de Diamantes (Diamonds)
    2H = 2 de Corazones (Hearts)
    2S = 2 de Espadas (Spades)
 */

/*
*
* Patrón módulo
* La función anónima
* () => {
*
* }
*
* Función anónima autoinvocada
*
* (() => {
*
*   const personajes = ['Rana','Ana','Mei'];
*   //personajes no está en un espacio de memoria
*   'use strict' -> que javascript sea estricto
*
* })();
* */

//optimizar
//código similar
//Hacer algunas funciones públicas

const modulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']; //letras

//puntaje, cambiar eventualmente
    let puntosJugadores = [];

//referencias del HTML
    //probablemente haga referencia a objetos no existentes
    const btnPedir = document.querySelector('#btnPedir'),
          btnFold = document.querySelector('#btnFold'),
          btnJugar = document.querySelector('#btnJugar');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    //función inicial, =1 -> valor por defecto
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        //El último jugador siempre será la computadora
        for (let i=0; i<numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML='');
        btnPedir.disabled = false;
        btnFold.disabled = false;

    }
    const crearDeck = () => {
        deck = []; //re inicializar
        //Empezar con los números, del 2 al 10
        for ( let i = 2; i <=10; i++ ) {
            for (let tipo of tipos) {
                deck.push( i + tipo );
            }
            //deck.push(i + 'C');
        }
        //especiales
        for ( let tipo of tipos ) {
            for ( let esp of especiales) {
                deck.push( esp + tipo );
            }
        }
        return _.shuffle(deck);
    }
    inicializarJuego();
//Tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) { //deck vacío
            throw 'No hay cartas disponibles';
        }
        //valor aleatorio inestable
        return deck.pop();
    }

    const valorCarta = (carta) => {
        //2D = 2C, Valen lo mismo
        //Extraer el valor del string
        //const valor = carta[0];
        const valor = carta.substring(0, carta.length - 1); //extrae caracteres de un inicio a un final
        //cuánto vale esa carta -> ej:/ J = 11...
        //isNan -> is not a number, true si no es un número

        return  ( isNaN( valor ) )
                ? ( (valor==='A') ? 11: 10 )
                : valor * 1;
    }

    //turno de la computadora
    //se activa cuando el jugador pierda o le de click en "detener"
    //la computadora debe igualar el puntaje del jugador

    //puntaje

    //Turno: 0 -> primer jugador, último será la computadora
    const acumularPuntos = (carta, turno) => {
        //acumule puntos según el turno
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src= `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if ((puntosComputadora === puntosMinimos)) {
                alert('Empate');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else if ( puntosMinimos > 21) {
                alert('Computadora gana');
            } else {
                alert('Computadora gana');
            }
        }, 35);
    }
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora =0;

        do { //al menos una vez
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();

    }

    // Eventos OnClick

    // Pedir carta
    //Callback -> función que se manda como argumento
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0); //primer jugador
        crearCarta(carta, 0);

        //controlar el puntaje
        if (puntosJugador > 21) {
            console.warn('Perdiste');
            //bloquear el botòn
            btnPedir.disabled = true;
            btnFold.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21');
            btnPedir.disabled = true;
            btnFold.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnFold.addEventListener('click', () => {
        console.log('Foldeaste');
        btnPedir.disabled = true;
        btnFold.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnJugar.addEventListener('click', ()=> {
         inicializarJuego();
    })

    return {
        //hacer público inicializarJuego
        nuevoJuego: inicializarJuego
    };
})();

