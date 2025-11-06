const { config } = require("./config.ts");
const { app } = require("./app.ts");

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
