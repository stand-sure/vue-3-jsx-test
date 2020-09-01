import axios from "axios";

export type TopicShape = {
    id: number;
    name: string;
    body: string;
    seeAlso?: string[];
};

const baseUrl = "https://example.com";

const urls = {
    topics: `${baseUrl}/topics`,
    topic: (id: number | string) => `${baseUrl}/topic/${id}`,
};

const getTopicList = async (): Promise<Partial<TopicShape>[]> => {
    const response = await axios
        .get(urls.topics, {
            headers: {
                Accept: "application/json",
            },
        })
        .then(
            (resp) => resp.data,
            (err) => err
        );

    return response;
};

const getTopic = (id: number): TopicShape | undefined => {
    return;
};

export { getTopicList, getTopic };
