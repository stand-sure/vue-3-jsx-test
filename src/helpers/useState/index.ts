import { ref, reactive, Ref } from "vue";

let instance: Ref<WeakMap<object, any>>;

/**
 * This is overkill as the module initialization only runs once.
 *
 * const instance = ref(new WeakMap()) // would work
 *
 * This is exported solely as an example of something that CANNOT be tested.
 *
 * @return {Ref<WeakMap<object, any>>}
 * the state "dictionary"
 *
 */
const getSingleton = (): Ref<WeakMap<object, any>> => {
    const getInstance = () => {
        if (!instance) {
            instance = ref(new WeakMap());
        }

        return instance;
    };

    return getInstance();
};

// const stateSingleton = getSingleton();
const state: Ref<WeakMap<object, any>> = ref(new WeakMap());

/**
 * Sets an initial value and then returns a reactive getter and a setter.
 *
 * @template T
 * The type of the tracked item. *
 *
 * @param {T} initialValue
 * The initial value. *
 *
 * @return {[]}
 */
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

    state.value.set(key, reactive(Object(initialValue)));

    const getter = state.value.get(key);
    const setter = (newValue: T) => {
        if (newValue === null || newValue === undefined) {
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

export { useState, getSingleton };
