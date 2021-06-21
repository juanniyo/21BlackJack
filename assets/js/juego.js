/**
 * C = Clubs (Tréboles)
 * D = Diamonds (Diamantes)
 * H = Hearts (Corazones)
 * S = Spades (Picas)
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','j','Q','K'];

//************************************************ */
//
// Esta función crea una nueva baraja
//
//************************************************ */
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ){
        for( let tipo of tipos ) {
            deck.push( i + tipo );
        }
        
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo)
        }
    }

    //console.log( deck ); deck "ordenado"
    deck = _.shuffle( deck ); // función de la libreria underscore.js (_shuffle)
    console.log( deck );
    return deck;
}

crearDeck();

//************************************************ */
//
// Esta función me permite tomar una carta
//
//************************************************ */
const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw 'No hay cartas en la baraja';
    }

    const carta = deck.pop();

    console.log( deck );
    console.log( carta );   //carta debe de ser de la baraja
    return carta;
}

//pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);// metodo para quedarnos con el valor de la carta
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

    /*
    let puntos  = 0;
    // 2 = 2    10 = 10 3 = 3
    if( isNaN( valor ) ) { // Aqui comprobamos si es un número o una letra para poderlos "sumar"...

        puntos = ( valor === 'A' ) ? 11 : 10;

    } else {

        puntos = valor * 1;// Si es un número lo multiplicamos por 1 ya que estamos obteniendo un string y lo que queremos es su valor númerico. 
    }

    console.log( puntos );
*/

}

const valor = valorCarta( pedirCarta() );
console.log({ valor });