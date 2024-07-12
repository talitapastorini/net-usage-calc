"use client";
import React from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

interface FormFieldWrapperProps<TFormValues extends FieldValues = FieldValues> {
  name: Path<TFormValues>;
  label?: string;
  children: (field: ControllerRenderProps<TFormValues, any>) => React.ReactNode;
}

export function FormFieldWrapper<
  TFormValues extends FieldValues = FieldValues
>({ name, label, children }: FormFieldWrapperProps<TFormValues>) {
  const { control } = useFormContext<TFormValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
