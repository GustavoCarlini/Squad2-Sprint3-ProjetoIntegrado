import database from '../models'
const senhaHash = require('../estrategiaLogin/senhaHashController')
const jwt = require('jsonwebtoken')
import {Request,Response} from 'express'
//import trataLogins from '../tratamentoControllers/trataLogin' 

class LoginController{
    async listar(req:Request,res:Response){
        try{
            const login = await database.Login.findAll({attributes:["id"]})
            return res.status(200).json(login)
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpa, mas nao foi possivel listar os logins!"})
        }
    }
    login(req:Request,res:Response){
        const token = criaTokenJWT(req.body)
        res.set('Authorization', token)
        res.status(204).send();
    }
    async criarLogin(req:Request,res:Response){
        try{
            if(req.is('json')){
                req.body.senha = await senhaHash.adicionaSenha(req)
                const login = await database.Login.create(req.body)
                return res.status(201).json({"Login":login.id}) 
            }else{
                throw new Error("Desculpe, mas nao foi possivel criar um novo login!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel criar um novo login!"})
        }
    }
    async criarLoginAdm(req:Request,res:Response){
        try{
            if(req.is('json')){
                if(req.body.cpf && req.body.senha){
                    const usurioaAdm = await database.Usuario.findOne({ where: { cpf: req.body.cpf } })
                    if(usurioaAdm){
                        req.body.senha = await senhaHash.adicionaSenhaAdm(req)
                        await database.Login.update({ senha: req.body.senha }, {where: {usuarioId: usurioaAdm.id}});
                        return res.status(201).json({"CargoAtribuido":"Administrador"})
                    } 
                }
                if(req.body.usuarioId && req.body.senha){   
                    const usurioaAdm = await database.Usuario.findByPk(req.body.usuarioId)
                    if(usurioaAdm){
                        req.body.senha = await senhaHash.adicionaSenhaAdm(req)
                        await database.Login.update({ senha: req.body.senha }, {where: {usuarioId: req.body.usuarioId}});
                        return res.status(201).json({"CargoAtribuido":"Administrador"})
                    }   
                }else{
                    req.body.senha = await senhaHash.adicionaSenhaAdm(req)
                    const login = await database.Login.create(req.body)
                    return res.status(201).json({"Login":login.id, "Cargo":"Administrador"})
                    } 
            }else{
                throw new Error("Desculpe, mas nao foi possivel criar um novo login!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel criar um novo login!"})
        }
    }
    async atualizarLogin(req:Request,res:Response){
        try{
            if(req.is('json')){
                const login = await database.Login.findByPk(req.params.id)
                await login.update(req.body)
                res.status(200).json({"usuarioId":login.usuarioId, "senha":login.senha})
            }else{
                return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o login!"})
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o login!"})
        }
    }
}

function criaTokenJWT(login:{id:number, senha:string, usuarioId:number}){
    const payload = {
        id: login.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT)
    return token;
}
export default new LoginController()

/*function trataLogins(arr:any){
    let login = [];
    for(let i:any = 0 ; i < arr.length ; i++){
        login.push({id:arr[i].id})
    }
    return login
}*/
