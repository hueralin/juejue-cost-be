'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { id } = ctx.query;
    ctx.body = id;
  }

  async user() {
    const { ctx } = this;
    // const { id } = ctx.params;
    const { name, slogen } = await ctx.service.home.user();
    ctx.body = {
      name,
      slogen,
    };
  }
}

module.exports = HomeController;
