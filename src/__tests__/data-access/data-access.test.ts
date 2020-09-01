import casual from "casual";
import axios from "axios";
import { getTopicList } from "../../data-access";

jest.mock("axios");

const makeFakeItem = () => ({
    id: casual.integer(),
    name: casual.name,
    body: casual.sentences(5),
    seeAlso: [...Array(5)].map(() => casual.url),
});

const fakeData = [...Array(5)].map(() => makeFakeItem());

const fakeTopics = fakeData.map((d) => ({
    id: d.id,
    name: d.name,
}));

describe("data-access", () => {
    const mockGet = jest.fn((url, ..._) => {
        if (/.*\/topics/.test(url)) {
            return Promise.resolve({
                data: fakeTopics,
            });
        }

        return Promise.reject("Bad url");
    });

    beforeAll(() =>
        (axios.get as any).mockImplementation((url: string) => mockGet(url))
    );

    beforeEach(() => mockGet.mockClear());

    afterAll(() => mockGet.mockRestore());

    describe(getTopicList, () => {
        it("should GET '/topics'", async () => {
            const topics = await getTopicList();
            expect(mockGet).toBeCalled();
            expect(topics).toEqual(expect.arrayContaining(fakeTopics));
        });
    });
});
