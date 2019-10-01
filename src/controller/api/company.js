const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const company = await this.model('company');
    const data = await company.find();
    return this.success(data);
  }
};
