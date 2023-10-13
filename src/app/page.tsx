

import { Bar } from "./component/mainBar/Bar";
import { MainBlock } from "./component/mainBlock/MainBlock";
import styles from "./page.module.css";
import "server-only"

export default async function Home() {

  return (
    <>
      <Bar />
      <MainBlock />
    </>
  )
}

