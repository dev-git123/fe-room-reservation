import React, { useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import TabMenuItem from "./components/TabMenuItem/TabMenuItem";
import { Container } from "semantic-ui-react";
import moment from "moment";
const GlobalContext = React.createContext();
function App() {
  const initialState = {
    startDateTime: moment().add(1, "h").toISOString(),
    endDateTime: moment().add(2, "h").toISOString(),
  };

  const [globalState, setGlobalState] = useState(initialState);

  return (
    <GlobalContext.Provider value={[globalState, setGlobalState]}>
      <Container>
        <TabMenuItem />
      </Container>
    </GlobalContext.Provider>
  );
}
const Consmer = GlobalContext.Consumer;
export { App, GlobalContext, Consmer };
