module.exports = {
  // 系统错误, -10000 级别

  // 未知错误
  UNKNOWN_ERROR: { code: -10000, msg: 'Internal server error.' },

  // 上游系统错误，-20000 级别

  // 业务逻辑错误，-30000 级别
  MISSING_PARAMS: { code: -3000, msg: '缺少参数' },
};
