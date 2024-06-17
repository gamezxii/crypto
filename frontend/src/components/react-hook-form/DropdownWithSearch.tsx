import React from "react";
import Select from "react-select";
import { Controller, Control } from "react-hook-form";

interface OptionType {
  value: string;
  label: string;
  icon: string;
}

interface DropdownWithSearchProps {
  name: string;
  options: OptionType[];
  control: Control<any>;
}

const formatOptionLabel = (option: OptionType) => (
  <div className="flex items-center">
    <img src={option.icon} alt={option.label} className="w-6 h-6 mr-2" />
    <span>{option.label}</span>
  </div>
);

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "#2A2B3C",
    borderColor: "#3A3B4C",
    color: "#FFF",
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#2A2B3C",
    color: "#FFF",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#FFF",
  }),
  option: (base: any, { isFocused }: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: isFocused ? "#3A3B4C" : "#2A2B3C",
    color: "#FFF",
  }),
};

const DropdownWithSearch: React.FC<DropdownWithSearchProps> = ({
  name,
  options,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          formatOptionLabel={formatOptionLabel}
          styles={customStyles}
          onChange={(selectedOption: any) => field.onChange(selectedOption)}
        />
      )}
    />
  );
};

export default DropdownWithSearch;
