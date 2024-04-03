import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import {
  checkIn,
  createEvent,
  getAttendeeBadge,
  getEvent,
  getEventAttendees,
  registerForEvent,
} from "./routes";
import { errorHandler } from "./error-handler";

// REST
export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

// HTTP Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...
// Request Body
// Search Params / Query Params -> "users?name=Ryan"
// Route Params -> "users/5"
// Headers -> Context

// Native Driver / Query Builders / ORMs
// Object Relational Mapping (Hibernate / Doctrine / ActiveRecord)

// JSON -> JavaScript Object Notation

// 20x => SUCCESS
// 30x => REDIRECT
// 40x => CLIENT ERROR
// 50x => SERVER ERROR

// localhost:3333
app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP Server running!");
  });
