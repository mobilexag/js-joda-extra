//! @version js-joda-extra - 0.0.3
//! @copyright (c) 2015-2016, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-joda"));
	else if(typeof define === 'function' && define.amd)
		define(["js-joda"], factory);
	else if(typeof exports === 'object')
		exports["JSJodaExtra"] = factory(require("js-joda"));
	else
		root["JSJodaExtra"] = factory(root["JSJoda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _main = __webpack_require__(1);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _main2.default; /*
	                                   * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	                                   * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
	                                   */

	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	exports.default = function (jsJoda) {
	  (0, _Interval._plugin)(jsJoda);
	};

	var _Interval = __webpack_require__(2);

	/*
	 * @copyright (c) 2016, Philipp Thuerwaechter & Pattrick Hueper
	 * @license BSD-3-Clause (see LICENSE.md in the root directory of this source tree)
	 */

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Interval = undefined;
	exports._init = _init;
	exports._plugin = _plugin;

	var _jsJoda = __webpack_require__(3);

	var _assert = __webpack_require__(4);

	var _errors = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interval = exports.Interval = function () {
	    Interval.of = function of(startInstant, endInstantOrDuration) {
	        if (endInstantOrDuration instanceof _jsJoda.Duration) {
	            return Interval.ofInstantDuration(startInstant, endInstantOrDuration);
	        } else {
	            return Interval.ofInstantInstant(startInstant, endInstantOrDuration);
	        }
	    };

	    Interval.ofInstantInstant = function ofInstantInstant(startInclusive, endExclusive) {
	        (0, _assert.requireNonNull)(startInclusive, 'startInclusive');
	        (0, _assert.requireNonNull)(endExclusive, 'endExclusive');
	        (0, _assert.requireInstance)(startInclusive, _jsJoda.Instant, 'startInclusive');
	        (0, _assert.requireInstance)(endExclusive, _jsJoda.Instant, 'endExclusive');
	        if (endExclusive.isBefore(startInclusive)) {
	            throw new _errors.DateTimeException('End instant must on or after start instant');
	        }
	        return new Interval(startInclusive, endExclusive);
	    };

	    Interval.ofInstantDuration = function ofInstantDuration(startInclusive, duration) {
	        (0, _assert.requireNonNull)(startInclusive, 'startInclusive');
	        (0, _assert.requireNonNull)(duration, 'duration');
	        (0, _assert.requireInstance)(startInclusive, _jsJoda.Instant, 'startInclusive');
	        (0, _assert.requireInstance)(duration, _jsJoda.Duration, 'duration');
	        if (duration.isNegative()) {
	            throw new _errors.DateTimeException('Duration must not be zero or negative');
	        }
	        return new Interval(startInclusive, startInclusive.plus(duration));
	    };

	    function Interval(startInclusive, endExclusive) {
	        _classCallCheck(this, Interval);

	        this._start = startInclusive;
	        this._end = endExclusive;
	    }

	    Interval.prototype.start = function start() {
	        return this._start;
	    };

	    Interval.prototype.end = function end() {
	        return this._end;
	    };

	    Interval.prototype.isEmpty = function isEmpty() {
	        return this._start.equals(this._end);
	    };

	    Interval.prototype.isUnboundedStart = function isUnboundedStart() {
	        return this._start.equals(_jsJoda.Instant.MIN);
	    };

	    Interval.prototype.isUnboundedEnd = function isUnboundedEnd() {
	        return this._end.equals(_jsJoda.Instant.MAX);
	    };

	    Interval.prototype.withStart = function withStart(start) {
	        return Interval.of(start, this._end);
	    };

	    Interval.prototype.withEnd = function withEnd(end) {
	        return Interval.of(this._start, end);
	    };

	    Interval.prototype.contains = function contains(instant) {
	        (0, _assert.requireNonNull)(instant, 'instant');
	        (0, _assert.requireInstance)(instant, _jsJoda.Instant, 'instant');
	        return this._start.compareTo(instant) <= 0 && (instant.compareTo(this._end) < 0 || this.isUnboundedEnd());
	    };

	    Interval.prototype.encloses = function encloses(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, Interval, 'other');
	        return this._start.compareTo(other.start()) <= 0 && other.end().compareTo(this._end) <= 0;
	    };

	    Interval.prototype.abuts = function abuts(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, Interval, 'other');
	        return !this._end.equals(other.start()) !== !this._start.equals(other.end());
	    };

	    Interval.prototype.isConnected = function isConnected(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, Interval, 'other');
	        return this.equals(other) || this._start.compareTo(other.end()) <= 0 && other.start().compareTo(this._end) <= 0;
	    };

	    Interval.prototype.overlaps = function overlaps(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, Interval, 'other');
	        return other.equals(this) || this._start.compareTo(other.end()) < 0 && other.start().compareTo(this._end) < 0;
	    };

	    Interval.prototype.intersection = function intersection(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, Interval, 'other');
	        if (this.isConnected(other) === false) {
	            throw new _errors.DateTimeException('Intervals do not connect: ' + this + ' and ' + other);
	        }
	        var cmpStart = this._start.compareTo(other.start());
	        var cmpEnd = this._end.compareTo(other.end());
	        if (cmpStart >= 0 && cmpEnd <= 0) {
	            return this;
	        } else if (cmpStart <= 0 && cmpEnd >= 0) {
	            return other;
	        } else {
	            var newStart = cmpStart >= 0 ? this._start : other.start();
	            var newEnd = cmpEnd <= 0 ? this._end : other.end();
	            return Interval.of(newStart, newEnd);
	        }
	    };

	    Interval.prototype.union = function union(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, Interval, 'other');
	        if (this.isConnected(other) === false) {
	            throw new _errors.DateTimeException('Intervals do not connect: ' + this + ' and ' + other);
	        }
	        var cmpStart = this._start.compareTo(other.start());
	        var cmpEnd = this._end.compareTo(other.end());
	        if (cmpStart >= 0 && cmpEnd <= 0) {
	            return other;
	        } else if (cmpStart <= 0 && cmpEnd >= 0) {
	            return this;
	        } else {
	            var newStart = cmpStart >= 0 ? other.start() : this._start;
	            var newEnd = cmpEnd <= 0 ? other.end() : this._end;
	            return Interval.of(newStart, newEnd);
	        }
	    };

	    Interval.prototype.span = function span(other) {
	        (0, _assert.requireNonNull)(other, 'other');
	        (0, _assert.requireInstance)(other, Interval, 'other');
	        var cmpStart = this._start.compareTo(other.start());
	        var cmpEnd = this._end.compareTo(other.end());
	        var newStart = cmpStart >= 0 ? other.start() : this._start;
	        var newEnd = cmpEnd <= 0 ? other.end() : this._end;
	        return Interval.of(newStart, newEnd);
	    };

	    Interval.prototype.isAfter = function isAfter(instantOrInterval) {
	        if (instantOrInterval instanceof _jsJoda.Instant) {
	            return this.isAfterInstant(instantOrInterval);
	        } else {
	            return this.isAfterInterval(instantOrInterval);
	        }
	    };

	    Interval.prototype.isBefore = function isBefore(instantOrInterval) {
	        if (instantOrInterval instanceof _jsJoda.Instant) {
	            return this.isBeforeInstant(instantOrInterval);
	        } else {
	            return this.isBeforeInterval(instantOrInterval);
	        }
	    };

	    Interval.prototype.isAfterInstant = function isAfterInstant(instant) {
	        return this._start.compareTo(instant) > 0;
	    };

	    Interval.prototype.isBeforeInstant = function isBeforeInstant(instant) {
	        return this._end.compareTo(instant) <= 0 && this._start.compareTo(instant) < 0;
	    };

	    Interval.prototype.isAfterInterval = function isAfterInterval(interval) {
	        return this._start.compareTo(interval.end()) >= 0 && !interval.equals(this);
	    };

	    Interval.prototype.isBeforeInterval = function isBeforeInterval(interval) {
	        return this._end.compareTo(interval.start()) <= 0 && !interval.equals(this);
	    };

	    Interval.prototype.toDuration = function toDuration() {
	        return _jsJoda.Duration.between(this._start, this._end);
	    };

	    Interval.prototype.equals = function equals(obj) {
	        if (this === obj) {
	            return true;
	        }
	        if (obj instanceof Interval) {
	            return this._start.equals(obj.start()) && this._end.equals(obj.end());
	        }
	        return false;
	    };

	    Interval.prototype.hashCode = function hashCode() {
	        return this._start.hashCode() ^ this._end.hashCode();
	    };

	    Interval.prototype.toString = function toString() {
	        return this._start.toString() + '/' + this._end.toString();
	    };

	    return Interval;
	}();

	var _initialized = false;

	function _init() {

	    Interval.ALL = Interval.of(_jsJoda.Instant.MIN, _jsJoda.Instant.MAX);
	    _initialized = true;
	}

	function _plugin(jsJoda) {
	    if (!_initialized) {
	        _init();
	    }
	    jsJoda.Interval = Interval;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.assert = assert;
	exports.requireNonNull = requireNonNull;
	exports.requireInstance = requireInstance;
	exports.abstractMethodFail = abstractMethodFail;

	var _errors = __webpack_require__(5);

	function assert(assertion, msg, error) {
	    if (!assertion) {
	        if (error) {
	            throw new error(msg);
	        } else {
	            throw new Error(msg);
	        }
	    }
	} /**
	   * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
	   * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	   */
	function requireNonNull(value, parameterName) {
	    if (value == null) {
	        throw new _errors.NullPointerException(parameterName + ' must not be null');
	    }
	    return value;
	}

	function requireInstance(value, _class, parameterName) {
	    if (!(value instanceof _class)) {
	        throw new _errors.IllegalArgumentException(parameterName + ' must be an instance of ' + (_class.name ? _class.name : _class) + (value && value.constructor && value.constructor.name ? ', but is ' + value.constructor.name : ''));
	    }
	    return value;
	}

	function abstractMethodFail(methodName) {
	    throw new TypeError('abstract method "' + methodName + '" is not implemented');
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/**
	 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
	 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
	 */

	function createErrorType(name, init) {
	    var superErrorClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;

	    function E(message) {
	        if (!Error.captureStackTrace) {
	            this.stack = new Error().stack;
	        } else {
	            Error.captureStackTrace(this, this.constructor);
	        }
	        this.message = message;
	        init && init.apply(this, arguments);
	    }
	    E.prototype = new superErrorClass();
	    E.prototype.name = name;
	    E.prototype.constructor = E;
	    return E;
	}

	var DateTimeException = exports.DateTimeException = createErrorType('DateTimeException', messageWithCause);
	var DateTimeParseException = exports.DateTimeParseException = createErrorType('DateTimeParseException', messageForDateTimeParseException);
	var UnsupportedTemporalTypeException = exports.UnsupportedTemporalTypeException = createErrorType('UnsupportedTemporalTypeException', null, DateTimeException);
	var ArithmeticException = exports.ArithmeticException = createErrorType('ArithmeticException');
	var IllegalArgumentException = exports.IllegalArgumentException = createErrorType('IllegalArgumentException');
	var IllegalStateException = exports.IllegalStateException = createErrorType('IllegalStateException');
	var NullPointerException = exports.NullPointerException = createErrorType('NullPointerException');

	function messageWithCause(message) {
	    var cause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    var msg = message || this.name;
	    if (cause !== null && cause instanceof Error) {
	        msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
	    }
	    this.message = msg;
	}

	function messageForDateTimeParseException(message) {
	    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var cause = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	    var msg = message || this.name;
	    msg += ': ' + text + ', at index: ' + index;
	    if (cause !== null && cause instanceof Error) {
	        msg += '\n-------\nCaused by: ' + cause.stack + '\n-------\n';
	    }
	    this.message = msg;
	    this.parsedString = function () {
	        return text;
	    };
	    this.errorIndex = function () {
	        return index;
	    };
	}

/***/ }
/******/ ])
});
;