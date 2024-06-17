import { FC, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import DropdownWithSearch from "../react-hook-form/DropdownWithSearch";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Input } from "../react-hook-form/input";
import { usePortfolioFundMutation } from "../../hooks/usePortfolio";
import assetStore from "../../stores/assetStore";

interface FormData {
  currency: { value: string; label: string; icon: string } | null;
  amount: string;
  purchasePrice: string;
}

interface ModalFundProps {
  open: boolean;
  close: () => void;
}

const ModalFund: FC<ModalFundProps> = ({ open, close }) => {
  const fundMutation = usePortfolioFundMutation();

  const methods = useForm<FormData>({ mode: "onChange" });

  const {
    handleSubmit,
    formState: { isValid },
    control,
    reset,
  } = methods;

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    const payload = {
      amount: parseFloat(data.amount),
      coin: data.currency?.value || "",
      purchasePrice: parseFloat(data.purchasePrice),
    };

    fundMutation.mutate(payload, {
      onSuccess: () => {
        console.log("Fund added successfully");
        alert("Fund added successfully");
        close();
      },
      onError: (error) => {
        console.error("Error adding fund", error);
        alert("Error adding fund");
      },
    });
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [open]);

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => ""}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-[#202130] shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    <div className="flex justify-between">
                      <span>Fund</span>
                      <button
                        className="bg-rose-500 hover:bg-rose-600 px-4 rounded-full"
                        onClick={close}
                      >
                        X
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-4">
                          <DropdownWithSearch
                            name="currency"
                            options={assetStore.marketPricesLists.map(
                              (asset) => ({
                                value: asset.symbol,
                                label: asset.name,
                                icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.id}.png`,
                              })
                            )}
                            control={control}
                          />
                        </div>

                        <Input
                          id="amount"
                          name="amount"
                          type="text"
                          placeholder="amount"
                          rules={{
                            required: "Amount is required",
                            pattern: {
                              value: /^\d+(\.\d{1,8})?$/,
                              message:
                                "Invalid purchase price. Please enter up to 8 decimal places.",
                            },
                          }}
                          className="w-full p-2 rounded bg-[#2A2B3C] text-white"
                        />

                        <Input
                          id="purchasePrice"
                          name="purchasePrice"
                          type="text"
                          placeholder="purchase price"
                          rules={{
                            required: "Purchase Price is required",
                            pattern: {
                              value: /^\d+(\.\d{1,8})?$/,
                              message:
                                "Invalid purchase price. Please enter up to 8 decimal places.",
                            },
                          }}
                          className="w-full p-2 rounded bg-[#2A2B3C] text-white"
                        />
                        <button
                          type="submit"
                          disabled={!isValid}
                          //   className={`w-full py-3 rounded-full font-bold
                          //   `}
                          className={`w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900  ${
                            isValid
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-gray-600 cursor-not-allowed text-gray-500"
                          } border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500`}
                        >
                          Deposit
                        </button>
                      </form>
                    </FormProvider>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalFund;
