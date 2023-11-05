import { InputHTMLAttributes } from "react";
import s from "./Input.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: IInputProps) => {
  const isDark = true;

  return (
    <input
      type="text"
      className={isDark ? `${s.input} ${s.dark}` : s.input}
      {...props}
    />
  );
};

export default Input;
