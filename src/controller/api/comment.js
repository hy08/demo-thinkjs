const BaseRest = require('../rest.js');
const lodash = require('lodash');
const moment = require('moment');
const GlobalVar = require('../../utils/G_Enum');
const modelName = 'comment';
module.exports = class extends BaseRest {
  /**
   *
   * 获取留言
   * @returns
   */
  async getAction() {
    let product = await this.model(modelName);
    const queryData = this.get();
    const startTime = queryData.startTime ? queryData.startTime : GlobalVar.G_Date.initial.format('YYYY-MM-DD HH:mm:ss');
    const endTime = queryData.endTime ? queryData.endTime : GlobalVar.G_Date.tomorrow.format('YYYY-MM-DD HH:mm:ss');
    //是否需要分页
    const pagination = lodash.isNil(queryData.current) || lodash.isNil(queryData.pageSize) ? false : { current: queryData.current, pageSize: queryData.pageSize }
    let data = null;
    if (pagination) {
      data = await product.where({ create_time: ['between', startTime, endTime] }).order('create_time DESC').page(pagination.current, pagination.pageSize).countSelect();
    } else {
      data = await product.where({ create_time: ['between', startTime, endTime], }).order('create_time DESC').select();
    }
    return this.success(data);
  }

  /**
 * 新增留言
 *
 * @returns
 */
  async postAction() {
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
      name: this.post('name'),
      phone: this.post('phone'),
      comment: this.post('comment'),
      create_time: createTime,
    };
    const id = await this.model(modelName).add(data);
    if (id) {
      return this.success({ data, ...{ id } }, '添加成功');
    } else {
      return this.fail(1000, '添加失败');
    }
  }

  /**
   *
   * 删除留言
   * @returns
   */
  async deleteAction() {
    if (!this.id) {
      return this.fail(20000, '留言不存在');
    }
    const rows = await this.model(modelName).where({ id: this.id }).delete();
    if (rows) {
      return this.success({ affectedRows: rows }, '删除成功');
    } else {
      return this.fail(1000, '删除失败');
    }
  }
};
