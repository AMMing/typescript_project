"use strict";

var gulp = require("gulp"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    ts = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    mergejs = require("./mergejs.json");

var paths = {
    webroot: "./SeaColor/"
};

paths.js = paths.webroot + "js/*.js";
paths.minJs = paths.webroot + "js/*.min.js";
paths.css = paths.webroot + "css/*.css";
paths.minCss = paths.webroot + "css/*.min.css";
paths.map = paths.webroot + "maps/*.map";

paths.less = paths.webroot + "less/*.less";
paths.ts = paths.webroot + "ts/*.{ts,tsx}";
paths.cssDir = paths.webroot + "css/";
paths.jsDir = paths.webroot + "js/";
paths.mapDir = "../maps";


paths.jsLibsCore = paths.webroot + "js/lib/core/*.js";
paths.jsLibs = paths.webroot + "js/lib/*.js";
paths.jsLibName = "lib.js";

var sourcemapsConfig = {
    includeContent: false,
    loadMaps: true
};


//拼接js文件路径
function getJsPath(name) {
    return paths.webroot + "js/" + name + ".js";
}

//清理css文件
gulp.task("clean:css", function (cb) {
    return gulp.src(paths.css, { read: false })
        .pipe(clean());
});
//清理js文件
gulp.task("clean:js", function (cb) {
    return gulp.src(paths.js, { read: false })
        .pipe(clean());
});
//清理map文件
gulp.task("clean:map", function (cb) {
    return gulp.src(paths.map, { read: false })
        .pipe(clean());
});

//清理全部
gulp.task("clean", ["clean:js", "clean:css", "clean:map"]);

//编译less
gulp.task("build:less", ["clean"], function () {
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less({ comoress: true }))
        .pipe(sourcemaps.write(paths.mapDir, sourcemapsConfig))
        .pipe(gulp.dest(paths.cssDir));
});
//编译ts
gulp.task("build:ts", ["clean"], function () {
    return gulp.src(paths.ts)
        .pipe(sourcemaps.init())
        .pipe(ts({
            jsx: "react"
        }))
        .pipe(sourcemaps.write(paths.mapDir, sourcemapsConfig))
        .pipe(gulp.dest(paths.jsDir));
});
//合并lib库
gulp.task("build:lib", ["clean"], function () {
    return gulp.src([paths.jsLibsCore, paths.jsLibs])
        .pipe(concat(paths.jsLibName))
        .pipe(gulp.dest(paths.jsDir));
});

//创建合并js文件的方法
function createMerge(config) {
    if (!config || !config.outFile || !config.files || config.files.length == 0) {
        return null;
    }
    var srcs = [];
    config.files.forEach(function (x) {
        srcs.push(config.isPath ? x : getJsPath(x));
    });
    var taskname = "build:merge-" + config.outFile;
    gulp.task(taskname, ["build:ts"], function () {
        return gulp.src(srcs)
            .pipe(concat(config.outFile + ".js"))
            .pipe(gulp.dest(paths.jsDir));
    });
    console.log({
        taskname: taskname,
        src: srcs,
        config: config
    });

    return taskname;
}

var bulid_task = ["build:less", "build:ts", "build:lib"];

//合并
mergejs.forEach(function (x) {
    var taskname = createMerge(x);
    if (!!taskname) {
        bulid_task.push(taskname);
    }
});

//编译全部
gulp.task("build", bulid_task);

//压缩css
gulp.task("min:css", ["build"], function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(sourcemaps.init())
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssmin())
        .pipe(sourcemaps.write(paths.mapDir, sourcemapsConfig))
        .pipe(gulp.dest(paths.cssDir));
});
//压缩js
gulp.task("min:js", ["build"], function () {
    return gulp.src([paths.js, "!" + paths.minJs])
        .pipe(sourcemaps.init())
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(sourcemaps.write(paths.mapDir, sourcemapsConfig))
        .pipe(gulp.dest(paths.jsDir));
});

//压缩全部
gulp.task("min", ["min:js", "min:css"]);

//执行全部任务
gulp.task("all-task", ["clean", "build", "min"]);

//执行debug任务
gulp.task("debug-task", ["clean", "build"]);