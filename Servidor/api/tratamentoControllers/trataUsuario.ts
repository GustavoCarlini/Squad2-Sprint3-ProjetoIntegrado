
export default function trataUsuarios(arr:any){
    
    let usuario = [];
    for(let i: any = 0 ; i < arr.length ; i++){
        usuario.push({nome: arr[i].nome, cpf: arr[i].cpf})
    }
    return usuario
}