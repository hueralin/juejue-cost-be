module.exports = secret => {
  return async function(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        ctx.app.jwt.verify(token, secret);
        await next();
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
