const moment = require('moment');
const { Controller } = require('egg');

class BillController extends Controller {
  async add() {
    const { ctx, app } = this;
    try {
      const { pay_type, amount, date, type_id, type_name, remark = '' } = ctx.request.body;
      if (!pay_type || !amount || !type_id || !type_name) {
        ctx.body = {
          code: 400,
          msg: '请求参数错误',
          data: null,
        };
        return;
      }
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      await ctx.service.bill.add({
        pay_type,
        amount,
        date: date || moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        type_id,
        type_name,
        remark,
        user_id: decode.id,
      });
      ctx.response.success();
    } catch (err) {
      ctx.response.failure({ msg: err.message });
    }
  }

  async list() {
    const { ctx, app } = this;
    const { page_num, page_size, type_id, date } = ctx.request.query;
    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      const result = await ctx.service.bill.list({
        user_id: decode.id,
        page_num: Number(page_num),
        page_size: Number(page_size),
        type_id,
      });
      ctx.response.success({ data: result });
    } catch (err) {
      ctx.response.failure({ msg: err.message });
    }
  }

  async detail() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const { id } = ctx.params;

    if (!id) {
      ctx.response.failure({ msg: app.config.ERROR.MISSING_PARAMS });
      return;
    }

    try {
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      const result = await ctx.service.bill.detail({
        bill_id: id,
        user_id: decode.id,
      });
      ctx.response.success({ data: result });
    } catch (err) {
      ctx.response.failure({ msg: err.message });
    }
  }

  async update() {
    const { ctx, app } = this;
    const { id } = ctx.params;
    const { pay_type, amount, type_id, type_name, remark } = ctx.request.body;
    const token = ctx.request.header.authorization;
    if (!id) {
      ctx.response.failure({ msg: app.config.ERROR.MISSING_PARAMS });
      return;
    }
    try {
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      const params = { id, user_id: decode.id };
      if (pay_type) params.pay_type = pay_type;
      if (type_id && type_name) {
        params.type_id = type_id;
        params.type_name = type_name;
      }
      if (amount) params.amount = amount;
      if (remark) params.remark = remark;
      const result = await ctx.service.bill.update(params);
      if (result.affectedRows === 1) {
        ctx.response.success({ msg: '修改成功' });
      } else {
        ctx.response.failure({ msg: result.message });
      }
    } catch (err) {
      ctx.response.failure({ msg: err.message });
    }
  }

  async delete() {
    const { ctx, app } = this;
    const { id } = ctx.params;
    const token = ctx.header.authorization;

    try {
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      const result = await ctx.service.bill.delete({
        bill_id: id,
        user_id: decode.id,
      });
      if (result.affectedRows === 1) {
        ctx.response.success({ msg: '删除成功' });
      } else {
        ctx.response.failure({ msg: result.message });
      }
    } catch (err) {
      ctx.response.failure({ msg: err.message });
    }
  }
}

module.exports = BillController;
