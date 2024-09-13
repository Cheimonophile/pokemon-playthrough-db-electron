import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from "@headlessui/react";
import { useData } from "@renderer/hooks/useData";
import { ReactNode, useCallback, useState } from "react";



/**
 * An option for a combobox
 */
export interface ComboboxOption {


  /**
   * The key of the item in the combobox
   */
  readonly key: string;

  /**
   * The label of the item in the combobox
   */
  readonly label: string;
}

/**
 * Callback function to load the combobox options
 */
export interface LoadOptions {
  (query: string): Promise<readonly ComboboxOption[]>;
}


/**
 * Props for SingleCombobox
 */
export interface SingleComboboxProps {

  /**
   * Label for the combobox
   */
  readonly label?: string;


  /**
   * The current value of the combobox
   */
  readonly value: string | null;

  /**
   * Set the value of the combobox
   * 
   * @param value 
   * @returns 
   */
  readonly onChange: (value: string) => void;

  /**
   * Options for the combobox
   * 
   * MUST BE IN USE CALLBACK
   */
  readonly getOptions: LoadOptions;

  /**
   * Watched changes in the query
   * 
   * @param query 
   * @returns 
   */
  readonly onChangeQuery?: (query: string) => void;
}



/**
 * A Single Combobox
 * 
 * @param props 
 * @returns 
 */
export function SingleCombobox({
  label,
  getOptions,
  value,
  onChange,
}: SingleComboboxProps): ReactNode {
  const [query, setQuery] = useState<string>("");

  /**
   * Fetch the options for the combobox
   */
  const fetchOptions = useCallback(async () => {
    const options = await getOptions(query);
    return options;
  }, [query, getOptions]);

  /**
   * The options for the combobox
   */
  const options = useData(fetchOptions);

  /**
   * The actively selected label and its display value
   */
  const displayValue = useCallback((option: ComboboxOption | null): string => {
    return option?.label ?? "";
  }, []);

  return (
    <Field className="flex flex-col relative">
      <Label className="block">{label}</Label>
      <Combobox
        value={value}
        onChange={onChange}>
        <ComboboxInput
          className="px-1 py-0.5 border rounded"
          displayValue={displayValue}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxOptions id="ComboboxOption" anchor="bottom start" className="border rounded overflow-y-auto empty:invisible max-w-full max-h-96 bg-white shadow">
          {Array.from(options?.entries() ?? []).map(([key, option]) => (
            <ComboboxOption key={key} value={option} className="relative after:absolute after:inset-0 data-[focus]:after:backdrop-brightness-90 w-full px-1 py-0.5 cursor-pointer">
              {option.label}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}