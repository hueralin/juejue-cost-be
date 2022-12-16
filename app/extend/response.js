module.exports = {
  success({ status, data, msg }) {
    const { ctx } = this;
    ctx.status = status || 200;
    ctx.body = {
      code: 0,
      msg: msg || 'success',
      data: data || null,
    };
  },
  failure({ status, code, msg, data }) {
    const { ctx } = this;
    ctx.status = status || 500;
    ctx.body = {
      code: code || -1,
      msg: msg || 'failure',
      data: data || null,
    };
  },
};
