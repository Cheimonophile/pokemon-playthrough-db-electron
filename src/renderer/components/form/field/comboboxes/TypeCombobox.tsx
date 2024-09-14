import { useCallback } from "react";
import { ComboboxOption, SingleGCombobox } from "../GCombobox";


/**
 * Props for the type combobox
 */
export interface TypeComboboxProps {

  /**
   * The id of the currently selected type
   */
  typeId: string | null;


  /**
   * 
   * @param typeId 
   */
  onChange(typeId: string | null): void;


  /**
   * Is it the first or second type
   */
  typeNumber: 1 | 2 | undefined;

}




/**
 * Combobox to select a type
 */
export function TypeCombobox({
  typeId,
  onChange,
  typeNumber
}: TypeComboboxProps) {

  /**
   * Get the types from the database
   */
  const getTypeOptions = useCallback(async (query: string) => {
    const types = await window.channels.getTypes.rendererInvoke({
      nameSearch: query
    });
    const options = types.map<ComboboxOption>(type => {
      return {
        label: type.name,
        key: type.id
      } satisfies ComboboxOption;
    });
    return options;
  }, [])

  return (
    <SingleGCombobox
      label={`Type ${typeNumber}`}
      value={typeId}
      onChange={onChange}
      getOptions={getTypeOptions}
    />
  )
}