import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { reqSec } = data;
      if (!reqSec) {
        toast.error("You dont have an account yet, create one !");
        setTimeout(() => setAction("signUp"), 3000);
      }
    },
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const onSubmit = e => {
    e.preventDefault();

    if (action === "logIn") {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("Email id required");
      }
    } else if (action === "SignUp") {
      if (email.value !== "" && username.value !== "") {
        createAccount();
      } else {
        toast.error("Email & Username are required fields");
      }
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onLogin={onSubmit}
    />
  );
};
