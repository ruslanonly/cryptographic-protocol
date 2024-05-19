import { AuthStep, RandomGenerator, SchnorrService, Tile, useAuthenticationStore } from "@/shared";
import { MathService } from "@/shared/lib/math";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";

export function Reciever() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const { g, s, y, e, t, p, R, r, k, step, setAttr } = useAuthenticationStore()

    let activeStep  = -1
    if (step) {
        if (step === AuthStep.BFirst) activeStep = 0;
        if (step === AuthStep.BSecond) activeStep = 1;
    }

    const calculateT = () => {
        setAttr('t', 52n)
    }

    const calculateE = () => {
        if (t) {
            setAttr('e', new RandomGenerator().nextInRange(0n, (2n ** t) - 1n))
        }
    }

    const calculateR = () => {
        if (g && s && y && e && p && k) {
            const RRR = (MathService.modPow(BigInt(g), BigInt(s), BigInt(p)) * MathService.modPow(BigInt(y), BigInt(e), BigInt(p))) % BigInt(p)
            setAttr('R', SchnorrService.calculateR(k, g, p))
            if (SchnorrService.calculateR(k, g, p) === r) {
                setDialogOpen(true)
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
                    {!!t && <Typography sx={{wordBreak: 'break-all'}}>Число T = {t?.toString()}</Typography>}
                    {!!e && <Typography sx={{wordBreak: 'break-all'}}>Число E = {e?.toString()}</Typography>}
                    <Stack gap={1} sx={{marginTop: '1rem'}}>
                        <Button variant="outlined" onClick={calculateT}>Вычисление числа T</Button>
                        <Button variant="outlined" onClick={calculateE}>Вычисление числа E</Button>
                        <Button variant="contained" onClick={() => setAttr('step', AuthStep.ASecond)} disabled={!t || !e}>Следующий шаг</Button>
                    </Stack>
                </StepContent>
            </Step>
            <Step>
                <StepLabel>
                    Второй шаг
                </StepLabel>
                <StepContent>
                    {!!R && <Typography sx={{wordBreak: 'break-all'}}>Число R1 = {R?.toString()}</Typography>}
                    <Stack gap={1} sx={{marginTop: '1rem'}}>
                        <Button variant="outlined" onClick={calculateR}>Вычисление числа R</Button>
                    </Stack>
                </StepContent>
            </Step>
        </Stepper>
    </Tile>
    <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Аутентификация прошла успешно"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            R {r?.toString()} <br/>
            R1 = {R?.toString()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} autoFocus>
            Хорошо
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
