export default {
  locales: ["fr", "en"],
  sourceLocale: "fr",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
      exclude: ["**/node_modules/**"],
    },
  ],
  compileNamespace: "ts",
  format: "po",
  orderBy: "messageId",
};
