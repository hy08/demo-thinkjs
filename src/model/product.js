module.exports = class extends think.Model {
  // 模型关联
  get relation() {
    return {
      product_category: {
        type: think.Model.BELONG_TO,
        key: 'category_code',
        fKey: 'code',
        field: (rModel, model) => {
          return 'code,category'
        },
        name: 'category'
      }
    };
  }
};
