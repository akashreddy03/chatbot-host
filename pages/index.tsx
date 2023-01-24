import Head from "next/head";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]";
import ChatWindow from "../components/chat/chatWindow";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  const { data: session } = useSession();
    
  return (
      <>
        <Head>
          <title>Red Sky</title>
        </Head>
        {session ? 
              <div className="h-[80vh] sm:h-[82vh] md:h-[83vh] flex items-center justify-center">
                  <ChatWindow />
              </div> : 
              <div className="flex-auto items-center justify-center flex flex-col">
                  <Image src="/cloud.png" alt="Red Sky" width={300} height={100}></Image>
                  <h1 className="text-3xl font-bold mb-5">Red Sky</h1>
                  <h1 className="text-lg text-center mb-5">Try various AI Chatbots at a single place</h1>
                  <Link href="/register"><button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full shadow-xl">Get Started</button></Link>
              </div>
        }
      </>
  );

}

export const getServerSideProps: GetServerSideProps  = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      session,
    }
  } 
}