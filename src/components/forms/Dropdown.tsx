import { useEffect, useRef, useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";

type OptionsProps = {
    value: string;
    label: string;
}

type DropdownProps = {
  label: string;
  value: string;
  options: OptionsProps[];
  placeholder: string;
  onChange: (value: string) => void;
};

export function Dropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-fit relative" ref={dropdownRef}>
        {label && (
            <h2>
            {label} <span className="text-main-color">*</span>
            </h2>
        )}
      <label
        className={`step_input_dropdown ${open ? "focus" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {value || (
          <p className="text-text-color-black/40 capitalize line-clamp-1">
            {placeholder}
          </p>
        )}
        <BsCaretDownFill className="text-[12px] absolute top-0 bottom-0 my-auto right-4 text-text-color-black/30" />
      </label>
      {open && (
        <div className="step_input_dropdown_content open">
          {options.map((option, index) => (
            <div
              key={index}
              className={`step_input_dropdown_option ${value === option.value ? "active" : ""}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
