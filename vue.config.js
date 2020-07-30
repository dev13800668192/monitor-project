let path=require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
  devServer: {
    open:true  //打开浏览器窗口
},
//定义scss全局变量
css: {
  loaderOptions: {
    sass: {
      data: `@import "@/assets/scss/global.scss";`
    }
  }
}
}