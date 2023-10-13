"use client"
import * as React from 'react';
import { OutlayRow } from '@prisma/client';
import { Dispatch,SetStateAction, useEffect, useState } from 'react';
import { TableRows } from '../tableRows/TableRows';

type Props = {
    outlayRows: OutlayRow[],
    setOutlayRows: Dispatch<SetStateAction<OutlayRow[]>>
}



export function TableBody({ outlayRows, setOutlayRows }: Props) {

    //для правильной таблицы 
    const [threeArr, setThreeArr] = useState([])

    //Маршрут возвращает данные из базы, но уже в массиве с вложенностями.Рекурсивный массив 
    useEffect(() => {
        async function start() {
            const res = await fetch('/api/v1/outlay-rows/entity/allRecurs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (res.ok) {
                const allRows = await res.json()
                setThreeArr(allRows.hierarchicalData)
                console.log(threeArr)
            }
        }
        start()
    }, [])


    return (
        <>
            <div className="table" style={{ height: 'auto', width: '100%' }}>
                {threeArr.length > 0 && (
                    <table className='w-full table-fixed border-collapse-separate'>
                        <thead className='w-full '>
                            <tr className='w-full'>
                                <th>Уровень</th>
                                <th>Наименование работ</th>
                                <th>Основная з/п</th>
                                <th>Оборудование</th>
                                <th>Накладные расходы</th>
                                <th>Сметная прибыль</th>
                            </tr>
                        </thead>
                        <tbody className='flex-col w-full gap-10 h-auto text-center '>
                           {threeArr.map((root) =>
                                <TableRows key={root} node={root} level={0}
                                    outlayRows={outlayRows} setOutlayRows={setOutlayRows}
                                />
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <style jsx>
                {` 
                    td {
                        padding: 8px;
                        font-family: var(--font-roboto);
                    }

                    th {
                        font-family: var(--font-roboto);
                    }
                      
                    tbody {
                        font-family: var(--font-roboto);
                    } 

                    tr.parent td {
                         font-family: var(--font-roboto);;
                        border-bottom: 2px solid black; /* Линия между родителем и ребенком */
                    }
            
                    tr.child {
                        padding-left: 20px; /* Отступ для детей */
                    }
        
                   
               `}
            </style>
        </>
    )
}