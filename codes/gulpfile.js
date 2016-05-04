/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    ts = require("gulp-typescript"),
    react = require("gulp-react");

var paths = {
    webroot: "./SeaColor/"
};

paths.js = paths.webroot + "js/*.js";
paths.minJs = paths.webroot + "js/*.min.js";
paths.css = paths.webroot + "css/*.css";
paths.minCss = paths.webroot + "css/*.min.css";

paths.less = paths.webroot + 'less/*.less';
paths.ts = paths.webroot + 'ts/*.{ts,tsx}';
paths.cssDir = paths.webroot + 'css/';
paths.jsDir = paths.webroot + 'js/';


paths.jsLibsCore = paths.webroot + 'js/lib/core/*.js';
paths.jsLibs = paths.webroot + 'js/lib/*.js';
paths.jsLibName = 'lib.js';

//清理css文件
gulp.task("clean:css", function (cb) {
    return gulp.src(paths.minCss, { read: false })
        .pipe(clean());
});
//清理js文件
gulp.task("clean:js", function (cb) {
    return gulp.src(paths.js, { read: false })
        .pipe(clean());
});

//清理全部
gulp.task("clean", ["clean:js", "clean:css"]);

//编译less
gulp.task("build:less", ["clean"], function () {
    return gulp.src(paths.less)
        .pipe(less({ comoress: true }))
        .on('error', function (e) { console.log(e); })
        .pipe(gulp.dest(paths.cssDir));
});
//编译ts
gulp.task("build:ts", ["clean"], function () {
    return gulp.src(paths.ts)
        .pipe(ts({
            jsx: 'react'
        }))
        .pipe(gulp.dest(paths.jsDir));
});
//合并lib库
gulp.task("build:lib", ["clean"], function () {
    return gulp.src([paths.jsLibsCore, paths.jsLibs])
        .pipe(concat(paths.jsLibName))
        .pipe(gulp.dest(paths.jsDir));
});

//编译全部
gulp.task("build", ["build:less", "build:ts", "build:lib"]);

//压缩css
gulp.task("min:css", ["build"], function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.cssDir));
});
//压缩js
gulp.task("min:js", ["build"], function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

//压缩全部
gulp.task("min", ["min:js", "min:css"]);

//执行全部任务
gulp.task("all-task", ["clean", "build", "min"]);
