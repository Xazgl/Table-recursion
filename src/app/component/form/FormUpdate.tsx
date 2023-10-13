import { NodeType } from "@/app/@types/dto";
import { OutlayRow } from "@prisma/client";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

type NodeProps = {
    node: NodeType,
    level: number,
    parentRef?: React.MutableRefObject<SVGSVGElement | null> | null,
    outlayRows: OutlayRow[],
    setOutlayRows: Dispatch<SetStateAction<OutlayRow[]>>
}

type Props = {
    node: NodeType,
    props: NodeProps,
    paddingLeftSum: number,
    openFormsUpdate: number
}


export function FormUpdate({ props, node, paddingLeftSum, openFormsUpdate }: Props) {

    //для данных с формы 
    const [jobTitle, setJobTitle] = useState('') //Наименования работы
    const [salary, setSalary] = useState<number>() //Основная з/п 
    const [equipment, setEquipment] = useState<number>() //Оборудование
    const [overheads, setOverheads] = useState<number>() //Накладные расходы
    const [estimatedProfit, setEstimatedProfit] = useState<number>() //Сметная прибыль
    const [parentId, setParentId] = useState<number>() // вложенность если есть 


    useEffect(() => {
        setJobTitle(node.rowName)
        setSalary(node.mainCosts)
        setEquipment(node.equipmentCosts)
        setOverheads(node.machineOperatorSalary)
        setEstimatedProfit(node.overheads)
        setParentId(node.parentId ? node.parentId : 0)
    }, [openFormsUpdate])



    // Обновление строки
    const handleFormSubmit = async () => {
        const formData = {
            parentId,
            jobTitle,
            salary,
            equipment,
            estimatedProfit,
            overheads
        };

        try {
            const res = await fetch(`/api/v1/outlay-rows/entity/${node.id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setJobTitle('');
                setSalary(0);
                setEquipment(0);
                setOverheads(0);
                setEstimatedProfit(0);
                const result = await res.json();
                console.log(result);
            } else {
                console.log("Запрос не удался")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <>
            <tr key={node.id * 0.5} style={{ paddingLeft: `${paddingLeftSum}px` }}>
                <td >
                    <select
                        value={parentId || 0}
                        onChange={(e) => setParentId(Number(e.target.value) || 0)}
                        className="flex w-full bg-transparent  border border-gray-300 p-2 rounded mb-1 cursor-pointer"
                    >
                        <option
                            style={{
                                backgroundColor: '#171717',
                                color: 'white',
                                padding: '0.5rem',
                                borderRadius: '0.25rem',
                                cursor: 'pointer'
                            }}
                            value={node.id}
                        > {node.rowName}
                        </option>

                        {props.outlayRows.map(row => (
                            <option
                                style={{
                                    backgroundColor: '#171717',
                                    color: 'white',
                                    padding: '0.5rem',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer'
                                }}
                                key={row.id} value={row.id}
                            >
                                {row.rowName}
                            </option>
                        ))}

                    </select>
                </td>
                <td>
                    <label>
                        <input className="flex bg-transparent  w-full border border-gray-300 p-2 rounded mb-1"
                            placeholder="Наименование работ"
                            value={jobTitle}
                            onChange={(event) => setJobTitle(event.target.value)}
                            type="text" />
                    </label>
                </td>
                <td>
                    <label>
                        <input className="flex bg-transparent  w-full border border-gray-300 p-2 rounded mb-1"
                            placeholder="Основная з/п"
                            value={salary}
                            onChange={(event) => setSalary(Number(event.target.value))}
                            type="number"
                        />
                    </label>
                </td>
                <td>
                    <label>
                        <input className="flex bg-transparent  w-full border border-gray-300 p-2 rounded mb-1"
                            placeholder="Оборудование"
                            value={equipment}
                            onChange={(event) => setEquipment(Number(event.target.value))}
                            type="number"
                        />
                    </label>
                </td>
                <td>
                    <label>
                        <input className="flex  w-full bg-transparent  border border-gray-300 p-2 rounded mb-1"
                            placeholder="Накладные расходы"
                            value={overheads}
                            onChange={(event) => setOverheads(Number(event.target.value))}
                            type="number"
                        />
                    </label>
                </td>
                <td>
                    <label>
                        <input className="flex bg-transparent w-full  border border-gray-300 p-2 rounded mb-1"
                            placeholder="Сметная прибыль"
                            value={estimatedProfit}
                            onChange={(event) => setEstimatedProfit(Number(event.target.value))}
                            type="number"
                        />
                    </label>
                </td>
            </tr >
            <tr>
                <td colSpan={6}>
                    <button className="bg-transparent   p-2 rounded" onClick={handleFormSubmit}>Обновить</button>
                </td>
            </tr>
        </>
    )

}