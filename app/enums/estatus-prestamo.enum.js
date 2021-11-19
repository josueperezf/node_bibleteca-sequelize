const ESTATUS_PRESTAMO = Object.freeze({
    PRESTADO:                          1,
    ENTREGA_PARCIAL:                   2,
    ENTREGA_TOTAL:                     3,
    ENTREGA_TOTAL_CON_PERDIDA:         4,
    PERDIDA_TOTAL:                     5,
    ENTREGA_PARCIAL_CON_PERDIDA:       6
});


module.exports = ESTATUS_PRESTAMO;

