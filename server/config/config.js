process.env.PORT = process.env.PORT || 5000;


//Entorno

process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';


//token expired date
// 60 sec
// 60 min
// 24 hours
// 30 days
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

//auth sedd
process.env.SEED = process.env.SEED || 'delevopment-seed';

//Db
let urlDB;
if( process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://dbuser_testi:VbNLmStBJX4PweKJ@ds018238.mlab.com:18238/db_aa_project' ;
}else{
	urlDB = 'mongodb://dbuser_testi:VbNLmStBJX4PweKJ@ds018238.mlab.com:18238/db_aa_project';
	       //mongodb://<dbuser>:<dbpassword>@ds018238.mlab.com:18238/db_aa_project
}

process.env.urlDB = urlDB;

//Google client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '299174198893-p30cg0b0r48n1ojv81m9vl8h3e7ourj1.apps.googleusercontent.com';