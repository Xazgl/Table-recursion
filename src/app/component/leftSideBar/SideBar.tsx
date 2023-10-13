'use client'
import { SideBarElArr } from "./el";
import styles from "./sidebar.module.css";
import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
    setSelectedSection: Dispatch<SetStateAction<string[]>>
}

export function SideBar({ setSelectedSection }: Props) {
    const handleSidebarItemClick = (itemTitle: string) => {
        setSelectedSection(prevSections => {
            // Проверяем, есть ли уже этот элемент в списке
            if (prevSections.includes(itemTitle)) {
                // Если есть, убираем его
                return prevSections.filter(section => section !== itemTitle);
            } else {
                // Если нет, добавляем его
                return [...prevSections, itemTitle];
            }
        });
    };


    
    return <>
        <nav className={styles.background} id={styles.desktop}>
            <Accordion
                sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    width: '100%',
                    border: 'solid 1px #444444',
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Название проекта</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ borderTop: 'solid 1px #444444', padding: '0px' }} >
                    <ul>
                        {/* sidebar elemets */}
                        {SideBarElArr.map((item, index) => (
                            <Link href="/" key={index}>
                                <li
                                    className={styles.sideBarEl}
                                    key={index}
                                    onClick={() => handleSidebarItemClick(item.title)}
                                >
                                    <div className={styles.iconElDiv}>
                                        <DocumentScannerIcon
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                height: '100%'
                                            }}
                                        />
                                    </div>
                                    <div className={styles.elTitle}>{item.title}</div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </nav >
    </>
}