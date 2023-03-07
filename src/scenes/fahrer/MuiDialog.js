import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from "@mui/material";
import ModalContent from './ModalContent.css'
import { withStyles } from "@material-ui/core/styles";
import classes from './ModalContent.css'
import { useState } from 'react';
import axios from 'axios';


const FormDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const [form, setForm] = useState({ vorname: '', nachname: '', email: '' });

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const onSubmit = async () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/general/fahrer-add`, form).then((result) => {
      onClose()
    }).catch((err) => {
      console.log("Error")
    });
  }

  return (
    <Dialog open={open} onClose={onClose} className="my-dialog" classes={{ paper: classes.customDialog }}
    >
      <DialogTitle >Fahrer hinzufügen</DialogTitle>
      <DialogContent >
        <TextField
          autoFocus
          margin="dense"
          id="marke"
          name='vorname'
          label="Vorname"
          value={form.vorname}
          onChange={onChangeValue}
          type="text"
          fullWidth
          variant="standard"
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="modell"
          name='nachname'
          label="Nachname"
          value={form.nachname}
          onChange={onChangeValue}
          type="text"
          fullWidth
          variant="standard"
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="modell"
          name='email'
          label="E-mail"
          value={form.email}
          onChange={onChangeValue}
          type="text"
          fullWidth
          variant="standard"
          required
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog;
