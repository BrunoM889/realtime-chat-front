import { SendIcon } from "./Icons";
import Input from "./Input";
import { useState } from "react";
interface Props {
  handleNewMessage: (message: string) => void;
}

function SendMessage({ handleNewMessage }: Props) {
  const [message, setMessage] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNewMessage(message);
        setMessage("");
      }}
      className="flex w-full items-center gap-4 px-[2.2vw] max-[750px]:px-[7vw]"
    >
      <div className="grow">
        <Input label={null} setText={setMessage} text={message} />
      </div>
      <button
        className="p-[6px] hover:bg-[#0c0c0246] rounded-lg transition-all"
        type="submit"
      >
        <SendIcon />
      </button>
    </form>
  );
}

export default SendMessage;
