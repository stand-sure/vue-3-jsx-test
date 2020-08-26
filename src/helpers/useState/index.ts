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
    if (
        initialValue === null ||
        initialValue === undefined ||
        typeof initialValue !== "object"
    ) {
        throw new Error(
            `Vue reactivity requires an object. You can try something like the following: ${JSON.stringify(
                { value: initialValue },
                null,
                2
            )}.`
        );
    }

    const key = Object.assign(Object.create(null), { ...initialValue });

    stateSingleton.value.set(key, reactive(Object(initialValue)));

    const getter = stateSingleton.value.get(key);
    const setter = (newValue: T) => {
        if(newValue === null || newValue === undefined){
            throw new Error(
                `Vue reactivity requires an object. You can try something like the following: ${JSON.stringify(
                    { value: newValue },
                    null,
                    2
                )}.`
            );
        }

        const destination = getter;
        const source = Object(newValue);
        const keys = [...Object.keys(source), ...Object.keys(destination)];
        keys.forEach((name) => {
            if (source[name] === undefined) {
                delete destination[name];
                return;
            }

            destination[name] = source[name];
        });
    };

    return [getter, setter];
};

export { useState };
