"use client";

import { useMemo } from "react";
import CreateableSelect from "react-select/creatable";
import { SingleValue } from "react-select";

type Props = {
  onChange: (value: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disable?: boolean;
  placeholder?: string;
};

import React from "react";

const Select = ({
  onChange,
  disable,
  onCreate,
  options = [],
  placeholder,
  value,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    if (!option?.value) return;
    onChange(option?.value);
  };
  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);
  return (
    <div>
      <CreateableSelect
        placeholder={placeholder}
        className="text-sm !text-accent"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "var(--color-accent)",
            color: "var(--color-foreground)",
            borderRadius: "var(--radius-md)",
            borderColor: state.isFocused
              ? "var(--color-ring)"
              : "var(--color-border)",
            boxShadow: state.isFocused ? "0 0 0 2px var(--color-ring)" : "none",
            transition: "all 0.15s ease",
            ":hover": {
              borderColor: "var(--color-ring)",
            },
            minHeight: "2.5rem",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--color-accent)",
            color: "var(--color-popover-foreground)",
            borderRadius: "var(--radius-md)",
            boxShadow: "0px 6px 8px oklch(0 0 0 / 0.3)",
            border: "0.3px solid  ",
            marginTop: "0.35rem",
            zIndex: 50,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
              ? "var(--color-accent)"
              : "transparent",
            color: state.isFocused
              ? "var(--color-accent-foreground)"
              : "var(--color-foreground)",
            borderRadius: "calc(var(--radius-sm) - 2px)",
            cursor: "pointer",
            ":active": {
              backgroundColor: "var(--color-accent)",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--color-foreground)",
          }),
          input: (base) => ({
            ...base,
            color: "var(--color-foreground)",
          }),
          placeholder: (base) => ({
            ...base,
            color: "var(--color-muted-foreground)",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "var(--color-muted-foreground)",
            ":hover": {
              color: "var(--color-foreground)",
            },
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "var(--color-ring)",
            primary25: "var(--color-accent)",
            neutral0: "var(--color-accent-foreground)",
          },
        })}
        value={formattedValue}
        onChange={onSelect}
        options={options}
        onCreateOption={onCreate}
        isDisabled={disable}
      />
    </div>
  );
};

export default Select;
