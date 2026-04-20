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