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
        `("should return initial value: $initialValue", ({ initialValue }) => {
            const [getter, setter] = useState(initialValue);
            expect(getter.value).toEqual(initialValue);
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

            expect(() => setValue(null as any)).toThrow(expectedError);
        });
    });
});
