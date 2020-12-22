//definição das constantes
const connect = require('../config/connect.js');



//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Register ', function(err,
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
    const id_register  = req.sanitize('id_register').escape();
    const post = {
        id_register: id_register
    };
    connect.con.query('SELECT * from Register where id_register = ? ', post,
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
    const id_register = req.sanitize("id_register").escape();
    const name = req.sanitize("name").escape();
    const address = req.sanitize("address").escape();
    const email = req.sanitize("email").escape();
    const contact = req.sanitize("contact").escape();
    const nif = req.sanitize("nif").escape();
    const Citizen_id_citizen = req.sanitize("Citizen_id_citizen").escape();
    const Occurrence_id_occurrence = req.sanitize("Occurrence_id_occurrence").escape();
    var query = "";
    var post = {
        id_register: id_register,
        name: name,
        address: address,
        email: email,
        contact: contact,
        nif: nif,
        Citizen_id_citizen: Citizen_id_citizen,
        Occurrence_id_occurrence: Occurrence_id_occurrence
        
    };
    query = connect.con.query('INSERT INTO Register SET ?', post, function(err, rows, fields) {
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
    var id_register = req.params.id_register;
    const name = req.sanitize("name").escape();
    const address = req.sanitize("address").escape();
    const email = req.sanitize("email").escape();
    const contact = req.sanitize("contact").escape();
    const nif = req.sanitize("nif").escape();
    const Citizen_id_citizen = req.sanitize("Citizen_id_citizen").escape();
    const Occurrence_id_occurrence = req.sanitize("Occurrence_id_occurrence").escape();
    console.log("id_register");
    var query = "";
    var update = {
        id_register: id_register,
        name: name,
        address: address,
        email: email,
        contact: contact,
        nif: nif,
        Citizen_id_citizen: Citizen_id_citizen,
        Occurrence_id_occurrence: Occurrence_id_occurrence
       
    };
    query = connect.con.query('UPDATE Register SET id_register =?, name =?, address =?, email =?, contact =?, nif =?, Citizen_id_citizen =?, Occurrence_id_occurrence =? where id_partnership =?', [name, address, email, contact, nif, Citizen_id_citizen, Occurrence_id_occurrence, id_register], function(err, rows,
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
    const id_register = req.sanitize("id_register").escape();
    const post = {
        id_register: id_register
    };
    connect.con.query('DELETE from Register where id_register = ?', [id_register], function(err, rows, fields) {
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
