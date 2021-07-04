import database from '../models'
import {Request,Response} from 'express'
import trataItens from '../tratamentoControllers/trataItem'

class ItemController {
    async listarItens(req:Request ,res:Response){
        try{
            const itens = await database.Item.findAll()
            return res.status(200).json(trataItens(itens))
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:'Desculpe mas não foi possivel listar os itens!'})
        }
    }
    async listarItem(req:Request,res:Response){
        try{
            const item = await database.Item.findByPk(req.params.id)
            return res.status(200).json({id:item.id, numeracao:item.numeracao, tipoId:item.tipoId})
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:'Desculpe mas não foi possivel buscar o item!'})
        }
    }
    async inserirItem(req:Request,res:Response){
        try{
            if(req.is('json')){
                const item = await database.Item.create(req.body)
                return res.status(201).json({id:item.id, numeracao:item.numeracao, tipoId:item.tipoId})
            }else{
                throw new Error ("Desculpe mas nao foi possivel inserir um novo item!")
            } 
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe mas nao foi possivel inserir um novo item!"})
        }
    }
    async atualizarItem(req:Request,res:Response){
        try{
            if(req.is('json')){
                const item = await database.Item.findByPk(req.params.id)
                await item.update(req.body)
                res.status(200).json({id:item.id, numeracao:item.numeracao, tipoId:item.tipoId})
            }else{
                throw new Error("Desculpe mas nao foi possivel atualizar o item desejado!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe mas nao foi possivel atualizar o item desejado!"})
        }
    }
    async deletarItem(req:Request,res:Response){
        try{
            const item = await database.Item.findByPk(req.params.id)
            await item.destroy(req.body)
            return res.status(200).json({msg:"Item deletado com sucesso!"})
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe mas nao foi possivel deletar o item desejado!"})
        }
    }
}
export default new ItemController()

/*function trataItens(arr:any){
    let item = [];
    for(let i: any = 0 ; i < arr.length ; i++){
        item.push({id: arr[i].id, numeracao: arr[i].numeracao, tipoId: arr[i].tipoId})
    }
    return item
}*/
