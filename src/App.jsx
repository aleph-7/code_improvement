import React from "react";
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Badminton from "./badminton/Badminton";
import Basketball from "./basketball/Basketball";
import Cricket from "./cricket/Cricket";
import Football from "./football/Football";
import Hockey from "./hockey/Hockey";
import Squash from "./squash/Squash";
import Tabletennis from "./tabletennis/Tabletennis";
import Tennis from "./tennis/Tennis";
import Volleyball from "./volleyball/Volleyball";
import LP1 from "./Landing_Page1/LP1.jsx";
// import LP2 from "./Landing_Page2/LP2.jsx";
import Signup from "./login/signup.jsx";
import Login from "./login/login";
// import History from "./History/History.jsx";
import Gym from "./Gym/Gym.jsx";
import Yoga from "./yoga/Yoga.jsx";
import Counsellor from "./counsellor/Counsellor.jsx";
import Swim from "./swimming/Swim.jsx";
import ProtectedRoute from "./protected_routes.jsx";

function App() {
  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}
      {/* <LP1 /> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/LP1" element={<LP1 />} />
          <Route path="/badminton" element={<Badminton />} />
          /* <Route index element={<Login />} />
          <Route path="/LP1" element={<LP1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/yoga" element={<Yoga />} />
          {/* <Route path="/History" element={<History />} /> */}
          {/* <Route path="/LP2" element={<LP2 />} /> */}
          <Route path="/football" element={<Football />} />
          <Route path="/squash" element={<Squash />} />
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/hockey" element={<Hockey />} />
          <Route path="/tennis" element={<Tennis />} />
          <Route path="/tabletennis" element={<Tabletennis />} />
          <Route path="/badminton" element={<Badminton />} />
          <Route path="/basketball" element={<Basketball />} />
          <Route path="/volleyball" element={<Volleyball />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="/counsellor" element={<Counsellor />} />
          <Route path="/swimming" element={<Swim />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
