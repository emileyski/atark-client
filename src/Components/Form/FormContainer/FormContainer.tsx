import { FC, ReactNode } from "react";
import s from "./FormContainer.module.scss";

interface IFormContainerProps {
  children: ReactNode;
}
const FormContainer: FC<IFormContainerProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default FormContainer;
