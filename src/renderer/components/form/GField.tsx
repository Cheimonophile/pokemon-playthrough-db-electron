import { Field, Label } from "@headlessui/react";
import { FC } from "react";


export interface GFieldProps {
  children?: React.ReactNode;

  /**
   * Label for the field
   */
  label: string | undefined;
}



export const GField: FC<GFieldProps> = ({
  children,
  label
}) => {


  return (
    <Field className="flex flex-col relative text-sm">
      {label && <Label className="block">{label}</Label>}
      {children}
    </Field>
  )
}