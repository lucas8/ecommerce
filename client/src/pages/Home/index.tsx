import React, { useState } from "react";
import Modal from "../../components/Modal";

const Home = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div>
      <Modal title="Purchase" isOpen={isOpen} setOpen={setOpen}>
        testing123
      </Modal>
    </div>
  );
};

export default Home;
