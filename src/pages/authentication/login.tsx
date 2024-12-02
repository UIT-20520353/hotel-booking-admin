import { authenticationApi } from "@/api";
import { Button } from "@/components/common";
import { InputField } from "@/components/form";
import appConstants from "@/constants/app";
import useModal from "@/hooks/useModal";
import { selectGlobalState } from "@/redux/globalSlice";
import { loginSchema } from "@/schema/login";
import { TLoginForm } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
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
  const { showErrorModal } = useModal();
  const { loading } = useSelector(selectGlobalState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginForm) => {
    const response = await authenticationApi.login(data);
    if (response.ok && response.body) {
      setAccessToken(response.body.accessToken);
    } else {
      showErrorModal();
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-primary">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-1/3 gap-4 px-10 py-20 bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold text-gray-500">Login</h2>
        <InputField
          name="email"
          placeholder="Enter your email"
          variant="filled"
          register={register}
          errors={errors}
        />
        <InputField
          name="password"
          placeholder="Enter your password"
          variant="filled"
          type="password"
          register={register}
          errors={errors}
        />

        <Button
          type="submit"
          text="Sign in"
          className="w-full rounded-lg"
          isLoading={loading > 0}
        />
      </form>
    </div>
  );
};

export default LoginPage;
