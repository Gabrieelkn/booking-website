"use client";
import styles from "./signup.module.css";
import Link from "next/link";
import { useState } from "react";
import FormInput from "@/components/FormInput/FormInput";
import supabase from "@/utills/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NewAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function signUpNewUser(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
      options: {
        emailRedirectTo: "/",
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      router.push("/login");
      setFormValues({
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      error: "Email address is not valid!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      error: "Password should have at least 8 characters!",
      label: "Password",
      pattern: `^.{8,}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      error: "Passwords don't match!",
      label: "Confirm password",
      pattern: formValues.password,
      required: true,
    },
  ];

  return (
    <div className={styles.signup}>
      <h2>Sign up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className={styles.form} onSubmit={signUpNewUser}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={formValues[input.name]}
            onChange={handleChange}
          />
        ))}
        <button className={styles.login_btn} disabled={loading}>
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <Link href="login">Have an account?</Link>
    </div>
  );
}
