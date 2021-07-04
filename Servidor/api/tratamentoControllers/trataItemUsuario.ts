
export default function trataItensUsuario(arr:any){

    let itensUsuario = [];
    for (let i:any = 0; i < arr.length; i++) {
        itensUsuario.push({ id: arr[i].id, itemId: arr[i].itemId, usuario_id: arr[i].usuarioId })
    }
    return itensUsuario
}