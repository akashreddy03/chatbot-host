import { Dispatch, SetStateAction, useRef } from "react";
import { Socket } from "socket.io-client";
import { IoMdSend } from "react-icons/io";
import { IMsg } from "./chatWindow";

type IProps = {
  socket: Socket;
  setChat: Dispatch<SetStateAction<IMsg[]>>;
};

export default function ChatFooter({ socket, setChat }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    const message = inputRef.current?.value;
    if (socket && socket.connected && message) {
      socket.emit("message", message);
      setChat((prevChat: IMsg[]) => {
          return [...prevChat, { user:true, message }]
      })
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="flex items-center rounded-b-lg">
      <div className="w-full my-4 ml-6 mr-2">
        <input
          ref={inputRef}
          className="w-full px-8 h-12 dark:bg-black border-none rounded-full focus:border-transparent focus:ring-0"
          type="text"
          placeholder="Type a Message"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
      </div>
      <button
        onClick={sendMessage}
        className="rounded-[50%] mr-6 w-16 md:w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
      >
        <IoMdSend size={24} />
      </button>
    </div>
  );
}
