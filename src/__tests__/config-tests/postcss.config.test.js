/* eslint-disable no-undef */
const config = require("../../../postcss.config.js");

describe("plugins", () => {
    describe("tailwind", () => {
        it("should be used", () => {
            const plugins = config.plugins[0]();
            expect(plugins.postcssPlugin).toBe("tailwind");
        });
    });

    // not everything is testable :/
    // webpack and babel are players
    describe("purgecss", () => {
        it("should be used when production", () => {
            const originalEnvironment = process.env.NODE_ENV;

            // this does NOT work -- it was already set
            process.env.NODE_ENV = "production";
            // eslint-disable-next-line no-debugger
            // debugger;
            const plugins = config.plugins[0]();
            expect(plugins.purgecssPlugin).toBe("purgecss");
            process.env.NODE_ENV = originalEnvironment;
        });
    });
});
