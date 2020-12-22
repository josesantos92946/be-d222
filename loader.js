//Ficheiro Loader permite definir um conjunto de estratégias que serão utilizadas pelo servidor

//Definir a constante app (inclui a aplicaçao exportada no ficheiro server.js), cria um router com as rotas (ficheiro main.route.js) e são chamados todos os modulos
//necessários no projeto e é criada uma ligação à pasta models
/*const app = require ('./server');
const router = require ('./routers/main.router');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require ('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser'); //servidor utiliza bodyparser para aceder aos dados
const expressValidator = require ('express-validator');
const models = require ('./models/');

//Para garantir que as variáveis definidas são utilizadas, temos de criar uma sessão que expire

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: 'webbookfca',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000, //verificar este valor
    httpOnly: true,
  }
}));
app.use(expressValidator());

//Verificar se a sessão existe ou se foi criada com sucesso, é necessário gerar uma função de verificação. Se a sessão ainda não estiver associada a uma variável
//do servidor, vai ser armazenada numa variável global (global.sessData).

app.use(function(req, res, next) {
  // check if session exists
  if (global.sessData === undefined) {
    global.sessData = req.session;
    global.sessData.ID = req.sessionID;
  }
  else { // yes, cookie was already present
    console.log('session exists', global.sessData.ID);
  }
  next();
});

//Para permitir logins, é necessário forçar a utilização do Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./routes/auth.route.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);

//Sincronização dos modelos do servidor (pasta models) com a BD
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});

//Finalização do ficheiro, sendo necessário forçar a utilização do router e exportar a aplicação (app).
app.use('/', router);
module.exports = app;*/




