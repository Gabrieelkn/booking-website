"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import FormInput from "@/components/FormInput/FormInput";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import supabase from "@/utills/supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);

  const handleResetLink = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/account/profile",
    });
    if (error) {
      console.log(error);
    }
    setModal(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.body}>
      <h2>Reset your password</h2>
      <i>
        "Forgot your password? No worries! Just type in your email, and we'll
        send you a link to reset it."
      </i>
      <form className={styles.form} onSubmit={handleResetLink}>
        <FormInput
          placeholder="Email"
          onChange={handleEmailChange}
          required={true}
        />
        <button className={styles.button}>Send</button>
      </form>
      <div
        className={modal ? `${styles.modal} ${styles.showModal}` : styles.modal}
      >
        <p>
          We've sent a quick check to your email. Please open it and follow the
          instructions to complete the process. If you don't see it, don't
          forget to check your spam folder.
        </p>
      </div>
    </div>
  );
}
