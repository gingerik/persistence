import {EntityConfig} from '../entity-config';
import {Util} from '../util';

export function PreRemove(optTarget, optPropertyKey, optDescriptor) {
  let isDecorator = Util.isPropertyDecorator(...arguments);
  let deco = function(target, propertyKey, descriptor) {
    let preRemove = target[propertyKey];
    if (typeof preRemove !== 'function') {
      throw new Error(`@PreRemove ${propertyKey} is not a function`);
    }
    let config = EntityConfig.get(target);
    config.configure({preRemove});
    return Util.mergeDescriptors(descriptor, {
      configurable: true,
      enumerable: false,
      value: undefined,
      writable: false
    });
  };
  return isDecorator ? deco(optTarget, optPropertyKey, optDescriptor) : deco;
}
