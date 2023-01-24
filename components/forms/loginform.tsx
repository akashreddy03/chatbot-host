import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";

type LoginInputType = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputType>();

  const onSubmit: SubmitHandler<LoginInputType> = async (data) => {
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!status)
      setError("password", {
        type: "server",
        message: "Something bad happened",
      });

    if (status?.error === "Incorrect Credentials") {
      setError("password", {
        type: "server",
        message: "Incorrect Credentials",
      });
    } else if (status?.error) {
      setError("email", {
        type: "server",
        message: "No such user exists",
      });
    } else {
      alert("Succesfully Logged in");
      router.push('/')
    }
  };

  return (
    <>
      <Head><title>Login | Red Sky</title></Head>
      <h1 className="mb-8 text-center font-bold text-xl">Welcome Back!</h1>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="Email" className="block">
            Email Address
          </label>
          <input
            type="text"
            autoComplete="off"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
            className={`w-full rounded-md bg-white dark:bg-zinc-900 ${
              errors?.email?.type &&
              "focus:ring-red-500 border-red-500 focus:border-red-500"
            }`}
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="text-red-500">Please enter a valid Email address</p>
          )}
          {errors?.email?.type === "server" && (
            <p className="text-red-500">{errors?.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            autoComplete="off"
            {...register("password", { required: true })}
            className={`w-full rounded-md bg-white dark:bg-zinc-900 ${
              errors?.password?.type &&
              "focus:ring-red-500 border-red-500 focus:border-red-500"
            }`}
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors?.password?.type === "server" && (
            <p className="text-red-500">{errors?.password.message}</p>
          )}
        </div>
      </form>
      <div className="flex my-4 justify-between items-center">
        <div>
          <input type="checkbox" className="mr-2" {...register("remember")} />
          <label htmlFor="remember">Keep me logged in</label>
        </div>
        <Link className="text-blue-500" href="/forgot-password">
          Forgot password?
        </Link>
      </div>

      <button
        className="mt-4 rounded-md w-full py-3 bg-cyan-500 font-bold hover:bg-cyan-600"
        onClick={handleSubmit(onSubmit)}
      >
        Login
      </button>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p className="mt-5 text-center"> {" "}Don't have an account?{" "}
        <Link className="text-blue-500" href="/register">
          Register
        </Link>
      </p>
    </>
  );
}
