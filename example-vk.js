import Pool from './pool'
import Balance from './balance'

class VKPool extends Pool {
  constructor (data, token) {
    super(data)
    this.token = token
  }
  request (url) {
    return super.request(`${url}&${this.token}`)
  }
}

class VK {
  constructor () {
    this.pool = new Balance([
      new VKPool({requestPerSecond: 3}, /* VK.COM Access token */),
      new VKPool({requestPerSecond: 3}, /* VK.COM Access token */),
      new VKPool({requestPerSecond: 3}, /* VK.COM Access token */)
    ])
  }

  async load (method, params) {
    try {
      const url = `https://api.vk.com/method/${method}?v=5.62&${params.join('&')}`
      const response = await this.pool.request(url)
      const result = await response.json()
      return result
    } catch (e) {
      console.log('API_VK Err: ', e)
      return null
    }
  }
}

export default new VK()
