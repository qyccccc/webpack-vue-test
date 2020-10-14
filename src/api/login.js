import request from '@/utils/request'

export function login(params) {
  return request({
    url: 'Login/Login',
    method: 'post',
    params:params
  })
}

export function getMenu() {
  return request({
    url: 'SystemMenu/GetUserMenuTree',
    method: 'get',
  })
}