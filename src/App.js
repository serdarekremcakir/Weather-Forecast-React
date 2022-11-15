import { Route, Routes } from "react-router-dom";
import Cities from "./pages/Cities";
import Home from "./pages/Home";
import About from "./pages/About";
import PrivateRoute from "./pages/PrivateRoute";
import CityDetail from "./pages/CityDetail";
import CityLayout from "./pages/CityLayout";

function App() {



  return (
    <Routes>
      <Route path='/api-key' element={<Home />} />
      <Route path='/about' element={<PrivateRoute><About /></PrivateRoute>} />
      <Route path='/' element={<PrivateRoute><Cities /></PrivateRoute>} />
      <Route path='*' element={<Home />} />
      <Route element={<PrivateRoute><CityLayout /></PrivateRoute>}>
        <Route path='/city/:id-:name' element={<CityDetail />} />
      </Route>

    </Routes>
  );
}

export default App;
