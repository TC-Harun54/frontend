import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetFahrerQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormDialog from "scenes/fahrer/MuiDialog";
import { faCar, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import mercedesImage from "./mercedes.png";

const Dashboards = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetFahrerQuery();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("data", data);

  const removeItem = (row) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/general/fahrer-delete/${row._id}`)
      .then(() => {
        // Remove the deleted item from the state
        this.setData(data.filter((item) => item._id !== row._id));
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const columns = [
    {
      field: "vorname",
      headerName: "Vorname",
      flex: 0.5,
    },
    {
      field: "nachname",
      headerName: "Nachname",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => removeItem(params.row)}
        />
      ),
    },
  ];

  return (
    <Box m="0.1rem 2rem">
      <>
        <></>
      </>
      <Header title="" subtitle="Hier kannst du die Fahrer sehen" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <Box className="box1" bgcolor="#ffe3a3" p={0.11} mb={1}>
          {" "}
          <h1 className="autologHeader">
            <i>Autolog - Digitales Fahrtenbuch </i>
          </h1>
        </Box>
        <img className="Mercedes" src={mercedesImage} alt="Mercedes" />
      </Box>
    </Box>
  );
};

export default Dashboards;
