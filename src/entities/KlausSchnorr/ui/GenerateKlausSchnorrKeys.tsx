import { AuthStep, SchnorrService, Tile, useAuthenticationStore } from "@/shared";
import { Button, Collapse, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GenerateKlausSchnorrKeys() {
  const navigate = useNavigate()

  const { p, q, x, y, g, arePrime, setAttr } = useAuthenticationStore((state) => state)

  const generateKeys = () => {
    if (p && q) {
      const { x, y, g } = SchnorrService.generateKeysPair(p, q)
      setAttr('x', x)
      setAttr('y', y)
      setAttr('g', g)
    }
  }

  const onClick = () => {
    navigate('/authentication')
    setAttr('step', AuthStep.AFirst)
  }

  return (
    <Tile disabled={!p || !q || !arePrime}>
      <Stack gap={3}>
        <Stack direction="row" justifyContent="space-between"> 
          <Typography variant="h5">
            Генерация ключей по схеме Клауса Шнорра
          </Typography>
          <Button variant="text" onClick={generateKeys}>Сгенерировать ключи</Button>

        </Stack>
        <Collapse in={!!(x && y && g && p && q && arePrime)}>
          <Stack gap={2}>
            <Stack gap={3}>
              <Typography>
                Открытый ключ = {y?.toString()}
              </Typography>
              <Typography>
                Закрытый Ключ = {x?.toString()}
              </Typography>
            </Stack>
            <Button variant="contained" onClick={onClick}>Отправить</Button>
          </Stack>
        </Collapse>
      </Stack>
    </Tile>
  )
}
  