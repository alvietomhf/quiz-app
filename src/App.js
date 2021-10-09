import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import LandingPage from "./pages/general/guest/LandingPage";
import CircularLoading from "./components/lazyLoad/CircularLoading";
import Register from "./pages/auth/Register";
import ListUsersPage from "./pages/users/ListUsersPage";
import HomePage from "./pages/general/authenticated/HomePage";
import DetailPost from "./pages/general/authenticated/DetailPost";
import UserProfilePage from "./pages/users/UserProfilePage";
import DetailEssay from "./pages/quiz/uploadFiles/DetailEssay";
import EssayResultsPage from "./pages/quiz/uploadFiles/EssayResultsPage";
import ResultsPage from "./pages/quiz/multipeChoices/ResultsPage";
import MaterialsPageAlt from "./pages/materials/MaterialsPageAlt";
import MaterialOne from "./pages/materials/list/MaterialOne";
import MaterialTwo from "./pages/materials/list/MaterialTwo";
import DeveloperProfile from "./pages/general/authenticated/DeveloperProfile";
import GuidePage from "./pages/general/authenticated/GuidePage";
import IdentityMaterialPage from "./pages/general/authenticated/IdentityMaterialPage";
import ResultSiswaPage from "./pages/general/authenticated/ResultSiswaPage";

const QuizPage = lazy(() => import("./pages/quiz/multipeChoices/QuizPage"));
const QuizDetailPage = lazy(() =>
  import("./pages/quiz/multipeChoices/QuizDetailPage")
);
const EssayPage = lazy(() => import("./pages/quiz/uploadFiles/EssayPage"));
const AddEditQuizPage = lazy(() =>
  import("./pages/quiz/multipeChoices/AddEditQuizPage")
);

const PurposePage = lazy(() =>
  import("./pages/general/authenticated/PurposePage")
);
const ProfilePage = lazy(() =>
  import("./pages/general/authenticated/ProfilePage")
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/landing" component={LandingPage} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/users" component={ListUsersPage} />
        <PrivateRoutes exact={true} path="/" component={HomePage} />
        <PrivateRoutes
          exact={true}
          path="/materi"
          component={MaterialsPageAlt}
        />
        <PrivateRoutes
          exact={true}
          path="/materi/pencemaran"
          component={MaterialOne}
        />
        <PrivateRoutes
          exact={true}
          path="/materi/ekosistem"
          component={MaterialTwo}
        />
        <PrivateRoutes
          exact={true}
          path="/pengembang"
          component={DeveloperProfile}
        />
        <PrivateRoutes exact={true} path="/hasil" component={ResultSiswaPage} />
        <PrivateRoutes exact={true} path="/petunjuk" component={GuidePage} />
        <PrivateRoutes
          exact={true}
          path="/identitasmateri"
          component={IdentityMaterialPage}
        />
        {/* <PrivateRoutes
          exact={true}
          path="/materi/:id"
          component={DetailMaterial}
        /> */}

        {/* <PrivateRoutes exact={true} path="/:id" component={DetailPost} /> */}
        <Suspense fallback={<CircularLoading />}>
          <PrivateRoutes exact={true} path="/profile" component={ProfilePage} />
          <PrivateRoutes
            exact={true}
            path="/users/:id"
            component={UserProfilePage}
          />
          <PrivateRoutes
            exact={true}
            path="/posts/:id"
            component={DetailPost}
          />
          <PrivateRoutes exact={true} path="/tujuan" component={PurposePage} />
          <PrivateRoutes exact={true} path="/quiz" component={QuizPage} />

          <PrivateRoutes
            exact={true}
            path="/quiz/add"
            component={AddEditQuizPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/edit/:slug"
            component={AddEditQuizPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/result/:slug"
            component={ResultsPage}
          />
          <PrivateRoutes
            exact={true}
            path="/quiz/start/:slug"
            component={QuizDetailPage}
          />
          <PrivateRoutes exact={true} path="/essay" component={EssayPage} />
          <PrivateRoutes
            exact={true}
            path="/essay/start/:slug"
            component={DetailEssay}
          />
          <PrivateRoutes
            exact={true}
            path="/essay/result/:slug"
            component={EssayResultsPage}
          />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
