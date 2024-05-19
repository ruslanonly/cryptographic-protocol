import { SchnorrService, Tile, useAuthenticationStore } from "@/shared";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

// const generatePQ = (depth: number): [bigint, bigint] => {
//     const a = BigInt(10 ** (depth - 1));
//     const b = a * 10n - 1n;

//     const generatePrimePair = (): [bigint, bigint] => {
//         const draftP = generatePrimeNumber(a, b);
//         const draftQ = generatePrimeNumber(a, b);

//         if (draftP === draftQ || (draftP - 1n) % draftQ === 0n) {
//             // Recursively try again if the conditions are not satisfied
//             return generatePrimePair();
//         }

//         return [draftP, draftQ];
//     };

//     return generatePrimePair();
// };

export function GeneratePrimeNumber() {
    const { p, q, setAttr } = useAuthenticationStore((state) => state)
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
            const {p: draftP, q: draftQ} = SchnorrService.generatePQ(bits)
            setAttr('p', draftP);
            setAttr('q', draftQ);
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
                {!!p && !!q && (
                    <>
                        <Typography>
                            P = {p.toString()}
                        </Typography>

                        <Typography>
                            Q = {q.toString()}
                        </Typography>
                    </>
                )}
            </Stack>
        </Tile>
    )
}
  