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
  const [form, setForm] = useState({ ort: '', mitte: '', nummer: '', marke: '', modell: '', kilometerstand: '' });

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const onSubmit = async () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/general/fahrzeuge-add`, form).then((result) => {
      onClose()
    }).catch((err) => {
      console.log("Error")
    });
  }

  return (
    <Dialog open={open} onClose={onClose} className="my-dialog" classes={{ paper: classes.customDialog }}
    >
      <DialogTitle >Neues Fahrzeug hinzufügen</DialogTitle>
      <DialogContent >
        <TextField
          autoFocus
          margin="dense"
          id="marke"
          label="Marke"
          name='marke'
          value={form.marke}
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
          label="Modell"
          name='modell'
          value={form.modell}
          onChange={onChangeValue}
          type="text"
          fullWidth
          variant="standard"
          required
        />
        <div className="header-container">
          <h4>Kennzeichen</h4>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            autoFocus
            margin="dense"
            id="ort"
            label="Ort"
            name='ort'
            value={form.ort}
            onChange={onChangeValue}
            type="text"
            fullWidth
            variant="standard"
            style={{ marginRight: "10px" }}
            required
          />
          <TextField
            margin="dense"
            id="mitte"
            label="Mitte"
            name='mitte'
            value={form.mitte}
            onChange={onChangeValue}
            type="text"
            fullWidth
            variant="standard"
            style={{ marginRight: "10px" }}
            required
          />
          <TextField
            margin="dense"
            id="nummer"
            label="Nummer"
            name='nummer'
            value={form.nummer}
            onChange={onChangeValue}
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="kilometerstand"
          label="Kilometerstand"
          name='kilometerstand'
          value={form.kilometerstand}
          onChange={onChangeValue}
          type="number"
          fullWidth
          variant="standard"
          required
        />


      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button onClick={onSubmit}>Speichern</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog;
