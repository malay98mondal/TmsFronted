// src/styles.ts
import { styled } from '@mui/system';
import { TableCell, TableRow, TextField, Toolbar, Button } from '@mui/material';

export const StyledTableCell = styled(TableCell)({
  '&.MuiTableCell-head': {
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

export const SearchField = styled(TextField)({
  marginLeft: 'auto',
  marginRight: '16px',
});

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const AddUserButton = styled(Button)({
  backgroundColor: 'blue',
  color: '#fff',
  textTransform: 'none',
  marginLeft: '30px',
  '&:hover': {
    backgroundColor: '#45a049',
  },
  borderRadius: '6px',
});
