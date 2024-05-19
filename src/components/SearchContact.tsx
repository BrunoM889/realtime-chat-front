import Input from "./Input";
import { useState } from "react";
import { PlusIcon } from "./Icons";

interface Props {
  handleChat: (name: string) => void;
}

function SearchContact({ handleChat }: Props) {
  const [search, setSearch] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleChat(search);
        setSearch("");
      }}
      className="grow flex items-center gap-[6px]"
    >
      <Input
        data-tooltip-target="tooltip-animation"
        label={"Search friends"}
        setText={setSearch}
        text={search}
      />

      <button className="p-[6px] rounded-lg hover:bg-[#0c0c0246] transition-all mt-2">
        <PlusIcon />
      </button>
    </form>
  );
}

export default SearchContact;
