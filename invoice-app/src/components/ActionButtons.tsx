import { Stack, Button } from '@mui/material';

interface ActionButtonsProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onSaveInvoice: () => void;
  isSaveEnabled: boolean;

}

export default function ActionButtons({
  onCancel,
  onSaveDraft,
  onSaveInvoice,
  isSaveEnabled,
}: ActionButtonsProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
      <Button
        variant="outlined"
        onClick={onCancel}
        sx={{ backgroundColor: 'white', color: 'black', borderColor: '#ccc' ,fontWeight:'bold' }}
      >
        Cancelar
      </Button>
      <Button variant="contained" color="inherit" onClick={onSaveDraft} sx={{ bgcolor: 'grey.500'  ,fontWeight:'bold'}}>
        Guardar Borrador
      </Button>
      <Button variant="contained" color="primary" onClick={onSaveInvoice} sx ={{fontWeight:'bold'}}    disabled={!isSaveEnabled}>
        Guardar Factura
      </Button>
    </Stack>
  );
}
