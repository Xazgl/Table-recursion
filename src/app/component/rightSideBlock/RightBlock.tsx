
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TableBlock } from "../table/TableBlock";
import { TableBuldingWorks } from "../tables/TableBuldingWorks";
import { Form } from "../form/Form";
import { OutlayRow } from "@prisma/client";
import { TableBody } from "../tables/TableBody";
import { boolean } from "zod";

type Props = {
    selectedSection: string[],
    setSelectedSection: Dispatch<SetStateAction<string[]>>
}

export function RightBlock({ selectedSection, setSelectedSection }: Props) {

    const [outlayRows, setOutlayRows] = useState<OutlayRow[]>([])
    const [outlayRowsForTable, setOutlayRowsForTable] = useState<OutlayRow[]>([])
    const [show, setShow] = useState<boolean>(false)



    const toggleShow = () => {
        setShow(prevShow => !prevShow);
    };


    useEffect(() => {
        async function start() {
            const res = await fetch('/api/v1/outlay-rows/entity/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (res.ok) {
                const allRows = await res.json()
                setOutlayRows(allRows.allRows)
                console.log(allRows)
                //@ts-ignore
                const formattedRows = allRows.allRows.map(el => {
                    const { id, rowName, parentId, mainCosts, equipmentCosts, machineOperatorSalary,
                        materials, mimExploitation, overheads, salary, supportCosts, estimatedProfit, total, createdAt, updatedAt } = el
                    return {
                        id, rowName, parentId, mainCosts, equipmentCosts, machineOperatorSalary,
                        materials, mimExploitation, overheads, salary, supportCosts, estimatedProfit, total, createdAt, updatedAt
                    }
                })
                setOutlayRowsForTable(formattedRows)
                console.log(formattedRows)

            }
        }
        start()
    }, [])

//     const d = 4
//  function sum (a,b,c) {
//     setTimeout(() => {
//         a + b
//     }, 100000)
//     document.onclose = () => {
//         a + b
//     }
//     return a+b+c
//  }

//  interface Animal {
//     sound: () => string
//  }
//  interface Logger {
//     info: (message: string) => string
//  }

//  class Loki implements Logger {
//     info(message: string) {
//         // ...
//         return  'Status'
//     }
//  }

//  class UserService {
//     constructor(private logger: Logger) {}
//     login() {
//         this.logger.info('Info')
//     }
//  }

 // DI Container
 // nestjs
//  let diContainer = new Map() // Set
//  diContainer.set('name', 'Smith')
//  new UserService(new Loki())

//  class Dog implements Animal {
//      sound() {
//         return 'Bark'
//      }    
//  }

//  function getSound(animal: Animal) {
//     animal.sound()
//  }

//  getSound(new Dog())



//  function sum(a) {
 
    
     
//    return  (b)=> (c)=> a+c+b
//  }

// 
// function sum (a) {

//     const answer = 3
    
//     return function(a){
//          a + answer
//     }
// }


// sum(a)(b)



    return <section className={'flex w-full lg:w-5/6 h-auto flex-col gap-3'}>
        <TableBlock
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
        />
        {/* <TableBuldingWorks outlayRowsForTable={outlayRowsForTable} setOutlayRowsForTable={setOutlayRowsForTable} /> */}
        <TableBody setOutlayRows={setOutlayRows} outlayRows={outlayRows} />
        <div className="flex w-full justify-start">
            <button
                onClick={toggleShow}
                className="flex
                 hover:bg-[#a7a6a6]
                   background-color: #a7a6a6;
                   transition-all 
                   duration-500
                   bg-transparent
                   w-[300px] 
                   border
                   border-[#444444]
                    p-2 
                    rounded 
                    mt-10 
                    text-center
                   justify-center"
            >
                {show ? 'Отменить создание строки ' : 'Создать строку без вложенности'}
            </button>
        </div>
        {show &&
            <Form outlayRows={outlayRows} />
        }
    </section>

}