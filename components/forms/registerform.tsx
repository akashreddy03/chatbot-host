import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterInputType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
  accept: boolean;
};

export default function RegsiterForm() {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm<RegisterInputType>();

  const onSubmit: SubmitHandler<RegisterInputType> = async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        email: data.email,
      }),
    });

    const responseData = await res.json();
    if(responseData.message === 'User already exists') {
      setError('email', {
        type: 'server',
        message: 'This email is already linked with an account please try to login'
      });
    } else if (responseData.message === 'User created successfully') {
      alert('User successfully created');
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      router.push('/');
      
    } else {
      alert('Something bad happened');
    }
  };

  return (
    <>
      <Head><title>Register | Red Sky</title></Head>
      <h1 className="mb-6 text-2xl font-[500] text-center">
        Create an account
      </h1>
      {/*eslint-disable-next-line react/no-unescaped-entities*/}
      <form className="flex flex-col space-y-3">
        {/*eslint-disable-next-line react/no-unescaped-entities*/}
        <div className="flex space-x-2">
          <div className="space-y-2 flex-1">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className={`w-full rounded-md bg-white dark:bg-zinc-900 ${
                errors?.firstname?.type &&
                "focus:ring-red-500 border-red-500 focus:border-red-500"
              }`}
              {...register("firstname", { required: true })}
            />
          </div>
          <div className="space-y-2 flex-1">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className={`w-full rounded-md bg-white dark:bg-zinc-900 ${
                errors?.lastname?.type &&
                "focus:ring-red-500 border-red-500 focus:border-red-500"
              }`}
              {...register("lastname", { required: true })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className={`w-full rounded-md bg-white dark:bg-zinc-900 ${
              errors?.email?.type &&
              "focus:ring-red-500 border-red-500 focus:border-red-500"
            }`}
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors?.email?.type === "pattern" && (
            <p className="text-red-500">Please enter a valid Email address</p>
          )}
          {errors?.email?.type === "server" && (
              <p className="text-red-500">{errors?.email.message}</p>
            )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`w-full rounded-md bg-white dark:bg-zinc-900 ${
              errors?.password?.type &&
              "focus:ring-red-500 border-red-500 focus:border-red-500"
            }`}
            {...register("password", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            className={`w-full rounded-md bg-white dark:bg-zinc-900 ${
              errors?.confirmpassword?.type &&
              "focus:ring-red-500 border-red-500 focus:border-red-500"
            }`}
            {...register("confirmpassword", {
              required: true,
              validate: (val: string) => {
                const { password } = getValues();
                if (password != val) return false;
              },
            })}
          />
          {errors?.confirmpassword?.type === "validate" && (
            <p className="text-red-500">Please enter the same password</p>
          )}
        </div>
        <div className="self-center">
          <input
            type="checkbox"
            className={`mr-2 ${
              errors?.accept?.type &&
              "focus:ring-red-500 border-red-500 focus:border-red-500"
            }`}
            {...register("accept", { required: true })}
          />
          <label
            htmlFor="accept"
            className={errors?.accept?.type && "text-red-500"}
          >
            I agree to the terms and conditions
          </label>
        </div>
      </form>
      <button
        className="mt-5 rounded-md w-full py-3 bg-cyan-500 font-bold hover:bg-cyan-600"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </button>
      <p className="mt-5 text-center">
        {" "}
        Already have an account?{" "}
        <Link className="text-blue-500" href="/login">
          Login
        </Link>
      </p>
    </>
  );
}
