module.exports = {
  async fail(errno = 20000, message = '', data = null) {
    console.log(this)
    const obj = {
      retCode: errno,
      message: message,
      data,
      status: this.status
    }
    this.type = this.config('jsonContentType')
    this.body = obj
    return false
  },
  async success(data = null) {
    console.log(this)
    const obj = {
      data,
      status: this.status
    }
    this.type = this.config('jsonContentType')
    this.body = obj
    return false
  }
}