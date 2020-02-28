declare class Log {
    static level: number;
    static instance: Log;
    static defaultStdout: any;
    static defaultStderr: any;
    stdout: any;
    stderr: any;
    level: any;
    constructor(stdout, stderr, level);
    static initLog(options: any): void;
    static getInstance(): Log;
    static log(level: any, message: any, params: any): any;
    static debug(message: any, params?: {}): any;
    static trace(message: any, params?: {}): any;
    static info(message: any, params?: {}): any;
    static warning(message: any, params?: {}): any;
    static fatal(message: any, params?: {}): any;
}
export default Log;
