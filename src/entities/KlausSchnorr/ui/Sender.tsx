import { AuthStep, SchnorrService, Tile, useAuthenticationStore } from "@/shared";
import { Button, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";

export function Sender() {
    const { p, q, x, y, g, r, k, s, e, step, setAttr } = useAuthenticationStore()

    let activeStep = -1
    if (step) {
        if (step === AuthStep.AFirst) activeStep = 0;
        if (step === AuthStep.ASecond) activeStep = 1;
    }

    const calculateK = () => {
        if (q) {
            setAttr('k', SchnorrService.calculateK(q))
        }
    }

    const calculateR = () => {
        if (g && k && p) setAttr('r', SchnorrService.calculateR(k, g, p))
    }

    const calculateS= () => {
        if (k && x && e && q) setAttr('s', SchnorrService.calculateS(k, x, e, q))
    }

    return (
        <Tile>
            <Stack gap={2}>
                <Typography variant="h5" style={{textAlign: 'center'}}>
                Отправитель
                </Typography>
                
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>
                            Первый шаг
                        </StepLabel>
                        <StepContent>
                            <Typography sx={{wordBreak: 'break-all'}}>Открытый ключ = {y?.toString()}</Typography>
                            <Typography sx={{wordBreak: 'break-all'}}>Закрытый ключ = {x?.toString()}</Typography>
                            {!!k && <Typography sx={{wordBreak: 'break-all'}}>Число K = {k?.toString()}</Typography>}
                            {!!r && <Typography sx={{wordBreak: 'break-all'}}>Число R = {r?.toString()}</Typography>}
                            <Stack gap={1} sx={{marginTop: '1rem'}}>
                                <Button variant="outlined" onClick={calculateK}>Вычисление числа K</Button>
                                <Button variant="outlined" onClick={calculateR} disabled={!k}>Вычисление числа R</Button>
                                <Button variant="contained" onClick={() => setAttr('step', AuthStep.BFirst)} disabled={!k || !r}>Следующий шаг</Button>
                            </Stack>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            Второй шаг
                        </StepLabel>
                        <StepContent>
                            {!!s && <Typography sx={{wordBreak: 'break-all'}}>Число S = {s?.toString()}</Typography>}
                            <Stack gap={1} sx={{marginTop: '1rem'}}>
                                <Button variant="outlined" onClick={calculateS}>Вычисление числа S</Button>
                                <Button variant="contained" onClick={() => setAttr('step', AuthStep.BSecond)} disabled={!s}>Следующий шаг</Button>
                            </Stack>
                        </StepContent>
                    </Step>
                </Stepper>
            </Stack>
        </Tile>
    )
}
