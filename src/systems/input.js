// Manejo de entrada del usuario.
// Detecta teclado y guarda el estado de las teclas presionadas.

export const keys = {};

export function initInput() {
    //console.log("input iniciado");

    window.addEventListener("keydown", (e) => {
        keys[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
        keys[e.code] = false;
    });
}