var gulp = require('gulp'),
    minifyCss = require("gulp-cssmin"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    htmlmin = require('gulp-htmlmin'),
    imgmin = require("gulp-imagemin");

//压缩css
gulp.task('minify-css', function () {
    gulp.src('src/css/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    // .pipe(rename({suffix: '.min'})) //加后缀
    .pipe(gulp.dest('dist/css'));
});

//压缩js
gulp.task('minify-js', function () {
    gulp.src('src/js/*.js') // 要压缩的js文件
    .pipe(babel(
        {
            presets: ['es2015'] // es5检查机制
        }
    ))
    .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('dist/js')); //压缩后的路径
});

// 压缩html
gulp.task('minify-html',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/**/*.html')
    .pipe(htmlmin(options))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
});
//压缩图片
gulp.task('minify-img',function(){
    gulp.src('src/img/**/*.{png,jpg,gif,ico}')
    .pipe(imgmin())
    .pipe(gulp.dest("dist/img"))
});

//转存sass
gulp.task('sassSave',function(){
    gulp.src("src/sass/*.scss")
    .pipe(gulp.dest("dist/sass"));
});

//转存lib
// gulp.task('sassLib',function(){
//     gulp.src("src/lib/*.js")
//     .pipe(gulp.dest("dist/lib"));
// });

//整合 
// gulp.task('default',()=>{
//     gulp.start('minify-css','minify-js','minify-html','minify-img','sassSave');
// });


gulp.task('default',()=>{
    gulp.start('minify-css','minify-js','minify-html','sassSave');
});

// 拆分调试
// css完成
// gulp.task('default',()=>{
//     gulp.start('minify-css');
// }); 

// JS出了问题
// gulp.task('default',()=>{
//     gulp.start('minify-js');
// });

// html完成
// gulp.task('default',()=>{
//     gulp.start('minify-html');
// });

//图片完成
// gulp.task('default',()=>{
//     gulp.start('minify-img');
// });


// sass完成
// gulp.task('default',()=>{
//     gulp.start('sassSave');
//  });