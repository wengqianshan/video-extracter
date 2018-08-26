const extracter = require('./lib.js');
// const del = require('del');


// 示例1
// extracter('./movie.mp4').then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })

// 示例2
async function yourFunction() {
  const result = await extracter('./movie.mp4');
  console.log(result);

  // 删除操作
  // setTimeout(() => {
  //   del(result.dirname).then(res => {
  //     console.log(res);
  //   }).catch(e => {
  //     console.log(e.message);
  //   })
  // }, 5000);
}

yourFunction();