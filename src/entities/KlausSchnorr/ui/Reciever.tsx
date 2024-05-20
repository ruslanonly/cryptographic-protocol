import { Tile, useStandartStore } from "@/shared";
import { StandardService } from "@/shared/lib/StandartService";
import { AuthStep } from "@/shared/model/store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const CorrectSignDialog = ({isOpen, onClose}: IDialogProps) => {
  const {
    wComma,
    u,

    message
  } = useStandartStore()
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Полученное сообщение верно"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <Stack direction="column" gap={2} alignItems='stretch'>
          <Typography sx={{wordBreak: 'break-all'}}>Число W' = {wComma?.toString()}</Typography>
          <Typography sx={{wordBreak: 'break-all'}}>Число U = {u?.toString()}</Typography>
          <Typography variant="h5" sx={{wordBreak: 'break-all'}}>Полученное слово: {message}</Typography>
        </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Хорошо
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const IncorrectSignDialog = ({isOpen, onClose}: IDialogProps) => {
  const {
    wComma,
    u
  } = useStandartStore()
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Подпись не подлинна"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography sx={{wordBreak: 'break-all'}}>Число W' = {wComma?.toString()}</Typography>
          <Typography sx={{wordBreak: 'break-all'}}>Число U = {u?.toString()}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Грустно
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function Reciever() {
  const correctDialog = useState(false)
  const incorrectDialog = useState(false)

  const {
    p,
    q,
    a,
    y,
    h,
    s,
    wComma,

    v,
    z1,
    z2,
    u,

    step,
    setAttr,
  } = useStandartStore()

  let activeStep  = -1
  if (step) {
      if (step === AuthStep.BFirst) activeStep = 0;
  }

  const calculateV = () => {
    if (h && q) {
        setAttr('v', StandardService.calculateV(h, q))
    }
  }

  const calculateZ1 = () => {
    if (s && v && q) {
        setAttr('z1', StandardService.calculateZ1(s, v, q))
    }
  }

  const calculateZ2 = () => {
    if (wComma && v && q) {
        setAttr('z2', StandardService.calculateZ2(wComma, v, q))
    }
  }

  const calculateU = () => {
    if (a && z1 && y && z2 && p && q) {
        setAttr('u', StandardService.calculateU(a, z1, y, z2, p, q))
    }
  }

  const check = () => {
      if (wComma && u) {
        if (wComma == u) {
          correctDialog[1](true)
        } else {
          incorrectDialog[1](true)
        }
      }
  }

  return (
    <>
    <Tile>
        <Typography variant="h5" style={{textAlign: 'center'}}>
        Получатель
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
                <StepLabel>
                    Первый шаг
                </StepLabel>
                <StepContent>
                    {!!wComma && <Typography sx={{wordBreak: 'break-all'}}>Число W' = {wComma?.toString()}</Typography>}
                    {!!s && <Typography sx={{wordBreak: 'break-all'}}>Число S = {s?.toString()}</Typography>}
                    {!!v && <Typography sx={{wordBreak: 'break-all'}}>Число V = {v?.toString()}</Typography>}
                    {!!z1 && <Typography sx={{wordBreak: 'break-all'}}>Число Z<sub>1</sub> = {z1?.toString()}</Typography>}
                    {!!z2 && <Typography sx={{wordBreak: 'break-all'}}>Число Z<sub>2</sub> = {z2?.toString()}</Typography>}
                    {!!u && <Typography sx={{wordBreak: 'break-all'}}>Число U = {u?.toString()}</Typography>}
                    <Stack gap={1} sx={{marginTop: '1rem'}}>
                        <Button variant="outlined" onClick={calculateV} disabled={!wComma || !s}>Вычисление числа V</Button>
                        <Button variant="outlined" onClick={calculateZ1} disabled={!wComma || !s || !v}>Вычисление числа Z<sub>1</sub></Button>
                        <Button variant="outlined" onClick={calculateZ2} disabled={!wComma || !s || !v || !z1}>Вычисление числа Z<sub>2</sub></Button>
                        <Button variant="outlined" onClick={calculateU} disabled={!wComma || !s || !v || !z1 || !z2}>Вычисление числа U<sub>2</sub></Button>
                        <Button variant="contained" onClick={check} disabled={!wComma || !s || !v || !z1 || !z2 || !u}>Проверка</Button>
                    </Stack>
                </StepContent>
            </Step>
        </Stepper>
    </Tile>
    <CorrectSignDialog onClose={() => correctDialog[1](false)} isOpen={correctDialog[0]}/>
    <IncorrectSignDialog onClose={() => incorrectDialog[1](false)} isOpen={incorrectDialog[0]}/>
    </>
  )
}
