export default class Balance {
  constructor (pools) {
    this.index = 0
    this.pools = pools
  }

  request (url) {
    this.index++
    if (this.index === this.pools.length) { this.index = 0 }
    return this.pools[this.index].request(url)
  }
}