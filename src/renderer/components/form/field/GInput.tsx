import { Input } from "@headlessui/react";
import { GField } from "../GField";
import { ComponentProps } from "react";

/**
 * Props for GInput
 */
export interface GInputProps {

  /**
   * Label for the input
   */
  label: string | undefined;

  /**
   * Type of the input
   */
  type: ComponentProps<'input'>['type'];


  /**
   * Value of the input
   */
  value: string;

  /**
   * When the value changes
   * 
   * @param value 
   * @returns 
   */
  onChange: ComponentProps<'input'>['onChange'];
}


/**
 * Generic input field
 */
export function GInput({
  label,
  type,
  value,
  onChange
}: GInputProps) {
  return (
    <GField label={label}>
      <Input
        className="border rounded px-1 py-0.5"
        type={type}
        value={value}
        onChange={onChange}
      />
    </GField>
  );
}