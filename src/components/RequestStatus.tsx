import type { RequestState } from '../types/request';

type RequestStatusProps = {
    request: RequestState;
}

export default function RequestStatus({request,}: RequestStatusProps){
    let message = '';
    switch (request.status) {
        case 'idle':
            message = 'Escribe el nombre o numero de un Pokémon para buscarlo.';
            break;
        case 'loading':
            message = `Buscando el Pokémon "${request.query}"...`;
            break;
        case 'success':
            message = `${request.pokemonName}" esta en tu coleccion".`;
            break;
        case 'empty':
            message = `No se encontró ningún Pokémon con el nombre o número "${request.query}".`;
            break;
        case 'error':
            message = request.message;
            break;
    }

    return (
        <p className={`request-status request-status--${request.status}`}
        role="status"
        aria-atomic="true"
        >
            {message}
        </p>
    )
}