// External library
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

// Infra
import { swaggerSpec } from "./api/docs/swaggerDoc";
import { APIExpress } from "./api/express/api.express";

// Factory
import { createUserControllers } from "./modules/user/infra/factory/user.factory";

dotenv.config();
const PORT = Number(process.env.PORT) || 3333;

function runApplication() {
  const applicationControllers = [...createUserControllers()];

  const API = APIExpress.create(applicationControllers);

  API.getApp().use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  API.start(PORT);
}

runApplication();
