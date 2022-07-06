import React, { FC, useEffect, useState } from "react";
import type { UserAuthorizationType } from "@consts";
import { register, login, loginAdmin, userSlice } from "@store";
import { useAppDispatch, useAppSelector } from "@hooks";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

type AuthTypes = "LOGIN" | "REGISTRATION" | "ADMIN";

type Props = {
  authType: AuthTypes;
};

export const Auth: FC<Props> = ({ authType }) => {
  const [formData, setFormData] = useState<UserAuthorizationType>({
    password: "",
    username: "",
  });

  const { error, loading, user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const getHeading = (type: AuthTypes): string => {
    switch (type) {
      case "ADMIN":
        return "Панель администратора";
      case "LOGIN":
        return "Войдите в аккаунт";
      case "REGISTRATION":
        return "Зарегистрируйтесь";
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      enqueueSnackbar(
        authType === "REGISTRATION"
          ? "Вы успешно зарегистрировались"
          : "Вы успешно авторизовались",
        { variant: "success" }
      );
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(
        authType === "REGISTRATION"
          ? "Ошибка регистрации. Введенный логин уже занят"
          : "Ошибка авторизации. Проверьте данные",
        {
          variant: "error",
        }
      );
      dispatch(userSlice.actions.removeError());
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (authType) {
      case "ADMIN":
        dispatch(loginAdmin(formData));
        break;
      case "LOGIN":
        dispatch(login(formData));
        break;
      case "REGISTRATION":
        dispatch(register(formData));
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="auth__title"> {getHeading(authType)}</h1>
      <form onSubmit={handleSubmit} className="auth__form">
        <label>
          Логин:
          <input
            type="text"
            autoComplete="off"
            name="username"
            value={formData.username}
            placeholder="Ваше имя"
            onChange={handleChange}
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            autoComplete="off"
            value={formData.password}
            name="password"
            placeholder="Ваш пароль"
            onChange={handleChange}
          />
        </label>
        <button disabled={loading}>{loading ? "Загрузка..." : "Готово"}</button>
      </form>
    </>
  );
};
