
export default function trataLogins(arr:any){
    
    let login = [];
    for(let i:any = 0 ; i < arr.length ; i++){
        login.push({id:arr[i].id})
    }
    return login
}