import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { BookingRouter } from "./routers/booking";
import { EmailRouter } from "./routers/email";


export const appRouter = createTRPCRouter({
    booking:BookingRouter,
    email:EmailRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
