const { Controller } = require('egg');

class BillTypeController extends Controller {
  async list() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    try {
      let decode;
      if (token) {
        decode = app.jwt.verify(token, app.config.jwt.secret);
      }
      const params = {};
      if (decode) {
        params.user_id = decode.id;
      }
      const list = await ctx.service.billType.list(params);
      ctx.response.success({ data: { list } });
    } catch (err) {
      ctx.response.failure({ msg: err.message });
    }
  }
}

module.exports = BillTypeController;
