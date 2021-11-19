const existePrestamoPorId = async (id = '') => {
    const existe = await Prestamo.findByPk(id);
    if (!existe) {
        throw new Error(`ID: ${id} no existe en la DB`);
    }
};

module.exports = {
    existePrestamoPorId
};