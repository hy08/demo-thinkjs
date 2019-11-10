const BaseRest = require('../rest.js');
const lodash = require('lodash');
const moment = require('moment');
const GlobalVar = require('../../utils/G_Enum');
const modelName = 'product';
module.exports = class extends BaseRest {
  /**
   *
   * 获取商品
   * @returns
   */
  async getAction() {
    let product = await this.model(modelName);
    const queryData = this.get();
    const startTime = queryData.startTime ? queryData.startTime : GlobalVar.G_Date.initial.format('YYYY-MM-DD HH:mm:ss');
    const endTime = queryData.endTime ? queryData.endTime : GlobalVar.G_Date.final.format('YYYY-MM-DD HH:mm:ss');
    const categoryCode = queryData.categoryCode && queryData.categoryCode !== 'null' ? queryData.categoryCode : ['!=', null];
    const name = queryData.name && queryData.name !== 'null' ? queryData.name : ['!=', null];
    //是否需要分页
    const pagination = lodash.isNil(queryData.current) || lodash.isNil(queryData.pageSize) ? false : { current: queryData.current, pageSize: queryData.pageSize }
    let data = null;
    if (pagination) {
      data = await product.where({ modify_time: ['between', startTime, endTime], category_code: categoryCode, name: name, }).order('modify_time DESC').page(pagination.current, pagination.pageSize).countSelect();
    } else {
      data = await product.where({ modify_time: ['between', startTime, endTime], category_code: categoryCode, name: name, }).order('modify_time DESC').select();
    }
    return this.success(data);
  }

  /**
 * 新增商品
 *
 * @returns
 */
  async postAction() {
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const pics = this.post('picList') ? lodash.join(this.post('picList'), ',') : '';
    const data = {
      name: this.post('name'),
      category_code: this.post('categoryCode'),
      intro: this.post('intro'),
      pics: pics,
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
   * 更新商品
   *
   * @returns
   */
  async putAction() {
    const id = this.id;
    if (!id) {
      return this.fail(40000, '商品不存在');
    }
    const requestData = this.post();
    const updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = {
      id: id,
      name: requestData.name,
      category_code: requestData.categoryCode,
      pics: requestData.picList ? lodash.join(requestData.picList, ',') : '',
      intro: requestData.intro,
      status: requestData.status,
      modify_time: updateTime
    };
    const res = await this.model(modelName).where({ id: id }).update(data);
    if (res) {
      const newData = await this.model(modelName).where({ id: id }).find();
      return this.success(newData);
    } else {
      return this.fail(20000, '商品更新失败');
    }
  }

  /**
   *
   * 删除商品
   * @returns
   */
  async deleteAction() {
    if (!this.id) {
      return this.fail(20000, '商品不存在');
    }
    const rows = await this.model(modelName).where({ id: this.id }).delete();
    if (rows) {
      return this.success({ affectedRows: rows }, '删除成功');
    } else {
      return this.fail(1000, '删除失败');
    }
  }
};
