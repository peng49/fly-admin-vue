import request from '@/utils/request'

export function getPermissions() {
  return request.get('http://localhost:8080/api/auth/permissions')
}

export function addPermission(params) {
  return request.post('http://localhost:8080/api/auth/permissions', params)
}

export function editPermission(params) {
  return request.put('http://localhost:8080/api/auth/permissions/' + params.id, params)
}

export function deletePermission(params) {
  return request.delete('http://localhost:8080/api/auth/permissions/' + params.id)
}
