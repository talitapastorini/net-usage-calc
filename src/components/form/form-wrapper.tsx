"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";
import { Form } from "../ui/form";

interface FormProps<TFormValues extends FieldValues = FieldValues> {
  onSubmit: SubmitHandler<TFormValues>;
  validationSchema: ZodType<any, any>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
}

export const FormWrapper = <TFormValues extends FieldValues = FieldValues>({
  onSubmit,
  validationSchema,
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    resolver: zodResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children(methods)}</form>
    </Form>
  );
};
