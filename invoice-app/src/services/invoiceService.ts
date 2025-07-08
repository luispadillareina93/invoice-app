// src/services/invoiceService.ts
import type {
  Invoice,
  InvoiceData,
  PagedInvoice,
  Product,
  Subproduct,
  SummaryInfo,
} from "../types/types";
import api from "./api";

export async function getInvoices(
  invoiceNumber?: string,
  pageNumber: number = 1,
  pageSize: number = 5
): Promise<PagedInvoice> {
  const baseUrl = "/invoice/search";
  const params = new URLSearchParams();

  if (invoiceNumber) params.append("invoiceNumber", invoiceNumber);
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());

  const url = `${baseUrl}?${params.toString()}`;

  const { data } = await api.get<PagedInvoice>(url);
  return data;
}

export async function getSummary(): Promise<SummaryInfo> {
  const url = `/invoice/summary`;
  const { data } = await api.get<SummaryInfo>(url);
  return data;
}

export async function addInvoice(invoice: Partial<InvoiceData>): Promise<void> {
  await api.post("/invoice/add", invoice);
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/product/get-all");
  return data;
}

export async function getSubproducts(productId: string): Promise<Subproduct[]> {
  const { data } = await api.get<Subproduct[]>(`/subproduct/get/${productId}`);
  return data;
}
