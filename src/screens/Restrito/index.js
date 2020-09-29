import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import Header from "./elements/Header/index.js";
import Home from "./Home";
import Deliveries from "./Deliveries";
import CreateDelivery from "./CreateDelivery/index.js";
import Map from "./Map";

const Restrito = (props) => {
  console.log(props.auth);

  if (props.auth.isSigningin) {
    return <p>Loading...</p>;
  }

  if (!props.auth.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header />
      <Route path={`${props.match.path}/`} exact component={Home} />
      <Route
        path={`${props.match.path}/deliveries/:id/route`}
        exact
        component={Map}
      />
      <Route
        path={`${props.match.path}/deliveries`}
        exact
        component={Deliveries}
      />
      <Route
        path={`${props.match.path}/create-delivery`}
        component={CreateDelivery}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Restrito);
