const sql = require("./db.js");
//Construtor
const pedidoModel = function(pedido){
    this.hora = pedido.hora;
    this.status= pedido.status;
}
//Cria novo pedido no banco
pedidoModel.create = (pedido, result) => {
    sql.query("insert into pedidos set ?", pedido, (err, res) => {
        if (err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("pedido criado: ", {idpedidos: res.insertId, ...pedido});
        result(null, {idpedidos: res.insertId, ...pedido});
    })
};

//Seleciona pedido por ID
pedidoModel.findById = (pedidoId, result) => {
    sql.query("Select * from pedidos where idpedidos = "+pedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("pedido Encontrado", res[0]);
            result(null,res[0]);
        } else {
            result({type: "not_found"}, null);
            console.log("pedido não encontrado");
        }
    })
};


//Seleciona todos os pedidos
pedidoModel.getAll = result => {
    sql.query("SELECT * FROM pedidos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("pedido: ", res);
        result(null, res);
    })
};
//Atualizar pedido por id
pedidoModel.updateById = (pedidoId, pedido, result) => {
    sql.query("UPDATE pedidos SET hora = ?, status = ? WHERE idpedidos = ?",21
              [pedido.hora, pedido.status, pedidoId], (err, res) => {
                    if (err){
                        console.log("erro: ", err);
                        result(null, err);
                    } else if (res.affectedRows == 0){
                        result({ type: "not_found"}, null);
                    } else {
                        console.log("pedido atualizado: ", {idpedidos: pedidoId, ...pedido});
                        result(null, {idpedidos: pedidoId, ...pedido});
                    }
              });
};
//Remover pedido por id
pedidoModel.remove = (pedidoId, result) => {
    sql.query("DELETE FROM pedidos WHERE idpedidos = ?", pedidoId, (err, res) =>{
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
//Remover todos os pedidos
pedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM pedidos", pedidoId, (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = pedidoModel;