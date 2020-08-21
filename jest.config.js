module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true,
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.json",
      babelConfig: {
        presets: ["@babel/env", "@vue/babel-preset-jsx"]
      }
    }
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
