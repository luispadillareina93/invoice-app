import { type ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
  
    // Definimos rutas donde no mostrar el header
    const hideHeaderRoutes = ['/new-invoice'];
  
    return (
      <>
        {/* Mostrar header solo si la ruta NO está en hideHeaderRoutes */}
        {!hideHeaderRoutes.includes(location.pathname) && (
          <AppBar
            position="static"
            sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Izquierda: Logo + Nombre */}
              <Box display="flex" alignItems="center" gap={1}>
                <img src="/logo.png" alt="Logo" style={{ height: 40, width: 40 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Sistema de Facturas
                </Typography>
              </Box>
  
              {/* Derecha: Botón + Avatar */}
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#115293" },
                    fontWeight: 'bold',
                  }}
                  startIcon={<AddIcon />}
                  size="medium"
                
                  onClick={() => navigate('/new-invoice')}
                >
                  Nueva Factura
                </Button>
  
                <Avatar sx={{ bgcolor: "#8a8a8a" }}>
                  <PersonIcon />
                </Avatar>
              </Box>
            </Toolbar>
          </AppBar>
        )}
  
        <Container maxWidth={false} sx={{ mt: 4, px: 3 }}>
          {children}
        </Container>
      </>
    );
  }
  