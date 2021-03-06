'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.resetGlobalConfigForTesting = resetGlobalConfigForTesting;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var configurations = new WeakMap();

var defaultInstance = void 0;
var propertyDecorator = void 0;

var defaultQueryEntityMapperFactory = function defaultQueryEntityMapperFactory(Entity) {
  return function (values) {
    var map = new Map();
    (values || []).forEach(function (value) {
      return map.set(value, Entity);
    });
    return map;
  };
};

function identity(val) {
  return val;
}

var Config = function () {
  function Config() {
    _classCallCheck(this, Config);

    var config = {
      baseUrl: null,
      extensible: false,
      fetchInterceptor: null,
      onNewObject: function onNewObject() {
        return undefined;
      },
      queryEntityMapperFactory: defaultQueryEntityMapperFactory,
      referenceToUri: identity,
      uriToReference: identity
    };
    configurations.set(this, config);
    if (!defaultInstance) {
      defaultInstance = this;
    }
  }

  _createClass(Config, [{
    key: 'configure',
    value: function configure() {
      var userConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var config = configurations.get(this);
      for (var key in userConfig || {}) {
        if (!Reflect.has(config, key)) {
          throw new Error('unknown configuration key: ' + key);
        }
        config[key] = userConfig[key];
      }
    }
  }, {
    key: 'plugin',
    value: function plugin(_plugin) {
      if ((typeof _plugin === 'undefined' ? 'undefined' : _typeof(_plugin)) !== 'object' || _plugin === null || typeof _plugin.getPlugin !== 'function') {
        throw new Error('invalid plugin');
      }
      var config = _plugin.getPlugin().config;
      this.configure(config);
      return this;
    }
  }, {
    key: 'current',
    get: function get() {
      var config = {};
      Object.assign(config, configurations.get(this));
      return Object.freeze(config);
    }
  }], [{
    key: 'create',
    value: function create(userConfig) {
      var config = new Config();
      config.configure(userConfig);
      return config;
    }
  }, {
    key: 'getPropertyDecorator',
    value: function getPropertyDecorator() {
      return propertyDecorator;
    }
  }, {
    key: 'setPropertyDecorator',
    value: function setPropertyDecorator(decorator) {
      if (typeof decorator !== 'function') {
        throw new TypeError('property decorator must be a function');
      }
      propertyDecorator = decorator;
    }
  }, {
    key: 'getDefault',
    value: function getDefault() {
      return defaultInstance;
    }
  }]);

  return Config;
}();

exports.Config = Config;
function resetGlobalConfigForTesting() {
  defaultInstance = undefined;
  propertyDecorator = undefined;
}