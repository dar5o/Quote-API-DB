/**
 * Configuration for jest tests
 */

module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["dotenv/config"],
  setupFiles: ["dotenv/config"]
};

process.env = Object.assign(process.env, {
  SECRET: 'ADK',
});