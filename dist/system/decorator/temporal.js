'use strict';

System.register(['moment', '../persistent-config', '../util'], function (_export, _context) {
  var moment, PersistentConfig, PropertyType, Util, TemporalFormat, formats;
  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }, function (_persistentConfig) {
      PersistentConfig = _persistentConfig.PersistentConfig;
      PropertyType = _persistentConfig.PropertyType;
    }, function (_util) {
      Util = _util.Util;
    }],
    execute: function () {
      _export('TemporalFormat', TemporalFormat = Object.seal({
        DATETIME: 'YYYY-MM-DD HH:mm:ss',
        DATE: 'YYYY-MM-DD',
        TIME: 'HH:mm:ss'
      }));

      _export('TemporalFormat', TemporalFormat);

      formats = Object.keys(TemporalFormat).map(function (key) {
        return TemporalFormat[key];
      });
      function Temporal(formatOrTarget, optPropertyKey, optDescriptor) {
        var isDecorator = Util.isPropertyDecorator.apply(Util, arguments);
        var format = TemporalFormat.DATETIME;
        if (!isDecorator) {
          format = formatOrTarget || TemporalFormat.DATETIME;
          if (!formats.find(function (f) {
            return f === format;
          })) {
            throw new Error('invalid type for @Temporal() ' + optPropertyKey);
          }
        }
        var deco = function deco(target, propertyKey) {
          var config = PersistentConfig.get(target).getProperty(propertyKey);
          var _getter = config.getter;
          var _setter = config.setter;
          config.configure({
            type: PropertyType.TEMPORAL,
            getter: function getter() {
              var value = Reflect.apply(_getter, this, []);
              var val = moment(value, format);
              return val.isValid() ? val : undefined;
            },
            setter: function setter(value) {
              var val = moment(value, format);
              if (!val.isValid()) {
                throw new Error('invalid date: ' + value);
              }
              return Reflect.apply(_setter, this, [val.format(format)]);
            }
          });
        };
        return isDecorator ? deco(formatOrTarget, optPropertyKey, optDescriptor) : deco;
      }

      _export('Temporal', Temporal);
    }
  };
});