import { AuthStep, Tile } from "@/shared";
import { StandardService } from "@/shared/lib/StandartService";
import { useStandartStore } from "@/shared/model/store/standart";
import { Button, Collapse, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GenerateStandartKeys() {
  const navigate = useNavigate()

  const { p, q, a, x, y, arePrime, setAttr } = useStandartStore((state) => state)

  const generateKeys = () => {
    if (p && q && a) {
      const { x: pX, y: pY } = StandardService.generateKeyPair(p, q, a)
      setAttr('x', pX)
      setAttr('y', pY)
    }
  }

  const onClick = () => {
    navigate('/authentication')
    setAttr('step', AuthStep.AFirst)
  }

  return (
    <Tile disabled={!p || !q || !a || !arePrime}>
      <Stack gap={3}>
        <Stack direction="row" justifyContent="space-between"> 
          <Typography variant="h5">
            Генерация ключей по протоколу ГОСТ 34.10-94
          </Typography>
          <Button variant="text" onClick={generateKeys}>Сгенерировать ключи</Button>

        </Stack>
        <Collapse in={!!(x && y && p && q && a && arePrime)}>
          <Stack gap={2}>
            <Stack gap={3}>
              <Typography sx={{wordBreak: 'break-all'}}>
                Открытый ключ Y = {y?.toString()}
              </Typography>
              <Typography sx={{wordBreak: 'break-all'}}>
                Закрытый Ключ X = {x?.toString()}
              </Typography>
            </Stack>
            <Button variant="contained" onClick={onClick}>Начать сессию</Button>
          </Stack>
        </Collapse>
      </Stack>
    </Tile>
  )
}
  