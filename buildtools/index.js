#!/usr/bin/env node
const Liftoff = require('liftoff');
const fs = require('fs');
const store = require('node-persist');
const ffi = require('node-ffi');

const app = new Liftoff({ name: 'ttcsbuildtool' });
const argv = require('minimist')(process.argv.slice(2));
const invoke = function (env) {
    if(env.configPath) {
        process.chdir(env.configBase);
        env.config = require(env.configPath);
    } else {
        console.log('No configfile found.');
    }
    console.log(env.config);
    var lib = ffi.Library(null, {
        // File* popen(char* cmd, char* mode);
        popen: ['pointer', ['string', 'string']],
        // void pclose(FILE* fp);
        pclose: ['void', ['pointer']],
        // char* fgets(char* buff, int buff, in)
        fgets: ['string', ['string', 'int', 'pointer']]
    });

    function execSync(cmd) {
        var
            buffer = new Buffer(1024),
            result = "",
            fp = lib.popen(cmd, 'r');
        if (!fp) throw new Error('execSync error: '+cmd);

        while(lib.fgets(buffer, 1024, fp)) {
            result += buffer.readCString();
        };
        lib.pclose(fp);
        return result;
    }
    console.log(execSync('./ZXPSignCmd -sign ../ ./builds/TimeTrackerCSExtension.zxp ./cert/DevCertForTom2.p12 cwdev -tsa https://timestamp.geotrust.com/tsa && open ./builds/TimeTrackerCSExtension.zxp'));
};
app.launch({
    cwd: argv.cwd,
    configPath: argv.myappfile,
    require: argv.require,
    completion: argv.completion
}, invoke);


// ./ZXPSignCmd -sign ./TimeTrackerCSExtension-HTML5 ./TimeTrackerCSExtension.zxp ./CreativeWorx-TimeTracker/TimeTrackerCS6andCS7/CreativeWorxDevCertificate.p12 cwdev
