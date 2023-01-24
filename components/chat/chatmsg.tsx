import { RefObject } from "react";
import { IMsg } from "./chatWindow";

type IProps = {
    msg: IMsg,
    refProps: { ref: RefObject<HTMLDivElement>} | {},
}

export default function ChatMessage({ msg, refProps }: IProps) {
    
    return (<>
       {msg.user ? <div className="bg-blue-500 ml-auto mr-6 rounded-t-lg rounded-bl-lg w-fit sm:max-w-3/5 max-w-4/5 p-2" {...refProps}>
            <h1 className="break-words text-white text-md">{msg.message}</h1>
        </div> :
        <div className="bg-white dark:bg-gray-700 mr-auto rounded-t-lg rounded-br-lg w-fit sm:max-w-3/5 max-w-4/5 p-2" {...refProps}>
            <h1 className="break-words text-md">{msg.message}</h1>
        </div>} 
    </>     
    );
}