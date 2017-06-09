# js-requests-pool

Make some requests - Pool will balance your requests (by API keys) and execute them consistently.  
Support `request per second limit`

# Usage
#### Example API VK.COM REQUEST POOL

* Import liblary

```
import Pool from './pool'
import Balance from './balance'
```

* Define own pool

```
class VKPool extends Pool {
  constructor (data, token) {
    super(data)
    this.token = token
  }
  request (url) {
    return super.request(`${url}&${this.token}`)
  }
}
```

* Difine adapter

```

class VK {
  constructor () {
    // This is few connetcions with different API keys
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
```

You can use instance of `VK` (ex. Your adapter) and call method `load` and get `Promise`
