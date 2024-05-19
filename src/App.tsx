import { useEffect, useState } from "react";
import SignIn from "./sections/SignIn";
import MainApp from "./sections/MainApp";
import { UserData, Chat } from "./types";
import { API_URL } from "./config";
function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [charging, setCharging] = useState(true);
  const [alert, setAlert] = useState<string>("");
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [fadeOut, setFadeOut] = useState("");

  const handleAlert = (message: string) => {
    if (alert) return;
    setAlert(message);
    setTimeout(() => {
      setFadeOut("fadeOut");
    }, 2500);
    setTimeout(() => {
      setAlert("");
      setFadeOut("");
    }, 3000);
  };

  const handleSubmit = async (user: UserData) => {
    if (user.username.includes(" ")) return handleAlert("Invalid username");
    try {
      const res = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        setUserData({
          username: user.username,
          password: user.password,
          id: data.user.id,
          contacts: data.user.contacts,
        });
        setChats(data.chats);
        window.sessionStorage.setItem("id", data.user.id.toString());
      } else {
        handleAlert(data.message);
      }
    } catch (error) {
      console.log(error);
      handleAlert("Failed to login");
    }
  };

  const getUserData = async () => {
    if (window.sessionStorage.getItem("id")) {
      try {
        const res = await fetch(
          `${API_URL}/auth/user/${window.sessionStorage.getItem("id")}`
        );
        const data = await res.json();

        if (data) {
          setUserData({
            username: data.user.username,
            password: data.user.password,
            id: data.user.id,
            contacts: data.user.contacts,
          });
          setChats(data.chats);
          setCharging(false);
        }
      } catch (error) {
        console.log(error);
        handleAlert("Couldn't load user data");
      }
    } else {
      setCharging(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (charging) return;

  return (
    <main
      style={{
        background: `radial-gradient(circle, #ffffdd 0%, #5a5a50 100%)`,
      }}
      className={`w-full min-h-screen h-fit flex justify-center text-[#0c0c02] selection:bg-[#0c0c0246]`}
    >
      {alert && (
        <div
          className={`bg-[#ffffdd] shadow shadow-[#0c0c027a] px-4 py-2 rounded fixed left-4 bottom-4 charge ${fadeOut}`}
        >
          {alert}
        </div>
      )}
      {charging ? (
        <></>
      ) : (
        <div className="w-[92%] max-w-[1200px] flex flex-col pt-[3vh]">
          <div className="w-full grow">
            {userData && chats !== null ? (
              <MainApp
                userData={userData}
                chats={chats}
                handleAlert={handleAlert}
                setChats={setChats}
                setUserData={setUserData}
              ></MainApp>
            ) : (
              <SignIn handleSubmit={handleSubmit} />
            )}
          </div>
          <footer className="flex items-center justify-center text-sm h-10 gap-3">
            <a
              className={`border-b px-[2px] leading-4 transition-all border-[#ffffff00] hover:border-[#0c0c02]`}
              href="http://github.com/BrunoM889/realtime-chat-front"
              target="_blank"
            >
              front
            </a>
            <strong className="font-medium">
              {"<"}source{">"}
            </strong>

            <a
              className={`border-b px-[2px] leading-4 transition-all border-[#ffffff00] hover:border-[#0c0c02]`}
              href="http://github.com/BrunoM889/realtime-chat-back"
              target="_blank"
            >
              back
            </a>
          </footer>
        </div>
      )}
    </main>
  );
}

export default App;
