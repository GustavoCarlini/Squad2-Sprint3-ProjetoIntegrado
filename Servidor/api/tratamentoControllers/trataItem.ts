
export default function trataItens(arr:any){

    let item = [];
    for(let i: any = 0 ; i < arr.length ; i++){
        item.push({id: arr[i].id, numeracao: arr[i].numeracao, tipoId: arr[i].tipoId})
    }
    return item
}