//===================================================
//puerto
//===================================================

process.env.PORT = process.env.PORT || 3000; 


//===================================================
//Entorno
//===================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




//===================================================
//Base de datos
//===================================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB =process.env.MONGO_URI;
}



//===================================================
//VENCIMIENTO DEL TOKEN
//===================================================
//60 SEG
//60 MINUTOS
//24 HORAS
//30 DIAS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



//===================================================
//VENCIMIENTO DEL SEED O SEMILLA
//===================================================
//para la variable creamos una en heroku con el comando
//heroku config:set SEED="NOMBRE DEL SEED"
process.env.SEED = process.env.SEED || 'este-es-el-sed-de-desarrollo';



process.env.URLDB = urlDB;


