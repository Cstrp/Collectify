import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextFormField } from "../Common";
import { initialValues } from "./initialValues.ts";
import { validationSchema } from "./validationSchema.ts";
import { Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getLs, login, ROUTER_PATHS, User } from "../../../data";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useSnackbar } from "notistack";

export const LoginForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = (
    values: Pick<User, "email" | "password">,
    helpers?: FormikHelpers<Pick<User, "email" | "password">>
  ) => {
    try {
      login(values).then(m => enqueueSnackbar(m?.message));

      const token = getLs("token");
      if (token) navigate(ROUTER_PATHS.COLLECTION);
      helpers?.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form className={"w-1/2 flex flex-col gap-5"}>
            <Typography variant={"h5"} className={"uppercase"}>
              Login
            </Typography>

            <Field
              name={"email"}
              component={TextFormField}
              className={"h-10"}
              type={"email"}
              placeholder={"Type your email..."}
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
              variant={"outlined"}
              color={"inherit"}
              disabled={!formik.isValid}
              type={"submit"}
              sx={{ mt: 3 }}
            >
              Submit !
            </Button>

            <Button
              variant={"text"}
              sx={{ textTransform: "inherit", color: "text.primary" }}
              component={Link}
              to={ROUTER_PATHS.SIGN_UP}
            >
              Don't have an account?
              <strong className={"ml-3 underline"}>Join Collectify</strong>
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
