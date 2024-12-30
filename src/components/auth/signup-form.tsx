"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import supabase from "@/lib/supabase";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof formSchema>;

export function SignupForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormData) => {
    try {
      console.log("Submitting form with values:", values);

      // Call Supabase sign-up
      const { data, error } = await supabase.auth.signUp(values);

      if (error) {
        // Handle error (e.g., display an error message to the user)
        toast.error(`Sign-up failed: ${error.message}`);
        console.error("Error signing up:", error.message);
        return;
      }

      console.log("Sign-up successful:", data);
      // Handle success (e.g., redirect the user or show a confirmation message)
      toast.success(
        "Sign-up successful! Please check your email to confirm your account.",
      );
    } catch (err) {
      // Catch unexpected errors
      toast.error("Unexpected error during sign-up");
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
      >
        <div className="flex flex-col items-start gap-2 text-left">
          <h1 className="text-2xl font-bold font-sans">Create a new account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-full">
            Signup
          </Button>
        </div>
        <div className="text-left text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
