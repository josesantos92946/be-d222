const app = require('../server.js');
const controllerOccurrence = require ('../controllers/occurrence.controller.js');

app.get('/occurrence/', controllerOccurrence.read);
app.get('/occurrence/:id_occurrence', controllerOccurrence.readID);
app.post('/occurrence/', controllerOccurrence.save);
app.put('/occurrence/:id_occurrence', controllerOccurrence.update);
app.delete('/occurrence/:id_occurrence', controllerOccurrence.deleteID);
