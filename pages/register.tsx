import { GetServerSideProps } from "next";
import CardLayout from "../components/card-layout";
import RegsiterForm from "../components/forms/registerform";
import isMobile from "../lib/isMobile";

type PropsType = {
  isMobile: boolean;
};

export default function Register({ isMobile }: PropsType) {
  if (isMobile) return <RegsiterForm />;

  return (
    <CardLayout>
      <RegsiterForm />
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
