"use client"
import { SideBar } from "../leftSideBar/SideBar";
import styles from "./news.module.css";
import { RightBlock } from "../rightSideBlock/RightBlock";
import { useState } from "react";


export function MainBlock({ }) {

    const [selectedSection, setSelectedSection] = useState([''])

    return <section className={styles.background}>
        {/* Left side page */}
        <SideBar setSelectedSection={setSelectedSection} />
        
        {/* Right side page */}
        <RightBlock
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
        />
    </section>

}