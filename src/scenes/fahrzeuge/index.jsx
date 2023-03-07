import React, { useState, submitForm } from "react";
import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetFahrzeugeQuery } from "state/api";
import { DirectionsCarOutlined } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormDialog from './MuiDialog.js';
import axios from "axios";

const Fahrzeug = ({
  ort,
  mitte,
  nummer,
  marke,
  modell,
  kilometerstand,
  id
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const removeItem = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/general/fahrzeuge-delete/${id}`).then((result) => {

  }).catch((err) => {
      console.log("Error")
    });
  }

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color={theme.palette.secondary[700]}
          gutterBottom
          fontWeight="bold"
        >
          {marke} {modell}
          <FontAwesomeIcon icon={faCar} className="carIcon" size="1x" style={{ float: 'right', marginTop: '4.5px' }} />

        </Typography>
        <Typography variant="h5" component="div">

        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {ort}-{mitte}-{nummer}
        </Typography>
        <ort value={ort} readOnly />

        <Typography sx={{ marginBottom: '-20px' }} variant="body2" fontSize={"15px"} fontWeight="bold">{kilometerstand} km</Typography>
        <>
          <FontAwesomeIcon onClick={() => removeItem(id)} icon={faTrash} className="plusTrash" size="1x" style={{ float: 'right', marginRight: '1px', color: 'white' }} />
        </>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
};

const Fahrzeuge = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  if (useGetFahrzeugeQuery.length > 0) { }

  const { data, isLoading } = useGetFahrzeugeQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  console.log("data", data);



  return (
    <Box m="1.5rem 2.5rem"> <>
      <>
        <>
          <div>
            <FontAwesomeIcon icon={faPlus} className="plusIcon" size="3x" onClick={handleClickOpen} style={{ float: 'right', marginTop: '-7.5px', marginRight: '10px', color: 'white' }} />
          </div>
        </>

      </>



    </>
      <Header title="FAHRZEUGE" subtitle="Hier kannst du die Fahrzeuge sehen." />


      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              ort,
              mitte,
              nummer,
              marke,
              modell,
              kilometerstand,
              _id
            }) => (
              <Fahrzeug
                ort={ort}
                mitte={mitte}
                nummer={nummer}
                marke={marke}
                modell={modell}
                kilometerstand={kilometerstand}
                id={_id}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
      <FormDialog open={open} onClose={handleClose} />

    </Box>
  );
};

export default Fahrzeuge;