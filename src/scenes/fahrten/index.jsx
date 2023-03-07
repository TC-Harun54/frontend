import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetFahrerQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormDialog from "scenes/fahrten/MuiDialog";
import axios from "axios";
const Fahrten = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);


  console.log("data", data);


  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/general/fahrten`)
      .then((result) => {
        this.setData(result.data);
        console.log("====================================");
        console.log(result.data);
        console.log("====================================");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      field: "fahrer",
      headerName: "Fahrer",
      flex: 1.5,

      filterable: true,
      renderCell: (params) => (
        <div>
          <Typography variant="subtitle2">
            {`${params.value?.vorname} ${params.value?.nachname}, ${params.value?.email}`}
          </Typography>
        </div>
      ),
      filterRenderedCellData: true

    },
    {
      field: "fahrzeuge",
      headerName: "Fahrzeuge",
      flex: 1,
      filterable: true,
      renderCell: (params) => (
        <div>
          <Typography variant="subtitle3">
            {`${params.value?.marke} ${params.value?.modell}`}
          </Typography>
        </div>
      ),
    },
    {
      field: "km",
      headerName: "KM",
      flex: 1,
    },
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <>
        <>
          <div>
            <FontAwesomeIcon
              icon={faPlus}
              className="plusIcon"
              size="3x"
              onClick={handleClickOpen}
              style={{
                float: "right",
                marginTop: "-7.5px",
                marginRight: "10px",
                color: "white",
              }}
            />
            <FormDialog open={open} onClose={handleClose} />
          </div>
        </>
      </>
      <Header title="FAHRTEN" subtitle="Hier kannst du die Fahrer sehen" />
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
        <DataGrid
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Fahrten;
