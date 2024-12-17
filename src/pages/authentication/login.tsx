import { authenticationApi } from "@/api";
import { Button, ErrorModal } from "@/components/common";
import { LucideEye, LucideEyeOff } from "@/components/icons";
import appConstants from "@/constants/app";
import { selectGlobalState } from "@/redux/globalSlice";
import { loginSchema } from "@/schema/login";
import { ErrorTranslator } from "@/translator/error";
import { TLoginForm } from "@/types/form";
import { TError } from "@/types/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@nextui-org/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const LoginPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage(
    appConstants.ACCESS_TOKEN_KEY,
    ""
  );
  const { loading } = useSelector(selectGlobalState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const [error, setError] = useState<TError | undefined>(undefined);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: TLoginForm) => {
    const response = await authenticationApi.login(data);
    if (response.ok && response.body) {
      setAccessToken(response.body.accessToken);
    }

    if (response.error) {
      setError({ message: ErrorTranslator[response.error.detail] });
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <Fragment>
      <div className="flex items-center justify-center w-full h-screen bg-primary">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-1/3 gap-4 px-10 py-20 bg-white rounded-lg shadow"
        >
          <h2 className="text-2xl font-semibold text-gray-500">Login</h2>
          <Input
            size="lg"
            placeholder="Enter your email"
            radius="sm"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message || ""}
            {...register("email")}
          />
          <Input
            type={isVisible ? "text" : "password"}
            size="lg"
            placeholder="Enter your password"
            radius="sm"
            endContent={
              <button
                className="text-gray-500 focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <LucideEyeOff className="pointer-events-none" />
                ) : (
                  <LucideEye className="pointer-events-none" />
                )}
              </button>
            }
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message || ""}
            {...register("password")}
          />

          <Button
            size="lg"
            radius="sm"
            type="submit"
            variant="solid"
            color="primary"
            isLoading={loading > 0}
            className="text-lg font-semibold"
            fullWidth
          >
            Login
          </Button>
        </form>
      </div>

      <ErrorModal onClose={() => setError(undefined)} error={error} />
    </Fragment>
  );
};

export default LoginPage;
