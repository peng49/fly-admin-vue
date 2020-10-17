import request from '@/utils/request'

export function getAllMenu(){
    return request.get('http://localhost:8080/api/auth/menus')
}

export function addMenu(params){
    return request.post('http://localhost:8080/api/auth/menus',params)
}

export function editMenu(params){
    return request.put('http://localhost:8080/api/auth/menus/'+params.id,params)
}

export function deleteMenu(params){
    return request.delete('http://localhost:8080/api/auth/menus/'+params.id)
}