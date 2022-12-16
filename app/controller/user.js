const { Controller } = require('egg');

const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      ctx.response.failure({ msg: '账号或密码为空' });
      return;
    }

    const userInfo = await ctx.service.user.getUserByName(username);

    if (userInfo && userInfo.id) {
      ctx.response.failure({ msg: '账户名已被注册，请重新输入' });
      return;
    }

    const result = await ctx.service.user.register({
      username,
      password,
      signature: 'peace & love',
      avatar: defaultAvatar,
      ctime: new Date().getTime(),
    });

    if (result.affectedRows === 1) {
      ctx.response.success({ msg: '注册成功' });
    } else {
      ctx.response.failure({ msg: result.message });
    }
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const userInfo = await ctx.service.user.getUserByName(username);

    if (!userInfo || !userInfo.id) {
      ctx.response.failure({ msg: '账号不存在' });
      return;
    }

    if (userInfo && password !== userInfo.password) {
      ctx.response.failure({ msg: '密码错误' });
      return;
    }

    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      expire: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, app.config.jwt.secret);

    ctx.response.success({ msg: '登录成功', data: { token } });
  }

  async test() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    try {
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      ctx.response.success({ msg: '验证成功', data: { ...decode } });
    } catch (err) {
      ctx.response.failure({ msg: '验证失败' });
    }
  }

  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    ctx.response.success({
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature,
        avatar: userInfo.avatar,
      },
    });
  }

  async editUserInfo() {
    const { ctx, app } = this;
    const { signature = '', avatar = '' } = ctx.request.body;
    const token = ctx.request.header.authorization;
    const decode = app.jwt.verify(token, app.config.jwt.secret);
    try {
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar,
      });

      ctx.response.success({ msg: '修改成功' });
    } catch (err) {
      console.error(err);
      ctx.response.failure({ msg: err.message });
    }
  }
}

module.exports = UserController;
