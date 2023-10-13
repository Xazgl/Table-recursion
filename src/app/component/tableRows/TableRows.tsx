"use client"

import { NodeType } from "@/app/@types/dto";
import { numberWithSpaces } from "@/app/services/fucntions";
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { OutlayRow } from "@prisma/client";
import ArticleIcon from '@mui/icons-material/Article';
import { FormUpdate } from "../form/FormUpdate";
import { FormNewChild } from "../form/FormNewChild";

type NodeProps = {
    node: NodeType,
    level: number,
    parentRef?: React.MutableRefObject<SVGSVGElement | null> | null,
    outlayRows: OutlayRow[],
    setOutlayRows: Dispatch<SetStateAction<OutlayRow[]>>
}


export function TableRows(props: NodeProps,) {

    //для данных с формы 
    const [jobTitle, setJobTitle] = useState('') //Наименования работы
    const [salary, setSalary] = useState<number>() //Основная з/п 
    const [equipment, setEquipment] = useState<number>() //Оборудование
    const [overheads, setOverheads] = useState<number>() //Накладные расходы
    const [estimatedProfit, setEstimatedProfit] = useState<number>() //Сметная прибыль
    const [parentId, setParentId] = useState<number>() // вложенность если есть 
    //появление формы для дочернего элемента 
    const [openForms, setOpenForms] = useState<number>();
    //появление формы для редактирования
    const [openFormsUpdate, setOpenFormsUpdate] = useState<number>();

    //появление при наведении иконок
    const [showIcons, setShowIcons] = useState(false);

    const handleMouseEnter = () => {
        setShowIcons(true);
    };
    
    const handleMouseLeave = () => {
        setShowIcons(false);
    };

    //функция отккрытия формы на создание дочерней строки 
    const toggleForm = (id: number) => {
        setOpenForms(prevState => (prevState === id * 0.5) ? undefined : (id * 0.5));
    };


    //функция отккрытия формы на создание дочерней строки 
    const toggleFormUpdate = (id: number) => {
        setOpenFormsUpdate(prevState => (prevState === id * 0.6) ? undefined : (id * 0.6));
    };



    //Удаление строки из таблицы
    const deleteRow = useCallback(async ({ id }: { id: number }) => {
        try {
            const res = await fetch(`/api/v1/outlay-rows/entity/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res.ok) {
                // Если запрос успешный, убираем элемент с нужным id из состояния
                props.setOutlayRows(prevSales => prevSales.filter(el => el.id !== id));
            } else {
                console.error('Не удалось удалить');
            }
        } catch (error) {
            console.error('Ошибка при удалении', error);
        }
    }, [props.outlayRows]);


    //Рассчет координат
    function getOffset(el: SVGSVGElement) {
        const rect = el.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + rect.height / 2 + window.scrollY
        };
    }


    const node = props.node
    const paddingLeftSum = props.level * 20;

    const iconRef = React.useRef<SVGSVGElement | null>(null)

    const childRows = (node.children && node.children.length > 0)
        // ? node.children.map(child => NodeComp({node: child, level: props.level + 1, parentRef: iconRef}))
        ? node.children.map(child =>
            <TableRows key={node.id} level={props.level + 1}
                node={child} parentRef={iconRef}
                outlayRows={props.outlayRows} setOutlayRows={props.setOutlayRows}
            />)
        : null;


    useEffect(() => {
        let arrow: HTMLElement | null = null;

        function updateLines() {
            if (arrow) {
                arrow.remove();
            }

            if (props.parentRef && iconRef) {
                const parent = props.parentRef.current;
                const child = iconRef.current;
                if (parent && child) {
                    const parentCoords = getOffset(parent);
                    const childCoords = getOffset(child);
                    arrow = document.createElement('div');
                    arrow.style.borderLeft = '2px solid  rgb(203 213 225)';
                    arrow.style.borderBottom = '2px solid rgb(203 213 225)';
                    arrow.style.height = `${Math.abs(parentCoords.y - childCoords.y)}px`;
                    arrow.style.width = `${Math.abs(parentCoords.x - childCoords.x)}px`;
                    arrow.style.position = 'absolute';
                    arrow.style.top = `${parentCoords.y}px`;
                    arrow.style.left = `${parentCoords.x}px`;
                    document.body.append(arrow);
                }
            }
        }

        window.addEventListener('resize', updateLines);
        updateLines();

        return () => {
            window.removeEventListener('resize', updateLines);
            if (arrow) {
                arrow.remove();
            }
        };
    }, [props.parentRef, iconRef]);



    return (
        <>
            <tr key={node.id} className='border-b border-[#444444]' >
                <td className='flex p-2 w-full' >
                    <div style={{ marginLeft: `${paddingLeftSum}px` }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='flex bg-slate-300 rounded w-auto z-10'
                    >
                        <ArticleIcon
                            ref={iconRef}
                            sx={{ color: '#4444b87d', cursor: 'pointer' }}
                            onClick={() => toggleFormUpdate(node.id)}

                        />
                        {showIcons &&
                            <>
                                <AddIcon
                                    sx={{ color: '#4444b87d', cursor: 'pointer' }}
                                    onClick={() => toggleForm(node.id)}
                                />
                                <DeleteIcon
                                    onClick={() => deleteRow({ id: node.id })}
                                    sx={{ color: '#873c3c', cursor: 'pointer' }}
                                />
                            </>
                        }
                    </div>

                </td>
                <td className='p-2'>{node.rowName}</td>
                <td className='p-2'>{numberWithSpaces(node.mainCosts)}</td>
                <td className='p-2'>{numberWithSpaces(node.equipmentCosts)}</td>
                <td className='p-2'>{numberWithSpaces(node.machineOperatorSalary)}</td>
                <td className='p-2'>{numberWithSpaces(node.overheads)}</td>
            </tr >

            {/* Открывается на создания дочернего элемента  */}
            {openForms === (node.id * 0.5) ? (
                <FormNewChild props={props} node={node} paddingLeftSum={paddingLeftSum} />
            ) : null}

            {/* Открывается на  редактирвоание элемента  */}
            {openFormsUpdate === (node.id * 0.6) ? (
                <FormUpdate props={props} node={node} paddingLeftSum={paddingLeftSum} openFormsUpdate={openFormsUpdate} />
            ) : null}

            {childRows}
        </>
    );
}