const app = require('../server.js');

const controllerPartnership = require('../controllers/partnership.controller.js');


app.get('/partnership/', controllerPartnership.read);
app.get('/partnership/:id_partnership', controllerPartnership.readID);
app.post('/partnership/', controllerPartnership.save);
app.put ('/partnership/:id_partnership', controllerPartnership.update);
app.delete ('/partnership/:id_partnership', controllerPartnership.deleteID);

