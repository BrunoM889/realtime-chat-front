import { useEffect, useState } from "react";
import { UserData, Chat } from "../types";
import { Socket, io } from "socket.io-client";
import { BackIcon, ChatIcon, SignOutIcon } from "../components/Icons";
import SendMessage from "../components/SendMessage";
import Msg from "../components/Msg";
import { dateFormmated } from "../components/Msg";
import SearchContact from "../components/SearchContact";
import ContactList from "../components/ContactList";

interface Props {
  userData: UserData;
  chats: Chat[];
  handleAlert: (message: string) => void;
  setChats: (chats: Chat[]) => void;
  setUserData: (userData: UserData) => void;
}

function MainApp({
  userData,
  chats,
  handleAlert,
  setChats,
  setUserData,
}: Props) {
  const [chatActive, setChatActive] = useState<Chat | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(
      io("http://localhost:3000", {
        auth: {
          username: userData.username,
        },
      })
    );
  }, []);

  const appendNewMessage = (to: string, sender: string, message: string) => {
    const chatsCopy = [...chats];

    const chatFinded = chatsCopy.find(
      (c) =>
        (c.user1 === sender && c.user2 === to) ||
        (c.user2 === sender && c.user1 === to)
    );

    const date = new Date();

    if (chatFinded) {
      const dateNow = dateFormmated(date);

      // this logic is to show the dates in the correct format
      if (chatFinded.messages.length !== 0) {
        const dateOfLastMessage = chatFinded.messages[
          chatFinded.messages.length - 1
        ].createdAt?.slice(0, 9);

        if (dateOfLastMessage !== dateNow) {
          chatFinded.messages.push({
            text: dateNow,
            sender: "$date$",
          });
        }
      } else {
        chatFinded.messages.push({
          text: dateNow,
          sender: "$date$",
        });
      }

      chatFinded.messages.push({
        text: message,
        sender: sender,
        createdAt: `${dateNow}, ${date.getHours()}:${date.getMinutes()}`,
      });
    }
    setChats(chatsCopy);
  };

  useEffect(() => {
    const handleMessage = ({
      data,
    }: {
      data: { from: string; message: string };
    }) => {
      const { from, message } = data;

      if (!userData.contacts.includes(from)) {
        userData.contacts.push(from);
        setUserData(userData);
      }

      appendNewMessage(userData.username, from, message);
    };

    socket?.on("message", handleMessage);

    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket, chats]);

  const handleNewMessage = (message: string) => {
    if (!message) {
      console.error("Error: Message is empty");
      return;
    }

    if (!chatActive) {
      console.error("Error: No active chat selected");
      return;
    }

    const to =
      chatActive.user1 === userData.username
        ? chatActive.user2
        : chatActive.user1;

    appendNewMessage(to, userData.username, message);

    socket?.emit("message", {
      to: to,
      message: message,
    });
  };

  const signOut = () => {
    socket?.disconnect();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleChat = async (name: string) => {
    // clausules to validate the input
    if (!name) return handleAlert("Name cannot be empty");
    if (name === userData.username)
      return handleAlert("Cannot chat with yourself");

    const chatFinded = chats.find((c) => name === c.user1 || name === c.user2);

    if (chatFinded) {
      setChatActive(chatFinded);
    } else {
      try {
        const res = await fetch("http://localhost:3000/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user1: userData.username,
            user2: name,
            contacts: userData.contacts,
          }),
        });
        const data = await res.json();
        if (data.statusCode === 200) {
          setChatActive(data.chat);
          const chatsCopy = [...chats];
          chatsCopy.push(data.chat);
          setChats(chatsCopy);
          if (!userData.contacts.includes(name)) {
            setUserData({
              ...userData,
              contacts: [...userData.contacts, name],
            });
          }
        } else {
          if (data.statusCode === 404) {
            handleAlert("User not found");
          } else {
            handleAlert("Failed to create chat");
          }
        }
      } catch (error) {
        handleAlert("Failed to create chat");
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] pt-2 flex rounded-md border border-[#0c0c024d] ">
      <div
        className={`flex flex-col ${
          chatActive ? "sidebar" : ""
        } w-[35%] min-w-[200px] max-[750px]:w-full grow pb-4`}
      >
        {/* --> SIDEBAR <-- */}
        <div className="flex py-2 gap-4 items-center justify-center h-[80px] px-4 ">
          <ChatIcon />
          <SearchContact handleChat={handleChat} />
        </div>

        {/* --> CHATS LIST <-- */}
        <ContactList
          userData={userData}
          chats={chats}
          handleChat={handleChat}
          chatActive={chatActive}
        />

        {/* --> SIGN OUT <-- */}
        <div className="w-full flex grow justify-center items-end">
          <button
            onClick={signOut}
            className="self-center font-medium flex gap-2 items-center py-2 px-4 hover:bg-[#0c0c0246] rounded-lg transition-all"
          >
            Sign out
            <SignOutIcon />
          </button>
        </div>
      </div>
      {/* --> CHAT <-- */}
      {chatActive ? (
        <div className="w-[65%] grow flex flex-col pb-8">
          {/* --> CHAT HEADER <-- */}
          <div className="w-full flex min-h-[80px] items-center ">
            <h2 className="font-semibold grow text-center max-[750px]:text-start max-[750px]:ml-[7vw]">
              {userData.username === chatActive.user1
                ? chatActive.user2
                : chatActive.user1}
            </h2>
            {chatActive && (
              <button
                className="min-[751px]:hidden mr-[7vw] p-[6px] hover:bg-[#0c0c0246] rounded-lg transition-all"
                onClick={() => setChatActive(null)}
                type="button"
              >
                <BackIcon />
              </button>
            )}
          </div>

          {/* --> CHAT BODY <-- */}
          <div className="w-full grow">
            <div className="w-full flex flex-col gap-[6px] h-full max-h-[75vh] overflow-auto px-[2.2vw] msg-container pb-2">
              {chatActive.messages.map((m, i) => {
                return <Msg key={i} m={m} username={userData.username} />;
              })}
            </div>
          </div>

          {/* --> SEND INPUT MESSAGE COMPONENT <-- */}
          <SendMessage handleNewMessage={handleNewMessage} />
        </div>
      ) : (
        <div className="w-[65%] grow flex flex-col items-center max-[750px]:hidden">
          <h2 className="text-3xl font-light mt-[25vh] opacity-50">
            Select a friend to chat with
          </h2>
        </div>
      )}
    </div>
  );
}

export default MainApp;
