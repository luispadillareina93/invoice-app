export interface Invoice {
    id: string;
    client: string;
    identification: string;
    invoiceNumber: string;
    date: string;
    total: number;
  }

  export interface PagedInvoice{
      page:number;
      pagesize:number;
      totalItems:number;
      data:Invoice[]
  }
  export interface SummaryInfo{
    totalInvoices:number;
    totalAmount:number;
    currentMonthInvoices:number;
    averageInvoiceAmount:number
}
  
  export interface Product {
    id: string;
    name: string;
  }
  
  export interface Subproduct {
    id: string;
    name: string;
    productId: string;
    price:number;
  }

  export interface InvoiceData{
    identification:string;
    fullName:string;
    invoiceNumber:string;
    invoiceDate:Date;
    subtotal:number;
    tax:number;
    total:number;
    listInvoiceDetail:DetailData[]
  }

  export interface  DetailData{
    subProductId:number;
    quantity:number;
    unitPrice:number;
  }

  export interface CustomerInfo{
    identification:string;
    fullName:string;
    date:Date;
    invoiceNumber:string;
  }