import { FC, ReactNode } from "react";
import { FormProps, Form as RouterForm } from "react-router-dom";
import s from "./Form.module.scss";

interface IFormProps extends FormProps {
  children?: ReactNode;
}

const Form: FC<IFormProps> = ({ children, ...props }) => {
  return (
    <RouterForm className={s.form} {...props}>
      {children}
    </RouterForm>
  );
};

export default Form;
