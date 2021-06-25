/**
 * C = Clubs (Tréboles)
 * D = Diamonds (Diamantes)
 * H = Hearts (Corazones)
 * S = Spades (Picas)
 */

const miModulo = (() => {
    'use strict'

    let deck           = [];
    const   tipos      = ['C','D','H','S'],
            especiales = ['A','j','Q','K'];

    let puntosJugadores = [];

    // Referencias HTML
    const   btnPedir    = document.querySelector('#btnPedir'),
            btnDetener  = document.querySelector('#btnDetener'),
            btnNuevo    = document.querySelector('#btnNuevo');

    const   divCartasJugadores = document.querySelectorAll('.divCartas'),
            sumatorio = document.querySelectorAll('small');

    // Esta función inicia el juego
    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        sumatorio.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        btnPedir.disabled = false;
        btnDetener.disabled = false;


    }

    //************************************************ */
    //
    // Esta función crea una nueva baraja
    //
    //************************************************ */
    const crearDeck = () => {
        deck = [];

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

        return _.shuffle( deck ); // función de la libreria underscore.js (_shuffle)
    }

    //************************************************ */
    //
    // Esta función me permite tomar una carta
    //
    //************************************************ */
    const pedirCarta = () => {

        if( deck.length === 0 ) {
            throw 'No hay cartas en la baraja';
        }
        return deck.pop(); // Cogemos la ultima carta de la baraja, la eliminamos y la devolvemos;
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

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );        
        sumatorio[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;
        
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

    // Turno de la Computadora 'Maggie'
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1);

        } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );

        determinarGanador();
    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0);

        crearCarta( carta, 0 );

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

        turnoComputadora( puntosJugadores[0] );
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();