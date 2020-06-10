import React, { useContext } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import UserContext from "../utils/userContext";

function Home(props) {
  const { username, userID } = useContext(UserContext);

  return (
    <div>
      <Nav {...props} />
      <Header>
        Hi, {username}! What do you want to do?
      </Header>
    </div>
  );
  
}

export default Home;
