const express = require('express');
const cors = require("cors");
const morgan = require("morgan")
const devRouter = require('./routes/developers.js');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { PORT, NODE_ENV } = require('./config.js');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dev API",
            version: "1.0.0",
            description: "An Express Library API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
        apis: ["./index.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", devRouter);

app.listen(PORT, () => {
    console.log(`App available on port ${PORT}`)
});

console.log('Hello, ');
global.FirstName = 'Morgan';

console.log(global.FirstName + '!');
console.log('You are running on ' + process.platform);