import React, { useState } from "react";
import Modal from "../../components/Modal";
import { ReactComponent as ShoppingBag } from "../../static/svg/shopping-bag.svg";

const Home = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div>
      <Modal
        title="Purchase"
        isOpen={isOpen}
        setOpen={setOpen}
        icon={ShoppingBag}
      >
        testing123
      </Modal>
    </div>
  );
};

export default Home;
