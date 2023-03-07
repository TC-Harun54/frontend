import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import ModalContent from "./ModalContent.css";
import { withStyles } from "@material-ui/core/styles";
import classes from "./ModalContent.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const FormDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const [km, setKM] = useState("");
  const [selectedUser, setselectedUser] = useState("");
  const [selectedCar, setselectedCar] = useState("");
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);

  const onSubmit = async () => {
    var data = {
      fahrer: selectedUser,
      fahrzeuge: selectedCar,
      km: Number(km),
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/general/fahrten-add`, data)
      .then((result) => {
        onClose();
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/general/fahrer`)
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => { });
  };
  const getCar = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/general/fahrzeuge`)
      .then((result) => {
        setCars(result.data);
      })
      .catch((err) => { });
  };
  useEffect(() => {
    getUser();
    getCar();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="my-dialog"
      classes={{ paper: classes.customDialog }}
    >
      <DialogTitle>Fahrt hinzufügen</DialogTitle>
      <DialogContent>
        <InputLabel id="demo-simple-select-label">Fahrer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUser}
          displayEmpty
          label="Age"
          fullWidth
          onChange={(e) => setselectedUser(e.target.value)}
        >
          <MenuItem value="" disabled>
            Fahrer auswählen
          </MenuItem>
          {users.map((e) => (
            <MenuItem
              value={e._id}
            >{`${e.vorname} ${e.nachname}, ${e.email}`}</MenuItem>
          ))}
        </Select>
        <InputLabel className="FahrzeugLabel" id="demo-simple-select-label">Fahrzeuge</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCar}
          fullWidth
          label="fahrzeuge"
          displayEmpty
          onChange={(e) => setselectedCar(e.target.value)}
        >
          <MenuItem value="" disabled>
            Fahrzeug auswählen
          </MenuItem>
          {cars.map((e) => (
            <MenuItem value={e._id}>{`${e.marke} ${e.modell}`}</MenuItem>
          ))}
        </Select>
        <TextField
          autoFocus
          margin="dense"
          id="modell"
          name="km"
          label="KM"
          value={km}
          onChange={(e) => setKM(e.target.value)}
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
  );
};

export default FormDialog;
