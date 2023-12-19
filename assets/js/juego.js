/*
    2C = 2 de Tréboles (Clubs)
    2D = 2 de Diamantes (Diamonds)
    2H = 2 de Corazones (Hearts)
    2S = 2 de Espadas (Spades)
 */

/*Crear un deck/baraja*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S']; //for of
const especiales = ['A', 'J', 'Q', 'K']; //letras

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
    //console.log(deck);
    return deck;
}

crearDeck();

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
    //console.log(pos);
    console.log(carta, deck);
    //console.log(deck.indexOf(carta)); // no lo encuentra porque lo elimina
    console.log(carta[0]);
    return carta[0];
}

//pedirCarta();

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

const valor = valorCarta(pedirCarta());
console.log({valor});