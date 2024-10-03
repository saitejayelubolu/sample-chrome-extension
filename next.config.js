const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const originalEntry = config.entry; // Store original entry function
      config.entry = async () => {
        const entries = await originalEntry(); // Call original entry function
        if (
          entries["main.js"] &&
          !entries["main.js"].includes("./pages/popup.tsx")
        ) {
          entries["popup"] = "./pages/popup.tsx"; // Add the popup entry
        }
        return entries;
      };

      config.plugins.push(
        new CopyPlugin({
          patterns: [
            { from: "public/manifest.json", to: "./" },
            { from: "public/icons", to: "./icons" },
            { from: "public/popup.html", to: "./" },
            { from: "public/background.js", to: "./" },
          ],
        })
      );
    }
    return config;
  },
};
