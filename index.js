const { addonBuilder } = require("stremio-addon-sdk");
const express = require("express");
const app = express();

// Create addon
const addon = new addonBuilder({
  id: "org.opendebrid.eyad",
  version: "1.0.0",
  name: "OpenDebrid",
  description: "Eyad Al-Juhani",
  author: "Eyad Al-Juhani",
  resources: ["stream"],
  types: ["movie", "series"],
  idPrefixes: ["tt"],
});

// Stream handler
addon.defineStreamHandler(({ type, id }) => {
  return Promise.resolve({ streams: [] });
});

// Middleware
app.use(addon.middlewares());

// Serve manifest
app.get("/manifest.json", (req, res) => {
  res.json(addon.manifest);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OpenDebrid addon running on port ${PORT}`);
});