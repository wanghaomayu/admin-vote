import { API, request } from '../utils'

const login = async (data) => {
  return request({
    url: API.login,
    method: 'post',
    token: true,
    data
  })
}

export { login }
