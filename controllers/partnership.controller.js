//definição das constantes
const connect = require('../config/connect.js');


//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    
    connect.con.query('SELECT * from Partnership ', function(err,
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
    const id_partnership  = req.sanitize('id_partnership').escape();
    const post = {
        id_partnership: id_partnership
    };
    connect.con.query('SELECT * from Partnership where id_partnership  =? ', [id_partnership],
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
    const id_partnership = req.sanitize("id_partnership").escape();
    const name = req.sanitize("name").escape();
    const contact = req.sanitize("contact").escape();
    const User_id_user = req.sanitize("User_id_user").escape();
    
    var query = "";
    var post = {
        id_partnership: id_partnership,
        name: name,
        contact: contact,
        User_id_user: User_id_user
        
    };
    
    query = connect.con.query('INSERT INTO Partnership SET ?', post, function(err, rows, fields) {
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
    var id_partnership = req.params.id_partnership;
    const name = req.sanitize("name").escape();
    const contact = req.sanitize("contact").escape();
    const User_id_user = req.sanitize("User_id_user").escape();
    console.log(id_partnership);
    var query = "";
    var update = {
       id_partnership: id_partnership,
       name: name,
       contact: contact,
       User_id_user: User_id_user
       
    };
    query = connect.con.query('UPDATE Partnership SET name =?, contact =?, User_id_user =? WHERE id_partnership =?', [name, contact, User_id_user, id_partnership], function(err, rows,
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
    const id_partnership = req.sanitize("id_partnership").escape();
    const post = {
        id_partnership: id_partnership
    };
    connect.con.query('DELETE from Partnership where id_partnership = ?', [id_partnership], function(err, rows, fields) {
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

/*function hideDIV() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}*/

//exportar as funções
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID
};
