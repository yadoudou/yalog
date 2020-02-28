// 定义日志级别，越高表示记录日志越多，生产环境一般为INFO级别
var LEVEL_OFF = 0;
var LEVEL_FATAL = 1;
var LEVEL_WARNING = 2;
var LEVEL_INFO = 4;
var LEVEL_TRACE = 8;
var LEVEL_DEBUG = 16;
var LEVEL_ALL = LEVEL_FATAL & LEVEL_WARNING & LEVEL_INFO & LEVEL_TRACE & LEVEL_DEBUG;
var levelName = (_a = {},
    _a[LEVEL_DEBUG] = 'DEBUG',
    _a[LEVEL_TRACE] = 'TRACE',
    _a[LEVEL_INFO] = 'INFO',
    _a[LEVEL_WARNING] = 'WARNING',
    _a[LEVEL_FATAL] = 'FATAL',
    _a
);
var Log = (function () {
    function Log(stdout, stderr, level) {
        this.stdout = stdout;
        this.stderr = stderr;
        this.level = level;
    }
    Log.initLog = function (options) {
        if (options.level) {
            Log.level = options.level;
        }
        if (options.stdout) {
            Log.defaultStdout = options.stdout;
        }
        if (options.stderr) {
            Log.defaultStderr = options.stderr;
        }
        //释放掉当前的instance
        if (Log.instance) {
            if (Log.instance.stderr !== process.stderr && Log.instance.stderr !== Log.defaultStderr) {
                Log.instance.stderr.end();
            }
            if (Log.instance.stdout !== process.stdout && Log.instance.stdout !== Log.defaultStdout) {
                Log.instance.stdout.end();
            }
            Log.instance = null;
        }
    };
    Log.getInstance = function () {
        if (Log.instance) {
            return Log.instance;
        }
        Log.instance = new Log(Log.defaultStdout, Log.defaultStderr, Log.level);
        return Log.instance;
    };
    Log.log = function (level, message, params) {
        var instance = Log.getInstance();
        if (level > instance.level) {
            return true;
        }
        var logTime = (new Date()).toString();
        message = levelName[level] + ": " + logTime + " " + message;
        for (var key in params) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }
            message += " " + key + "[" + params[key] + "]";
        }
        message += "\n";
        if (level > LEVEL_INFO) {
            return instance.stderr.write(message);
        }
        else {
            return instance.stdout.write(message);
        }
    };
    Log.debug = function (message, params) {
        if (params === void 0) { params = {}; }
        return Log.log(LEVEL_DEBUG, message, params);
    };
    Log.trace = function (message, params) {
        if (params === void 0) { params = {}; }
        return Log.log(LEVEL_TRACE, message, params);
    };
    Log.info = function (message, params) {
        if (params === void 0) { params = {}; }
        return Log.log(LEVEL_INFO, message, params);
    };
    Log.warning = function (message, params) {
        if (params === void 0) { params = {}; }
        return Log.log(LEVEL_WARNING, message, params);
    };
    Log.fatal = function (message, params) {
        if (params === void 0) { params = {}; }
        return Log.log(LEVEL_FATAL, message, params);
    };
    Log.level = LEVEL_INFO;
    Log.instance = null;
    Log.defaultStdout = process.stdout;
    Log.defaultStderr = process.stderr;
    return Log;
})();
exports["default"] = Log;
var _a;
