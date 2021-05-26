import React, { useEffect, useContext, useState } from "react";
import { Modal } from "semantic-ui-react";
// import GlobalState from "../../contexts/GlobalState";
import { GlobalContext } from "../../App";
import "./InfoModal.css";

function InfoModal() {
  const [globalState, setGlobalState] = useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    setGlobalState({
      ...globalState,
      msgModalOpen: open,
    });
  }, [open]);

  useEffect(() => {
    setMsg(globalState.msgModal);
  }, [globalState.msgModal]);

  useEffect(() => {
    console.log("msg model open..", globalState.msgModalOpen);
    if (globalState.msgModalOpen) {
      const timer = setTimeout(() => {
        setGlobalState({
          ...globalState,
          msgModalOpen: false,
          msgModal: "",
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [globalState.msgModalOpen]);

  return (
    <Modal
      size="mini"
      // centered={false}
      // onClose={() => setOpen(false)}
      // onOpen={() => setOpen(true)}
      open={globalState.msgModalOpen}
    >
      <Modal.Content>
        <div>{globalState.msgModal}</div>
      </Modal.Content>
    </Modal>
  );
}

export default InfoModal;
