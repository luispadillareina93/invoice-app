import { Typography } from "@mui/material";
import InvoicesHeader from "../components/InvoiceHeader";
import SummaryCards from "../components/SummaryCards";
import InvoicesTable from "../components/InvoicesTable";
import { useInvoices } from "../context/InvoiceContext";
import { useEffect, useState } from "react";

export default function InvoicesPage() {
  const { invoices, fetchInvoices } = useInvoices();
  const [pagination, setPagination] = useState({ page: 0, pageSize: 5 });

  useEffect(() => {
    fetchInvoices(1, 5);
  }, []);
  useEffect(() => {}, [invoices]);
  useEffect(() => {
    fetchInvoices(pagination.page + 1, pagination.pageSize);
  }, [pagination]);

  const onSearchChange = (invoiceNumber: string) => {
    fetchInvoices(1, 5, invoiceNumber);
  };
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Invoices
      </Typography>
      <InvoicesHeader onSearchChange={onSearchChange}></InvoicesHeader>
      <SummaryCards></SummaryCards>
      <InvoicesTable
        invoices={invoices}
        onPaginationChange={(page, pageSize) =>
          setPagination({ page, pageSize })
        }
      ></InvoicesTable>
    </div>
  );
}
