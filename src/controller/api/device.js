const BaseRest = require('../rest.js');
const moment = require('moment');

const modelName = 'product_category';
module.exports = class extends BaseRest {
  /**
   *
   * 获取所有商品类别
   * @returns
   */
  async getAction() {
    let catagory = await this.model(modelName);
    let data = null;
    if (this.get('startTime') && this.get('endTime')) {
      data = await catagory.where({ modify_time: ['between', this.get('startTime'), this.get('endTime')] }).order('modify_time DESC').page(this.get('current'), this.get('pageSize')).countSelect();
    } else {
      data = await catagory.order('modify_time DESC').page(this.get('current'), this.get('pageSize')).countSelect();
    }
    return this.success(data);
  }

  /**
 * 新增商品类别
 *
 * @returns
 */
  async postAction() {
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
      code: this.post('code'),
      category: this.post('category'),
      create_time: createTime,
      modify_time: createTime
    };
    const id = await this.model(modelName).add(data);
    if (id) {
      return this.success({ data, ...{ id } }, '添加成功');
    } else {
      return this.fail(1000, '添加失败');
    }
  }

  /**
   * 更新商品类别
   *
   * @returns
   */
  async putAction() {
    const id = this.id;
    if (!id) {
      return this.fail(40000, '商品类型不存在');
    }
    const requestData = this.post();
    const updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
      id: id,
      category: requestData.category,
      modify_time: updateTime
    };
    const res = await this.model(modelName).where({ id: id }).update(data);
    if (res) {
      const newData = await this.model(modelName).where({ id: id }).find();
      return this.success(newData);
    } else {
      return this.fail(20000, '商品类型更新失败');
    }
  }

  /**
   *
   * 删除商品类别
   * @returns
   */
  async deleteAction() {
    if (!this.id) {
      return this.fail(20000, '商品类别不存在');
    }
    const rows = await this.model(modelName).where({ id: this.id }).delete();
    if (rows) {
      return this.success({ affectedRows: rows }, '删除成功');
    } else {
      return this.fail(1000, '删除失败');
    }
  }
};
