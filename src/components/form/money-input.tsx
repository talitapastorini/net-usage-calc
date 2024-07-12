"use client";
import { useEffect, useReducer } from "react";
import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { FormFieldWrapper } from "./field-wrapper";
import { moneyFormatter } from "@/utils/money-formatter";

type TextInputProps = {
  name: string;
  placeholder?: string;
};

export default function MoneyInput(props: TextInputProps) {
  const form = useFormContext();

  const initialValue = form.getValues()[props.name]
    ? moneyFormatter.format(form.getValues()[props.name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormFieldWrapper name={props.name}>
            {(field) => (
              <Input
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            )}
          </FormFieldWrapper>
        );
      }}
    />
  );
}
