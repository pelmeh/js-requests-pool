export default class Pool {
  constructor ({requestPerSecond}) {
    this._pool = []
    this._fetching = false
    this._requestPerSecond = requestPerSecond
  }

  request (url) {
    return new Promise((resolve, reject) => {
      this._holder(resolve, reject, url)
    })
  }

  _holder (resolve, reject, url) {
    this._pool.push({resolve, reject, url})
    this._starter()
  }

  _starter () {
    if (!this.fetching) {
      this.fetching = true
      this._worker()
    }
  }

  async _worker () {
    while (this._pool.length > 0) {
      const startTime = new Date()
      await this._fetch(this._pool[0])
      const diff = new Date() - startTime
      this._pool.shift()
      await sleep((1000 / this._requestPerSecond) - diff)
    }
    this.fetching = false
  }

  async _fetch ({resolve, reject, url}) {
    try {
      const response = await fetch(url)
      resolve(response)
    } catch (e) {
      console.log('Pool err: ', e)
      resolve({'response':{'count':0,'items':[]}})
    }
  }
}