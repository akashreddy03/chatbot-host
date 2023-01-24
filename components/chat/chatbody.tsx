import { RefObject } from "react";
import ChatMessage from "./chatmsg";
import { IMsg } from "./chatWindow";

type IProps = {
    chat: IMsg[],
    scrollableRef: RefObject<HTMLDivElement>,
}

export default function ChatBody({ chat, scrollableRef }: IProps) {

    return (
        <div className="h-full ml-6 flex flex-col space-y-4 scrollbar-styles scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 overflow-y-auto">
            {chat.map((msg, index) => {
                const refProps = index == chat.length-1 ? { ref: scrollableRef } : {};
                return (
                    <ChatMessage key={index} msg={msg} refProps={refProps}/>
                );
            })}
        </div>
    );
}
