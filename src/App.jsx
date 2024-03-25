import React from "react";
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";

import Signup from "./login/signup.jsx";
import Login from "./login/login";

//User Pages
import ProtectedRoute_User from "./protected_routes_user.jsx";
import Basketball from "./user/basketball/Basketball";
import Cricket from "./user/cricket/Cricket";
import Volleyball from "./user/volleyball/Volleyball.jsx";
import Badminton from "./user/badminton/Badminton";
import Tennis from "./user/tennis/Tennis";
import TableTennis from "./user/tabletennis/TableTennis.jsx";
import Squash from "./user/squash/Squash";
import Football from "./user/football/Football";
import Hockey from "./user/hockey/Hockey";
import Yoga from "./user/yoga/Yoga.jsx";
import Swimming from "./user/swimming/Swimming.jsx";
import Gym from "./user/gym/Gym.jsx";
import Counsellor from "./user/counsellor/Counsellor.jsx";
import Self_help from "./user/self-help/self_help.jsx";
import History from "./user/history/History.jsx";
import Home from "./user/Landing_Page1/LP1.jsx";
import LP2 from "./user/Landing_Page2/LP2.jsx"

//Coach Pages
import ProtectedRoute_Coach from "./protected_routes_coach.jsx";
import Coach_Dashboard from "./Dashboard/Coach/Coach_Dashboard.jsx";

//Admin-Attendance Pages
import ProtectedRoute_Admin from "./protected_routes_admin.jsx";
import Attendance from "./admin/attendance.jsx";

//Yoga Instructor

//Gym/Swimiming Instructor

//Counsellor page
import ProtectedRoute_Counsellor from "./protected_routes_counsellor.jsx";
import Counsellor_Dashboard from "./Dashboard/Counsellor/Counsellor_Dashboard.jsx";

import Error from "./error/Error.jsx";

// import Gym_Instructor from "./Dashboard/Gym_Instructor/Gym_Instructor.jsx";

// import Coach from "./Dashboard/Coach/Coach.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute_User />}>
            <Route path="/history" element={<History />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home_readmore" element={<LP2 />} />
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="/volleyball" element={<Volleyball />} />
            <Route path="/badminton" element={<Badminton />} />
            <Route path="/tennis" element={<Tennis />} />
            <Route path="/tabletennis" element={<TableTennis />} />
            <Route path="/swimming" element={<Swimming />} />
            <Route path="/squash" element={<Squash />} />
            <Route path="/football" element={<Football />} />
            <Route path="/hockey" element={<Hockey />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/gym" element={<Gym />} />
            <Route path="/self-help" element={<Self_help />} />
            <Route path="/counsellor" element={<Counsellor />} />
          </Route>

          <Route element={<ProtectedRoute_Coach />}>
            <Route path="/admin/coach" element={<Coach_Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute_Counsellor />}>
            <Route
              path="/admin/counsellor"
              element={<Counsellor_Dashboard />}
            />
          </Route>

          <Route element={<ProtectedRoute_Admin />}>
            <Route
              path="/admin/attendance"
              element={
                <Attendance
                  type_of_sport={localStorage.getItem("type_of_sport")}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
