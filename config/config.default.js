/* eslint valid-jsdoc: "off" */

'use strict';
const ERROR = require('./error');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1670343378269_6747';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.mysql = {
    // 但数据库信息配置
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456789',
      database: 'juejue-cost',
      debug: true,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭？
    agent: false,
  };

  config.jwt = {
    secret: 'waibibabu',
  };

  config.multipart = {
    mode: 'file',
  };

  config.cors = {
    origin: '*',
    credential: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload',
    ERROR,
  };

  return {
    ...config,
    ...userConfig,
  };
};
