import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface MyDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  apply: string;
  cancel: string;
  onApply: () => void;
}

export default function MyDialog({
  open,
  onClose,
  title,
  placeholder,
  value,
  onChange,
  apply,
  cancel,
  onApply,
}: MyDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          placeholder={placeholder}
          sx={{ minWidth: '300px', padding: '0 20px' }}
          autoFocus
          margin='dense'
          size='small'
          type='text'
          fullWidth
          variant='outlined'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onApply}>{apply}</Button>
        <Button onClick={onClose}>{cancel}</Button>
      </DialogActions>
    </Dialog>
  );
}
