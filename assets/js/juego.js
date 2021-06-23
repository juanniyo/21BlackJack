/**
 * C = Clubs (Tréboles)
 * D = Diamonds (Diamantes)
 * H = Hearts (Corazones)
 * S = Spades (Picas)
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','j','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias HTML
const btnPedir             = document.querySelector('#btnPedir');
const btnDetener           = document.querySelector('#btnDetener');
const btnNuevo             = document.querySelector('#btnNuevo');

const divCartasComputadora = document.querySelector('#maggie-cartas');
const divCartasJugador     = document.querySelector('#jugador-cartas');
const sumatorio            = document.querySelectorAll('small');


//************************************************ */
//
// Esta función crea una nueva baraja
//
//************************************************ */
const crearDeck = () => {
// Cartas del 2 al 10
    for( let i = 2; i <= 10; i++ ){
        for( let tipo of tipos ) {
            deck.push( i + tipo );
        }
        
    }
// Cartas J, Q, K i As
    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo)
        }
    }

    deck = _.shuffle( deck ); // función de la libreria underscore.js (_shuffle)
    console.log(deck);
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
    const carta = deck.pop(); // Cogemos la ultima carta de la baraja, la eliminamos y la devolvemos
    return carta;
}


const valorCarta = ( carta ) => {
//****************************************************************************************************** */
//
// Función simplificada de la que hay mas abajo
//
//****************************************************************************************************** */
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
*/

}

// Turno de la Computadora 'Maggie'
const turnoComputadora = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
    
        sumatorio[1].innerText = puntosComputadora ;
    
        //<img class="carta" src="assets/cartas/AS.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) 
        {
            alert('Empate ijuep... !! ')
        } else if( puntosMinimos > 21 )
        {
            alert('Ya perdió !! ')
        } else if( puntosComputadora > 21 )
        {
            alert('Gana Jugador')
        } else{
            alert('Gana Maggie !! ')
        }

    }, 42);


}



// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );

    sumatorio[0].innerText = puntosJugador ;

    //<img class="carta" src="assets/cartas/AS.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21 ) {
        console.warn( 'Ya perdió !' );
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if( puntosJugador === 21 ) {
        console.warn( '21 !! Que Chimba, Ganaste !')
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );
});


btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    sumatorio[0].innerText    = 0;
    sumatorio[1].innerText    = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML     = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;


});