"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { PayPalIdAtom, PayPalDisbaleAtom, FormAtom } from "~/utils/stores";
import { Button } from "./Button";

const formSchema = z.object({
  firstName: z.string({ required_error: "Field is required." }),
  lastName: z.string({ required_error: "Field is required." }),
  email: z
    .string({ required_error: "Field is required." })
    .email({ message: "Invalid email address" }),
  phone: z.string({ required_error: "Field is required." }),
  guesthouse: z.optional(z.string({ required_error: "Field is required" })),
  additional: z.optional(z.string({ required_error: "Field is required." })),
  info: z.optional(z.string({ required_error: "Field is required." })),
});

const BookingForm = () => {
  const setBookingId = useSetAtom(PayPalIdAtom);
  const setTrigger = useSetAtom(PayPalDisbaleAtom);
  const setFormData = useSetAtom(FormAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createBooking = api.booking.createPayPalBooking.useMutation({
    onSuccess: (data: string) => {
      setBookingId(() => data);
      setTrigger(() => false);
      window.location.reload();
    },
  });

  const formSubmitted = (data: z.infer<typeof formSchema>) => {
    setFormData(() => ({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      information: data.info ?? "none",
      extra: data.additional ?? "none",
      guesthouse: data.guesthouse ?? "none",
    }));
    createBooking.mutate({ email: data.email });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmitted)}
        className={`text-mid-blue grid grid-cols-2 gap-3`}
      >
        <h1 className="font-ibm col-span-2 text-4xl">
          Personal information
        </h1>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter first name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter last name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Phone no.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone no."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guesthouse"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Guesthouse name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter guesthouse name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="info"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>How did you get to know us?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="how did you get to know us?"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additional"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Additional information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write additional information"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-center">
          <Button type="submit" disabled={createBooking.isPending}>
            {createBooking.isPending ? "Continue..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
