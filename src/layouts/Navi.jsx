import React, {useState}  from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const history = useHistory();

  function handleSignOut() {
    setIsAuthenticated(false)
    history.push("/")
  }

  function handleSignIn() {
    setIsAuthenticated(true)
  }

  return (
    <div>
      <Menu inverted fixed="top" size="large">
        <Container>
          <Menu.Item name="building outline">
            <Icon name="building outline" size="large" />
            HRMS
          </Menu.Item>
          <Menu.Item name="Ana Sayfa" />
          <Menu.Item name="İş İlanları" />
          <Menu.Item name="Şirketler" />
          <Menu.Menu position="right">
            <button class="ui negative button" as={Link} to={"/addjobadv"}>İlan Ver</button>
            {isAuthenticated?<SignedIn signOut={handleSignOut}/>
            :<SignedOut signIn={handleSignIn}/>}  
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
