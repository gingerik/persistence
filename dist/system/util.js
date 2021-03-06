'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _typeof, _createClass, Util;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Util', Util = function () {
        function Util() {
          _classCallCheck(this, Util);
        }

        _createClass(Util, null, [{
          key: 'mergeDescriptors',
          value: function mergeDescriptors(infDescriptor, supDescriptor) {
            var descriptor = {
              enumerable: 'enumerable' in infDescriptor ? infDescriptor.enumerable : true,
              configurable: 'configurable' in infDescriptor ? infDescriptor.configurable : true
            };
            if ('set' in supDescriptor || 'get' in supDescriptor) {
              var setter = supDescriptor.set || infDescriptor.set;
              var getter = supDescriptor.get || supDescriptor.get;
              if ('set' in infDescriptor && 'set' in supDescriptor) {
                setter = function setter(value) {
                  infDescriptor.set(value);
                  supDescriptor.set(value);
                };
              }
              if ('get' in infDescriptor && 'get' in supDescriptor) {
                getter = function getter() {
                  infDescriptor.get();
                  return supDescriptor.get();
                };
              }
              descriptor.set = setter || undefined;
              descriptor.get = getter || undefined;
            } else {
              descriptor.value = 'value' in supDescriptor ? supDescriptor.value : undefined;
              descriptor.writable = 'writable' in supDescriptor ? supDescriptor.writable : true;
            }
            return descriptor;
          }
        }, {
          key: 'getClass',
          value: function getClass(target) {
            if (Util.isClass(target)) {
              return target.prototype.constructor;
            }
            if (!Util.isObject(target)) {
              throw new TypeError('target must be an instance or class');
            }
            return target.constructor;
          }
        }, {
          key: 'is',
          value: function is(value) {
            return value !== undefined && value !== null;
          }
        }, {
          key: 'isClass',
          value: function isClass(value) {
            return typeof value === 'function';
          }
        }, {
          key: 'isClassDecorator',
          value: function isClassDecorator(Target) {
            return Util.isClass(Target) && arguments.length === 1;
          }
        }, {
          key: 'isInt',
          value: function isInt(value) {
            var num = Number.parseInt(value, 10);
            return String(num) === value;
          }
        }, {
          key: 'isObject',
          value: function isObject(value) {
            return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && !Array.isArray(value);
          }
        }, {
          key: 'isPropertyDecorator',
          value: function isPropertyDecorator(target, propertyKey, descriptor) {
            var genericCheck = Util.isObject(target) && typeof propertyKey === 'string' && propertyKey !== '';
            switch (arguments.length) {
              case 2:
                return genericCheck;
              case 3:
                return genericCheck && Util.isObject(descriptor);
              default:
                return false;
            }
          }
        }]);

        return Util;
      }());

      _export('Util', Util);
    }
  };
});