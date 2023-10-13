"use client"
import { OutlayRow } from "@prisma/client";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
// import { useRouter } from 'next/navigation'

type Props = {
    outlayRows: OutlayRow[],
    id?:number
}


export function Form({ outlayRows, id }: Props) {
    const [jobTitle, setJobTitle] = useState('') //Наименования работы
    const [salary, setSalary] = useState<number>() //Основная з/п 
    const [equipment, setEquipment] = useState<number>() //Оборудование
    const [overheads, setOverheads] = useState<number>() //Накладные расходы
    const [estimatedProfit, setEstimatedProfit] = useState<number>() //Сметная прибыль
    const [parentId, setParentId] = useState(id? id : 0 ) // вложенность если есть 




    async function newRow(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const res = await fetch('/api/v1/outlay-rows/entity/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jobTitle, salary, equipment, overheads, estimatedProfit, parentId })
        })
        if (res.ok) {
            setJobTitle('')
            setSalary(0)
            setEquipment(0)
            setOverheads(0)
            setEstimatedProfit(0)
            const result = await res.json()
            console.log(result);
        }
    }

    return (
        <>
            <div className="flex w-ful h-auto row-auto">
                <form className="flex w-ful justify space-x-2 p-6 mx-auto" onSubmit={newRow}>

                    <div className="flex">
                        <label>
                            <input className="flex bg-transparent w-full border border-gray-300 p-2 rounded mb-1"
                                placeholder="Наименование работ"
                                value={jobTitle}
                                onChange={(event) => setJobTitle(event.target.value)}
                                type="text" />
                        </label>
                    </div>

                    <div className="flex">
                        <label>
                            <input className="flex bg-transparent w-full border border-gray-300 p-2 rounded mb-1"
                                placeholder="Основная з/п"
                                value={salary}
                                onChange={(event) => setSalary(Number(event.target.value))}
                                type="number"
                            />
                        </label>
                    </div>

                    <div className="flex">
                        <label>
                            <input className="flex bg-transparent w-full border border-gray-300 p-2 rounded mb-1"
                                placeholder="Оборудование"
                                value={equipment}
                                onChange={(event) => setEquipment(Number(event.target.value))}
                                type="number"
                            />
                        </label>
                    </div>

                    <div className="flex">
                        <label>
                            <input className="flex bg-transparent w-full border border-gray-300 p-2 rounded mb-1"
                                placeholder="Сметная прибыль"
                                value={estimatedProfit}
                                onChange={(event) => setEstimatedProfit(Number(event.target.value))}
                                type="number"
                            />
                        </label>
                    </div>

                    <div className="flex">
                        <label>
                            <input className="flex bg-transparent w-full border border-gray-300 p-2 rounded mb-1"
                                placeholder="Накладные расходы"
                                value={overheads}
                                onChange={(event) => setOverheads(Number(event.target.value))}
                                type="number"
                            />
                        </label>
                    </div>

                    {outlayRows.length > 0 && outlayRows !== undefined && outlayRows !== null &&
                        <div className="flex">
                            <select
                                value={parentId || 0}
                                onChange={(e) => setParentId(Number(e.target.value) || 0)}
                                className="flex bg-transparent w-full  border border-gray-300 p-2 rounded mb-1 cursor-pointer"
                            >
                                <option
                                    style={{
                                        backgroundColor: '#171717',
                                        color: 'white',
                                        padding: '0.5rem',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer'
                                    }}
                                    value={0}
                                >
                                    Без родителя
                                </option>

                                {outlayRows.map(row => (
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
                        </div>
                    }



                    <div className="flex">
                        <button className="flex bg-transparent w-full border-gray-300 text-white font-bold py-2 px-4 rounded" type="submit">ОК</button>
                    </div>
                </form>
            </div>
        </>
    )
}