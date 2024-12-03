const env = process.env.NODE_ENV || "development";
export default {
    env: "chromeExtension", // web/chromeExtension
    isAws: false,
    isDev: env,
    isEditor: false
};