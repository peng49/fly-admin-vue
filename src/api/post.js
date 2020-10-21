import request from '@/utils/request'

export function queryPosts(query) {
  console.log(query)
  return request({
    url: 'posts',
    method: 'get',
    params: query
  })
}
