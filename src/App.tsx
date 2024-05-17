import React from 'react';
import {Routes, Route, Link} from "react-router-dom";
import ColorDrppper from "./pages/ColorDropper/ColorDropper";
import ColorDropperCanvas from "./pages/ColorDropperCanvas/ColorDropperCanvas";
import Header from "./components/Header/Header";
import "./_variables.scss"

function App() {
  return (
      <div>
        {/* <header>
          <Link to={"/pureCanvas"} style={{marginRight: '30px'}}>Pure Canvas (as required)</Link>
          <Link to={"/eyeDropperApi"}>Eye Dropper Api (additional)</Link>
        </header> */}
        <Header/>
        <Routes>
          <Route path="/pureCanvas" element={<ColorDropperCanvas/>}/>
          <Route path="/eyeDropperApi" element={<ColorDrppper/>}/>
        </Routes>
      </div>

  );
}

export default App;
