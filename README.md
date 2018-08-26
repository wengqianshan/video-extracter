# video-extracter

## usage

````
// demo 1

const extracter = require('./lib.js');
extracter('./movie.mp4').then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
````

````
// demo 2

const extracter = require('./lib.js');
async function yourFunction() {
  const result = await extracter('./movie.mp4');
  console.log(result);
}

yourFunction();
````