//definição das constantes
const connect = require('../config/connect.js');



//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from User_team ', function(err, rows, fields) {
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
    const id_user_team  = req.sanitize('id_user_team').escape();
    const post = {
        id_user_team: id_user_team
    };
    connect.con.query('SELECT * from User_team where id_user_team = ? ', post, function(err, rows, fields) {
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
    const id_user_team = req.sanitize("id_user_team").escape();
    const state = req.sanitize("state").escape();
    const Occurrence_team_id_occurrence_team = req.sanitize("Occurrence_team_id_occurrence_team").escape();
    const Speciality_id_speciality = req.sanitize ("Speciality_id_speciality").escape();
    var query = "";
    var post = {
        id_user_team: id_user_team,
        state: state,
        Occurrence_team_id_occurrence_team:Occurrence_team_id_occurrence_team,
        Speciality_id_speciality: Speciality_id_speciality

    };
    query = connect.con.query('INSERT INTO User_team SET ?', post, function(err, rows, fields) {
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
    var id_user_team = req.params.id_user_team;
    const state = req.sanitize("state").escape();
    const Occurrence_team_id_occurrence_team = req.sanitize("Occurrence_team_id_occurrence_team").escape();
    const Speciality_id_speciality = req.sanitize ("Speciality_id_speciality").escape();
    console.log('id_user_team');
    var query = "";
    var update = {
        id_user_team: id_user_team,
        state: state,
        Occurrence_team_id_occurrence_team: Occurrence_team_id_occurrence_team,
        Speciality_id_speciality: Speciality_id_speciality
        
       
    };
    query = connect.con.query('UPDATE User_team SET  state =?, Occurrence_team_id_occurrence_team =?, Speciality_id_speciality =? where id_user_team =?', [state, Occurrence_team_id_occurrence_team, Speciality_id_speciality, id_user_team], function(err, rows, fields) {
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
    const id_user_team = req.sanitize("id_user_team").escape();
    const post = {
        id_user_team: id_user_team
    };
    connect.con.query('DELETE from User_team where id_user_team = ?', [id_user_team], function(err, rows, fields) {
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
