//Criação da aplicação express
const express = require('express');

//Definir a porta e o caminho do servidor
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;

//carregar bibliotecas globais
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const expressValidator = require('express-validator');

//iniciar a aplicação
var app = express();
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(expressValidator());
app.listen(port, function(err) {
   if (!err) {
      console.log('Your app is listening on ' + host + ' and port ' + port);
   
   }
   else { console.log(err); }
});

//forçar utilização das bibliotecas
app.use(cors());
app.use(cookieParser());
module.exports = app;
require('./routes/user.route.js');
require('./routes/partnership.route.js');
require('./routes/occurrence.route.js');
require('./routes/candidates.route.js');
require ('./routes/user_team.route.js');

