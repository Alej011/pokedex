export type RequestState = 
| { status: 'idle' }
| { status: 'loading'; query: string }
| { status: 'success'; pokemonName: string }
| { status: 'empty'; query: string }
| { status: 'error'; message: string };