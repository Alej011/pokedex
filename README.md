Pokédex con React y TypeScript

Proyecto académico que migra una Pokédex desarrollada en JavaScript a React con TypeScript. Permite buscar Pokémon por nombre o número mediante PokéAPI, mostrar su imagen, peso y altura, y conservar una colección sin duplicados.

La colección se guarda en memoria: se reinicia al recargar la página.

Instalación y ejecución

Requisitos: Node.js compatible con Vite, pnpm instalado y conexión a Internet para consultar PokéAPI.

Descarga o clona el proyecto y entra en su carpeta:

cd pokedex-react

Instala las dependencias:

pnpm install

Inicia el servidor de desarrollo:

pnpm run dev

Abre la dirección indicada en la terminal, normalmente http://localhost:5173. Para detener el servidor, presiona Ctrl + C.

Para comprobar los tipos y generar la aplicación de producción:

pnpm run build

Para previsualizar esa compilación localmente:

pnpm run preview

Uso

Escribe un nombre como ditto o un número como 132. La búsqueda comienza tras 500 ms sin escribir; Enter o el botón Buscar la ejecutan inmediatamente. Los Pokémon encontrados se agregan a la colección sin repetir su identificador.

La interfaz muestra los estados inicial, carga, éxito, resultado vacío y error. Una búsqueda sin resultados o fallida conserva la colección anterior. El formulario permite navegación con teclado y los mensajes utilizan role="status".

Organización

Elemento

Responsabilidad

App.tsx

Coordina el estado, los eventos y las solicitudes.

SearchForm

Presenta el formulario controlado y comunica cambios y envíos.

RequestStatus

Muestra el estado de la búsqueda.

PokemonList

Renderiza la colección con map y claves estables.

PokemonCard

Presenta los datos de un Pokémon.

pokemonService.ts

Consulta PokéAPI y adapta su respuesta, incluidas las unidades.

Tipos de TypeScript

Describen los datos, las props y los estados de solicitud.

Flujo de búsqueda

flowchart TD
  A[Usuario interactúa] --> B{Acción}
  B -->|Escribe| C[Actualiza texto y cancela trabajo anterior]
  C --> D{Texto vacío}
  D -->|Sí| E[Estado inicial]
  D -->|No| F[Espera 500 ms]
  B -->|Envía formulario| G[Elimina la espera pendiente]
  F --> H[Consulta PokéAPI con señal de cancelación]
  G --> I{Texto vacío}
  I -->|Sí| E
  I -->|No| H
  H --> J{Resultado}
  J -->|Encontrado| K[Éxito: agrega sin duplicar por id]
  J -->|No encontrado| L[Resultado vacío]
  J -->|Fallo| M[Mensaje de error]
  J -->|Cancelación| N[Descarta sin mostrar error]

Cada nueva solicitud cancela la anterior. Al desmontar el componente se limpian el temporizador y la solicitud activa.

Conceptos aprendidos

Props y estado: las props entregan datos o funciones a los hijos; useState conserva datos y permite actualizar la interfaz.

Formulario controlado: value refleja el estado y onChange lo actualiza. preventDefault() evita la navegación tradicional al enviar.

Renderizado declarativo: la interfaz se describe con JSX. map genera las tarjetas; key identifica cada una y some evita duplicados.

Tipos y estrechamiento: TypeScript comprueba estructuras durante el desarrollo. Descartar null con un return permite utilizar el resultado como Pokemon; los tipos no validan automáticamente respuestas externas.

Debounce y cancelación: clearTimeout elimina una ejecución pendiente; AbortController cancela una solicitud iniciada. Cada solicitud necesita una señal nueva.

Referencias y limpieza: useRef conserva temporizadores y controladores sin provocar renderizados; la limpieza de useEffect libera esos recursos.

Asincronía: async/await gestiona la espera; try/catch/finally permite manejar resultados, fallos y limpieza.