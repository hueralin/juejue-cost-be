const { Service } = require('egg');

class BillTypeService extends Service {
  async list(params) {
    const { app } = this;
    const { user_id } = params;
    const userIdArr = [ 0 ];
    if (user_id) {
      userIdArr.push(user_id);
    }
    // app.mysql.get 只会查询满足条件的第一个
    const list = await app.mysql.select('bill_type', { user_id: userIdArr });
    return list;
  }
}

module.exports = BillTypeService;
