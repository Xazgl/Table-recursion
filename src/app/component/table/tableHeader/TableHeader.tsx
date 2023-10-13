import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction } from 'react';
type Props = {
    selectedSection: string[],
    setSelectedSection: Dispatch<SetStateAction<string[]>>

}


export function TableHeader({ selectedSection, setSelectedSection }: Props) {


    const handleRemove = (index: number) => {
        const updatedSelectedSection = [...selectedSection];
        updatedSelectedSection.splice(index, 1);
        setSelectedSection(updatedSelectedSection);
    };

    return <ul className={'flex w-full  row-auto'}>
        {selectedSection.map((item, index) => (
            <li
                className={`${index === 0 ? "hidden" : "flex-grow"
                    } text-lg justify-between items-center border border-r border-solid border-1 border-[#444444] border-t-0 w-full text-center cursor-pointer gap-[20%]`}
                key={index}
                style={{ position: "relative" }}
            >
                <div className="flex h-full">
                    <div className="flex-grow  h-full flex-col items-center">{item}</div>
                    <div className="flex-grow  h-full flex-col items-end" style={{ position: "absolute", top: 0, right: 0 }}>
                        <CloseIcon
                            sx={{ display: 'flex', fontSize: '12px' }}
                            onClick={() => handleRemove(index)}
                        />
                    </div>
                </div>
            </li>
        ))}
    </ul>
}