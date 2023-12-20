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

(() => {
    'use strict'
    /*Crear un deck/baraja*/

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S']; //for of
    const especiales = ['A', 'J', 'Q', 'K']; //letras

//puntaje
    let puntosJugador = 0,
        puntosComputadora = 0;

//referencias del HTML

    const btnPedir = document.querySelector('#btnPedir');
    const btnFold = document.querySelector('#btnFold');
    const btnJugar = document.querySelector('#btnJugar');

//jugador
    const jugadorCartasHTML = document.querySelector('#jugador-cartas');

//maquina
    const computadoraCartasHTML = document.querySelector('#computadora-cartas');

//puntaje
    const puntosHTML = document.querySelectorAll('small');

    const crearDeck = () => {
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
        //librería underscorejs https://underscorejs.org/
        // si la aleatorizada sirve jaja, entonces quito el shuffle
        // a pesar de servir, es mejor revolver y aleatorizar después
        deck = _.shuffle(deck);//para aleatorizar el arreglo
        return deck;
    }


//Tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) { //deck vacío
            throw 'No hay más cartas disponibles';
        }
        let max= deck.length, min= 0; //Rango del número aleatorio, siendo el lenght el máximo y 0 el mínimo
        // La posición será del arreglo que quito la carta, y como random va de 0 al 1, entonces:
        // max - min será la multiplicación que le hará al número random
        // suma el mínimo para que esté entre el rango del 52
        // la función to fixed redondea el número aleatorio
        // Number() -> convierte de String a number
        let pos = Number(( Math.random() * ( max - min ) + min ).toFixed());
        let carta = deck.splice(pos, 1);

        if (carta.length === 0) { //si el número va fuera de rango
            throw 'Algo falló, recargue la página';
        }
        //console.log(deck);
        //console.log(deck.indexOf(carta)); // no lo encuentra porque lo elimina
        return carta[0];
    }

    const valorCarta = (carta) => {
        //2D = 2C, Valen lo mismo
        //Extraer el valor del string
        //const valor = carta[0];
        const valor = carta.substring(0, carta.length - 1); //extrae caracteres de un inicio a un final
        //cuánto vale esa carta -> ej:/ J = 11...
        //isNan -> is not a number, true si no es un número

        return                  ( isNaN( valor ) )
            ? ( (valor==='A') ? 11: 10 )
            : valor * 1;
    }

    //turno de la computadora
    //se activa cuando el jugador pierda o le de click en "detener"
    //la computadora debe igualar el puntaje del jugador

    const turnoComputadora = ( puntosMinimos ) => {


        do { //al menos una vez
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src= `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            computadoraCartasHTML.append(imgCarta);

            //asegurar
            if (puntosMinimos > 21) {
                break;
            }

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        //timeout para que aparezca alertas, nada bonito

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

    crearDeck();

    // Eventos OnClick

    // Pedir carta
    //Callback -> función que se manda como argumento
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        //puntos acumulados
        puntosJugador += valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador; //visual, 0 del jugador
        //crear una carta en HTML cada vez que se active el action listener
        //imagen de forma dinámica
        //crea elemento en memoria
        const imgCarta = document.createElement('img');
        imgCarta.src= `assets/cartas/${ carta }.png`; //Poner la imagen
        //colocar la clase carta
        imgCarta.classList.add('carta');
        jugadorCartasHTML.append(imgCarta);

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
        turnoComputadora(puntosJugador);
    });

    btnJugar.addEventListener('click', ()=> {
        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = '0';
        puntosHTML[1].innerText = '0';

        btnPedir.disabled = false;
        btnFold.disabled = false;

        jugadorCartasHTML.innerHTML='';
        computadoraCartasHTML.innerHTML='';

    })

})();

