# @yadou/yalog 

A simple log package

## Install
```bash
npm install -D @yadou/yalog
```

## Sample code
```javascript
import Log from '@yadou/yalog'
let options = {
    level: 4, // info
    stderr: process.stderr, // err log (fatal warning) writestream, default(process.stderr)
    stdout: process.stdout  // info log (debug trace info) writestream, default(process.stdout)
}
Log.initLog(options)

// start log warning info
Log.warning('invalid user token');
// WARNING: Fri Feb 28 2020 21:55:39 GMT+0800 (GMT+08:00) invalid user token

// log info with params
Log.info('login success', { uid: 1000, token: 'user token'});
//INFO: Fri Feb 28 2020 21:55:39 GMT+0800 (GMT+08:00) login success uid[1000] token[user token]

// Log.debug Log.trace Log.info Log.warning Log.fatal
```
