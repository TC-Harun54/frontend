import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Fahrzeuge from "scenes/fahrzeuge";
import Fahrer from "scenes/fahrer";
import Fahrten from "scenes/fahrten";
import Dashboards from "scenes/dashboard";
import { Dashboard } from "@mui/icons-material";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboards />} />
              <Route path="/dashboard" element={<Dashboards />} />
              <Route path="/fahrzeuge" element={<Fahrzeuge />} />
              <Route path="/fahrer" element={<Fahrer />} />
              <Route path="/fahrten" element={<Fahrten />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
