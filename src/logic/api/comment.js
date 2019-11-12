module.exports = class extends think.Logic {
  postAction() {
    const rules = {
      comment: {
        string: true,
        required: true
      },
      name: {
        string: true,
        required: true
      },
      phone: {
        string: true,
        required: true
      },
    };
    const msgs = {
      comment: '留言内容不能为空',
      name: '姓名不能为空',
      phone: '联系方式不能为空',
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, '接口数据不符合要求', this.validateErrors);
    }
  }
};
