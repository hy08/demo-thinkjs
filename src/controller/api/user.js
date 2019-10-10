const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const id = this.id;
    const company = await this.model('user').where(`id=${id}`).select();
    return this.success(company);
  }
  async putAction() {
    const data = this.post();
    const res = await this.model('user').where(`id=${data.id}`).update(data);
    if (res) {
      return this.success(data);
    } else {
      return this.fail(20000, '用户信息更新失败');
    }
  }
};
