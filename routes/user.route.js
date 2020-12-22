const app = require('../server');
const controllerUser = require('../controllers/user.controller.js');

app.get('/users/', controllerUser.read);
app.get('/users/:id_user', controllerUser.readID);
app.post('/users/', controllerUser.save);
app.put('/users/:id_user', controllerUser.update);
app.delete('/users/:id_user', controllerUser.deleteID);
