import database from '../models'
import trataItensUsuario from '../tratamentoControllers/trataItemUsuario'

module.exports = {
    async listarItensUsuario(req, res) {
        try {
            const itensUsu = await database.item_usuario.findAll()
            return res.status(200).json(trataItensUsuario(itensUsu))
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel listar os itens usuarios!" })
        }
    },
    async listarItemUsuario(req, res) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            return res.status(200).json({id:itemUsu.id, itemId:itemUsu.itemId, usuarioId:itemUsu.usuarioId})
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel listar o item usuario desejado!" })
        }
    },
    async inserirItemUsuario(req, res) {
        try {
            if (req.is('json')) {
                const itemUsu = await database.item_usuario.create(req.body)
                return res.status(201).json({id:itemUsu.id, itemId:itemUsu.itemId, usuarioId:itemUsu.usuarioId})
            } else {
                throw new Error("Desculpe, mas nao foi possivel inserir o item usuario desejado!")
            }
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel inserir o item usuario desejado!" })
        }
    },
    async atualizarItemUsuario(req, res) {
        try {
            if (req.is('json')) {
                const itemUsu = await database.item_usuario.findByPk(req.params.id)
                await itemUsu.update(req.body)
                res.status(200).json({id:itemUsu.id, itemId:itemUsu.itemId, usuarioId:itemUsu.usuarioId})
            } else {
                throw new Error("Desculpe, mas nao foi possivel atualizar o item usuario desejado!")
            }
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel atualizar o item usuario desejado!" })
        }
    },
    async deletarItemUsuario(req, res) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            await itemUsu.destroy(req.body)
            return res.status(200).json({ msg: "Item usuario deletado com sucesso" })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel deletar o item usuario desejado!" })
        }
    }
}

/*function trataItensUsuario(arr){
    let itensUsuario = [];
    for (let i = 0; i < arr.length; i++) {
        itensUsuario.push({ id: arr[i].id, itemId: arr[i].itemId, usuario_id: arr[i].usuarioId })
    }
    return itensUsuario
}*/