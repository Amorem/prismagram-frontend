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
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: email.value
    }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();

    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You dont have an account yet, create one !");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("Just sent you the password, check your inbox !");
          }
        } catch {
          toast.error("Cannot complete action. Please try again later");
        }
      } else {
        toast.error("Email id required");
      }
    } else if (action === "signUp") {
      if (email.value !== "" && username.value !== "") {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();

          if (!createAccount) {
            toast.error("Cannot create account");
          } else {
            toast.success("Account successfuly created. Log in now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch {
          toast.error("Cannot complete action. Please try again later");
        }
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
      onSubmit={onSubmit}
    />
  );
};
