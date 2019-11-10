module.exports = class extends think.Logic {
  putAction() {
    const rules = {
      categoryCode: {
        string: true,
        required: true
      },
      name: {
        string: true,
        required: true
      },
      intro: {
        string: true,
        required: true
      },
      status: {
        int: { min: 0, max: 1 },
        required: true
      },
    };
    const msgs = {
      categoryCode: '商品分类名称不能为空',
      name: '商品名称不能为空',
      intro: '商品介绍不能为空',
      status: '商品状态只能是上架/下架'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, '接口数据不符合要求', this.validateErrors);
    }
  }
  postAction() {
    const rules = {
      categoryCode: {
        string: true,
        required: true
      },
      name: {
        string: true,
        required: true
      },
      intro: {
        string: true,
        required: true
      },
    };
    const msgs = {
      categoryCode: '商品分类名称不能为空',
      name: '商品名称不能为空',
      intro: '商品介绍不能为空',
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, '接口数据不符合要求', this.validateErrors);
    }
  }
};
