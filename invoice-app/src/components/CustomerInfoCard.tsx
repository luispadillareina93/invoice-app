import {
    Card,
    CardContent,
    Stack,
    Typography,
    TextField,
  } from "@mui/material";
  import PersonIcon from "@mui/icons-material/Person";
  import type { CustomerInfo } from "../types/types";
  
  interface Props {
    data?: Partial<CustomerInfo>;
    onChange: (field: keyof CustomerInfo, value: string) => void;
  }
  
  export default function CustomerInfoCard({ data = {}, onChange }: Props) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <PersonIcon color="primary" />
            <Typography variant="subtitle1" flexGrow={1}>
              Información del Cliente
            </Typography>
          </Stack>
  
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              required
              label="Identificación"
              placeholder="Identificación"
              variant="outlined"
              fullWidth
              value={data.identification ?? ""}
              onChange={(e) => onChange("identification", e.target.value)}
              error={!data.identification?.trim()}
              helperText={!data.identification?.trim() ? "Campo obligatorio" : ""}
            />
            <TextField
              required
              label="Nombres Completos"
              placeholder="Nombres Completos"
              variant="outlined"
              fullWidth
              value={data.fullName ?? ""}
              onChange={(e) => onChange("fullName", e.target.value)}
              error={!data.fullName?.trim()}
              helperText={!data.fullName?.trim() ? "Campo obligatorio" : ""}
            />
          </Stack>
  
          <Stack direction="row" spacing={2}>
            <TextField
              label="Fecha"
              placeholder="Fecha"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={data.date ?? ""}
              onChange={(e) => onChange("date", e.target.value)}
              
            />
            <TextField
              required
              label="Número de Factura"
              placeholder="FAC-001"
              variant="outlined"
              fullWidth
              value={data.invoiceNumber ?? ""}
              onChange={(e) => onChange("invoiceNumber", e.target.value)}
              error={!data.invoiceNumber?.trim()}
              helperText={!data.invoiceNumber?.trim() ? "Campo obligatorio" : ""}
            />
          </Stack>
        </CardContent>
      </Card>
    );
  }
  