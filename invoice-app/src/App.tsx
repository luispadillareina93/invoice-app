import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import InvoicesPage from './pages/InvoicePage';
import NewInvoicePage from './pages/NewInvoicePage';
import { InvoiceProvider } from './context/InvoiceContext';
     

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
      <InvoiceProvider>
        <Routes>
          <Route path="/" element={<InvoicesPage />} />
          <Route path="/new-invoice" element={<NewInvoicePage />} />
        </Routes>
        </InvoiceProvider>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
