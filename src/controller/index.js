const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const contents = await this.model('company').find();
    return this.display();
  }
};
