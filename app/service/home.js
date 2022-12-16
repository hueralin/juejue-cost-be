const { Service } = require('egg');

class HomeService extends Service {
  async user() {
    return {
      name: '嘎子',
      slogen: '网络是虚拟的，你把握不住',
    };
  }
}

module.exports = HomeService;
