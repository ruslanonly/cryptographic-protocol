import { GenerateKlausSchnorrKeys } from "@/entities/KlausSchnorr";
import { GeneratePrimeNumber, TestPrimeNumber } from "@/entities/PrimeNumber";
import { Page } from "@/shared";
import { Stack } from "@mui/material";

export default function MainPage() {
  return (
    <Page>
      <Stack spacing={2}>
        <GeneratePrimeNumber/>
        <TestPrimeNumber/>
        <GenerateKlausSchnorrKeys/>
      </Stack>
    </Page>
  )
}
