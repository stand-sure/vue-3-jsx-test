import { ref, reactive, Ref } from "vue";

const stateSingleton = (() => {
  let instance: Ref<WeakMap<object, any>>;

  const getInstance = () => {
    if (!instance) {
      instance = ref(new WeakMap());
    }

    return instance;
  };

  return getInstance();
})();

const useState = function useState<T = any>(initialValue: T) {
  const key = Object.assign(Object.create(null), { ...initialValue });

  stateSingleton.value.set(key, reactive(Object(initialValue)));

  const getter = stateSingleton.value.get(key);
  const setter = (newValue: T) => {
    const destination = getter;
    const source = Object(newValue);
    const keys = Object.keys(source);
    keys.forEach(name => {
      destination[name] = source[name];
    });
  };

  return [getter, setter];
};

export { useState };
