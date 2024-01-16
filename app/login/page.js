"use client";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import supabase from "@/utills/supabaseClient";
import { setCurrentUser } from "@/utills/redux/features/currentUserSlice";

export default function Login() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/account");
    }
  });

  async function signInWithEmail(e) {
    setLoading(true);
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      dispatch(setCurrentUser(data.user));
      setFormValues({
        email: "",
        password: "",
      });
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={signInWithEmail} className={styles.form}>
        <div className={styles.form_div}>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.form_div}>
          <label htmlFor="password">Parolă</label>
          <input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.resset_password}>
          <Link href="/reset_password">Forgot your password?</Link>
        </div>
        <button disabled={loading} type="submit" className={styles.login_btn}>
          {loading ? "Loading..." : "Sign in"}
        </button>
        <Link href="signup">Create new account</Link>
      </form>
    </div>
  );
}
