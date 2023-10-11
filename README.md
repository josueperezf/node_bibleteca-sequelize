## nodeBibliotecaSequelize


```npx sequelize-cli db:migrate```  correrá las migraciones pendientes en ambiente desarrollo.
```npx sequelize-cli db:migrate --env production```  correrá las migraciones pendientes en ambiente produccion.
```npx sequelize-cli db:seed:all ``` correra todos los seed

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
- [Pasos para hacer un Deploy de una aplicacion Nodejs en AWS EC2 usando GitHub Actions](#pasos-para-hacer-un-deploy-de-una-aplicacion-nodejs-en-aws-ec2-usando-github-actions)

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

10. npx sequelize-cli db:seed:all correrá todos seeders en el ambiente donde estemos, esto nos lo indica la variable de entorno NODE_ENV

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



# Pasos para hacer un Deploy de una aplicacion Nodejs en AWS EC2 usando GitHub Actions

1. para ello debemos crear primero, el la raiz del proyecto debemos crear un archivo sin extension, y lo debemos llamar ```Dockerfile``` con un contenido acorde a nuestro proyecto para este ejemplo este es el contenido
   ```
        FROM node:18
        RUN mkdir -p /usr/src/app
        WORKDIR /usr/src/app
        COPY package*.json ./
        RUN npm install
        COPY . .
        EXPOSE 3000
        CMD [ "npm", "run", "dev" ]
   ```

2. ahora en la raiz del proyecto debemos crear un archivo llamado ```.dockerignore```, en el que indicaremos que archivos no se introduciran en la imagen, por ejemplo: 
   ```
        .vscode
        .git
        .gitignore
        node_modules
        npm-debug.log
   ```

3. Ahora debemos ir a github desde un navegador web, y:
   * visitar nuestro repositorio, estando alli hacemos click ```Settings```,
   * despues hacemos click en ```Secrets and variables```, despues presionamos en ```Actions```,
   * estando en la pestaña de ```Secrets```, debemos colocar nuestras credenciales para docker hub, para ello hacemos click en ```New Repositiry Secret```, y en:
     * ```Name``` escribimos ```DOCKER_USERNAME```
     * y en ```Secret``` ```josueperezf@gmail.com```
   * hacemos click nuevamente en ```New Repositiry Secret```, en:
     * ```Name``` escribimos ```DOCKER_PASSWORD```
     * y en ```Secret``` ```12490067o```
   * todo esto para crear las variables de entorno que seran necesarias para conectarnos con ```docker hub```


4. debemos ir a aws y crear nuestra instancia ```EC2``` si no la tenemos la creamos, para este ejemplo utilizamos ```ubuntu```

5. Ahora debemos ir nuevamente al navegador web para consultar a la pagina de github y alli nuestro repositorio. estando en el debemos ir a ```Settings```, luego hacemos click en ```Actions```, y despues en ```Runners```  y hacer:
   1. hacemos click en ```New self-hosted runner```
   2. en ```Runner image``` seleccionamos ```Linux```, esto nos mostrará unos comandos que debemos ejecutarlos en nuestra terminal de la instancia ec2.
      * cuando nos diga aparezca ```Enter the name of the runner group to add this runner to:``` presionamos enter sin escribir nada
      * cuando nos salga ```Enter the name of runner: [press Enter for ip-xxx ] ``` alli colocamos ```aws-ec2``` y damos enter, recordemos que este nombre tambien lo colocamos en el archivo llamado ```cicd-workflow.yml```, asi que si lo cambiamos en uno, lo cambiamos en todos lados para que funcione
      * Cuando nos diga ```Enter any additional labels (ex. label-1, label-2) ...``` escribimos nuevamente ```aws-ec2``` 
      * Cuando nos salga el texto ```Enter name of work folder: [press Enter for _work]``` no escribimos nada, solo damos ```Enter``` en el teclado
   3. ahora para comprobar que todo esta bien, desde el navegador web visitamos nuestro repositorio, vamos a ```Settings```, luego hacemos click en ```Actions```, y despues en ```Runners``. si alli sale algo que diga ```aws-ec2``` y que este en estatus de color verde o activo o Idle o algo asi, entonces vamos por buen camino.








6. en la raiz del proyecto, en visual studio code, creamos una carpeta llamara ```.github```, y dentro de ella se crea otra carpeta con el nombre de: ```workflows```. en esta ultima creamos un archivo con el nombre ```cicd-workflow.yml```
   
7. en el archivo ```cicd-workflow.yml``` colocamos algo como:
   ```
   name: CICD
   
   on:
     push:
       branches: [cicd-docker-ec2]
   
   jobs:
     build:
       runs-on: [ubuntu-latest]
       steps:
         - name: Checkout source
           uses: actions/checkout@v3
         - name: Login to docker hub
           run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }} 
         - name: Build docker image
           run: docker build -t josueperezf/node_biblioteca-sequelize .
         - name: Publish image to docker hub
           run: docker push josueperezf/node_biblioteca-sequelize:latest
           
     deploy:
       needs: build
       runs-on: [aws-ec2]
       steps:
         - name: Pull image from docker hub
           run: docker pull josueperezf/node_biblioteca-sequelize:latest
         - name: Delete old container
           run: docker rm -f node_biblioteca-sequelize-container
         - name: Run docker container
           run: docker run -d -p 3000:3000 --name node_biblioteca-sequelize-container josueperezf/node_biblioteca-sequelize
   ```

8. explicacion, del archivo anterior ```cicd-workflow.yml```, 
   1. ```branches``` es la rama de la que se hara despliegue 
   2. ```jobs``` son los trabajos que hara este archivo
   3. ```workflows```  es un flujo de trabajo, Un flujo de trabajo es un proceso automatizado configurable que ejecutará uno o más jobs. Los flujos de trabajo se definen mediante un archivo de YAML que se verifica en tu repositorio y se ejecutará cuando lo active un evento dentro de este o puede activarse manualmente o en una programación definida. Los flujos de trabajo se definen en el directorio .github/workflows
   4. ```steps``` son los pasos que se ejecutaran
   5. ```uses``` ```actions/checkout@v3``` hace referencia al repositorio ```https://github.com/actions/checkout```. no se en verdad si sea solo para nodejs o algo asi
   6. ```name``` es el nombre descriptivo de la tarea que queremos que se ejecute en la terminal de ubuntu
   7. ```run``` es el comando que se debe ejecutar en la terminal, ejemplo, podriamos colocar ```npm install```
   8. IMPORTANTE: si queremos correr el archivo ```cicd-workflow.yml```, hay varias formas, una es estando en la pagina de github, entramos al repositorio del proyecto, vamos a donde dice ```Actions``` y alli saldra jobs o build, esto ejecutara los comandos y nos mostrara paso a paso lo que esta haciendo




18
