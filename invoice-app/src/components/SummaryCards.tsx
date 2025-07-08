import React, { useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useInvoices } from "../context/InvoiceContext";

interface CardData {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconColor: string;
}

export default function SummaryCards() {
  const { summary, fetchSummary } = useInvoices();
  useEffect(() => {
    fetchSummary();
  }, []);

  const cards: CardData[] = [
    {
      title: "Total de facturas",
      value: summary?.totalInvoices ?? 0,
      icon: <DescriptionIcon fontSize="large" />,
      iconColor: "#1976d2",
    },
    {
      title: "Monto Total",
      value: summary?.totalAmount
        ? `$${summary.totalAmount.toFixed(2)}`
        : "$0.00",
      icon: <AttachMoneyIcon fontSize="large" />,
      iconColor: "#2e7d32",
    },
    {
      title: "Este Mes",
      value: summary?.currentMonthInvoices ?? 0,
      icon: <CalendarMonthIcon fontSize="large" />,
      iconColor: "#6a1b9a",
    },
    {
      title: "Promedio",
      value: summary?.averageInvoiceAmount,
      icon: <BarChartIcon fontSize="large" />,
      iconColor: "#ef6c00",
    },
  ];
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={2}
      mb={4}
    >
      {cards.map(({ title, value, icon, iconColor }) => (
        <Card
          key={title}
          sx={{
            flex: "1 1 220px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            minWidth: 220,
          }}
          variant="outlined"
        >
          <CardContent sx={{ flex: "1 1 auto", padding: "8px !important" }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" color="primary">
              {value}
            </Typography>
          </CardContent>

          <Box sx={{ color: iconColor, ml: 2 }}>{icon}</Box>
        </Card>
      ))}
    </Box>
  );
}
