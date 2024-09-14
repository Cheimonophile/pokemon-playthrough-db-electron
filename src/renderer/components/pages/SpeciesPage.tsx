import { PageFC } from "@renderer/interfaces/components/PageFC";
import { useState } from "react";
import { TypeCombobox } from "../form/field/comboboxes/TypeCombobox";




export const SpeciesPage: PageFC = () => {

  // input state
  const [type1Id, setType1Id] = useState<string | null>(null);
  const [type2Id, setType2Id] = useState<string | null>(null);



  return (
    <div className="w-full h-full flex flex-col gap-2">

      {/** Above Table */}
      <div>


        {/** Inputs */}
        <div className="flex flex-col gap-2 w-96">

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