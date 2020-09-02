/* eslint-disable no-undef */
const config = require("../../../postcss.config.js");

describe("plugins", () => {
    describe("tailwind", () => {
        it("should be used", () => {
            const plugin = config.plugins[0]();
            expect(plugin.postcssPlugin).toBe("tailwind");
        });
    });

    describe("purgecss", () => {
        it("should be used when production", () => {
            process.env.NODE_ENV = "production"
            const plugin = config.plugins[1]();
            const postCssPlugin = plugin.postcssPlugin;
            expect(postCssPlugin).toBe("postcss-plugin-purgecss");

            process.env.NODE_ENV = "test"
        });
    });
});
