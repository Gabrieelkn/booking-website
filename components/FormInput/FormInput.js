import { useState } from "react";
import styles from "./FormInput.module.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, error, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={styles.form_div}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export default FormInput;
