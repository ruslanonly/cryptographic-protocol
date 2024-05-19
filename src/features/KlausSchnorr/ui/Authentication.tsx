import { Reciever, Sender } from "@/entities/KlausSchnorr";
import { Button, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Authentication() {
  const navigate = useNavigate()

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
      <Button onClick={() => navigate('/')}>Вернуться назад</Button>
    </Stack>
  )
}
