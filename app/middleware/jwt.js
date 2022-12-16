module.exports = secret => {
  return async function(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        const decode = ctx.app.jwt.verify(token, secret);
        // 如果 token 是合法的那么一定会走下面的代码，不合法的话直接报错，然后被 catch 捕获到
        if (Date.now() / 1000 >= decode.expire) {
          ctx.response.failure({ status: 401, msg: '登录已过期' });
        } else {
          await next();
        }
      } catch (err) {
        ctx.response.failure({ status: 401, msg: err.message });
        return;
      }
    } else {
      ctx.response.failure({ msg: 'token 不存在' });
      return;
    }
  };
};
