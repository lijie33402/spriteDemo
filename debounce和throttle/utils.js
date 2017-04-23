/**
 * Created by lijie.
 */


var utils = {

    /**
     * debouncing, executes the function if there was no new event in $wait milliseconds
     * @param fn
     * @param wait
     * @param scope
     * @returns {Function}
     */
    debounce: function (fn, wait, scope) {
        var timeout;
        return function () {
            var context = scope || this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
            	timeout = null;
            	fn.apply(context, args);
            }, wait);
        };
    },

    /**
     * in case of a "storm of events", this executes once every $threshold
     * @param fn
     * @param threshhold
     * @param scope
     * @returns {Function}
     */
    throttle: function (fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;
            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
}