import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";

// REST
const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);

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
  })
  .then(() => {
    console.log("HTTP Server running!");
  });
