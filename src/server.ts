import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// REST
const app = fastify();

const prisma = new PrismaClient({
  log: ["query"],
});

// HTTP Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...
// Request Body
// Search Params / Query Params -> "users?name=Ryan"
// Route Params -> "users/5"
// Headers -> Context

// Native Driver / Query Builders / ORMs
// Object Relational Mapping (Hibernate / Doctrine / ActiveRecord)

// JSON -> JavaScript Object Notation

// Resource Identification
app.post("/events", async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const data = createEventSchema.parse(request.body);

  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      slug: new Date().toISOString(),
    },
  });

  return reply.status(201).send({ eventId: event.id });
});

// localhost:3333
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server running!");
  });
