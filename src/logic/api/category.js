module.exports = class extends think.Logic {
  putAction() {
    const rules = {
      code: {
        string: true,
        required: true
      },
      name: {
        string: true,
        required: true
      }
    };
    const msgs = {
      code: '商品分类编号不能为空',
      name: '商品分类名称不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, 'validate error', this.validateErrors);
    }
  }
  postAction() {
    const rules = {
      code: {
        string: true,
        required: true
      },
      name: {
        string: true,
        required: true
      }
    };
    const msgs = {
      code: '商品分类编号不能为空',
      name: '商品分类名称不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, 'validate error', this.validateErrors);
    }
  }
};
