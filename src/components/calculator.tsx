"use client";
import * as React from "react";

import { Input } from "@/components/ui/input";

import { Button } from "./ui/button";
import { FormWrapper } from "./form/form-wrapper";
import { z } from "zod";
import { FormFieldWrapper } from "./form/field-wrapper";
import MoneyInput from "./form/money-input";
import { moneyFormatter } from "@/utils/money-formatter";

const schema = z.object({
  price: z.coerce.number().min(0.01, "Campo obrigatório").default(0),
  days: z.coerce
    .number({
      required_error: "Campo obrigatório",
    })
    .min(1, "Mín. 1")
    .max(30, "Máx. 30")
    .default(0),
});

type FormData = z.infer<typeof schema>;

export function Calculator() {
  const [total, setTotal] = React.useState<string>("");

  const onSubmit = ({ price, days }: FormData) => {
    const formattedValue = moneyFormatter.format((price * days) / 30);
    setTotal(formattedValue);
  };

  return (
    <div className="absolute inset-x-0 top-28 mx-auto w-11/12 max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <FormWrapper<FormData> onSubmit={onSubmit} validationSchema={schema}>
        {({ reset }) => (
          <div className="flex flex-col justify-between space-y-8">
            <div className="flex flex-row justify-between space-x-8 ">
              <div className="flex flex-col space-y-1 w-1/2	">
                <p className="text-base text-slate-400 font-bold">
                  Valor do plano
                </p>

                <MoneyInput name="price" />
              </div>
              <div className="flex flex-col space-y-1 w-1/2">
                <p className="text-base text-slate-400 font-bold">Qtd. dias</p>
                <FormFieldWrapper name="days">
                  {(field) => (
                    <Input
                      {...field}
                      type="number"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-red-500 focus:ring focus:ring-red-200"
                    />
                  )}
                </FormFieldWrapper>
              </div>
            </div>

            {!!total && (
              <div className="flex justify-center text-red-700 font-bold text-lg rounded-lg p-2">
                <p>
                  {total}{" "}
                  <span className="text-base text-gray-400 font-normal">
                    (aproximadamente)
                  </span>
                </p>
              </div>
            )}
            <div className="flex flex-col space-y-2">
              {!!total && (
                <Button
                  onClick={() => {
                    reset({ days: 0, price: 0 });
                    setTotal("");
                  }}
                  className={`bg-transparent border-2 border-red-500 text-red-600 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 hover:bg-red-100 hover:text-red-700 transition-colors duration-300`}
                >
                  Limpar
                </Button>
              )}
              <Button
                className={`bg-gradient-to-r from-yellow-500 to-yellow-600 font-bold text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 hover:from-yellow-600 hover:to-yellow-800`}
                type="submit"
              >
                Calcular
              </Button>
            </div>
          </div>
        )}
      </FormWrapper>
    </div>
  );
}
