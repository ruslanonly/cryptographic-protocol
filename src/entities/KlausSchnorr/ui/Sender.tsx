import { AuthStep, Tile } from "@/shared";
import { StandardService } from "@/shared/lib/StandartService";
import { useStandartStore } from "@/shared/model/store/standart";
import { Button, FormControl, Stack, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";

export function Sender() {
    const { p, q, a, x, y, k, h, s, w, wComma, message, step, setAttr, setMessage } = useStandartStore()

    let activeStep = -1
    if (step) {
        if (step === AuthStep.AFirst) activeStep = 0;
    }

    const calculateH = () => {
        if (message) {
            setAttr('h', StandardService.calculateH(message))
        }
    }

    const onMessage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const value = e.target.value
        setMessage(value)
    }

    const calculateK = () => {
        if (q) {
            setAttr('k', StandardService.calculateK(q))
        }
    }

    const calculateW = () => {
        if (a && k && p) {
            setAttr('w', StandardService.calculateW(a, k, p))
        }
    }

    const calculateWComma = () => {
        if (w && q) {
            setAttr('wComma', StandardService.calculateWComma(w, q))
        }
    }

    const calculateS = () => {
        if (x && wComma && k && h && q) {
            setAttr('s', StandardService.calculateS(x, wComma, k, h, q))
        }
    }

    const signAttack = () => {
        if (wComma && s) {
            setAttr('wComma', wComma + 5n)
            setAttr('s', s - 5n)
        }
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
                            <Stack direction="column" gap={2} alignItems='stretch'>
                                <Typography sx={{wordBreak: 'break-all'}}>Открытый ключ y = {y?.toString()}</Typography>
                                <Typography sx={{wordBreak: 'break-all'}}>Закрытый ключ x = {x?.toString()}</Typography>
                                <Typography sx={{wordBreak: 'break-all'}}>Число a = {a?.toString()}</Typography>
                                <FormControl sx={{gap: 1}} size="small">
                                    <TextField
                                    label="Сообщение"
                                    variant="outlined"
                                    size="small"
                                    value={message || ''}
                                    onChange={onMessage}/>
                                </FormControl>
                                {!!h && <Typography sx={{wordBreak: 'break-all'}}>Число H = {h?.toString()}</Typography>}
                                {!!k && <Typography sx={{wordBreak: 'break-all'}}>Число K = {k?.toString()}</Typography>}
                                {!!w && <Typography sx={{wordBreak: 'break-all'}}>Число W = {w?.toString()}</Typography>}
                                {!!wComma && <Typography sx={{wordBreak: 'break-all'}}>Число W' = {wComma?.toString()}</Typography>}
                                {!!s && <Typography sx={{wordBreak: 'break-all'}}>Число S = {s?.toString()}</Typography>}
                                <Stack gap={1} sx={{marginTop: '1rem'}}>
                                    <Button variant="outlined" onClick={calculateH}>Вычисление числа H</Button>
                                    <Button variant="outlined" onClick={calculateK} disabled={!h}>Вычисление числа K</Button>
                                    <Button variant="outlined" onClick={calculateW} disabled={!h || !k}>Вычисление числа W</Button>
                                    <Button variant="outlined" onClick={calculateWComma} disabled={!h || !k || !w}>Вычисление числа W'</Button>
                                    <Button variant="outlined" onClick={calculateS} disabled={!h || !k || !w || !wComma}>Вычисление числа S</Button>
                                    <Button
                                    color="error"
                                    variant="contained"
                                    onClick={signAttack} disabled={!h || !k || !w || !wComma || !s}>
                                        Атака на подпись
                                    </Button>
                                    <Button variant="contained" onClick={() => setAttr('step', AuthStep.BFirst)} disabled={!h || !k || !w || !wComma || !s}>Отправить получателю w' и s</Button>
                                </Stack>
                            </Stack>
                        </StepContent>
                    </Step>
                </Stepper>
            </Stack>
        </Tile>
    )
}
