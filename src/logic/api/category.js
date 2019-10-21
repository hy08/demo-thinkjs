module.exports = class extends think.Logic {
  putAction() {
    const rules = {
      category: {
        string: true,
        required: true
      }
    };
    const msgs = {
      category: '商品分类名称不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, '接口数据不符合要求', this.validateErrors);
    }
  }
  postAction() {
    const rules = {
      code: {
        string: true,
        required: true
      },
      category: {
        string: true,
        required: true
      }
    };
    const msgs = {
      code: '商品分类编号不能为空',
      category: '商品分类名称不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, '接口数据不符合要求', this.validateErrors);
    }
  }
};
