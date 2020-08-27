import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/helpers/readFile/readFile.feature");

const mockFileContents = Buffer.from(
    "this is my text, and I'm sticking to it.",
    "utf8"
);

const mockFileName = "foo.txt";
type CallbackShape = (err: any, data: Buffer | undefined) => any;

defineFeature(feature, (test) => {
    let fileName: string | undefined;
    let text: string | undefined;
    let err: any;

    beforeEach(() => {
        fileName = undefined;
        text = undefined;
    });

    const whenIRequestIt = () => {
        jest.mock("fs", () => ({
            readFile: jest.fn(
                (
                    path: string,
                    _: { [name: string]: any },
                    callback: CallbackShape
                ) => {
                    const shouldSucceed = path.endsWith(mockFileName);
                    const err = shouldSucceed ? null : "Not found";
                    const data = shouldSucceed ? mockFileContents : undefined;
                    callback(err, data);
                }
            ),
        }));

        const { readCodeFile } = jest.requireActual(
            "../../../helpers/readFile"
        );
        const retVal = readCodeFile(fileName)
            .then((t: string) => (text = t))
            .catch((e: any) => (err = e));

        jest.restoreAllMocks();

        return retVal;
    };

    test("Request existing text file", ({ given, when, then }) => {
        given("The file exists and is text", () => {
            fileName = mockFileName;
        });

        when("I request it", whenIRequestIt);

        then("I should get back the text contents", () => {
            expect(text).toBe(mockFileContents.toString());
            expect(err).not.toEqual(expect.anything());
        });
    });

    test("Request non-existent file", ({ given, when, then }) => {
        given("The file does not exist", () => {
            fileName = String(Math.random());
        });

        when("I request it", whenIRequestIt);

        then("I should not get back anything", () => {
            expect(text).toBeUndefined();
            expect(err).toEqual(expect.anything());
        });
    });
});
