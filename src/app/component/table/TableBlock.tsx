import { Dispatch, SetStateAction } from "react";
import { TableHeader } from "./tableHeader/TableHeader";

type Props = {
    selectedSection: string[],
    setSelectedSection: Dispatch<SetStateAction<string[]>>
}

export function TableBlock({  selectedSection, setSelectedSection }: Props) {

    return <section className={'flex w-full lg:w-5/6 h-auto flex-col gap-3'}>
         <TableHeader 
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          />

    </section>

}