import { FC, useState } from "react";
import ModalFund from "./ModalFund";
import assetStore from "../../stores/assetStore";
import { addComma } from "../../utils/format";
import { observer } from "mobx-react-lite";

interface DepositProps {
  onSuccess: () => void;
}

const Deposit: FC<DepositProps> = observer(({ onSuccess }) => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleModal = (isSucess?: boolean) => {
    setIsOpen((pre) => !pre);
    // when fund success will be fetch again
    if (isSucess) onSuccess();
  };

  return (
    <div className=" p-4 rounded-lg bg-[#202130] shadow-lg text-white flex justify-between items-center">
      <div>
        <h4 className="text-xl text-gray-400">Total Asset Balance</h4>
        <span className="text-xl font-bold">
          {addComma(assetStore.totalAssetValue)}
        </span>
        <span className="text-sm text-gray-400"> THB</span>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
        onClick={() => handleToggleModal()}
      >
        Add Fund
      </button>
      <ModalFund open={isOpen} close={handleToggleModal} />
    </div>
  );
});

export default Deposit;
