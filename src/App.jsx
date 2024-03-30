import React, { useEffect } from "react";
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
import Landing_Page from "./user/landing_page/landing_page.jsx";

//Coach Pages
import ProtectedRoute_Coach from "./protected_routes_coach.jsx";
import Coach_Dashboard from "./Dashboard/Coach/Coach_Dashboard.jsx";

//Admin-Attendance Pages
import ProtectedRoute_Admin from "./protected_routes_admin.jsx";
import Attendance from "./admin/attendance.jsx";

//Yoga Instructor
import Yoga_Instructor from "./Dashboard/yoga_instructor/Yoga_Instructor.jsx";
import ProtectedRoute_Yoga from "./protected_routes_yoga.jsx";

//Gym/Swimiming Instructor
import Gym_Instructor from "./Dashboard/gym_instructor/Gym_Instructor.jsx";
import Swimming_Instructor from "./Dashboard/swimming_instructor/Swimming_Instructor.jsx";
import ProtectedRoute_Gym from "./protected_routes_gym.jsx";
import ProtectedRoute_Swimming from "./protected_routes_swim.jsx";

//Counsellor page
import ProtectedRoute_Counsellor from "./protected_routes_counsellor.jsx";
import Counsellor_Dashboard from "./Dashboard/Counsellor/Counsellor_Dashboard.jsx";

//Superadmin Pages
import Superadmin from "./Dashboard/Super_admin/superadmin.jsx";

import Redirect from "./redirect.jsx";

import Error from "./error/Error.jsx";
import ProtectedRoute_SuperAdmin from "./protected_routes_super.jsx";

function App() {
  useEffect(() => {
    document.title = "Elysium";
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Redirect />} />
          <Route path="*" element={<Error />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute_User />}>
            <Route path="/history" element={<History />} />
            <Route path="/home" element={<Landing_Page />} />
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

          <Route element={<ProtectedRoute_Gym />}>
            <Route path="/admin/gyminstructor" element={<Gym_Instructor />} />
          </Route>

          <Route element={<ProtectedRoute_Swimming />}>
            <Route
              path="/admin/swiminstructor"
              element={<Swimming_Instructor />}
            />
          </Route>

          <Route element={<ProtectedRoute_Yoga />}>
            <Route path="/admin/yoga" element={<Yoga_Instructor />} />
          </Route>

          <Route element={<ProtectedRoute_Counsellor />}>
            <Route
              path="/admin/counsellor"
              element={<Counsellor_Dashboard />}
            />
          </Route>

          <Route element={<ProtectedRoute_SuperAdmin />}>
            <Route path="/admin/dashboard" element={<Superadmin />} />
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
