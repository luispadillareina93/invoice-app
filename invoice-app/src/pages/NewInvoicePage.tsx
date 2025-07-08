import { useEffect, useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import CustomerInfoCard from "../components/CustomerInfoCard";
import ProductsDetailsCard from "../components/ProductsDetailsCard";
import InvoiceSummaryCard from "../components/InvoiceSummaryCard";
import ActionButtons from "../components/ActionButtons";
import { useInvoices } from "../context/InvoiceContext";
import type { CustomerInfo, InvoiceData } from "../types/types";

interface ProductItem {
  id: number;
  product: string;
  subproduct: string;
  quantity: number | "";
  unitPrice: number | "";
}

export default function NewInvoicePage() {
  const navigate = useNavigate();

  const [productsItem, setProductsItem] = useState<ProductItem[]>([]);

  const { subproducts, products, fetchSubproducts, fetchProducts,addInvoice } =
    useInvoices();

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, []);

  const subtotal = productsItem.reduce(
    (sum, p) =>
      sum + (p.quantity && p.unitPrice ? p.quantity * p.unitPrice : 0),
    0
  );
  const total = subtotal;
  const addProduct = () => {
    setProductsItem((prev) => [
      ...prev,
      {
        id: Date.now(),
        product: "",
        subproduct: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const updateProduct = (id: number, field: string, value: any) => {
    if (field === "product") fetchSubproducts(value);
    setProductsItem((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProductsItem((prev) => prev.filter((p) => p.id !== id));
  };
  const [customerInfo, setCustomerInfo] = useState<Partial<CustomerInfo>>({});

  const handleCustomerChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    customerInfo.identification?.trim() !== "" &&
    customerInfo.fullName?.trim() !== "" &&
    customerInfo.invoiceNumber?.trim() !=="" &&
    productsItem.length > 0 &&
    productsItem.every(
      (item) =>
        item.subproduct !== "" &&
        Number(item.quantity) > 0 &&
        Number(item.unitPrice) > 0
    );
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => navigate(-1)} aria-label="volver">
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
            Nueva Factura
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete los datos para registrar una nueva factura
          </Typography>
        </Box>
      </Stack>
      <CustomerInfoCard data={customerInfo} onChange={handleCustomerChange} />
      <ProductsDetailsCard
        products={productsItem}
        productOptions={products}
        subproductOptions={subproducts}
        onAddProduct={addProduct}
        onChangeProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />
      <InvoiceSummaryCard subtotal={subtotal} total={total} />
      <ActionButtons
        isSaveEnabled={isFormValid}
        onCancel={() => {
          setProductsItem([]);
        }}
        onSaveDraft={() => {
          alert("Guardando borrador...");
        }}
        onSaveInvoice={() => {
          const data: InvoiceData = {
            fullName: customerInfo.fullName ?? "",
            identification: customerInfo.identification ?? "",
            invoiceNumber:customerInfo.invoiceNumber??"",
            invoiceDate: customerInfo.date ?? new Date(),
            subtotal: subtotal,
            total: total,
            tax: 15,
            listInvoiceDetail: productsItem.map((item) => ({
              subProductId: Number(item.subproduct),
              quantity: Number(item.quantity),
              unitPrice: Number(item.unitPrice),
            })),
          };
          addInvoice(data)
        }}
      />
    </Box>
  );
}
