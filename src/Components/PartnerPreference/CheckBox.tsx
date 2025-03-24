import React from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, value, label, checked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="pl-2 text-ash">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
