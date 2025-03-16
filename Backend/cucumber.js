const common = [
  "--require-module tsconfig-paths/register",
  "--require-module ts-node/register",
  "--require features/**/*.ts",
  "--publish-quiet",
].join(" ");

module.exports = {
  default: common,
};
