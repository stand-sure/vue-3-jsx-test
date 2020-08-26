import { Example, PropsShape } from "../../components/example";

import {
  NodeShape,
  findChildByClass,
  findChildByPropNames,
  findChildByType,
} from "../test-helpers";

describe(Example, () => {
  let node: NodeShape;
  let props: PropsShape;

  beforeEach(() => {
    const id = Math.floor(Math.random() * 1000);
    props = {
      topic: {
        id,
        name: `Topic ${id}`
      }
    };

    node = Example({ ...props }) as NodeShape;
  });
  
  it("should have tests", () => {});
});
