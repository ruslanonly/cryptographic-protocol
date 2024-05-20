import { Tile } from "@/shared";
import { StandardService } from "@/shared/lib/StandartService";
import { useStandartStore } from "@/shared/model/store/standart";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function GeneratePrimeNumber() {
    const { p, q, a, setAttr } = useStandartStore((state) => state)
    const [bits, setBits] = useState<number>()

    const handleDepthChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const value = e.target.value
        const number = Number(value)
        if (value.includes('-') || isNaN(number)) return
        if (number > 700) return
        setBits(number)
    }

    const generateNumbers = () => {
        if (bits) {
            const {p: draftP, q: draftQ, a: draftA} = StandardService.generatePQA(bits)
            setAttr('p', draftP);
            setAttr('q', draftQ);
            setAttr('a', draftA);
        }
    }

    return (
        <Tile>
            <Stack spacing={3}>
                <Typography variant="h5">
                Генерация простых чисел
                </Typography>
                <Stack direction="row" gap={2} alignItems='center'>
                    <FormControl sx={{gap: 1}} size="small">
                        <TextField
                        label="Количество битов"
                        variant="outlined"
                        size="small"
                        type="number"
                        value={bits}
                        onChange={handleDepthChange}/>
                    </FormControl>
                    <Button
                        sx={{whiteSpace: 'nowrap'}}
                        variant="contained"
                        disabled={!bits}
                        onClick={generateNumbers}>
                            Получить числа
                    </Button>
                    
                </Stack>
                {!!p && !!q && !!a && (
                    <>
                        <Typography sx={{wordBreak: 'break-all'}}>
                            P = {p.toString()}
                        </Typography>

                        <Typography sx={{wordBreak: 'break-all'}}>
                            Q = {q.toString()}
                        </Typography>

                        <Typography sx={{wordBreak: 'break-all'}}>
                            A = {a.toString()}
                        </Typography>
                    </>
                )}
            </Stack>
        </Tile>
    )
}
  