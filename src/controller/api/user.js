const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const id = this.id;
    const company = await this.model('user').where(`id=${id}`).select();
    return this.success(company);
  }
  async putAction() {
    const data = this.post();
    const user = this.model('user');
    let res = null;
    if (think.isEmpty(data.password)) {
      res = await user.where(`id=${data.id}`).update(data);
    } else {
      data.password = user.sign({}, data.password);
      res = await user.where(`id=${data.id}`).update(data);
    }
    if (res) {
      return this.success(data);
    } else {
      return this.fail(20000, '用户信息更新失败');
    }
  }
};
