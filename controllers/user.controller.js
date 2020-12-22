//definição das constantes
const saltRounds = 10;
const connect = require('../config/connect.js');
var bcrypt = require('bcryptjs');


//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * FROM User ', function(err,
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
    const id_user = req.sanitize('id_user').escape();
    const post = {
        id_user: id_user
    };
    connect.con.query('SELECT * from User where id_user = ? ', [id_user],
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
    const id_user = req.sanitize('id_user').escape();
    const user_type = req.sanitize('user_type').escape();
    const address = req.sanitize('address').escape();
    const name = req.sanitize('name').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const Citizen_id_citizen = req.sanitize('Citizen_id_citizen').escape();
    const User_team_id_user_team = req.sanitize('User_team_id_user_team').escape();
    const Speciality_id_speciality = req.sanitize('Speciality_id_speciality').escape();
    const phone = req.sanitize('phone').escape();
    const photo = req.sanitize('photo').escape();
    console.log("without hash:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) {
        var post = {
            id_user: id_user,
            user_type: user_type,
            address: address,
            name: name,
            email: email,
            password: hash,
            Citizen_id_citizen: Citizen_id_citizen,
            User_team_id_user_team: User_team_id_user_team,
            Speciality_id_speciality: Speciality_id_speciality,
            phone: phone,
            photo: photo
          
        };
        console.log("with hash:" + hash);
        query = connect.con.query('INSERT INTO User SET ?', post, function(err, rows, fields) {
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
    });
}


//efetuar updade de todos os dados para um determinado iduser
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    var id_user = req.params.id_user;
    const user_type = req.sanitize('user_type').escape();
    const name = req.sanitize('name').escape();
    const address = req.sanitize('address').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    const Citizen_id_citizen = req.sanitize('Citizen_id_citizen').escape();
    const User_team_id_user_team = req.sanitize('User_team_id_user_team').escape();
    const Speciality_id_speciality = req.sanitize('Speciality_id_speciality').escape();
    const phone = (req.sanitize('phone').escape());
    const photo = req.sanitize('photo').escape();
    console.log('id_user');
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log("with hash:" + hash);
        var update = {

        };
        query = connect.con.query('UPDATE User SET user_type =?, address =?, name =?, email =?, password =?, Citizen_id_citizen =?, User_team_id_user_team =?, Speciality_id_speciality =?, phone =?, photo =? where id_user=?', [user_type, address,name, email, password, Citizen_id_citizen, User_team_id_user_team, Speciality_id_speciality, phone, photo, id_user], function(err, rows,
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
    });
}

//função que apaga todos os dados de um iduser
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const id_user = req.sanitize('id_user').escape();
    const post = {
        id_user: id_user
    };
    connect.con.query('DELETE from User where id_user = ?', [id_user], function(err, rows, fields) {
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
