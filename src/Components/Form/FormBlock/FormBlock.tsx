import { FC, ReactNode } from "react";
import s from "./FormBlock.module.scss";

interface IFormBlockProps {
  children?: ReactNode;
}

const FormBlock: FC<IFormBlockProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default FormBlock;
