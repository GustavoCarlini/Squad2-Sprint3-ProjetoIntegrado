
export default function trataTipos(arr:any){
    
    let tipo = [];
    for(let i:any = 0 ; i < arr.length ; i++){
        tipo.push({id:arr[i].id, categoria:arr[i].categoria})
    }
    return tipo
}