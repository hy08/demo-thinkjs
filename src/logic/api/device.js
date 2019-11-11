module.exports = class extends think.Logic {
  postAction() {
    const rules = {
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
      name: '设备名称不能为空',
      intro: '设备介绍不能为空',
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, '接口数据不符合要求', this.validateErrors);
    }
  }
  putAction() {
    const rules = {
      name: {
        string: true,
        required: true
      },
      intro: {
        string: true,
        required: true
      }
    };
    const msgs = {
      name: '设备名称不能为空',
      intro: '设备介绍不能为空',
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, '接口数据不符合要求', this.validateErrors);
    }
  }
};
