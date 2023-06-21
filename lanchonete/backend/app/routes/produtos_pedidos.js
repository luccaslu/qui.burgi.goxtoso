module.exports = app => {
    const produto_pedidoController = require("../controllers/produtos_pedidos.controller");
    //Rota para criar um novo registro produto_pedido
    app.post("/produto_pedidos", produto_pedidoController.create);
    //Buscar todos os registros de produto_pedidos
    app.get("/produto_pedidos", produto_pedidoController.findAll);
    //Buscar apenas um registro de produto_pedido
    app.get("/produto_pedidos/:produto_pedidoId", produto_pedidoController.findById);
    //Alterar um registro de produto_pedido
    app.put("/produto_pedidos/:produto_pedidoId", produto_pedidoController.update);
    //Excluir um regstro de produto_pedido
    app.delete("/produto_pedidos/:produto_pedidoId", produto_pedidoController.delete);
    //Excluir todos os registros de produto_pedido
    app.delete("/produto_pedidos", produto_pedidoController.deleteAll);
}