import { useState } from "../../../helpers/useState";
import { computed } from "vue";

describe(useState, () => {
    describe("getter", () => {
        it.each`
            initialValue
            ${{}}
            ${{ a: 1 }}
            ${{ a: 1, b: "2" }}
            ${{ a: 1, b: "2", c: false }}
            ${{ a: 1, b: "2", c: false, d: null }}
            ${Object(null) /* yields {} */}
            ${null}
            ${null}
            ${1}
            ${"abc"}
            ${false}
            ${true}
        `("should return initial value: $initialValue", ({ initialValue }) => {
            const [getter, setter] = useState(initialValue);
            expect(getter.value).toEqual(initialValue);
        });
    });

    // TODO remove throws [after demo]
    it.each`
        initialValue   | throws
        ${0}           | ${"\b"}
        ${"abc"}       | ${"\b"}
        ${false}       | ${"\x08"}
        ${{}}          | ${"NOT"}
        ${{ a: 1 }}    | ${"NOT"}
        ${null}        | ${"\b"}
        ${[1, 2, "a"]} | ${"NOT"}
    `(
        "should $throws throw when initial value is $initialValue",
        ({ initialValue, throws }) => {
            // if (false && throws !== "NOT") {
            //     const expectedError = new Error(
            //         `Vue reactivity requires an object. You can try something like the following: ${JSON.stringify(
            //             { value: initialValue },
            //             null,
            //             2
            //         )}.`
            //     );

            //     expect(() => {
            //         useState(initialValue);
            //     }).toThrow(expectedError);
            // } else {
            expect(() => {
                useState(initialValue);
            }).not.toThrow();
            // }
        }
    );

    describe("setter", () => {
        describe("number", () => {
            it("should handle a value update", () => {
                const initialCount = 1;
                const [count, setCount] = useState(initialCount);

                const newCount = count.value + 2;
                setCount(newCount);

                expect(count.value).toEqual(newCount);
            });

            it("should handle multiple values", () => {
                const initialBoyCount = 1;
                const [boyCount, setBoyCount] = useState(initialBoyCount);
                const initialGirlCount = 2;
                const [girlCount, setGirlCount] = useState(initialGirlCount);

                const newGirlCount = girlCount.value - 10;
                const newBoyCount = boyCount.value + 2;
                setBoyCount(newBoyCount);
                setGirlCount(newGirlCount);

                expect(girlCount.value).toEqual(newGirlCount);
                expect(boyCount.value).toEqual(newBoyCount);
            });
        });

        describe("string", () => {
            it("should handle string replacement", () => {
                const initialSurname = "Smith";
                const [surname, setSurname] = useState(initialSurname);
                const getMarriedTo = (newSurname: string) =>
                    setSurname(newSurname);

                const newSurname = "Jones";
                getMarriedTo(newSurname);

                expect(surname.value).toBe(newSurname);
            });

            it("should handle assignment from null", () => {
                const [name, setName] = useState<string | null>(null);
                const newName = "Patty O. Fern-Sure";

                setName(newName);

                expect(name.value).toBe(newName);
            });

            it("should handle assignment to null", () => {
                const [name, setName] = useState<string | null>(
                    "Patty O. Fern-Sure"
                );
                const newName = null;

                setName(newName);

                expect(name.value).toBe(newName);
            });
        });

        describe("boolean", () => {
            it("should handle replacement", () => {
                const initialIdleValue = false;
                const [idle, setIdle] = useState(initialIdleValue);

                setIdle(!initialIdleValue);

                expect(idle.value).toBe(!initialIdleValue);
            });
        });

        describe("object", () => {
            it("should handle property update", () => {
                const initialValue = { a: 1, b: "b", c: false };
                const [foo, setFoo] = useState(initialValue);
                const newValue = { ...initialValue, ...{ c: true } };

                setFoo(newValue);

                expect(foo.value).toEqual(newValue);
            });

            it("should handle property addition", () => {
                const initialValue = { a: 1, b: "b", c: false };
                const [bar, setBar] = useState(initialValue);
                const newValue = { ...initialValue, ...{ d: "d" } };

                setBar(newValue);

                expect(bar.value).toEqual(newValue);
            });

            it("should NOT handle property addition without set", () => {
                const initialValue: { [name: string]: any } = {
                    a: 1,
                    b: "b",
                    c: false,
                };
                const [foo] = useState(initialValue);
                initialValue.d = "d";

                expect(foo.value).not.toEqual(initialValue);
            });

            it("should handle property removal", () => {
                const initialValue: { [name: string]: any } = {
                    a: 1,
                    b: "b",
                    c: false,
                };
                const [bar, setBar] = useState(initialValue);
                delete initialValue.c;

                setBar(initialValue);

                expect(bar.value).toEqual(initialValue);
            });

            it("should handle object replacement", () => {
                const initialValue = { a: 1, b: "b", c: false };
                const [foo, setFoo] = useState(initialValue);
                const { c, ...newValue }: any = { ...initialValue };

                setFoo(newValue);

                expect(foo.value).toEqual(newValue);
            });

            it("should handle multiple objects", () => {
                const initialFoo = { foo: true };
                const initialBar = { bar: true };
                const [foo, setFoo] = useState(initialFoo);
                const [bar] = useState(initialBar);

                const modified = true;
                const nextFoo = { ...foo.value, modified };
                setFoo(nextFoo);

                expect(foo.value).toEqual(nextFoo);
                expect(bar.value).toEqual(initialBar);
            });

            it("should 'notify' objects with dependent property", () => {
                const [dogSeesSquirrel, setDogSeesSquirrel] = useState(false);
                const dog = {};
                Object.defineProperty(dog, "chasingASquirrel", {
                    get() {
                        return dogSeesSquirrel.value;
                    },
                });

                // pre-flight check
                expect(
                    (dog as { chasingASquirrel: boolean }).chasingASquirrel
                ).toBeFalsy();

                setDogSeesSquirrel(true);

                expect(
                    (dog as { chasingASquirrel: boolean }).chasingASquirrel
                ).toBeTruthy();
            });

            it("should 'notify' objects with dependent property 2", () => {
                const [dogSeesSquirrel, setDogSeesSquirrel] = useState(false);
                const dog = {
                    get chasingASquirrel() {
                        return dogSeesSquirrel.value;
                    },
                };

                // pre-flight check
                expect(dog.chasingASquirrel).toBeFalsy();

                setDogSeesSquirrel(true);

                expect(dog.chasingASquirrel).toBeTruthy();
            });

            it("should 'notify' objects with computed property", () => {
                const [dogSeesSquirrel, setDogSeesSquirrel] = useState(false);
                const dog = {
                    chasingASquirrel: computed(() => dogSeesSquirrel.value),
                };

                // pre-flight check
                expect(dog.chasingASquirrel.value).toBeFalsy();

                setDogSeesSquirrel(true);

                expect(dog.chasingASquirrel.value).toBeTruthy();
            });

            it("should handle assignment from null", () => {
                const newPerson = {
                    name: "Patty O. Fern-Sure",
                };
                const [person, setPerson] = useState<typeof newPerson | null>(
                    null
                );

                setPerson(newPerson);

                expect(person.value).toEqual(newPerson);
            });

            it("should handle assignment to null", () => {
                const initialName = "Patty O. Fern-Sure";
                const [name, setName] = useState<string | null>(initialName);
                expect(name.value).toEqual(initialName);

                setName(null);

                expect(name.value).toBeNull();
            });
        });

        describe("array", () => {
            it("should handle array addition", () => {
                const initialValue = [1, "b", false];
                const [bar, setBar] = useState(initialValue);
                const newValue = [...initialValue, ...["new element"]];

                setBar(newValue);

                expect(Array.isArray(bar.value)).toBeTruthy();
                expect(bar.value).toEqual(expect.arrayContaining(newValue));
            });

            it("should handle array push", () => {
                const initialValue = [1, "b", false];
                const [foo, setFoo] = useState(initialValue);
                initialValue.push("pushed");
                setFoo(initialValue);

                expect(foo.value).toEqual(expect.arrayContaining(initialValue));
            });

            it("should NOT handle array push without set", () => {
                const initialValue = [1, "b", false];
                const [fooBar] = useState(initialValue);
                initialValue.push("pushed");
                expect(fooBar.value).not.toEqual(
                    expect.arrayContaining(initialValue)
                );
            });

            it("should handle assignment from null", () => {
                const people = [
                    {
                        name: "Patty O. Fern-Sure",
                    },
                ];
                const [employees, setEmployees] = useState<
                    typeof people | null
                >(null);

                setEmployees(people);

                expect(employees.value).toEqual(people);
            });

            it("should handle assignment to null", () => {
                const people = [
                    {
                        name: "Patty O. Fern-Sure",
                    },
                ];

                const [employees, setEmployees] = useState<
                    typeof people | null
                >(people);
                // eslint-disable-next-line no-debugger
                debugger;
                setEmployees(null);

                expect(employees.value).toBeNull();
            });
        });

        it.each`
            val
            ${null}
            ${undefined}
        `("should NOT throw if setting to $val", (val) => {
            const initialValue = { a: 1, b: "b", c: false };
            const [_, setValue] = useState(initialValue);

            const expectedError = new Error(
                `Vue reactivity requires an object. You can try something like the following: ${JSON.stringify(
                    { value: null },
                    null,
                    2
                )}.`
            );

            expect(() => setValue(null as any)).not.toThrow(expectedError);
        });
    });
});
