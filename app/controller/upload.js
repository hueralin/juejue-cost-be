const fs = require('fs');
const path = require('path');
const moment = require('moment');
const mkdirp = require('mkdirp');
const { Controller } = require('egg');

class UploadController extends Controller {
  async upload() {
    const { ctx, config } = this;
    const file = ctx.request.files[0];
    console.log('file: ', file);

    let uploadDir = '';

    try {
      // 从内存中读取文件
      const f = fs.readFileSync(file.filepath);
      // 获取当前日期
      const day = moment(new Date()).format('YYYYMMDD');
      // 创建保存图片的目录
      const dir = path.join(config.uploadDir, day);
      // 创建目录
      await mkdirp(dir);
      // 创建保存图片的路径
      uploadDir = path.join(dir, Date.now() + path.extname(file.filename));
      console.log('uploadDir: ', uploadDir);
      // 将文件写入目录
      fs.writeFileSync(uploadDir, f);
    } finally {
      // 清除临时文件（内存中的）
      ctx.cleanupRequestFiles();
    }

    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/^app/, ''),
    };
  }
}

module.exports = UploadController;
