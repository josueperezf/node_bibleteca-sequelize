const jwt = require('jsonwebtoken')
const generarJWT = async (data) => {
    // data es un object
    // console.log({data});
    return new Promise((resolve, reject)=>{
        const payload = data;
        //uso lo que tengo en la variable de entorno para firmar el token
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{ expiresIn: '4h'}, (err, token)=>{
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        } )
    });
}

module.exports ={
    generarJWT
}