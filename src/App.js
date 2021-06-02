import React from "react";
import "./App.css";
import LoginPage from "./containers/loginPage/loginPage";
import HomeLayout from "./containers/homeLayout/homeLayout";
import UserProfileLayout from "./containers/userProfileLayout/userProfileLayout";
import SomethingWentWrong from "./containers/errorLayout/somethingWentWrong";
import PageNotFound from "./containers/errorLayout/pageNotFound";
import PersonalProfileLayout from "./containers/personalProfileLayout/personalProfileLayout"
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

//reducer
import UserReducer from "./store/reducers/userReducer";
import FriendReducer from "./store/reducers/friendReducer";
import PostReducer from "./store/reducers/postReducer";

function App() {
  // console.log(process.env.NODE_ENV)
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const rootReducer = combineReducers({
    userReducer: UserReducer,
    friendReducer: FriendReducer,
    postReducer: PostReducer,
  });
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  let routes = (
    <Switch>
      <Route path="/profile/:id" component={UserProfileLayout} />
      <Route path="/home" component={HomeLayout} />
      <Route path="/error" component={SomethingWentWrong} />
      <Route path="/myProfile" component={PersonalProfileLayout} />
      <Route path="/" component={LoginPage} exact />
      <Route component={PageNotFound} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Provider store={store}>{routes}</Provider>
    </BrowserRouter>
  );
}

export default App;
