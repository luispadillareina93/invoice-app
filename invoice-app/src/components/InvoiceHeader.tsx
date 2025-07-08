import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

interface InvoicesHeaderProps {
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
}

export default function InvoicesHeader({ onSearchChange, onFilterClick }: InvoicesHeaderProps) {
  return (
    <Box
      width="100%"    
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      flexWrap="wrap"
      gap={2}
    >
      <Box flex="1 1 auto" minWidth={250}>
        <Typography variant="subtitle1" color="text.secondary">
          Gestiona y consulta todas las facturas registradas
        </Typography>
      </Box>

      <Box
        flex="0 1 auto"
        display="flex"
        alignItems="center"
        gap={1}
        minWidth={250}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar facturas..."
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />

        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={onFilterClick}
          sx={{
            backgroundColor: '#f5f5f5', 
            borderColor: '#ddd',
            color: 'black',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              borderColor: '#ccc',
            },
            whiteSpace: 'nowrap', 
          }}
        >
          Filtros
        </Button>
      </Box>
    </Box>
  );
}
