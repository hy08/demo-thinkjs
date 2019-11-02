const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);
const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  /**
 * 新增静态资源
 *
 * @returns
 */
  async postAction() {
    const file = this.file('file');
    if (!file) {
      return this.fail(1000, '请上传文件');
    }
    // path.extname获取文件后缀名，可做上传控制
    const extname = path.extname(file.name);
    const filename = path.basename(file.path);
    const basename = think.md5(filename) + extname;
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const savepath = '/uploads/' + year + '/' + month + '/' + basename;
    const filepath = path.join(think.ROOT_PATH, 'www' + savepath);
    think.mkdir(path.dirname(filepath));
    rename(file.path, filepath);

    let data = { url: savepath, basename: basename, filepath: filepath };
    await this.hook('upload', data);
    delete data.filepath;
    return this.success(data, '上传成功');
  }

  /**
   *
   * 删除静态资源
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
