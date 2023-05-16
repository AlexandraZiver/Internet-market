const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openApi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
    },
  },
  apis: ["./server/index.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  if (["dev", "stg"].includes(process.env.NODE_ENV)) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
};
