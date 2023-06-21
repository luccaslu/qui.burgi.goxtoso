const sql = require("./db.js");
//Construtor
const produtos_pedidosModel = function(produtos_pedidos){
    this.nome = produtos_pedidos.nome;
    this.valor= produtos_pedidos.valor;
}
//Cria novo produtos_pedidos no banco
produtos_pedidosModel.create = (produtos_pedidos, result) => {
    sql.query("insert into produtos_pedidoss set ?", produtos_pedidos, (err, res) => {
        if (err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("produtos_pedidos criado: ", {idprodutos_pedidos: res.insertId, ...produtos_pedidos});
        result(null, {idprodutos_pedidos: res.insertId, ...produtos_pedidos});
    })
};

//Seleciona produtos_pedidos por ID
produtos_pedidosModel.findById = (produtos_pedidosId, result) => {
    sql.query("Select * from produtos_pedidos where idprodutos_pedidos = "+produtos_pedidosId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("produtos_pedidos Encontrado", res[0]);
            result(null,res[0]);
        } else {
            result({type: "not_found"}, null);
            console.log("produtos_pedidos não encontrado");
        }
    })
};


//Seleciona todos os produtos_pedidoss
produtos_pedidosModel.getAll = result => {
    sql.query("SELECT * FROM produtos_pedidoss", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("produtos_pedidos: ", res);
        result(null, res);
    })
};
//Atualizar produtos_pedidos por id
produtos_pedidosModel.updateById = (produtos_pedidosId, produtos_pedidos, result) => {
    sql.query("UPDATE produtos_pedidoss SET nome = ?, valor = ? WHERE idprodutos_pedidoss = ?",21
              [produtos_pedidos.nome, produtos_pedidos.valor, produtos_pedidosId], (err, res) => {
                    if (err){
                        console.log("erro: ", err);
                        result(null, err);
                    } else if (res.affectedRows == 0){
                        result({ type: "not_found"}, null);
                    } else {
                        console.log("produtos_pedidos atualizado: ", {idprodutos_pedidoss: produtos_pedidosId, ...produtos_pedidos});
                        result(null, {idprodutos_pedidoss: produtos_pedidosId, ...produtos_pedidos});
                    }
              });
};
//Remover produtos_pedidos por id
produtos_pedidosModel.remove = (produtos_pedidosId, result) => {
    sql.query("DELETE FROM produtos_pedidoss WHERE idprodutos_pedidoss = ?", produtos_pedidosId, (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0){
            result({ type: "not_found"}, null);
        } else {
            result(null, res);
        }
    });
};
//Remover todos os produtos_pedidoss
produtos_pedidosModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos_pedidoss", produtos_pedidosId, (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = produtos_pedidosModel;