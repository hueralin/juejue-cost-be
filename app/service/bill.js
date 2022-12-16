const { Service } = require('egg');

class BillService extends Service {
  async add(params) {
    const { app } = this;
    // result 是插入操作的执行结果
    const result = await app.mysql.insert('bill', params);
    return result;
  }

  async list(params) {
    const { ctx, app } = this;
    const { user_id, page_num, page_size, type_id } = params;
    const offset = ctx.helper.calcPagingOffset(page_num, page_size);
    const total = await app.mysql.count('bill', { user_id });
    const where = { user_id };
    if (type_id) {
      where.user_id = user_id;
    }
    // result 是查询出来的数据
    const result = await app.mysql.select('bill', {
      where,
      offset,
      limit: page_size,
    });
    return ctx.helper.formatPagingData({ page_num, page_size, total, list: result });
  }

  async detail(params) {
    const { app } = this;
    const { bill_id, user_id } = params;
    const result = await app.mysql.get('bill', { id: bill_id, user_id });
    return result;
  }

  async update(params) {
    const { app } = this;
    const result = await app.mysql.update('bill', {
      ...params,
    }, {
      id: params.id,
      user_id: params.user_id,
    });
    return result;
  }

  async delete(params) {
    const { app } = this;
    const { bill_id, user_id } = params;
    const result = await app.mysql.delete('bill', { id: bill_id, user_id });
    return result;
  }
}

module.exports = BillService;
