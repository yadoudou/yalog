// 定义日志级别，越高表示记录日志越多，生产环境一般为INFO级别
const LEVEL_OFF = 0;
const LEVEL_FATAL = 1;
const LEVEL_WARNING = 2;
const LEVEL_INFO = 4;
const LEVEL_TRACE = 8;
const LEVEL_DEBUG = 16;
const LEVEL_ALL = LEVEL_FATAL & LEVEL_WARNING & LEVEL_INFO & LEVEL_TRACE & LEVEL_DEBUG;

let levelName = {
    [LEVEL_DEBUG]: 'DEBUG',
    [LEVEL_TRACE]: 'TRACE',
    [LEVEL_INFO]: 'INFO',
    [LEVEL_WARNING]: 'WARNING',
    [LEVEL_FATAL]: 'FATAL'
};

class Log {
    static level: number = LEVEL_INFO;
    static instance: Log = null;
    static defaultStdout = process.stdout;
    static defaultStderr = process.stderr;
    stdout;
    stderr;
    level;

    private constructor ( stdout, stderr, level ) {
        this.stdout = stdout;
        this.stderr = stderr;
        this.level = level;
    }

    static initLog( options ) {
        if ( options.level ) {
            Log.level = options.level;
        }
        if ( options.stdout ) {
            Log.defaultStdout = options.stdout;
        }
        if ( options.stderr ) {
            Log.defaultStderr = options.stderr;
        }
        //释放掉当前的instance
        if ( Log.instance ) {
            if ( Log.instance.stderr !== process.stderr && Log.instance.stderr !== Log.defaultStderr ) {
                Log.instance.stderr.end();
            }
            if ( Log.instance.stdout !== process.stdout && Log.instance.stdout !== Log.defaultStdout ) {
                Log.instance.stdout.end();
            }
            Log.instance = null;
        }
    }

    static getInstance() {
        if ( Log.instance ) {
            return Log.instance;
        }
        Log.instance = new Log(Log.defaultStdout, Log.defaultStderr, Log.level);
        return Log.instance;
    }

    static log(level, message, params ) {
        let instance = Log.getInstance();   
        if ( level > instance.level ) {
            return true;
        }
        let logTime = (new Date()).toString();
        message = `${levelName[ level]}: ${logTime} ${message}`;
        for ( let key in params ) {
            if ( !params.hasOwnProperty( key ) ) {
                continue;
            }
            message += ` ${key}[${params[key]}]`;
        }
        message += "\n";
        if ( level > LEVEL_INFO ) {
            return instance.stderr.write(message);
        } else {
            return instance.stdout.write(message);
        }
    }

    static debug( message, params = {} ) {
        return Log.log( LEVEL_DEBUG, message, params );
    }

    static trace(message, params = {} ) {
        return Log.log(LEVEL_TRACE, message, params );
    }

    static info ( message, params = {} ) {
        return Log.log( LEVEL_INFO, message, params );
    }

    static warning( message, params = {} ) {
        return Log.log( LEVEL_WARNING, message, params );
    }

    static fatal ( message, params = {} ) {
        return Log.log( LEVEL_FATAL, message, params );
    }
}

export default Log;