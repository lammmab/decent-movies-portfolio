import { pingRoute } from "./routes/ping";

const { errorHandler } = require("./middleware/errorHandler.ts");
const { express } = require('express');

const app = express();
app.use(express.json());

// use fs to grab the routes folder, import each file, and register the route automatically
const routes = [pingRoute];

routes.forEach(route => {
  app.use(`/api/${route.name}`, route.callback);
});

app.use(errorHandler);

module.exports = {
    app
}