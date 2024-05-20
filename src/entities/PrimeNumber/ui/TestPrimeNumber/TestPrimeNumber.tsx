import { Tile } from "@/shared";
import { Alert, AlertTitle, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { PrimeTest } from "../../model/PrimeTest";
import { useEffect, useState } from "react";
import { MathService } from "@/shared/lib/math";
import { useStandartStore } from "@/shared/model/store/standart";

const getTesterFn = (test: PrimeTest) => {
  switch(test) {
    case PrimeTest.Ferma: return (n: bigint) => MathService.isPrimeFermat(n);
    case PrimeTest.MillerRabin: return (n: bigint) => MathService.isPrimeMillerRabin(n);
  }
}

export function TestPrimeNumber() {
  const { p, q, a, setArePrime, setAttr } = useStandartStore((state) => state)
  const [primeTest, setPrimeTest] = useState<PrimeTest>()

  const [testResult, setTestResult] = useState<[boolean, boolean]>()

  const testNumbers = () => {
    if (primeTest && p && q) {
      const testFn = getTesterFn(primeTest);
      const testResult: [boolean, boolean] = [testFn(p), testFn(q)]
      setTestResult(testResult)

      if (testResult[0] && testResult[1]) {
        setArePrime(true)
      }
    }
  }

  useEffect(() => {
    setTestResult(undefined)
    setAttr('x', undefined)
    setAttr('y', undefined)
    setArePrime(false)
  }, [p, q, primeTest, setTestResult, setArePrime, setAttr])

  return (
    <Tile disabled={!p || !q || !a}>
      <Stack spacing={3}>
        <Typography variant="h5">
        Проверка простого числа
        </Typography>
        <Stack direction="row" gap={2}>
          <FormControl sx={{gap: 1}} size="small" fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Тест для проверки простого числа</InputLabel>
            <Select
              value={primeTest}
              onChange={(v) => setPrimeTest(v.target.value as PrimeTest)}
              labelId="demo-simple-select-helper-label"
              label='Тест для проверки простого числа'>
              <MenuItem value={undefined}>Не выбрано</MenuItem>
              <MenuItem value={PrimeTest.Ferma}>Тест Ферма</MenuItem>
              <MenuItem value={PrimeTest.MillerRabin}>Тест Миллера-Рабина</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" disabled={!primeTest} onClick={testNumbers}>Проверить</Button>
        </Stack>
        <Collapse in={!!testResult}>
          <Stack spacing={3}>
            {testResult && testResult.map((result, index) => {
              const message = `Число ${index === 0 ? 'P' : 'Q'} ${result === false ? 'не' : ''} простое`
              return (
                <Alert
                  severity={result ? "success" : "error"}>
                  <AlertTitle>{primeTest}</AlertTitle>
                  {message}
                </Alert>
              )
            })}
          </Stack>
        </Collapse>
      </Stack>
    </Tile>
  )
}
