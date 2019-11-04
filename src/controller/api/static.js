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
    let data = { fileId: savepath, localName: file.name, basename: basename, openUrl: filepath };
    return this.success(data, '上传成功');
  }

  /**
   *
   * 删除静态资源
   * @returns
   */
  async deleteAction() {
    const fileId = this.post('fileId');
    const filepath = path.join(think.ROOT_PATH, 'www' + fileId);
    try {
      fs.unlinkSync(filepath);
      const data = { fileId: fileId }
      return this.success(data, '删除成功');
    } catch (error) {
      return this.fail(500, '删除文件异常');
    }
  }
};
