import { GInput } from "../GInput";


/**
 * TextInputProps
 */
export interface TextInputProps {


  label?: string;

  /**
   * The value of the text inpu
   */
  value: string | null;

  /**
   * Watch the change of the value in the input
   * 
   * @param value 
   * @returns 
   */
  onChange: (value: string | null) => void;
}


/**
 * Input for typing text
 */
export function TextInput({
  label,
  value,
  onChange
}: TextInputProps) {
  return (
    <GInput
      label={label}
      type="text"
      value={value ?? ""}
      onChange={e => onChange(e.target.value)}
    />
  )
}