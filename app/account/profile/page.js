"use client";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setCurrentUser } from "@/utills/redux/features/currentUserSlice";
import FormInput from "@/components/FormInput/FormInput";
import supabase from "@/utills/supabaseClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserInfo() {
  const currentUser = useSelector((state) => state.currentUser);
  const router = useRouter();
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    if (currentUser) {
      setEmailValue(currentUser.email);
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEmailValue(() => ({
      [name]: value,
    }));
  };

  const handleSaveEmail = async (e) => {
    e.preventDefault();
    if (editValues.email) {
      const { data, error } = await supabase.auth.updateUser({
        email: emailValue,
      });
      router.refresh();
      setCurrentUser(data);
    }
  };

  const emailInput = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      error: "Email address is not valid!",
      label: "Email",
      required: true,
    },
  ];

  return (
    <div className={styles.info}>
      <h3>My profile</h3>
      {currentUser ? (
        <div
          className={styles.user_data_div}
          key={currentUser.id ? currentUser.id : currentUser.email}
        >
          <UserBoard
            currentUser={currentUser}
            handleSaveEmail={handleSaveEmail}
            inputs={emailInput}
            handleInputChange={handleInputChange}
            email={emailValue}
          />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

function UserBoard({ handleSaveEmail, inputs, handleInputChange, email }) {
  return (
    <div className={styles.userBoard}>
      <form className={styles.form} onSubmit={handleSaveEmail}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={email}
            onChange={handleInputChange}
          />
        ))}
        <button className={styles.saveBtn}>Save</button>
      </form>
    </div>
  );
}
