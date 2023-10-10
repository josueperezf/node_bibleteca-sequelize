## nodeBibliotecaSequelize

Este proyecto es realizado con javascript, 

se utilizo *Sequelize* que es equivalente a mongose para mongodb, Sequelize permite utilizar bases de datos relaciones

NOTA: cuando nos conectamos a la base de datos, si esta en force podra realizar cambio de crear y/o modificar estructura de base de datos, se recomienda solo en desarrollo, o un manejo controlado

     connection.sync({ force: true }).then(() => {
        console.log("Se ha establecido la conexión");
    }).catch((e) => {
        console.log('sin conexion a base de datos');
    });


## levantar el proyecto

1. [crear mi contenedor mysql docker, solo si no lo tengo creado en mi docker](#crear-mi-contenedor-mysql-docker-solo-si-no-lo-tengo-creado-en-mi-docker)
2. crear la base de datos node_biblioteca 'si no la tenemos' ```create database node_biblioteca```
3. crear las tablas si no las tengo: ```npx sequelize-cli db:migrate ```
4. crear la data seed si no los he creado ```npx sequelize-cli db:seed:all``` este comando si ya inserte la data seed y corro el comando de nuevo, insertara la data de nuevamente
5. para levantar el proyecto modo desarrollo ```nodemon index.js```, podemos probarlo en ```http://localhost:8080/api-docs/#/``` aunque aqui no se todos los enpoint pero sirve de guia
6. debemos levantar el frontend, este se llama ```react_biblioteca-react-hook-form```, este lo levantamos con el comando ```npm start```


## crear mi contenedor mysql docker, solo si no lo tengo creado en mi docker

1. crear la imagen docker: ```docker pull mysql```

2. crear el contenedor docker para mysql: ```docker run -p 3307:3306 --name contenedor-mysql-latest --network mi-red -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=node_biblioteca -d mysql:latest --default-authentication-plugin=mysql_native_password```


## los endpoint esta documentados en 

Ejemplo de consumo del backend esta en: <http://localhost:8080/api-docs/> y se realizo con SWAGGER
- [documentacion para conocer lo utilizado en este proyecto](#documentacion-para-conocer-lo-utilizado-en-este-proyecto)
  - [crear el proyecto sequelize](#crear-el-proyecto-sequelize)
  - [crear MODEL el sequelize](#crear-model-el-sequelize)
  - [SEEDER](#seeder)
  - [NOTAS IMPORTANTES](#notas-importantes)
  - [Comándos útiles](#comándos-útiles)
  - [VER LOGS HEROKU (Informacion por si lo quiero subir a heroku)](#ver-logs-heroku-informacion-por-si-lo-quiero-subir-a-heroku)
  - [Notas HEROKU  (Informacion por si lo quiero subir a heroku)](#notas-heroku--informacion-por-si-lo-quiero-subir-a-heroku)

# documentacion para conocer lo utilizado en este proyecto

## crear el proyecto sequelize

1. *npm init -y* creamos el proyecto npm

2. creamos una carpeta llamada app, para meter alli el core de nuestro proyecto

3. *npx sequelize-cli init* inicializa el proyecto sequelize, y crea la carpeta config, migrations seeders

4. dentro de la carpeta app, creamos una carpeta llamada base de datos y movemos alli lo que nos genero el paso 3.

5. en la carpeta config. generada em el paso 3, le cambiamos el nombre al archivo, a database.js y le agregamos este contenido

        module.exports = {
        'username': 'root',
        'password': null,
        'database': 'biblioteca_sequelize',
        'host': 'localhost',
        'dialect': 'mysql'
        };

6. como movimos los archivos de migracion y demas, debemos decirle a sequelize que movimos esos archivos, la documentacion esta aqui <https://sequelize.org/master/manual/migrations.html#the--code--sequelizerc--code--file> igual lo explico en el paso 7

7. en la documentacion oficial, indica que se debe crear un archivo en la raiz del proyecto, llamado '.sequelizerc', alli debe tener una estructura similar a la siguiente

        const path = require('path');
        module.exports = {
        'config': path.resolve('config', 'database.js'),
        'models-path': path.resolve('app', 'models'),
        'seeders-path': path.resolve('app', 'database', 'seeders'),
        'migrations-path': path.resolve('app', 'database', 'migrations')
        };

8. si queremos probar que todo esta bien, podemos ejecutar el comando *npx sequelize-cli db:migrate*, este se conecta a la base de datos, ejecuta las migraciones que las hay, en este caso como no hay ninguna, entonces solo hara la creacion de la tabla 'sequelizemeta' donde llevara el historial de migracion

9. instalamos *dotenv* para el manejo de variables de entorno


## crear MODEL el sequelize

1. se debe colocar el la consola el siguiente comando

        npx sequelize-cli model:generate --name Idioma --attributes nombre:string,estatus:integer

2. el archivo que crea no es tan parecido al que he hecho manualmente, pero si lo hace el framework, debe ser mejor

## SEEDER

permite crear data en la base de datos, de forma automatica, si se quiere, se puede instalar faker, para insertar datos aleatorios

NOTA: Lose seeder se ejecutan tantas veces lo llamemos, no son como las migraciones que ya las ejecuto, no las ejecuta de nuevo, los seeder si lo hacer, puede intertar la misma data varias veces


1. para crear Se utiliza el siguiente comando, *npx sequelize-cli seed:generate --name create-estados*, alli crea una estructura vacia, alli descomentamos y colocamos nuestra data

2. para correr podemos hacer:

        npx sequelize-cli db:seed:all para correr todos los seeder que existe (pero si ya ejecute un seed antes, al ejecutar esta linea, ejecuta todos los seed de nuevo)
        npx sequelize-cli db:seed nombre-mi-seed.js
        Ejemplo: para correr un archivo en especifico (RECOMENDADA):
        npx sequelize-cli db:seed --seed 20220411194726-create-idiomas.js



## NOTAS IMPORTANTES

1. en el video de youtube, no utiliza el archivo config.json, sino crea uno llamado database, por ende, se debe editar el archivo index de la carpeta models

        // la isguiente linea es la original,
        // const config = require(__dirname + '/../config/config.json')[env];
        // esta es la del video de youtube
        const config = require('../../config/database');


##  Comándos útiles

1. npx sequelize-cli init: creará las carpeta y archivos necesarios.

2. npx sequelize-cli model:generate: --name nombre_modelo --atributes campo:tipo_de_dato,otro_campo:tipo_de_dato creará el modelo y la respectiva migración.

3. ```npx sequelize-cli db:migrate```  correrá las migraciones pendientes en ambiente desarrollo.
   
4. ```npx sequelize-cli db:migrate --env production```  correrá las migraciones pendientes en ambiente produccion.

5. npx sequelize-cli db:migrate:status: mostrará las migraciones ejecutadas.

6. npx sequelize-cli db:migrate:undo: revertirá la última migración ejecutadas.

7. npx sequelize-cli db:migrate:undo:all: revertirá todas las migraciones ejecutadas.

8. npx sequelize-cli seed:generate: creará el seeder de datos fake.

9.  npx sequelize-cli db:seed archivo-x.js correrá un seeder especifico

10. npx sequelize-cli db:seed:all: correrá todos seeders.

11. npx sequelize-cli db:seed:undo: revertirá el último seeder que se ejecutó.

12. npx sequelize-cli db:seed:undo:all: revertirá todos los seeders ejecutados.

13. npx sequelize-cli db:seed:undo:all: revertirá todos los seeders ejecutados.

14. npx sequelize-cli migration:generate: generará un archivo custom de migración (Ej: ALTER TABLE).




## VER LOGS HEROKU (Informacion por si lo quiero subir a heroku)

1. Para ver los ultimos 100 logs: ``` heroku logs -n 100 ```

2. Para ver los ultimos 100 logs y se mantenga esuchando para que enseñe los nuevos logs que vayan generandose ``` heroku logs -n 100 --tail ```

## Notas HEROKU  (Informacion por si lo quiero subir a heroku)

2. *heroku*, si realizaste un cambio y no se ve reflejado en produccion heroku, se recomienda

    - heroku config:set NPM_CONFIG_PRODUCTION=false
    - heroku config:set NODE_MODULES_CACHE=false
    - git commit -am 'disable node_modules cache' --allow-empty
    - git push heroku master

3. *heroku* cuando hacemos un deploy nuevo, 'subimos nuestro codigo a heroku' va a borrar todo lo que no sea parte del repositorio, mejor dicho a lo que git no le haga seguimiento, si esto lo hacemos en un servidor no heroku, no tendriamos problemas, ya que las imagenes no se borrarian, para este ejemplo usaremos 
