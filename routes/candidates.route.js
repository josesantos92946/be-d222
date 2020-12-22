const app = require('../server.js');
const controllerCandidates = require ('../controllers/candidates.controller.js');

app.get('/candidates/', controllerCandidates.read);
app.get('/candidates/:id_candidates', controllerCandidates.readID);
app.post('/candidates/', controllerCandidates.save);
app.put('/candidates/:id_candidates', controllerCandidates.update);
app.delete('/candidates/:id_candidates', controllerCandidates.deleteID);
