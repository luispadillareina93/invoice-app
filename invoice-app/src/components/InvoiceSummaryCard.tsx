import { Card, CardContent, Stack, Typography, Divider } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';

interface InvoiceSummaryCardProps {
  subtotal: number;
  total: number;
}

export default function InvoiceSummaryCard({ subtotal, total }: InvoiceSummaryCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* Título con ícono */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <SummarizeIcon color="primary" />
          <Typography variant="subtitle1">Resumen</Typography>
        </Stack>

        {/* Subtotal y Total */}
        <Stack spacing={1} mb={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Total</Typography>
            <Typography variant="body2">${total.toFixed(2)}</Typography>
          </Stack>
        </Stack>

        {/* Línea separadora */}
        <Divider />

        {/* Total final */}
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Typography variant="h6" fontWeight="bold">
            Total Final
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ${total.toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
