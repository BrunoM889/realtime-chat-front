import { Chat, UserData } from "../types";

interface Props {
  userData: UserData;
  chats: Chat[];
  handleChat: (name: string) => void;
  chatActive: Chat | null;
}

function ContactList({ userData, chats, handleChat, chatActive }: Props) {
  return (
    <div className="w-full grow overflow-auto max-h-[75vh] h-full">
      <div className="w-full flex flex-col">
        {userData.contacts?.map((name, i) => {
          const lastMessage = chats
            ?.find((c) => c.user1 === name || c.user2 === name)
            ?.messages.at(-1);

          return (
            <div
              key={i}
              className={`w-full h-[65px] cursor-pointer transition-all  font-semibold flex flex-col justify-center px-6 hover:bg-[#0c0c0218] border-b border-[#0c0c024d] ${
                chatActive?.user1 === name || chatActive?.user2 === name
                  ? "bg-[#0c0c0218]"
                  : ""
              }`}
              onClick={() => handleChat(name)}
            >
              <h3 className="text-sm">{name}</h3>
              <p className="text-xs min-h-4 opacity-50 text-nowrap overflow-ellipsis overflow-hidden">
                {lastMessage?.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactList;
