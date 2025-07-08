import { Card, Stack, TextField, IconButton, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ProductItem } from "../types/ProductItem";
import type { Product, Subproduct } from "../types/types";

interface ProductItemCardProps {
  id: number;
  product: string;
  subproduct: string;
  quantity: number | "";
  unitPrice: number | "";
  productOptions: Product[];
  subproductOptions: Subproduct[];
  onChange: (id: number, field: keyof ProductItem, value: any) => void;
  onDelete: (id: number) => void;
}

export default function ProductItemCard({
  id,
  product,
  subproduct,
  quantity,
  unitPrice,
  productOptions,
  subproductOptions,
  onChange,
  onDelete,
}: ProductItemCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#f5f5f5", mb: 2, p: 2, width: "98%" }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ width: "98%" }}
      >
        <TextField
          select
          label="Producto"
          value={product}
          onChange={(e) => onChange(id, "product", e.target.value)}
          sx={{ minWidth: 150, flex: 1 }}
        >
          {productOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Subproducto"
          value={subproduct}
          onChange={(e) => {
            const selectedSubproductId = e.target.value;
            onChange(id, "subproduct", selectedSubproductId);
        
            const selectedSubproduct = subproductOptions.find(
              (sp) => sp.id === selectedSubproductId
            );
        
            if (selectedSubproduct) {
              onChange(id, "unitPrice", selectedSubproduct.price);
            } else {
              onChange(id, "unitPrice", 0);
            }
          }}
          sx={{ minWidth: 150, flex: 1 }}
        >
          {subproductOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Cantidad"
          type="number"
          value={quantity === "" ? quantity=1 : quantity}
          onChange={(e) => onChange(id, "quantity", Number(e.target.value))}
          sx={{ minWidth: 150, flex: 1 }}
          inputProps={{ min: 0 }}
          error={Number(quantity) <= 0}
          helperText={Number(quantity) <= 0 ? 'Debe ser mayor a 0' : ''}

        />

        <TextField
          label="Precio Unitario"
          type="number"
          value={unitPrice === "" ? unitPrice= 0 : unitPrice}
          onChange={(e) => onChange(id, "unitPrice", Number(e.target.value))}
          sx={{ minWidth: 150, flex: 1 }}
          inputProps={{ min: 0, step: 0.01 }}
          disabled
          error={Number(unitPrice) < 0}
          helperText={Number(unitPrice) < 0 ? 'Debe ser mayor a 0' : ''}
          
        />

        <IconButton
          color="error"
          aria-label="eliminar producto"
          onClick={() => onDelete(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
