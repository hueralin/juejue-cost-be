const { Service } = require('egg');

class UserService extends Service {
  async getUserByName(username) {
    const { app } = this;
    const result = await app.mysql.get('user', { username });
    return result;
  }

  async register(params) {
    const { app } = this;
    const result = await app.mysql.insert('user', params);
    return result;
  }

  async editUserInfo(params) {
    const { app } = this;
    const result = await app.mysql.update('user', {
      ...params,
    }, {
      id: params.id,
    });
    return result;
  }
}

module.exports = UserService;
