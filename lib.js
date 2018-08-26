const ffmpeg = require('ffmpeg');
const path = require('path');
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
 * }
 */
module.exports = async function videoExtracter (input, options = {}) {
  const defaults = {
    frame_rate: 1,
    number: 5,
    // every_n_percentage: 20, // 部分视频无法正确输出
    file_name: 'e_%t_%s'
  };
  const settings = Object.assign(defaults, options.settings);
  const tmpdir = 'tmp_' + Date.now();
  const dirname = path.join(options.dirname || 'files', tmpdir);
  let result = {};
  try {
    const video = await new ffmpeg(input);
    const files = await video.fnExtractFrameToJPG(dirname, settings);
    result.files = files;
    result.dirname = dirname;
  } catch (e) {
    result.error = e.msg;
  }
  return result;
}