import { ref, reactive, Ref, computed, ComputedRef } from "vue";

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

const isPrimitive = (val: any) => val !== Object(val);

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
const useState = function useState<T = any>(
    initialValue: T
): [ComputedRef<T>, (newValue: T) => void] {
    const key = Object.create(null);

    state.value.set(
        key,
        isPrimitive(initialValue)
            ? initialValue
            : Array.isArray(initialValue)
            ? [...initialValue]
            : { ...initialValue }
    );

    const getter = computed<T>(() =>
        isPrimitive(state.value.get(key))
            ? state.value.get(key)
            : Array.isArray(state.value.get(key))
            ? [...state.value.get(key)]
            : { ...state.value.get(key) }
    );

    const setter = (newValue: T) => {
        const destination = state.value.get(key);

        if (isPrimitive(destination)) {
            state.value.set(key, newValue);
            return;
        }

        if (newValue === null || newValue === undefined) {
            state.value.set(key, newValue);
            return;
        }

        const source = (Array.isArray(newValue)
            ? [...newValue]
            : { ...newValue }) as { [name: string]: any };

        const keys = [...Object.keys(source), ...Object.keys(destination)];

        keys.forEach((key) => {
            if (source[key] === undefined) {
                if (Array.isArray(destination)) {
                    destination.splice(Number(key), 1);
                } else {
                    delete destination[key];
                }

                return;
            }

            destination[key] = source[key];
        });
    };

    return [getter, setter];
};

export { useState, getSingleton };
