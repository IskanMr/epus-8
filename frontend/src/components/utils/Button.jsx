import Styles from "./Button.module.css";

export default function Button({ children, onClick, type, disabled, style }) {
  return (
    <button
      className={`${Styles.button} ${Styles[type]}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
