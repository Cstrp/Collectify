import { Field, Form, Formik, FormikHelpers } from "formik";
import { initialValues } from "./initialValues.ts";
import { validationSchema } from "./validationSchema.ts";
import { TextFormField } from "../Common";
import { Button, IconButton, Typography } from "@mui/material";
import { getLs, register, ROUTER_PATHS, User } from "../../../data";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const onSubmit = async (
    values: Pick<User, "username" | "email" | "password">,
    helper?: FormikHelpers<Pick<User, "username" | "email" | "password">>
  ): Promise<void> => {
    try {
      const signupResult = await register(values);

      if (signupResult) {
        enqueueSnackbar(signupResult.message);

        const token = getLs("token");
        if (token) navigate(ROUTER_PATHS.COLLECTION);
      }

      helper?.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form className={"w-[500px] flex flex-col gap-7"}>
            <Typography variant={"h5"} className={"uppercase"}>
              REGISTER
            </Typography>
            <Field
              name={"username"}
              className={"h-10"}
              component={TextFormField}
              placeholder={"Type your name..."}
              type={"text"}
            />
            <Field
              name={"email"}
              className={"h-10"}
              component={TextFormField}
              placeholder={"Type your email..."}
              type={"email"}
            />
            <Field
              name={"password"}
              component={TextFormField}
              type={showPass ? "text" : "password"}
              className={"h-10"}
              placeholder={"Type your password..."}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPass}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Button
              sx={{ mt: 2 }}
              variant={"outlined"}
              color={"inherit"}
              type={"submit"}
              disabled={!formik.isValid}
            >
              Submit !
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
