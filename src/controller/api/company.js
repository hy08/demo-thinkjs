const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const company = await this.model('company');
    const data = await company.find();
    return this.success(data);
  }
  async putAction() {
    const data = this.post();
    const res = await this.model('company').where('id=0').update(data);
    if (res) {
      return this.success(data);
    } else {
      return this.fail(20000, '公司信息更新失败');
    }
  }
};
