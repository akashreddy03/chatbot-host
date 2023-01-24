import { GetServerSideProps } from "next";
import CardLayout from "../components/card-layout";
import LoginForm from "../components/forms/loginform";
import isMobile from "../lib/isMobile";

type PropsType = {
  isMobile: boolean;
} 


export default function Login({ isMobile }: PropsType) {
  if (isMobile) {
    return <LoginForm />;
  }

  return (
    <CardLayout>
        <LoginForm />
    </CardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      isMobile: isMobile(context),
    },
  };
};
