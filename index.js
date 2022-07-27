const express = require('express');
const serverless = require('serverless-http');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const contractRoute = require('./route/contract.route');
const userRoute = require('./route/user.route');
const bodyParser = require("body-parser");
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Contract management API",
			version: "1.0.0",
			description: "A simple Express Contract API",
		},
        components: {
            securitySchemes: {
              jwt: {
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT"
              },
            }
          },
		servers: [
			{
				url: "http://localhost:3000",
			},
		]
	},
	apis: ["./route/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());

app.use('/user', userRoute);
app.use('/contract', contractRoute);

app.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000");
});

module.exports.handler = serverless(app);
