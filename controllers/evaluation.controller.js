//definição das constantes
const connect = require('../config/connect.js');



//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Evaluation ', function(err,
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
    const id_evaluation = req.sanitize('id_evaluation').escape();
    const post = {
        id_evaluation: id_evaluation
    };
    connect.con.query('SELECT * from Evaluation where id_evaluation = ? ', post,
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
    const id_evaluation = req.sanitize("id_evaluation").escape();
    const description = req.sanitize('description').escape();
    const grade = req.sanitize('grade').escape();
    const Occurrence_team_id_occurrence_team = req.sanitize('Occurrence_team_id_occurrence_team').escape();
    const User_id_user = req.sanitize('User_id_user').escape();
    var query = "";
    var post = {
        id_evaluation: id_evaluation,
        description: description,
        grade: grade,
        Occurrence_team_id_occurrence_team: Occurrence_team_id_occurrence_team,
        User_id_user: User_id_user
    };
    query = connect.con.query('INSERT INTO Evaluation SET ?', post, function(err, rows, fields) {
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
    var id_evaluation = req.params.id_evaluation;
    const description = req.sanitize('description').escape();
    const grade = req.sanitize('grade').escape();
    const Occurrence_team_id_occurrence_team = req.sanitize('Occurrence_team_id_occurrence_team').escape();
    const User_id_user = req.sanitize('User_id_user').escape();
    console.log(id_evaluation);
    var query = "";
    var update = {
       id_evaluation: id_evaluation,
       description: description,
       grade: grade,
       Occurrence_team_id_occurrence_team:Occurrence_team_id_occurrence_team,
       User_id_user: User_id_user
    };
    query = connect.con.query('UPDATE Evaluation SET description =?, grade =?, Occurrence_team_id_occurrence_team =?, User_id_user =? where id_evaluation =?', [description, grade, Occurrence_team_id_occurrence_team, User_id_user, id_evaluation], function(err, rows,
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
    const id_evaluation = req.sanitize('id_evaluation').escape();
    const post = {
        id_evaluation: id_evaluation
    };
    connect.con.query('DELETE from Evaluation where id_evaluation = ?', [id_evaluation], function(err, rows, fields) {
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
