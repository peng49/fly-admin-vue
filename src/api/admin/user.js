import request from '@/utils/request'

export function login(data) {
    return request({
        url: 'http://localhost:8080/api/user/login',
        method: 'post',
        data
    })
}
