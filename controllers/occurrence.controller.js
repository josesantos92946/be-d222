//definição das constantes
const connect = require('../config/connect.js');



//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Occurrence ', function(err,
        rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}



//função de leitura que retorna o resultado de um iduser
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const post = {
        id_occurrence: id_occurrence
    };
    connect.con.query('SELECT * from Occurrence where id_occurrence = ? ', post,
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                }
                else {
                    res.status(200).send(rows);
                }
            }
            else
                res.status(400).send({
                    "msg": err.code
                });
            console.log('Error while performing Query.', err);
        });
}


//função de gravação que recebe os 3 parâmetros
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const id_occurrence = req.sanitize("id_occurrence").escape();
    const data = req.sanitize('data').escape();
    const description = req.sanitize('description').escape();
    const urgency_degree = req.sanitize('urgency_degree').escape();
    const duration_time = req.sanitize('duration_time').escape();
    const Speciality_id_speciality = req.sanitize('Speciality_id_speciality').escape();
    const state = req.sanitize('state').escape();
    const Occurrence_team_id_occurrence_team = req.sanitize('Occurrence_team_id_occurrence_team').escape();
    var query = "";
    var post = {
        id_occurrence: id_occurrence,
        data: data,
        description: description,
        urgency_degree: urgency_degree,
        duration_time: duration_time,
        Speciality_id_speciality: Speciality_id_speciality,
        state: state,
        Occurrence_team_id_occurrence_team: Occurrence_team_id_occurrence_team
        
    };
    query = connect.con.query('INSERT INTO Occurrence SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
            else res.status(400).send({ "msg": err.code });
        }
    });
}


//efetuar updade de todos os dados para um determinado iduser
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    var id_occurrence = req.params.id_occurrence;
    const data = req.sanitize('data').escape();
    const description = req.sanitize('description').escape();
    const urgency_degree = req.sanitize('urgency_degree').escape();
    const duration_time = req.sanitize('duration_time').escape();
    const state = req.sanitize('state').escape();
    const Speciality_id_speciality = req.sanitize('Speciality_id_speciality').escape();
    const Occurrence_team_id_occurrence_team = req.sanitize('Occurrence_team_id_occurrence_team').escape();
    console.log (id_occurrence);
    var query = "";
    var update = {
       id_occurrence: id_occurrence,
       data: data,
       description: description,
       urgency_degree: urgency_degree,
       duration_time: duration_time,
       Speciality_id_speciality: Speciality_id_speciality,
       state:state,
       Occurrence_team_id_occurrence_team:Occurrence_team_id_occurrence_team
       
    };
    query = connect.con.query('UPDATE Occurrence SET data =? ,description =?, urgency_degree =? , duration_time =?, state =?, Speciality_id_speciality =? ,Occurrence_team_id_occurrence_team =? where id_occurrence = ? ', [data, description, urgency_degree, duration_time, state, Speciality_id_speciality, Occurrence_team_id_occurrence_team, id_occurrence], function(err, rows,
        fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({ "msg": "update with success" });
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}

//função que apaga todos os dados de um iduser
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const id_occurrence = req.sanitize('id_occurrence').escape();
    const post = {
        id_occurrence: id_occurrence
    };
    connect.con.query('DELETE from Occurrence where id_occurrence = ?', [id_occurrence], function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

//exportar as funções
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID
};
