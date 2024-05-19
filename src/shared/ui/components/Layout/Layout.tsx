import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss'

export function Layout() {
  return (
    <Container maxWidth="md">
      <div className={styles.wrapper}>
        <div className={styles.pageWrapper}>
          <Outlet/>
        </div>
      </div>
    </Container>
  )
}
