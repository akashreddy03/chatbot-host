import Image from "next/image";
import botPic from "../../public/bot.png"

export default function ChatHeader() {
  return (
    <div className="flex items-center space-x-4 rounded-t-lg h-16 mx-8 my-4">
      <div className="border-full">
        <Image src={botPic} alt="bot" width={40}></Image>
      </div>
      <h1>GPT-3</h1>
    </div>
  );
}
