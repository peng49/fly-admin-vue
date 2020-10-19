import request from '@/utils/request'

export function getRoles() {
  return request.get('http://localhost:8080/api/auth/roles')
}

export function addRole(params) {
  return request.post('http://localhost:8080/api/auth/roles', params)
}

export function editRole(params) {
  return request.put('http://localhost:8080/api/auth/roles/' + params.id, params)
}

export function deleteRole(params) {
  return request.delete('http://localhost:8080/api/auth/roles/' + params.id)
}
