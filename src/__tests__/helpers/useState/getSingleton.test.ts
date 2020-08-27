import { getSingleton as getSingleton1 } from "../../../helpers/useState";
import { getSingleton as getSingleton2 } from "../../../helpers/useState";

/**
 * This is a test that you CANNOT do.
 *
 * Modules are imported only 1x.
 * 
 */
describe("getSingleton", () => {
    it("should be a return a singleton", () => {
        expect(getSingleton1()).toBe(getSingleton2());
    });
});
