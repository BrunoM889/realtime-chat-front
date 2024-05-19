import { useMemo } from "react";
import { Message } from "../types";

export const dateFormmated = (date: Date) => {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

function Msg({ m, username }: { m: Message; username: string }) {
  const date = useMemo(() => dateFormmated(new Date()), []);

  return (
    <div
      className={`w-fit p-2 px-3 text-sm ${
        username === m.sender && m.sender !== "$date$"
          ? "self-end shadow-[#5c5c50] bg-[#555549] text-[#EAEACB]"
          : "self-start shadow-[#868673]"
      } ${
        m.sender === "$date$"
          ? "self-center min-w-fit"
          : "max-w-[90%] shadow-md rounded-lg flex justify-between items-end"
      } `}
    >
      {m.text.split("\n").map((p: string, i) => {
        return (
          <p
            key={i}
            className={`${
              m.sender === "$date$"
                ? "self-center text-xs font-medium opacity-50"
                : "break-words grow max-w-[90%] max-[450px]:max-w-[85%]"
            }`}
          >
            {p === date ? "Today" : p}
          </p>
        );
      })}
      {m.sender !== "$date$" && (
        <span className="text-[10px] ml-3 relative top-1 font-semibold">
          {m.createdAt?.slice(11, 16)}
        </span>
      )}
    </div>
  );
}

export default Msg;
