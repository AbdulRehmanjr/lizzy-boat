import { z } from "zod";
import { type Transporter, createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type Mail from "nodemailer/lib/mailer";
import path from "path";
import { cwd, env } from "process";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const EmailRouter = createTRPCRouter({
  buyerFishingEmail: publicProcedure
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
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });
        const pdfFilePath = path.join(cwd(), "public", "Cancellation.pdf");
        const attachments: Mail.Attachment[] = [
          {
            filename: "Cancellation_Policy.pdf",
            path: pdfFilePath,
          },
        ];

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${input.email}`,
          subject: "Fishing Boat Rental Confirmation",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy c " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <h2 style="margin-bottom: 10px;">Rental confirmation</h2>
                            <p>Dear ${input?.firstName.trim()},</p>
                            <p>Thank you for your renting our boat.</p>
                            <p>
                                <span style="font-weight:bold;">Your confirmation number is: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Your boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Infants: </span>
                                <span>${input?.infants}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Booking Type: </span>
                                <span>${input?.bookingType}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Time Slot: </span>
                                <span>${input?.time}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <p>Please feel free to reach out to us if you need to cancel or reschedule your booking. Cancellation
                                policy is attached below.</p>
                            <p style="margin-bottom:10px;">We are looking forward to seeing you soon.</p>
                            <p style="margin-bottom:10px;">Best regards,</p>
                            <h2 style="margin-bottom:10px;">Team of Lizzy Boat Rental</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: rgb(243,244,246);  padding: 15px; text-align: center; color:black">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy" style="width: 100px;">
                            <p>Lizzy</p>
                            <p>Grand Anse, La Digue</p>
                            <p>Seychelles</p>
                            <p>ladyc@gmail.com</p>
                            <p>+248 2 59 00 73</p>
                        </td>
                    </tr>
                </table>`,
          attachments: attachments,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  buyerPrivateEmail: publicProcedure
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
        total_no_of_people: z.number(),
        bookingType: z.string(),
        time: z.string(),
        date: z.string(),
        price: z.string(),
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });
        const pdfFilePath = path.join(cwd(), "public", "Cancellation.pdf");
        const attachments: Mail.Attachment[] = [
          {
            filename: "Cancellation_Policy.pdf",
            path: pdfFilePath,
          },
        ];

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${input.email}`,
          subject: "Private Boat Rental Confirmation",
          html: `  
                        <table
                        style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                        <tr>
                            <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                                <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                    alt="Lizzy " style="width: 100px;">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <h2 style="margin-bottom: 10px;">Rental confirmation</h2>
                                <p>Dear ${input?.firstName.trim()},</p>
                                <p>Thank you for your renting our boat.</p>
                                <p>
                                    <span style="font-weight:bold;">Your confirmation number is: </span>
                                    <span>${input?.paypalId}</span>
                                </p>
                                <p style="font-size:18px;">Your boat booking details are below:</p>
                                <p>
                                    <span style="font-weight:bold;">Full Name: </span>
                                    <span>${input?.firstName} ${input?.lastName}</span>
                                </p>
                                <p>
                                    <span style="font-weight:bold;">Email: </span>
                                    <span>${input?.email}</span>
                                </p>
                                <p>
                                    <span style="font-weight:bold;">Phone: </span>
                                    <span>${input?.phone}</span>
                                </p>
                                <p>
                                    <span style="font-weight:bold;">Guesthouse: </span>
                                    <span>${input?.guesthouse}</span>
                                </p>
                                 <p>
                                    <span style="font-weight:bold;">Adults: </span>
                                    <span>${input?.adults}</span>
                                </p>
                                 <p>
                                <span style="font-weight:bold;">Child (0-3): </span>
                                <span>${input?.child_0_3}</span>
                            </p>
                            ${
                              input?.bookingType === "half_day"
                                ? `
                            <p>
                                <span style="font-weight:bold;">Child (4-8): </span>
                                <span>${input?.child_4_8}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Child (9-13): </span>
                                <span>${input?.child_9_13}</span>
                            </p>
                            `
                                : `
                            <p>
                                <span style="font-weight:bold;">Child (4-11): </span>
                                <span>${input?.child_4_11}</span>
                            </p>                                
                                `
                            }
                                <p>
                                    <span style="font-weight:bold;">Booking Type: </span>
                                    <span>${input?.bookingType}</span>
                                </p>
                                <p>
                                    <span style="font-weight:bold;">Time Slot: </span>
                                    <span>${input?.time}</span>
                                </p>
                                <p>
                                    <span style="font-weight:bold;">Date: </span>
                                    <span>${input?.date}</span>
                                </p>
                                <p>
                                    <span style="font-weight:bold;">Total amount: </span>
                                    <span>${input?.price} €</span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <p>Please feel free to reach out to us if you need to cancel or reschedule your booking. Cancellation
                                    policy is attached below.</p>
                                <p style="margin-bottom:10px;">We are looking forward to seeing you soon.</p>
                                <p style="margin-bottom:10px;">Best regards,</p>
                                <h2 style="margin-bottom:10px;">Team of Lizzy Boat Rental</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: rgb(243,244,246);  padding: 15px; text-align: center; color:black">
                                <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                    alt="Lizzy" style="width: 100px;">
                                <p>Lizzy</p>
                                <p>Grand Anse, La Digue</p>
                                <p>Seychelles</p>
                                <p>ladyc@gmail.com</p>
                                <p>+248 2 59 00 73</p>
                            </td>
                        </tr>
                    </table>`,
          attachments: attachments,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  buyerSnorkelingEmail: publicProcedure
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
        price: z.string(),
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });
        const pdfFilePath = path.join(cwd(), "public", "Cancellation.pdf");
        const attachments: Mail.Attachment[] = [
          {
            filename: "Cancellation_Policy.pdf",
            path: pdfFilePath,
          },
        ];

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${input.email}`,
          subject: "Snorkeling Boat Rental Confirmation",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <h2 style="margin-bottom: 10px;">Rental confirmation</h2>
                            <p>Dear ${input?.firstName.trim()},</p>
                            <p>Thank you for your renting our boat.</p>
                            <p>
                                <span style="font-weight:bold;">Your confirmation number is: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Your boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Child (0-3): </span>
                                <span>${input?.child_0_3}</span>
                            </p>
                            ${
                              input?.bookingType === "half_day"
                                ? `
                            <p>
                                <span style="font-weight:bold;">Child (4-8): </span>
                                <span>${input?.child_4_8}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Child (9-13): </span>
                                <span>${input?.child_9_13}</span>
                            </p>
                            `
                                : `
                            <p>
                                <span style="font-weight:bold;">Child (4-11): </span>
                                <span>${input?.child_4_11}</span>
                            </p>                                
                                `
                            }
                            <p>
                                <span style="font-weight:bold;">Booking Type: </span>
                                <span>${input?.bookingType}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Time Slot: </span>
                                <span>${input?.time}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <p>Please feel free to reach out to us if you need to cancel or reschedule your booking. Cancellation
                                policy is attached below.</p>
                            <p style="margin-bottom:10px;">We are looking forward to seeing you soon.</p>
                            <p style="margin-bottom:10px;">Best regards,</p>
                            <h2 style="margin-bottom:10px;">Team of Lizzy Boat Rental</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: rgb(243,244,246);  padding: 15px; text-align: center; color:black">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy" style="width: 100px;">
                            <p>Lizzy</p>
                            <p>Grand Anse, La Digue</p>
                            <p>Seychelles</p>
                            <p>ladyc@gmail.com</p>
                            <p>+248 2 59 00 73</p>
                        </td>
                    </tr>
                </table>`,
          attachments: attachments,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  buyerTransferEmail: publicProcedure
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
        dateReturn: z.string(),
        departFrom: z.string(),
        departFromReturn: z.string(),
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });
        const pdfFilePath = path.join(cwd(), "public", "Cancellation.pdf");
        const attachments: Mail.Attachment[] = [
          {
            filename: "Cancellation_Policy.pdf",
            path: pdfFilePath,
          },
        ];

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${input.email}`,
          subject: "Transfer Boat Rental Confirmation",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <h2 style="margin-bottom: 10px;">Rental confirmation</h2>
                            <p>Dear ${input?.firstName.trim()},</p>
                            <p>Thank you for your renting our boat.</p>
                            <p>
                                <span style="font-weight:bold;">Your confirmation number is: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Your boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Infants: </span>
                                <span>${input?.infants}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Booking Type: </span>
                                <span>${input?.bookingType}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Transfer Mode: </span>
                                <span>${input?.mode}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Start time: </span>
                                <span>${input?.startTime}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">End time: </span>
                                <span>${input?.endTime}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                            ${input?.dateReturn && `<p>
                                <span style="font-weight:bold;">Date return: </span>
                                <span>${input?.dateReturn}</span>
                            </p>`}
                            <p>
                                <span style="font-weight:bold;">Depart from: </span>
                                <span>${input?.departFrom}</span>
                            </p>
                            ${
                              input?.departFromReturn && 
                              `<p>
                                  <span style="font-weight:bold;">Depart from return: </span>
                                  <span>${input?.departFromReturn}</span>
                              </p>`
                            }
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <p>Please feel free to reach out to us if you need to cancel or reschedule your booking. Cancellation
                                policy is attached below.</p>
                            <p style="margin-bottom:10px;">We are looking forward to seeing you soon.</p>
                            <p style="margin-bottom:10px;">Best regards,</p>
                            <h2 style="margin-bottom:10px;">Team of Lizzy Boat Rental</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: rgb(243,244,246);  padding: 15px; text-align: center; color:black">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy" style="width: 100px;">
                            <p>Lizzy</p>
                            <p>Grand Anse, La Digue</p>
                            <p>Seychelles</p>
                            <p>ladyc@gmail.com</p>
                            <p>+248 2 59 00 73</p>
                        </td>
                    </tr>
                </table>`,
          attachments: attachments,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  buyerSunsetEmail: publicProcedure
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
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });
        const pdfFilePath = path.join(cwd(), "public", "Cancellation.pdf");
        const attachments: Mail.Attachment[] = [
          {
            filename: "Cancellation_Policy.pdf",
            path: pdfFilePath,
          },
        ];

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${input.email}`,
          subject: "Sunset Boat Rental Confirmation",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <h2 style="margin-bottom: 10px;">Rental confirmation</h2>
                            <p>Dear ${input?.firstName.trim()},</p>
                            <p>Thank you for your renting our boat.</p>
                            <p>
                                <span style="font-weight:bold;">Your confirmation number is: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Your boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Infants: </span>
                                <span>${input?.infants}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <p>Please feel free to reach out to us if you need to cancel or reschedule your booking. Cancellation
                                policy is attached below.</p>
                            <p style="margin-bottom:10px;">We are looking forward to seeing you soon.</p>
                            <p style="margin-bottom:10px;">Best regards,</p>
                            <h2 style="margin-bottom:10px;">Team of Lizzy Boat Rental</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: rgb(243,244,246);  padding: 15px; text-align: center; color:black">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy" style="width: 100px;">
                            <p>Lizzy</p>
                            <p>Grand Anse, La Digue</p>
                            <p>Seychelles</p>
                            <p>ladyc@gmail.com</p>
                            <p>+248 2 59 00 73</p>
                        </td>
                    </tr>
                </table>`,
          attachments: attachments,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  sellerFishingEmail: publicProcedure
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
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${env.ZOHO_SENDER}`,
          subject: "Fishing Boat booking received",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                           <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                            <p>Dear Lizzy,</p>
                            <p>You have received a new boat rental booking:</p>
                            <p>
                                <span style="font-weight:bold;">Refund id: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Infants: </span>
                                <span>${input?.infants}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Booking Type: </span>
                                <span>${input?.bookingType}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Time Slot: </span>
                                <span>${input?.time}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">How did you get to know us?: </span>
                                <span>${input?.extra}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Additional information: </span>
                                <span>${input?.information}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                </table>`,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  sellerPrivateEmail: publicProcedure
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
        total_no_of_people: z.number(),
        bookingType: z.string(),
        time: z.string(),
        date: z.string(),
        price: z.string(),
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${env.ZOHO_SENDER}`,
          subject: "Private Boat booking received",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                           <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                            <p>Dear Lizzy,</p>
                            <p>You have received a new boat rental booking:</p>
                            <p>
                                <span style="font-weight:bold;">Refund id: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Child (0-3): </span>
                                <span>${input?.child_0_3}</span>
                            </p>
                            ${
                              input?.bookingType === "half_day"
                                ? `
                            <p>
                                <span style="font-weight:bold;">Child (4-8): </span>
                                <span>${input?.child_4_8}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Child (9-13): </span>
                                <span>${input?.child_9_13}</span>
                            </p>
                            `
                                : `
                            <p>
                                <span style="font-weight:bold;">Child (4-11): </span>
                                <span>${input?.child_4_11}</span>
                            </p>                                
                                `
                            }
                            <p>
                                <span style="font-weight:bold;">Booking Type: </span>
                                <span>${input?.bookingType}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Time Slot: </span>
                                <span>${input?.time}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">How did you get to know us?: </span>
                                <span>${input?.extra}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Additional information: </span>
                                <span>${input?.information}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                </table>`,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  sellerSnorkelingEmail: publicProcedure
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
        price: z.string(),
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });
        const email: Mail.Options = {
          from: `${sender}`,
          to: `${env.ZOHO_SENDER}`,
          subject: "Snorkeling Boat booking received",
          html: `  
                     <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                           <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                            <p>Dear Lizzy,</p>
                            <p>You have received a new boat rental booking:</p>
                            <p>
                                <span style="font-weight:bold;">Your confirmation number is: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Your boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Child (0-3): </span>
                                <span>${input?.child_0_3}</span>
                            </p>
                            ${
                              input?.bookingType === "half_day"
                                ? `
                            <p>
                                <span style="font-weight:bold;">Child (4-8): </span>
                                <span>${input?.child_4_8}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Child (9-13): </span>
                                <span>${input?.child_9_13}</span>
                            </p>
                            `
                                : `
                            <p>
                                <span style="font-weight:bold;">Child (4-11): </span>
                                <span>${input?.child_4_11}</span>
                            </p>                                
                                `
                            }
                            <p>
                                <span style="font-weight:bold;">Booking Type: </span>
                                <span>${input?.bookingType}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Time Slot: </span>
                                <span>${input?.time}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                </table>`,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  sellerTransferEmail: publicProcedure
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
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${env.ZOHO_SENDER}`,
          subject: "Transfer Boat booking received",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                              <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                            <p>Dear Lizzy,</p>
                            <p>You have received a new boat rental booking:</p>
                            <p>
                                <span style="font-weight:bold;">Refund Id: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Infants: </span>
                                <span>${input?.infants}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Booking Type: </span>
                                <span>${input?.bookingType}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Transfer Mode: </span>
                                <span>${input?.mode}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Start time: </span>
                                <span>${input?.startTime}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">End time: </span>
                                <span>${input?.endTime}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                </table>`,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),

  sellerSunsetEmail: publicProcedure
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
        paypalId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const sender = env.ZOHO_EMAIL;
        const password = env.ZOHO_PASSWORD;
        const transporter: Transporter<SMTPTransport.SentMessageInfo> =
          createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
              user: sender,
              pass: password,
            },
          });

        const email: Mail.Options = {
          from: `${sender}`,
          to: `${env.ZOHO_SENDER}`,
          subject: "Sunset Boat booking received",
          html: `  
                    <table
                    style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif;">
                    <tr>
                        <td style="background-color: rgb(243,244,246); padding: 15px; text-align: center;">
                            <img src="https://res.cloudinary.com/dbjiys9se/image/upload/v1709012168/pam-hotel/logo-10_ajoun5.png"
                                alt="Lizzy " style="width: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">
                            <h2 style="margin-bottom: 10px;">Booking confirmation</h2>
                            <p>Dear Lizzy,</p>
                            <p>You have received a new boat rental booking:</p>
                            <p>
                                <span style="font-weight:bold;">Refund Id: </span>
                                <span>${input?.paypalId}</span>
                            </p>
                            <p style="font-size:18px;">Boat booking details are below:</p>
                            <p>
                                <span style="font-weight:bold;">Full Name: </span>
                                <span>${input?.firstName} ${input?.lastName}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Email: </span>
                                <span>${input?.email}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Phone: </span>
                                <span>${input?.phone}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Guesthouse: </span>
                                <span>${input?.guesthouse}</span>
                            </p>
                             <p>
                                <span style="font-weight:bold;">Adults: </span>
                                <span>${input?.adults}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Infants: </span>
                                <span>${input?.infants}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Date: </span>
                                <span>${input?.date}</span>
                            </p>
                            <p>
                                <span style="font-weight:bold;">Total amount: </span>
                                <span>${input?.price} €</span>
                            </p>
                        </td>
                    </tr>
                </table>`,
        };
        await transporter.sendMail(email);
      } catch (error) {
        console.error(error);
        throw new Error("Error");
      }
    }),
});
