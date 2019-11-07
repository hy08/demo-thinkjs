module.exports = class extends think.Model {
  // 模型关联
  get relation() {
    return {
      product_category: {
        type: think.Model.BELONG_TO,
        model: 'product_category',
        key: 'code',
        fKey: 'category_code',
        field: 'category'
      }
    };
  }
};
