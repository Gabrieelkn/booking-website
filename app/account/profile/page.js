"use client";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setCurrentUser } from "@/utills/redux/features/currentUserSlice";
import { useDispatch } from "react-redux";
import FormInput from "@/components/FormInput/FormInput";
import Loading from "@/app/signup/loading";
import { Suspense } from "react";
import supabase from "@/utills/supabaseClient";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserInfo() {
  const currentUser = useSelector((state) => state.currentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const [editValues, setEditValues] = useState({
    email: "",
    password: "",
  });

  console.log(currentUser);

  useEffect(() => {
    setEditValues(currentUser);
  }, [currentUser]);

  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveEmail = async (e) => {
    e.preventDefault();
    if (editValues.email) {
      const { data, error } = await supabase.auth.updateUser({
        email: editValues.email,
      });
      router.refresh();
      setCurrentUser(data);
      setEditingEmail(false);
    }
  };
  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (editValues.password) {
      const { data, error } = await supabase.auth.updateUser({
        password: editValues.password,
      });
      toast.success("Password changed succesfuly");
      setCurrentUser(data);
      setEditingPassword(false);
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

  const passwordInput = [
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
  ];

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.info}>
        <h3>My profile</h3>
        {currentUser ? (
          <div
            className={styles.user_data_div}
            key={currentUser.id ? currentUser.id : currentUser.email}
          >
            {editingEmail ? (
              <EmailForm
                handleSaveEmail={handleSaveEmail}
                inputs={emailInput}
                handleInputChange={handleInputChange}
                setEditingEmail={setEditingEmail}
                editValues={editValues}
              />
            ) : (
              <>
                <div className={styles.emailButtonWrapper}>
                  <p>Email: {currentUser.email}</p>
                  <button
                    className={styles.editEmailBtn}
                    onClick={() => {
                      setEditingEmail(true);
                    }}
                  >
                    <MdEdit className={styles.icon} />
                  </button>
                </div>
                <button
                  className={styles.btn}
                  onClick={() => {
                    setEditingPassword(true);
                  }}
                >
                  Change password
                </button>
              </>
            )}
            {editingPassword && (
              <PasswordForm
                handleSavePassword={handleSavePassword}
                inputs={passwordInput}
                handleInputChange={handleInputChange}
                setEditingPassword={setEditingPassword}
                editValues={editValues}
              />
            )}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </Suspense>
  );
}

function EmailForm({
  handleSaveEmail,
  inputs,
  handleInputChange,
  setEditingEmail,
  editValues,
}) {
  return (
    <form className={styles.form} onSubmit={handleSaveEmail}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={editValues.email}
          onChange={handleInputChange}
        />
      ))}
      <button className={styles.btn}>Save</button>
      <button className={styles.btn} onClick={() => setEditingEmail(false)}>
        Cancel
      </button>
    </form>
  );
}
function PasswordForm({
  handleSavePassword,
  inputs,
  handleInputChange,
  setEditing,
  editValues,
}) {
  return (
    <form className={styles.form} onSubmit={handleSavePassword}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={editValues.password}
          onChange={handleInputChange}
        />
      ))}
      <button className={styles.btn}>Save</button>
      <button className={styles.btn} onClick={() => setEditing(false)}>
        Cancel
      </button>
    </form>
  );
}
