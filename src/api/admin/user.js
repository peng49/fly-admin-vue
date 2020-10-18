import request from '@/utils/request'

export function getUsers() {
  return request.get('http://localhost:8080/api/auth/users')
}

export function addUser(params) {
  return request.post('http://localhost:8080/api/auth/users', params)
}

export function editUser(params) {
  return request.put('http://localhost:8080/api/auth/users/' + params.id, params)
}

export function deleteUser(params) {
  return request.delete('http://localhost:8080/api/auth/users/' + params.id)
}
