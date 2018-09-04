const path = require('path');
const ffmpeg = require('ffmpeg');
const del = require('del');
/**
 * 抽取视频图片
 * @param {input} 文件路径
 * @param {options} 配置
 * options.settings ffmpeg配置，参考: https://github.com/damianociarla/node-ffmpeg#videofnextractframetojpgdestinationfolder-settings-callback
 * 默认输出5张图片
 * options.dirname 指定输出目录，默认 ./files
 * @output {object}
 * {
 *   error: 错误信息，当存在错误信息时表示执行失败
 *   files: 返回文件列表
 *   dirname: 目录名，本次操作返回的文件目录
 *   subdir: 二级目录名， 注意：要保证每个文件有一个唯一的二级目录，所以一般情况下不建议设置此项
 * }
 */
module.exports = async function videoExtracter (input, options = {}) {
  const defaults = {
    frame_rate: 1,
    number: 3,
    // keep_pixel_aspect_ratio: false,
    // keep_aspect_ratio: false,
    // every_n_percentage: 20, // 部分视频无法正确输出
    file_name: 'e_%t_%s'
  };
  const settings = Object.assign(defaults, options.settings);
  const tmpdir = options.subdir || 'tmp_' + Date.now();
  const dirname = path.join(options.dirname || 'files', tmpdir);
  let result = {};
  try {
    const video = await new ffmpeg(input);
    const files = await video.fnExtractFrameToJPG(dirname, settings);
    result.files = files;
    result.dirname = dirname;
  } catch (e) {
    result.error = e.message;
    // 提取失败，删除预置目录
    del.sync(dirname);
  }
  return result;
}