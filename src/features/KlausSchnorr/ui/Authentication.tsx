import { Reciever, Sender } from "@/entities/KlausSchnorr";
import { useStandartStore } from "@/shared";
import { Button, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Authentication() {
  const navigate = useNavigate()

  const {
    setAttr
  } = useStandartStore()

  const closeSession = () => {
      navigate('/')

      setAttr('a', undefined)
      setAttr('arePrime', undefined)
      setAttr('h', undefined)
      setAttr('k', undefined)
      setAttr('message', undefined)
      setAttr('p', undefined)
      setAttr('q', undefined)
      setAttr('s', undefined)
      setAttr('step', undefined)
      setAttr('u', undefined)
      setAttr('v', undefined)
      setAttr('w', undefined)
      setAttr('wComma', undefined)
      setAttr('x', undefined)
      setAttr('y', undefined)
      setAttr('z1', undefined)
      setAttr('z2', undefined)
  }

  return (
    <Stack gap={5}>
      <Grid container columns={2} spacing={4} flexWrap='nowrap'>
        <Grid item xs>
          <Sender/>
        </Grid>
        <Grid item xs>
          <Reciever/>
        </Grid>
      </Grid>
      <Button onClick={closeSession}>Закончить сессию</Button>
    </Stack>
  )
}
