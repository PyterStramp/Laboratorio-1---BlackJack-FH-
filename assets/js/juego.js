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

    console.log(deck);

    deck = _.shuffle(deck);
    //para aleatorizar el arreglo
    console.log(deck);
    return deck;
}

crearDeck();
