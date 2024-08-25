/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { canMakeBooking } from "~/utils/funs";

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
        child_0_3: z.number(),
        child_4_8: z.number(),
        child_9_13: z.number(),
        child_4_11: z.number(),
        bookingType: z.string(),
        time: z.string(),
        date: z.string(),
        total_no_of_people: z.number(),
        boat: z.string(),
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
              child_0_3: input.child_0_3,
              child_4_11: input.child_4_11,
              type: input.bookingType,
              date: input.date,
              price: input.price,
              total_no_of_people: input.total_no_of_people,
              boat: input.boat,
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
              child_0_3: input.child_0_3,
              child_4_8: input.child_4_8,
              child_9_13: input.child_9_13,
              type: input.bookingType,
              time: input.time,
              date: input.date,
              price: input.price,
              total_no_of_people: input.total_no_of_people,
              boat: input.boat,
              paypalId: payPal.paypalBoookingId,
            },
          });
        return payPal.paypalBoookingId;
        // return { message: "Booking Created Successfully!" };
      } catch (error) {
        if (error instanceof TRPCClientError) {
          console.error(error.message);
          throw new Error(error.message);
        }
        console.log(error);
        throw new Error("Something went wrong");
      }
    }),

  getSnorkelingBoatsCapacity: publicProcedure.query(async ({ ctx, input }) => {
    try {
      const formattedDate = dayjs(new Date()).format("YYYY-MM-DD");
      console.log("Formatted Date: >>>>>>>>>>>", formattedDate);
      const allFullDayBookings = await ctx.db.lizzySnorkelingBooking.findMany({
        where: { date: formattedDate, type: "full_day" },
      });
      console.log("allFullDays: >>>>>>>>>>>", allFullDayBookings);
      const allHalfDayBookings = await ctx.db.lizzySnorkelingBooking.findMany({
        where: { date: formattedDate, type: "half_day" },
      });
      return { full_day: allFullDayBookings, half_day: allHalfDayBookings };
    } catch (error) {
      if (error instanceof TRPCClientError) {
        console.error(error.message);
        throw new Error(error.message);
      }
      console.error(error);
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
        mode: z.string(),
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
            mode: input.mode,
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
        console.log(input)
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
  addBookingData: publicProcedure
    .input(
      z.object({
        paypalBoookingId: z.string(),
        date: z.string(),
        boat: z.string(),
        noOfPeople: z.number(),
        time: z.string(),
        bookingType: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uuid = randomUUID().toString();
        const response = await ctx.db.lizzyAdditionalBookingInfo.create({
          data: {
            paypalBoookingId: input.paypalBoookingId,
            date: input.date,
            boat: input.boat,
            noOfPeople: input.noOfPeople,
            time: input.time,
            bookingType: input.bookingType,
          },
        });
        return response;
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

  getSunsetBlockDates: publicProcedure
    // .input(z.object({ date: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      try {
        const blockDates: string[] = [];

        const bookings = await ctx.db.lizzySunsetBooking.findMany({
          where: {
            date: { gte: dayjs(new Date()).format("YYYY-MM-DD") },
          },
          select: {
            date: true,
          },
        });

        bookings.forEach((booking) => {
          blockDates.push(booking.date);
        });

        return blockDates;
      } catch (error) {
        console.error(error);
        throw new Error("Something went wrong while fetching blocked dates.");
      }
    }),
  getBlockedDates: publicProcedure
    .input(
      z.object({
        numberOfPeople: z.number().optional(),
        bookingType: z.string().optional(),
        time: z.string().optional(),
        boat: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const blockDatesSet = new Set<string>();
        const allBookingDatesReturnArray: {
          date: string;
          isBlocked: boolean;
          boatAvailable: string;
        }[] = [];
        const today = dayjs().format("YYYY-MM-DD");

        // Fetch all bookings from today onward
        const bookings: AdditionalBooking[] =
          await ctx.db.lizzyAdditionalBookingInfo.findMany({
            where: {
              date: {
                gte: today,
              },
            },
            select: {
              date: true,
              boat: true,
              noOfPeople: true,
              bookingType: true,
              time: true,
            },
          });

        const groupedBookings = bookings.reduce<
          Record<string, AdditionalBooking[]>
        >((acc, booking) => {
          const date = booking.date;
          if (!acc[date]) {
            acc[date] = []; // Initialize a new array for each date
          }
          acc[date].push(booking); // Add the booking to the corresponding date's array
          return acc;
        }, {});

        Object.entries(groupedBookings).forEach(([date, bookingsArray]) => {
          console.log(`Bookings for ${date}:`, bookingsArray);
          console.log(summarizeBookings(bookingsArray));
          const tenSeaterBookings = bookingsArray.filter(
            (booking) => booking.boat === "ten_seater",
          );
          const seventeenSeaterBookings = bookingsArray.filter(
            (booking) => booking.boat === "seventeen_seater",
          );
          let isTenSeaterBlocked = false;
          let isSeventeenSeaterBlocked = false;
          // ten seater logic
          if (tenSeaterBookings.length > 0) {
            let isMorningBlocked = false;
            let isAfternoonBlocked = false;
            // let isFullDayBlocked = false;
            const transferBookings = tenSeaterBookings.filter(
              (booking) => booking.bookingType === "transfer",
            );
            const fullDayBookings = tenSeaterBookings.filter(
              (booking) => booking.time === "full_day",
            );
            const morningBookings = tenSeaterBookings.filter(
              (booking) => booking.time === "morning",
            );
            const afternoonBookings = tenSeaterBookings.filter(
              (booking) => booking.time === "afternoon",
            );
            if (transferBookings.length > 0) {
              isTenSeaterBlocked = true;
            }

            // charter bookings check
            if (fullDayBookings.length > 0) {
              const charterFullDayBookings = fullDayBookings.filter(
                (booking) => booking.bookingType === "charter",
              );
              if (charterFullDayBookings.length > 0) {
                isTenSeaterBlocked = input.bookingType !== "sunset";
              }
              // check for half day bookings as well
              if (morningBookings.length > 0) {
                const morningCharterBookings = morningBookings.filter(
                  (booking) => booking.bookingType === "charter",
                );
                isMorningBlocked = morningCharterBookings.length > 0;
              }
              if (afternoonBookings.length > 0) {
                const afternoonCharterBookings = afternoonBookings.filter(
                  (booking) => booking.bookingType === "charter",
                );
                isAfternoonBlocked = afternoonCharterBookings.length > 0;
              }
            }
            switch (input.bookingType) {
              case "charter":
                isTenSeaterBlocked =
                  isMorningBlocked ||
                  isAfternoonBlocked ||
                  fullDayBookings.length > 0 ||
                  isTenSeaterBlocked;
                break;
              case "snorkeling":
                let fullDayCapacitySnorkeling = 10;
                let morningSnorkelingCapacity = 10;
                let afternoonSnorkelingCapacity = 10;
                let isFullDayBlockedSnorkeling = false;
                let isMorningBlockedSnorkeling = false;
                let isAfternoonBlockedSnorkeling = false;
                if (fullDayBookings.length > 0) {
                  const isFullDayHaveOtherThanSnorkeling =
                    fullDayBookings.filter(
                      (booking) => booking.bookingType !== "snorkeling",
                    );
                  if (isFullDayHaveOtherThanSnorkeling.length > 0) {
                    isFullDayBlockedSnorkeling = true;
                  } else {
                    const fullDaySnorkelingBookings = fullDayBookings.filter(
                      (booking) => booking.bookingType === "snorkeling",
                    );
                    const morningSnorkelingBookings = morningBookings.filter(
                      (booking) => booking.bookingType === "snorkeling",
                    );
                    const afternoonSnorkelingBookings =
                      afternoonBookings.filter(
                        (booking) => booking.bookingType === "snorkeling",
                      );
                    if (morningSnorkelingBookings.length > 0) {
                      morningSnorkelingBookings.map((booking) => {
                        morningSnorkelingCapacity =
                          morningSnorkelingCapacity - booking.noOfPeople;
                      });
                    }
                    if (afternoonSnorkelingBookings.length > 0) {
                      afternoonSnorkelingBookings.map((booking) => {
                        afternoonSnorkelingCapacity =
                          afternoonSnorkelingCapacity - booking.noOfPeople;
                      });
                    }
                    if (fullDaySnorkelingBookings.length > 0) {
                      const capacityInTheFullDayBooking =
                        fullDaySnorkelingBookings.map((booking) => {
                          fullDayCapacitySnorkeling =
                            fullDayCapacitySnorkeling - booking.noOfPeople;
                          morningSnorkelingCapacity =
                            morningSnorkelingCapacity - booking.noOfPeople;
                          afternoonSnorkelingCapacity =
                            afternoonSnorkelingCapacity - booking.noOfPeople;
                        });
                      if (input.numberOfPeople) {
                        const fullDayCanBookedCapacity = Math.min(
                          fullDayCapacitySnorkeling,
                          morningSnorkelingCapacity,
                          afternoonSnorkelingCapacity,
                        );
                        isFullDayBlockedSnorkeling =
                          fullDayCanBookedCapacity < input?.numberOfPeople;
                      }
                      break;
                    }
                  }
                }
                if (morningBookings.length > 0 && input.time === "morning") {
                  const morningSnorkelingBookings = morningBookings.filter(
                    (booking) => booking.bookingType === "snorkeling",
                  );
                  if (
                    morningSnorkelingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isMorningBlockedSnorkeling =
                      Math.min(
                        morningSnorkelingCapacity,
                        fullDayCapacitySnorkeling,
                      ) < input?.numberOfPeople;
                  }
                }
                if (
                  afternoonBookings.length > 0 &&
                  input.time === "afternoon"
                ) {
                  const afternoonSnorkelingBookings = afternoonBookings.filter(
                    (booking) => booking.bookingType === "snorkeling",
                  );
                  if (
                    afternoonSnorkelingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isAfternoonBlockedSnorkeling =
                      Math.min(
                        afternoonSnorkelingCapacity,
                        fullDayCapacitySnorkeling,
                      ) < input?.numberOfPeople;
                  }
                }
                if (input.time === "morning") {
                  isTenSeaterBlocked =
                    isMorningBlockedSnorkeling ||
                    isFullDayBlockedSnorkeling ||
                    isTenSeaterBlocked;
                } else if (input.time === "afternoon") {
                  isTenSeaterBlocked =
                    isAfternoonBlockedSnorkeling ||
                    isFullDayBlockedSnorkeling ||
                    isTenSeaterBlocked;
                } else {
                  isTenSeaterBlocked = isFullDayBlockedSnorkeling;
                }
                break;

              // Case Fishing
              case "fishing":
                let fullDayCapacityFishing = 10;
                let morningFishingCapacity = 10;
                let afternoonFishingCapacity = 10;
                let isFullDayBlockedFishing = false;
                let isMorningBlockedFishing = false;
                let isAfternoonBlockedFishing = false;
                if (fullDayBookings.length > 0) {
                  const isFullDayHaveOtherThanfishing = fullDayBookings.filter(
                    (booking) => booking.bookingType !== "fishing",
                  );
                  if (isFullDayHaveOtherThanfishing.length > 0) {
                    isFullDayBlockedFishing = true;
                  } else {
                    const fullDayfishingBookings = fullDayBookings.filter(
                      (booking) => booking.bookingType === "fishing",
                    );
                    const morningfishingBookings = morningBookings.filter(
                      (booking) => booking.bookingType === "fishing",
                    );
                    const afternoonfishingBookings = afternoonBookings.filter(
                      (booking) => booking.bookingType === "fishing",
                    );
                    if (morningfishingBookings.length > 0) {
                      morningfishingBookings.map((booking) => {
                        morningFishingCapacity =
                          morningFishingCapacity - booking.noOfPeople;
                      });
                    }
                    if (afternoonfishingBookings.length > 0) {
                      afternoonfishingBookings.map((booking) => {
                        afternoonFishingCapacity =
                          afternoonFishingCapacity - booking.noOfPeople;
                      });
                    }
                    if (fullDayfishingBookings.length > 0) {
                      const capacityInTheFullDayBooking =
                        fullDayfishingBookings.map((booking) => {
                          fullDayCapacityFishing =
                            fullDayCapacityFishing - booking.noOfPeople;
                          morningFishingCapacity =
                            morningFishingCapacity - booking.noOfPeople;
                          afternoonFishingCapacity =
                            afternoonFishingCapacity - booking.noOfPeople;
                        });
                      if (input.numberOfPeople) {
                        const fullDayCanBookedCapacity = Math.min(
                          fullDayCapacityFishing,
                          morningFishingCapacity,
                          afternoonFishingCapacity,
                        );
                        isFullDayBlockedFishing =
                          fullDayCanBookedCapacity < input?.numberOfPeople;
                      }
                      break;
                    }
                  }
                }
                if (morningBookings.length > 0 && input.time === "morning") {
                  const morningfishingBookings = morningBookings.filter(
                    (booking) => booking.bookingType === "fishing",
                  );
                  if (
                    morningfishingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isMorningBlockedFishing =
                      Math.min(morningFishingCapacity, fullDayCapacityFishing) <
                      input?.numberOfPeople;
                  }
                }
                if (
                  afternoonBookings.length > 0 &&
                  input.time === "afternoon"
                ) {
                  const afternoonfishingBookings = afternoonBookings.filter(
                    (booking) => booking.bookingType === "fishing",
                  );
                  if (
                    afternoonfishingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isAfternoonBlockedFishing =
                      Math.min(
                        afternoonFishingCapacity,
                        fullDayCapacityFishing,
                      ) < input?.numberOfPeople;
                  }
                }
                if (input.time === "morning") {
                  isTenSeaterBlocked =
                    isMorningBlockedFishing ||
                    isFullDayBlockedFishing ||
                    isTenSeaterBlocked;
                } else if (input.time === "afternoon") {
                  isTenSeaterBlocked =
                    isAfternoonBlockedFishing ||
                    isFullDayBlockedFishing ||
                    isTenSeaterBlocked;
                } else {
                  isTenSeaterBlocked = isFullDayBlockedFishing;
                }
                break;

              case "sunset":
                let sunsetCapacity = 10;
                let isSunsetBlocked = false;
                // check for sunset booking
                const sunsetBookings = tenSeaterBookings.filter(
                  (booking) => booking.bookingType === "sunset",
                );
                if (sunsetBookings.length > 0) {
                  sunsetBookings.map((booking) => {
                    sunsetCapacity = sunsetCapacity - booking.noOfPeople;
                  });
                  if (input.numberOfPeople) {
                    isSunsetBlocked = sunsetCapacity < input?.numberOfPeople;
                  }
                }
                isTenSeaterBlocked = isSunsetBlocked || isTenSeaterBlocked;
                break;
              default:
                break;
            }
          }
          // Seventeen seater logic
          if (seventeenSeaterBookings.length > 0) {
            let isMorningBlocked = false;
            let isAfternoonBlocked = false;
            let isFullDayBlocked = false;
            const transferBookings = seventeenSeaterBookings.filter(
              (booking) => booking.bookingType === "transfer",
            );
            const fullDayBookings = seventeenSeaterBookings.filter(
              (booking) => booking.time === "full_day",
            );
            const morningBookings = seventeenSeaterBookings.filter(
              (booking) => booking.time === "morning",
            );
            const afternoonBookings = seventeenSeaterBookings.filter(
              (booking) => booking.time === "afternoon",
            );
            if (transferBookings.length > 0) {
              isSeventeenSeaterBlocked = true;
            }

            // charter bookings check
            if (fullDayBookings.length > 0) {
              const charterFullDayBookings = fullDayBookings.filter(
                (booking) => booking.bookingType === "charter",
              );
              if (charterFullDayBookings.length > 0) {
                isSeventeenSeaterBlocked = input.bookingType !== "sunset";
              }
              // check for half day bookings as well
              if (morningBookings.length > 0) {
                const morningCharterBookings = morningBookings.filter(
                  (booking) => booking.bookingType === "charter",
                );
                isMorningBlocked = morningCharterBookings.length > 0;
              }
              if (afternoonBookings.length > 0) {
                const afternoonCharterBookings = afternoonBookings.filter(
                  (booking) => booking.bookingType === "charter",
                );
                isAfternoonBlocked = afternoonCharterBookings.length > 0;
              }
            }
            switch (input.bookingType) {
              case "charter":
                isSeventeenSeaterBlocked =
                  isMorningBlocked ||
                  isAfternoonBlocked ||
                  fullDayBookings.length > 0 ||
                  isSeventeenSeaterBlocked;
                break;
              case "snorkeling":
                let fullDayCapacitySnorkeling = 17;
                let morningSnorkelingCapacity = 17;
                let afternoonSnorkelingCapacity = 17;
                let isFullDayBlockedSnorkeling = false;
                let isMorningBlockedSnorkeling = false;
                let isAfternoonBlockedSnorkeling = false;
                if (fullDayBookings.length > 0) {
                  const isFullDayHaveOtherThanSnorkeling =
                    fullDayBookings.filter(
                      (booking) => booking.bookingType !== "snorkeling",
                    );
                  if (isFullDayHaveOtherThanSnorkeling.length > 0) {
                    isFullDayBlockedSnorkeling = true;
                  } else {
                    const fullDaySnorkelingBookings = fullDayBookings.filter(
                      (booking) => booking.bookingType === "snorkeling",
                    );
                    const morningSnorkelingBookings = morningBookings.filter(
                      (booking) => booking.bookingType === "snorkeling",
                    );
                    const afternoonSnorkelingBookings =
                      afternoonBookings.filter(
                        (booking) => booking.bookingType === "snorkeling",
                      );
                    if (morningSnorkelingBookings.length > 0) {
                      morningSnorkelingBookings.map((booking) => {
                        morningSnorkelingCapacity =
                          morningSnorkelingCapacity - booking.noOfPeople;
                      });
                    }
                    if (afternoonSnorkelingBookings.length > 0) {
                      afternoonSnorkelingBookings.map((booking) => {
                        afternoonSnorkelingCapacity =
                          afternoonSnorkelingCapacity - booking.noOfPeople;
                      });
                    }
                    if (fullDaySnorkelingBookings.length > 0) {
                      const capacityInTheFullDayBooking =
                        fullDaySnorkelingBookings.map((booking) => {
                          fullDayCapacitySnorkeling =
                            fullDayCapacitySnorkeling - booking.noOfPeople;
                          morningSnorkelingCapacity =
                            morningSnorkelingCapacity - booking.noOfPeople;
                          afternoonSnorkelingCapacity =
                            afternoonSnorkelingCapacity - booking.noOfPeople;
                        });
                      if (input.numberOfPeople) {
                        const fullDayCanBookedCapacity = Math.min(
                          fullDayCapacitySnorkeling,
                          morningSnorkelingCapacity,
                          afternoonSnorkelingCapacity,
                        );
                        isFullDayBlockedSnorkeling =
                          fullDayCanBookedCapacity < input?.numberOfPeople;
                      }
                      break;
                    }
                  }
                }
                if (morningBookings.length > 0 && input.time === "morning") {
                  const morningSnorkelingBookings = morningBookings.filter(
                    (booking) => booking.bookingType === "snorkeling",
                  );
                  if (
                    morningSnorkelingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isMorningBlockedSnorkeling =
                      Math.min(
                        morningSnorkelingCapacity,
                        fullDayCapacitySnorkeling,
                      ) < input?.numberOfPeople;
                  }
                }
                if (
                  afternoonBookings.length > 0 &&
                  input.time === "afternoon"
                ) {
                  const afternoonSnorkelingBookings = afternoonBookings.filter(
                    (booking) => booking.bookingType === "snorkeling",
                  );
                  if (
                    afternoonSnorkelingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isAfternoonBlockedSnorkeling =
                      Math.min(
                        afternoonSnorkelingCapacity,
                        fullDayCapacitySnorkeling,
                      ) < input?.numberOfPeople;
                  }
                }
                if (input.time === "morning") {
                  isSeventeenSeaterBlocked =
                    isMorningBlockedSnorkeling ||
                    isFullDayBlockedSnorkeling ||
                    isSeventeenSeaterBlocked;
                } else if (input.time === "afternoon") {
                  isSeventeenSeaterBlocked =
                    isAfternoonBlockedSnorkeling ||
                    isFullDayBlockedSnorkeling ||
                    isSeventeenSeaterBlocked;
                } else {
                  isSeventeenSeaterBlocked = isFullDayBlockedSnorkeling;
                }
                break;

              // Case Fishing
              case "fishing":
                let fullDayCapacityFishing = 17;
                let morningFishingCapacity = 17;
                let afternoonFishingCapacity = 17;
                let isFullDayBlockedFishing = false;
                let isMorningBlockedFishing = false;
                let isAfternoonBlockedFishing = false;
                if (fullDayBookings.length > 0) {
                  const isFullDayHaveOtherThanfishing = fullDayBookings.filter(
                    (booking) => booking.bookingType !== "fishing",
                  );
                  if (isFullDayHaveOtherThanfishing.length > 0) {
                    isFullDayBlockedFishing = true;
                  } else {
                    const fullDayfishingBookings = fullDayBookings.filter(
                      (booking) => booking.bookingType === "fishing",
                    );
                    const morningfishingBookings = morningBookings.filter(
                      (booking) => booking.bookingType === "fishing",
                    );
                    const afternoonfishingBookings = afternoonBookings.filter(
                      (booking) => booking.bookingType === "fishing",
                    );
                    if (morningfishingBookings.length > 0) {
                      morningfishingBookings.map((booking) => {
                        morningFishingCapacity =
                          morningFishingCapacity - booking.noOfPeople;
                      });
                    }
                    if (afternoonfishingBookings.length > 0) {
                      afternoonfishingBookings.map((booking) => {
                        afternoonFishingCapacity =
                          afternoonFishingCapacity - booking.noOfPeople;
                      });
                    }
                    if (fullDayfishingBookings.length > 0) {
                      const capacityInTheFullDayBooking =
                        fullDayfishingBookings.map((booking) => {
                          fullDayCapacityFishing =
                            fullDayCapacityFishing - booking.noOfPeople;
                          morningFishingCapacity =
                            morningFishingCapacity - booking.noOfPeople;
                          afternoonFishingCapacity =
                            afternoonFishingCapacity - booking.noOfPeople;
                        });
                      if (input.numberOfPeople) {
                        const fullDayCanBookedCapacity = Math.min(
                          fullDayCapacityFishing,
                          morningFishingCapacity,
                          afternoonFishingCapacity,
                        );
                        isFullDayBlockedFishing =
                          fullDayCanBookedCapacity < input?.numberOfPeople;
                      }
                      break;
                    }
                  }
                }
                if (morningBookings.length > 0 && input.time === "morning") {
                  const morningfishingBookings = morningBookings.filter(
                    (booking) => booking.bookingType === "fishing",
                  );
                  if (
                    morningfishingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isMorningBlockedFishing =
                      Math.min(morningFishingCapacity, fullDayCapacityFishing) <
                      input?.numberOfPeople;
                  }
                }
                if (
                  afternoonBookings.length > 0 &&
                  input.time === "afternoon"
                ) {
                  const afternoonfishingBookings = afternoonBookings.filter(
                    (booking) => booking.bookingType === "fishing",
                  );
                  if (
                    afternoonfishingBookings.length > 0 &&
                    input.numberOfPeople
                  ) {
                    isAfternoonBlockedFishing =
                      Math.min(
                        afternoonFishingCapacity,
                        fullDayCapacityFishing,
                      ) < input?.numberOfPeople;
                  }
                }
                if (input.time === "morning") {
                  isSeventeenSeaterBlocked =
                    isMorningBlockedFishing ||
                    isFullDayBlockedFishing ||
                    isSeventeenSeaterBlocked;
                } else if (input.time === "afternoon") {
                  isSeventeenSeaterBlocked =
                    isAfternoonBlockedFishing ||
                    isFullDayBlockedFishing ||
                    isSeventeenSeaterBlocked;
                } else {
                  isSeventeenSeaterBlocked = isFullDayBlockedFishing;
                }
                break;

              case "sunset":
                let sunsetCapacity = 17;
                let isSunsetBlocked = false;
                // check for sunset booking
                const sunsetBookings = seventeenSeaterBookings.filter(
                  (booking) => booking.bookingType === "sunset",
                );
                if (sunsetBookings.length > 0) {
                  sunsetBookings.map((booking) => {
                    sunsetCapacity = sunsetCapacity - booking.noOfPeople;
                  });
                  if (input.numberOfPeople) {
                    isSunsetBlocked = sunsetCapacity < input?.numberOfPeople;
                  }
                }
                isSeventeenSeaterBlocked =
                  isSunsetBlocked || isSeventeenSeaterBlocked;
                break;
              default:
                break;
            }
          }
          // logic if bloacked or not
          const isBlocked = isTenSeaterBlocked && isSeventeenSeaterBlocked;
          allBookingDatesReturnArray.push({
            date: date,
            isBlocked: isBlocked,
            boatAvailable: isBlocked
              ? "none"
              : isTenSeaterBlocked
                ? "seventeen_seater"
                : "ten_seater",
          });
        });

        return {
          message: "ran successfully",
          blockedDateSet: allBookingDatesReturnArray,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Something went wrong while fetching blocked dates.");
      }
    }),
});

type BoatType = "ten_seater" | "seventeen_seater";

function summarizeBookings(
  bookings: AdditionalBooking[],
): Record<BoatType, BookingSummary> {
  const boatCapacity: Record<BoatType, number> = {
    ten_seater: 10,
    seventeen_seater: 17,
  };

  const summary: Record<BoatType, BookingSummary> = {
    ten_seater: {
      isBooked: false,
      isCapacityAvailable: true,
      bookingTypes: [],
      totalNoOfPeople: 0,
      capacity: 10,
      morning: false,
      afternoon: false,
      full_day: false,
    },
    seventeen_seater: {
      isBooked: false,
      isCapacityAvailable: true,
      bookingTypes: [],
      totalNoOfPeople: 0,
      capacity: 17,
      morning: false,
      afternoon: false,
      full_day: false,
    },
  };

  bookings.forEach((booking) => {
    const boat = booking.boat as BoatType; // Type assertion

    const boatSummary = summary[boat];

    // Update booking information
    boatSummary.isBooked = true;
    boatSummary.totalNoOfPeople += booking.noOfPeople;
    boatSummary.capacity = boatCapacity[boat] - boatSummary.totalNoOfPeople;
    boatSummary.isCapacityAvailable = boatSummary.capacity > 0;

    // Add booking type if not already present
    if (!boatSummary.bookingTypes.includes(booking.bookingType)) {
      boatSummary.bookingTypes.push(booking.bookingType);
    }

    // Update time slots
    if (booking.time === "morning") {
      boatSummary.morning = true;
    } else if (booking.time === "afternoon") {
      boatSummary.afternoon = true;
    } else if (booking.time === "full_day") {
      boatSummary.full_day = true;
      boatSummary.morning = true; // Full day booking covers morning
      boatSummary.afternoon = true; // Full day booking covers afternoon
    }
  });

  return summary;
}
