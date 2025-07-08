import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductItemCard from "./ProductItemCard";
import type { Product, Subproduct } from "../types/types";

interface ProductItem {
  id: number;
  product: string;
  subproduct: string;
  quantity: number | "";
  unitPrice: number | "";
}

interface ProductsDetailsCardProps {
  products: ProductItem[];
  productOptions: Product[];
  subproductOptions: Subproduct[];
  onAddProduct: () => void;
  onChangeProduct: (id: number, field: string, value: any) => void;
  onDeleteProduct: (id: number) => void;
}

export default function ProductsDetailsCard({
  products,
  productOptions,
  subproductOptions,
  onAddProduct,
  onChangeProduct,
  onDeleteProduct,
}: ProductsDetailsCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <ShoppingCartIcon color="primary" />
          <Typography variant="subtitle1" flexGrow={1}>
            Detalles de productos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddProduct}
            sx={{fontWeight:'bold'}}
          >
            Agregar producto
          </Button>
        </Stack>

        {products.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No hay productos agregados.
          </Typography>
        )}

        {products.map((product) => (
          <ProductItemCard
            key={product.id}
            id={product.id}
            product={product.product}
            subproduct={product.subproduct}
            quantity={product?.quantity}
            unitPrice={product?.unitPrice}
            productOptions={productOptions}
            subproductOptions={subproductOptions}
            onChange={onChangeProduct}
            onDelete={onDeleteProduct}
          />
        ))}
      </CardContent>
    </Card>
  );
}
