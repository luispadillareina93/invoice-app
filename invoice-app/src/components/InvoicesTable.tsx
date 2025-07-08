import { useState } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import type { PagedInvoice } from "../types/types";

interface InvoicesTableProps {
  invoices: PagedInvoice;
  pageSizeOptions?: number[];
  onPaginationChange: (page: number, pageSize: number) => void;

}

export default function InvoicesTable({
  invoices,
  pageSizeOptions = [5],
  onPaginationChange
}: InvoicesTableProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: pageSizeOptions[0],
  });
  console.log("invoices2222", invoices);
  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Cliente", flex: 1, minWidth: 150 },
    {
      field: "identification",
      headerName: "Identificación",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "invoiceNumber",
      headerName: "N° Factura",
      flex: 1,
      minWidth: 120,
    },
    { field: "invoiceDate", headerName: "Fecha", flex: 1, minWidth: 120 },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth: 120,
      valueFormatter: (params: number | undefined) => {
        const value = params;
        return typeof value === "number" ? `$${value.toFixed(2)}` : "";
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            aria-label="ver detalles"
            size="small"
            onClick={() => {
              alert(`Ver detalles factura ${params.row.invoiceNumber}`);
            }}
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton
            color="error"
            aria-label="eliminar"
            size="small"
            onClick={() => {
              alert(`Eliminar factura ${params.row.invoiceNumber}`);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      {/* Título */}
      <Typography variant="h5" gutterBottom>
        Facturas Registradas
      </Typography>

      {/* DataGrid*/}
      <DataGrid
        rows={invoices.data}
        columns={columns}
        rowCount={invoices.totalItems}
        paginationMode="server"
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
          onPaginationChange(model.page, model.pageSize); 
        }}
        pageSizeOptions={pageSizeOptions}
        rowSelection={false}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        
        localeText={{
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} filas seleccionadas`
              : `${count.toLocaleString()} fila seleccionada`,
          paginationRowsPerPage: "Filas por página:",
          paginationDisplayedRows: ({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
        }}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          mb: 2,
        }}
      />
    </Box>
  );
}
