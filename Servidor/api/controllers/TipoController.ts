import database from '../models'
import {Request,Response} from 'express'
import trataTipos from '../tratamentoControllers/trataTipo'

class TipoController {
    async listarTipos(req:Request,res:Response){
        try{
            const tipos = await database.Tipo.findAll()
            return res.status(200).json(trataTipos(tipos))
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar os tipos!"})
        }
    }
    async listarTipo(req:Request,res:Response){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            return res.status(200).json({id:tipo.id, categoria:tipo.categoria})
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar o tipo desejado!"})
        }
    }
    async inserirTipo(req:Request,res:Response){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.create(req.body)
            return res.status(201).json({id:tipo.id, categoria:tipo.categoria})
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo tipo!")
            } 
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir um novo tipo!"})
        }
    }
    async atualizarTipo(req:Request,res:Response){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.findByPk(req.params.id)
                await tipo.update(req.body)
                res.status(200).json({id:tipo.id, categoria:tipo.categoria})
            }else{
                throw new Error("Desculpe, mas nao foi possivel atualizar o tipo desejado!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o tipo desejado!"})
        }
    }
    async deletarTipo(req:Request,res:Response){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            await tipo.destroy(req.body)
            return res.status(200).json({msg:"Tipo deletado com sucesso!"})
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar o Tipo!"})
        }
    }
}

export default new TipoController()

/*function trataTipos(arr:any){
    let tipo = [];
    for(let i:any = 0 ; i < arr.length ; i++){
        tipo.push({id:arr[i].id, categoria:arr[i].categoria})
    }
    return tipo
}*/
