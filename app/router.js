'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt.secret);
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/test', jwt, controller.user.test);
  router.get('/api/user', jwt, controller.user.getUserInfo);
  router.put('/api/user', jwt, controller.user.editUserInfo);
  router.post('/api/upload', jwt, controller.upload.upload);
  router.post('/api/bill', jwt, controller.bill.add);
  router.get('/api/bill', jwt, controller.bill.list);
  router.get('/api/bill/:id', jwt, controller.bill.detail);
  router.put('/api/bill/:id', jwt, controller.bill.update);
  router.delete('/api/bill/:id', jwt, controller.bill.delete);
  router.get('/api/billType', controller.billType.list);
};
