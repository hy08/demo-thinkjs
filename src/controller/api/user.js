const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const company = await this.model('user');
    const data = await company.find();
    return this.success(data);
  }
  async postAction() {
    const company = await this.model('user');
    const data = await company.find();
    return this.success(data);
  }
};
