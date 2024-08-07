/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export const BookingRouter = createTRPCRouter({
  createPayPalBooking: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const uuid = randomUUID().toString();
        const payPal = await ctx.db.lizzyPayPalBoookingInfo.create({
          data: {
            captureId: uuid,
            contactEmail: input.email,
          },
        });
        return payPal.paypalBoookingId;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),

  createFishingBooking: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        guesthouse: z.string(),
        extra: z.string(),
        information: z.string(),
        adults: z.number(),
        infants: z.number(),
        bookingType: z.string(),
        time: z.string(),
        date: z.string(),
        price: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uuid = randomUUID().toString();
        const payPal = await ctx.db.lizzyPayPalBoookingInfo.create({
          data: {
            captureId: uuid,
            contactEmail: input.email,
          },
        });
        if (input.bookingType == "full_day")
          await ctx.db.lizzyFishingBooking.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              phone: input.phone,
              guesthouse: input.guesthouse,
              extra: input.extra,
              information: input.information,
              adults: input.adults,
              infants: input.infants,
              type: input.bookingType,
              date: input.date,
              price: input.price,
              paypalId: payPal.paypalBoookingId,
            },
          });
        else
          await ctx.db.lizzyFishingBooking.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              phone: input.phone,
              guesthouse: input.guesthouse,
              extra: input.extra,
              information: input.information,
              adults: input.adults,
              infants: input.infants,
              type: input.bookingType,
              time: input.time,
              date: input.date,
              price: input.price,
              paypalId: payPal.paypalBoookingId,
            },
          });
        return payPal.paypalBoookingId;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),

  createPrivateBooking: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        guesthouse: z.string(),
        extra: z.string(),
        information: z.string(),
        adults: z.number(),
        infants: z.number(),
        bookingType: z.string(),
        time: z.string(),
        date: z.string(),
        price: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uuid = randomUUID().toString();
        const payPal = await ctx.db.lizzyPayPalBoookingInfo.create({
          data: {
            captureId: uuid,
            contactEmail: input.email,
          },
        });
        if (input.bookingType == "full_day")
          await ctx.db.lizzyPrivateBooking.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              phone: input.phone,
              guesthouse: input.guesthouse,
              extra: input.extra,
              information: input.information,
              adults: input.adults,
              infants: input.infants,
              type: input.bookingType,
              date: input.date,
              price: input.price,
              paypalId: payPal.paypalBoookingId,
            },
          });
        else
          await ctx.db.lizzyPrivateBooking.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              phone: input.phone,
              guesthouse: input.guesthouse,
              extra: input.extra,
              information: input.information,
              adults: input.adults,
              infants: input.infants,
              type: input.bookingType,
              time: input.time,
              date: input.date,
              price: input.price,
              paypalId: payPal.paypalBoookingId,
            },
          });
        return payPal.paypalBoookingId;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),

  createSnorkelingBooking: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        guesthouse: z.string(),
        extra: z.string(),
        information: z.string(),
        adults: z.number(),
        infants: z.number(),
        bookingType: z.string(),
        time: z.string(),
        date: z.string(),
        price: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uuid = randomUUID().toString();
        const payPal = await ctx.db.lizzyPayPalBoookingInfo.create({
          data: {
            captureId: uuid,
            contactEmail: input.email,
          },
        });
        if (input.bookingType == "full_day")
          await ctx.db.lizzySnorkelingBooking.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              phone: input.phone,
              guesthouse: input.guesthouse,
              extra: input.extra,
              information: input.information,
              adults: input.adults,
              infants: input.infants,
              type: input.bookingType,
              date: input.date,
              price: input.price,
              paypalId: payPal.paypalBoookingId,
            },
          });
        else
          await ctx.db.lizzySnorkelingBooking.create({
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              phone: input.phone,
              guesthouse: input.guesthouse,
              extra: input.extra,
              information: input.information,
              adults: input.adults,
              infants: input.infants,
              type: input.bookingType,
              time: input.time,
              date: input.date,
              price: input.price,
              paypalId: payPal.paypalBoookingId,
            },
          });
        return payPal.paypalBoookingId;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),

  createTransferBooking: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        guesthouse: z.string(),
        extra: z.string(),
        information: z.string(),
        adults: z.number(),
        infants: z.number(),
        bookingType: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        blockTime: z.string(),
        price: z.string(),
        date: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uuid = randomUUID().toString();
        const payPal = await ctx.db.lizzyPayPalBoookingInfo.create({
          data: {
            captureId: uuid,
            contactEmail: input.email,
          },
        });
        await ctx.db.lizzyTransferBooking.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            guesthouse: input.guesthouse,
            extra: input.extra,
            information: input.information,
            adults: input.adults,
            infants: input.infants,
            type: input.bookingType,
            startTime: input.startTime,
            endTime: input.endTime,
            blockTime: input.blockTime,
            date: input.date,
            price: input.price,
            paypalId: payPal.paypalBoookingId,
          },
        });
        return payPal.paypalBoookingId;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),

  createSunsetBooking: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        guesthouse: z.string(),
        extra: z.string(),
        information: z.string(),
        adults: z.number(),
        infants: z.number(),
        date: z.string(),
        price: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uuid = randomUUID().toString();
        const payPal = await ctx.db.lizzyPayPalBoookingInfo.create({
          data: {
            captureId: uuid,
            contactEmail: input.email,
          },
        });
        await ctx.db.lizzySunsetBooking.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            guesthouse: input.guesthouse,
            extra: input.extra,
            information: input.information,
            adults: input.adults,
            infants: input.infants,
            date: input.date,
            price: input.price,
            paypalId: payPal.paypalBoookingId,
          },
        });
        return payPal.paypalBoookingId;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),

  getFishingBlockDates: publicProcedure
    .input(z.object({ booking_type: z.string(), booking_time: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const blockDates: string[] = [];

        const bookings = await ctx.db.lizzyFishingBooking.findMany({
          where: {
            date: {
              gte: dayjs(new Date()).format("YYYY-MM-DD"),
            },
          },
          select: {
            date: true,
            type: true,
            time: true,
          },
        });

        bookings.forEach((booking) => {
          if (input.booking_type === "full_day") {
            blockDates.push(booking.date);
          } else {
            if (booking.type === "full_day") {
              blockDates.push(booking.date);
            } else if (
              booking.type === "half_day" &&
              booking.time === input.booking_time
            ) {
              blockDates.push(booking.date);
            }
          }
        });
        return blockDates;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Something went wrong");
      }
    }),

  getTransferBlockDates: publicProcedure
    .input(z.object({ transfer_type: z.string(), date: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const bookings = await ctx.db.lizzyTransferBooking.findMany({
          where: {
            date: dayjs(input.date).format("YYYY-MM-DD"),
            type: input.transfer_type,
          },
          select: {
            blockTime: true,
          },
        });

        return bookings;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Something went wrong");
      }
    }),

  getSnorkelingBlockDates: publicProcedure
    .input(
      z.object({
        booking_type: z.string(),
        booking_time: z.string(),
        adult: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const blockDates: string[] = [];

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const bookings = await ctx.db.lizzySnorkelingBooking.findMany({
          where: {
            date: { gte: dayjs(new Date()).format("YYYY-MM-DD") },
            type: input.booking_type,
            time: input.booking_time,
          },
          select: {
            date: true,
            type: true,
            time: true,
            adults: true,
          },
        });

        bookings.forEach(
          (booking: {
            type: string;
            date: string;
            adults: number;
            time: string;
          }) => {
            const limit: number = booking.adults + input.adult;
            if (limit > 17) blockDates.push(booking.date);
          },
        );

        return blockDates;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Something went wrong");
      }
    }),

  getPrivateBlockDates: publicProcedure
    .input(
      z.object({
        booking_type: z.string(),
        booking_time: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const bookings: { date: string }[] =
          await ctx.db.lizzyPrivateBooking.findMany({
            where: {
              date: { gte: dayjs(new Date()).format("YYYY-MM-DD") },
              type: input.booking_type,
              time: input.booking_time,
            },
            select: {
              date: true,
            },
          });

        return bookings;
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.error(error);
        throw new Error("Something went wrong");
      }
    }),
});
