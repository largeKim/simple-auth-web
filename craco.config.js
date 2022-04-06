const CracoAlias = require("craco-alias");
const { defaults } = require("jest-config");

module.exports = {
  webpack: {},
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./config/tsconfig.extend.json",
      },
    },
  ],
  jest: {
    configure: {
      ...defaults,
      verbose: true,
      roots: ["__tests__"],
      preset: "ts-jest",
      moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
      transform: {
        "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest",
      },
      testPathIgnorePatterns: ["/node_modules/"],
      coverageProvider: "babel",
    },
  },
};
