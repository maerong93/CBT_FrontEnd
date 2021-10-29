import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./page/login/login";
import ExamList from "./page/exam/examList/examList";
import AddExam from "./page/exam/addExam/addExam";
import "./fonts/font.css";
import "./fonts/notosankr/font.css";
import "./app.css";
import PublicRoute from "./route/PublicRoute";
import PrivateRoute from "./route/PrivateRoute";
import ViewAllExam from "./page/exam/viewAllExam/viewAllExam";
import Bank from "./page/bank/bank";

const App = (props) => {
  // tab event
  const controlTab = (event) => {
    const target = event.target;
    if (target.closest(".tab-control-btn")) {
      const article = event.currentTarget.closest(".card-container");
      article.classList.toggle("hide");
    }
  };

  useEffect(() => {
    localStorage.removeItem("viewLayout");
    localStorage.removeItem("style");
    return () => {
      sessionStorage.removeItem("loginState");
    };
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute
          restricted={true}
          exact
          path="/"
          render={(props) => <Login {...props} />}
        />
        <PrivateRoute
          restricted={true}
          exact
          path="/examList"
          render={(props) => <ExamList {...props} onControlTab={controlTab} />}
        />
        <PrivateRoute
          restricted={true}
          exact
          path="/addExam"
          render={(props) => <AddExam {...props} onControlTab={controlTab} />}
        />
        <PrivateRoute
          restricted={true}
          exact
          path="/viewAllExam"
          render={(props) => <ViewAllExam {...props} />}
        />
        <PrivateRoute
          restricted={true}
          exact
          path="/bank"
          render={(props) => <Bank {...props} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
