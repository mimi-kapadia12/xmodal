import React from "react";
import { Modal } from "./Modal";
import { useState } from "react";
import "./App.css";

function App() {
  const [modal, setModal] = useState(false);

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <div className="App">
      <h1 className="m-4">User Details Modal</h1>
      <button onClick={openModal} className="btn-primary">
        Open Form
      </button>
      {modal ? <Modal closeModal={closeModal} modal={modal}></Modal> : ""}
    </div>
  );
}

export default App;
