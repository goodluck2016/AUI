var gulp=require('gulp'),                //gulp
	sass=require('gulp-sass'),           //编译sass
	concat=require('gulp-concat'),       //合并代码,如js合并
	minifyCss=require('gulp-minify-css'),//压缩css
	rename=require('gulp-rename'),       //重命名
	browserSync=require('browser-sync'), //监听文件改变浏览器自动刷新 
	imagemin = require('gulp-imagemin'), //图片压缩
	uglify = require('gulp-uglify');     //js压缩
    //cleanCSS = require('gulp-clean-css');	 //清空css文件夹
	

//sass任务
gulp.task('sass',function(){
	return gulp.src('src/sass/*.scss')         //需要编译的sass文件
		.pipe(sass().on('error',sass.logError))
		.pipe(concat('aui.css'))               //合并成aui.css
		.pipe(rename({suffix:'.min'}))           //重命名
		.pipe(minifyCss())                       //压缩 
		.pipe(gulp.dest('src/dist/css'))         //合并之后的存放的地方
});

//concat任务
//gulp.task("concat",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    //gulp.src('nav_list.js').pipe(concat('nav_list.js')).pipe(gulp.dest('src/dist/js'));
//})

//uglify任务
//gulp.task("uglify",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    //gulp.src('src/js/*.js'.pipe(concat('main.js')).pipe(gulp.dest('src/dist/js'));
//})

//图片压缩任务
gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/dist/images'))
);

//imagemin任务
gulp.task('watch',function(){
	browserSync.init({
		server:{
			baseDir:'src'
		}
	})
	//监听sass文件变化，执行sass任务
    gulp.watch('src/sass/*.scss',['sass']) 
	//监听的文件
	var files=['src/*.html','src/sass/*.scss','src/images/*.png']
	gulp.watch(files,function(){
		browserSync.reload();
	})
});

//default任务
gulp.task('default',['watch','sass','imagemin']);