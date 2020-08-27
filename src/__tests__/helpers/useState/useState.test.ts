import { useState } from "../../../helpers/useState";

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
            ${Object(1) /* yields {} */}
            ${Object(true) /* yields {} */}
            ${Object("do NOT do this") /* the indices become keys with each letter as a value */}
        `("should return initial value: $initialValue", ({ initialValue }) => {
            const [getter, setter] = useState(initialValue);
            expect(getter).toEqual(initialValue);
        });
    });

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
            if (throws !== "NOT") {
                const expectedError = new Error(
                    `Vue reactivity requires an object. You can try something like the following: ${JSON.stringify(
                        { value: initialValue },
                        null,
                        2
                    )}.`
                );

                expect(() => {
                    useState(initialValue);
                }).toThrow(expectedError);
            } else {
                expect(() => {
                    useState(initialValue);
                }).not.toThrow();
            }
        }
    );

    describe("setter", () => {
        it("should handle property update", () => {
            const initialValue = { a: 1, b: "b", c: false };
            const [value, setValue] = useState(initialValue);
            const newValue = { ...initialValue, ...{ c: true } };

            setValue(newValue);

            expect(value).toEqual(newValue);
        });

        it("should handle property addition", () => {
            const initialValue = { a: 1, b: "b", c: false };
            const [value, setValue] = useState(initialValue);
            const newValue = { ...initialValue, ...{ d: "d" } };

            setValue(newValue);

            expect(value).toEqual(newValue);
        });

        it("should handle property addition without set", () => {
            const initialValue: { [name: string]: any } = {
                a: 1,
                b: "b",
                c: false,
            };
            const [value] = useState(initialValue);
            initialValue.d = "d";

            expect(value).toEqual(initialValue);
        });

        it("should handle property removal", () => {
            const initialValue: { [name: string]: any } = {
                a: 1,
                b: "b",
                c: false,
            };
            const [value, setValue] = useState(initialValue);
            delete initialValue.c;

            setValue(initialValue);

            expect(value).toEqual(initialValue);
        });

        it("should handle object replacement", () => {
            const initialValue = { a: 1, b: "b", c: false };
            const [value, setValue] = useState(initialValue);
            const { c, ...newValue }: any = { ...initialValue };

            setValue(newValue);

            expect(value).toEqual(newValue);
        });

        it("should handle array addition", () => {
            const initialValue = [1, "b", false];
            const [value, setValue] = useState(initialValue);
            const newValue = [...initialValue, ...["new element"]];

            setValue(newValue);

            expect(Array.isArray(value)).toBeTruthy();
            expect(value).toEqual(expect.arrayContaining(newValue));
        });

        it("should handle array push", () => {
            const initialValue = [1, "b", false];
            const [value, setValue] = useState(initialValue);
            initialValue.push("pushed");

            setValue(initialValue);

            expect(value).toEqual(expect.arrayContaining(initialValue));
        });

        it("should handle array push without set", () => {
            const initialValue = [1, "b", false];
            const [value] = useState(initialValue);
            initialValue.push("pushed");
            expect(value).toEqual(expect.arrayContaining(initialValue));
        });

        it.each`
            val
            ${null}
            ${undefined}
        `("should throw if setting to $val", (val) => {
            const initialValue = { a: 1, b: "b", c: false };
            const [_, setValue] = useState(initialValue);

            const expectedError = new Error(
                `Vue reactivity requires an object. You can try something like the following: ${JSON.stringify(
                    { value: null },
                    null,
                    2
                )}.`
            );

            expect(() => setValue(null)).toThrow(expectedError);
        });
    });
});

