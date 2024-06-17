import { useState } from "react";
import ModalFund from "./ModalFund";

const Deposit = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleModal = () => setIsOpen(!isOpen);

  return (
    <div className=" p-4 rounded-lg bg-[#202130] shadow-lg text-white flex justify-between items-center">
      <h2 className="text-xl font-bold">Fund</h2>
      <button
        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
        onClick={handleToggleModal}
      >
        Add Fund
      </button>
      <ModalFund open={isOpen} close={handleToggleModal} />
    </div>
  );
};

export default Deposit;
