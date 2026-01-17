import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { JSX } from "react";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
