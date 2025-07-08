// src/context/InvoiceContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import * as invoiceService from '../services/invoiceService';
import type { Invoice, PagedInvoice, Product, Subproduct, SummaryInfo } from '../types/types';

interface InvoiceContextType {
  invoices: PagedInvoice;
  products: Product[];
  subproducts: Subproduct[];
  summary:SummaryInfo;
  loading: boolean;
  error: string | null;

  fetchInvoices: (pageNumber:number,pageSize:number,invoiceNumber?: string) => Promise<void>;
  fetchSummary: () => Promise<void>;
  addInvoice: (invoiceData: Partial<Invoice>) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchSubproducts: (productId: string) => Promise<void>;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<PagedInvoice>({
    data: [],
    totalItems: 0,
    page: 0,
    pagesize: 10,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState<SummaryInfo>({averageInvoiceAmount:0,currentMonthInvoices:0,totalAmount:0,totalInvoices:0});

  const [subproducts, setSubproducts] = useState<Subproduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async (pageNumber:number,pageSize:number,invoiceNumber?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getInvoices(invoiceNumber??"",pageNumber,pageSize);
      console.log(data)
      setInvoices(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching invoices');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getSummary();
      console.log(data)
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching invoices');
    } finally {
      setLoading(false);
    }
  };
  const addInvoice = async (invoiceData: Partial<Invoice>) => {
    setLoading(true);
    setError(null);
    try {
      await invoiceService.addInvoice(invoiceData);
      await fetchInvoices(1,5);
    } catch (err: any) {
      setError(err.message || 'Error adding invoice');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubproducts = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getSubproducts(productId);
      setSubproducts(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching subproducts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        products,
        subproducts,
        loading,
        error,
        summary,
        fetchSummary,
        fetchInvoices,
        addInvoice,
        fetchProducts,
        fetchSubproducts,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
}
