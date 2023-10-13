"use client"
import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { OutlayRow } from '@prisma/client';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

type Props = {

    outlayRowsForTable: OutlayRow[],
    setOutlayRowsForTable: Dispatch<SetStateAction<OutlayRow[]>>

}




export function TableBuldingWorks({ outlayRowsForTable, setOutlayRowsForTable }: Props) {


    //   const updateSale = useCallback(async ({ id }: Pick<OutlayRow[] , 'id'>) => {
    //     const res = await fetch('/api/sales/' + id, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ active: !active })
    //     })
    //     if (res.ok) {
    //         setConstructionWorks(prevSales => {
    //         return prevSales.map(el => {
    //           return el.id === id ? { ...el, active: !active } : el
    //         })
    //       })
    //     }
    //   }, [constructionWorks])


    const deleteSale = useCallback(async ({ id }: { id: number }) => {
        try {
            const res = await fetch(`/api/v1/outlay-rows/entity/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res.ok) {
                // Если запрос успешный, убираем элемент с нужным id из состояния
                setOutlayRowsForTable (prevSales => prevSales.filter(el => el.id !== id));
            } else {
                console.error('Не удалось удалить');
            }
        } catch (error) {
            console.error('Ошибка при удалении', error);
        }
    }, [outlayRowsForTable]);


    // useEffect(() => {
    //     async function start() {
    //         const res = await fetch('/api/allSales')
    //         if (res.ok) {
    //             const constructionWorks: OutlayRow[] = await res.json()
    //             setConstructionWorks(constructionWorks.map(el => {
    //                 const { id, rowName, parentId, mainCosts, equipmentCosts, machineOperatorSalary,
    //                     materials, mimExploitation, overheads, salary, supportCosts, estimatedProfit, total, createdAt, updatedAt } = el
    //                 return {
    //                     id, rowName, parentId, mainCosts, equipmentCosts, machineOperatorSalary,
    //                     materials, mimExploitation, overheads, salary, supportCosts, estimatedProfit, total, createdAt, updatedAt
    //                 }
    //             }))
    //         }
    //     }
    //     start()
    // }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'parent', headerName: 'Уровень', width: 200 },
        { field: 'rowName', headerName: 'Наименование работ', width: 300 },
        { field: 'mainCosts', headerName: 'Основная з/п', width: 150 },
        { field: 'equipmentCosts', headerName: 'Оборудование', width: 150 },
        { field: 'machineOperatorSalary', headerName: 'Накладные расходы', width: 150 },
        { field: 'overheads', headerName: 'Сметная прибыль', width: 150 },
        {
            field: 'createdAt', headerName: 'Удаление', width: 130, renderCell: (params: GridRenderCellParams<any, OutlayRow[]>) => {
                const { id } = params.row
                return <button style={{ background: 'black', borderRadius: '5px', color: 'white', border: 'none', width: '100%', height: '60%', fontSize: '18px', fontFamily: 'TacticSans-Reg' }} onClick={() => deleteSale({ id })}>Удалить</button>
            }
        },
        {
            field: 'createdAt2', headerName: 'Редактирование', width: 150, renderCell: (params: GridRenderCellParams<any, OutlayRow[]>) => {
                const { id } = params.row
                return <Link href={`/admin/card/${id}`}>
                    <button style={{ background: 'green', borderRadius: '5px', color: 'white', border: 'none', width: '100%', height: '60%', fontSize: '18px', fontFamily: 'TacticSans-Reg' }}>Редактировать</button>
                </Link>
            }
        },

    ];

    return (
        <>
            {outlayRowsForTable.length > 0 &&
                <div className="table" style={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                        rows={outlayRowsForTable}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        sx={{
                            height: 300,
                            width: "100%",
                            border: 'none',
                            color: 'white',
                            "& .super-app-theme--header": {
                                borderBottom: 'solid 2px #444444'
                            }
                        }}


                    />
                </div>
            }


            <style jsx>{`
      .title {
        display: flex;
        width:100%;
        height: 100%;
        justify-content: center;
        align-items: baseline;
        text-align: center;
        font-family: 'TacticSans-Reg','sans-serif';
        font-size:30px;
        color:white;
        background-color: #2e2e2e;
       }

       .imgCustom{
        display:flex; 
        height: 100%;
        width: 100px;
        background-position: center center;
        background-repeat: no-repeat;
        overflow: hidden;
        border-radius: 5px;
        object-fit: cover;
    }

    .imgDiv{
        display:flex; 
        height: 100%;
        width: 100px;
        background-position: center center;
        background-repeat: no-repeat;
        overflow: hidden;
        border-radius: 5px;
    }
  
      `}</style>

        </>)
}