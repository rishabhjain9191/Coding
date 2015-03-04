var cp = require('child_process');

var defaultValue = function (val, defaultVal) {
	return (val === undefined)?(defaultVal):(val);
};

var TimeEventer = function (timeeventer, timeeventerclear) {
	return function(timerTag, interval, fn) {
		var id = null;
		this.active = false;
		fn = defaultValue(fn, function() {});
		this.start = function(newfn, newinterval) {
			if (this.active) {
				timeeventerclear(id);
			} else {
				this.active = true;
			}
			id = timeeventer(defaultValue(newfn, fn), defaultValue(newinterval, interval));
		};
		this.clear = function () {
			if (this.active) {
				this.active = false;
				timeeventerclear(id);
			}
		};
	};
};
var Interval = TimeEventer(setInterval, clearInterval);
var Timeout  = TimeEventer(setTimeout,  clearTimeout);

var frontMostProjectPollingTimer = new Interval( "frontMostDocTimer", 5000 ); // Timer used to update the frontmost app absent clicks (5 seconds)

var queryActivePremiereProject = function (options) {
	if(options.andGenerateEvent) {
		console.log('event logged');
	}
	if(options.andGenerateEventOnlyIfDifferent && Math.random() > 0.5) {
		console.log('Active Premiere Project Changed');
		console.log('event logged');
	}
}

var child = cp.fork('./listener'); // NOTE TO THE FUTURE: Some are saying that you need to use the `silent: true` option when using child_process.fork on Windows or else it won’t work.

//When child process send back message when click event occure
child.on('message', function(m) {
	// When get the click event and the timer is off, turn on the timer to post data periodically
	console.log("clicking");
	frontMostProjectPollingTimer.start(function() {
		queryActivePremiereProject({andGenerateEventOnlyIfDifferent: true});
	});
	queryActivePremiereProject({andGenerateEvent: true});
});  //End of child.on('message', function(m) {
// Send child process some work
child.send('start listening');