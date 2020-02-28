const assert = require('assert');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const Log = utils.loadEsModule('Log');

describe('Log log level', () => {

    let logOption;
    let stderr = path.resolve(__dirname, './test_std.err' );
    let stdout = path.resolve(__dirname, './test_std.out' );

    beforeEach( () => {
        // 生成临时的log文件用来当做stderr，strout
        logOption = {
            level: Log.LEVEL_ALL,
            stderr: fs.createWriteStream( stderr),
            stdout: fs.createWriteStream( stdout )
        };
        Log.initLog(logOption);
    } )
    afterEach( () => {
        logOption.stderr.destroy();
        logOption.stdout.destroy();
        fs.unlinkSync(stderr);
        fs.unlinkSync(stdout);
    })


    it('log info', (done) => {
        let randString = Math.random() + '';
        Log.info(`log info ${randString}`, {name: 'hello'});

        logOption.stdout.end( () => {
            let lastLog = readLastLine( stdout );
            let regExp1 = new RegExp(`^INFO:.*log info ${randString}`);
            assert( regExp1.test(lastLog) );
            let regExp2 = new RegExp(`name\\[hello\\]$`);
            assert( regExp2.test( lastLog ) );
            done();
        });
    })
})

//获取文件最后一行内容，假设文件特别小
function readLastLine( filename ) {
    let content = fs.readFileSync(filename, 'utf8');
    content = content.trim().split("\n");
    return content.pop();
}