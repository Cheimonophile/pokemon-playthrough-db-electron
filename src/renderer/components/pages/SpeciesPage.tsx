import { PageFC } from "@renderer/interfaces/components/PageFC";
import { useState } from "react";
import { TypeCombobox } from "../form/field/comboboxes/TypeCombobox";
import { NumberInput } from "../form/field/inputs/NumberInput";




export const SpeciesPage: PageFC = () => {

  // input state
  const [generation, setGeneration] = useState<number | null>(null);
  const [dexNo, setDexNo] = useState<number | null>(null);
  const [type1Id, setType1Id] = useState<string | null>(null);
  const [type2Id, setType2Id] = useState<string | null>(null);


  return (
    <div className="w-full h-full flex flex-col gap-2">

      {/** Above Table */}
      <div>


        {/** Inputs */}
        <div className="flex flex-col w-96 overflow-hidden">

          {/** Inputs */}
          <div className="flex flex-row gap-2">
            <NumberInput label="Generation" value={generation} onChange={setGeneration} width="6rem" />
            <NumberInput label="Dex No" value={dexNo} onChange={setDexNo} width="5rem" />
          </div>


          {/** Types */}
          <div className="flex flex-row gap-2">
            <TypeCombobox typeId={type1Id} onChange={setType1Id} typeNumber={1} />
            <TypeCombobox typeId={type2Id} onChange={setType2Id} typeNumber={2} />
          </div>


        </div>

      </div>



      {/** Species Table */}
      <div className="flex-1">
      </div>

    </div>
  )
};