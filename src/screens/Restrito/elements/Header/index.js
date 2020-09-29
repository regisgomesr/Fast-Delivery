import React from "react";
import { connect } from "react-redux";
import ActionCreators from "../../../../redux/actionCreators";
import "./styles.css";

import { Link } from "react-router-dom";
import { Menu, Dropdown, Image } from "semantic-ui-react";

const Header = (props) => {
  return (
    <Menu className="menu-header">
      <Menu.Item as={Link} to="/">
        <Image src={"/logo.jpg"} size="small" />
      </Menu.Item>
      <Menu.Item as={Link} to="/restrito">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/restrito/deliveries">
        Entregas
      </Menu.Item>
      <Menu.Item as={Link} to="/restrito/create-delivery">
        Criar Entrega
      </Menu.Item>

      <Menu.Menu position="right">
        <Dropdown item text={props.auth.user.name}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, passwd) => ActionCreators.signinRequest(email, passwd),
    logout: () => dispatch(ActionCreators.destroyAuthRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
