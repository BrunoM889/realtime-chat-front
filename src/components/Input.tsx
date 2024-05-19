interface Props {
  label: string | null;
  setText: (c: string) => void;
  text: string;
}

function Input({ label, setText, text }: Props) {
  return (
    <div className="relative z-0 w-full group">
      <input
        autoComplete="off"
        type="text"
        name="search"
        id="search"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={`block py-2.5 px-0 w-full text-sm text-[#0c0c02] bg-transparent border-0 border-b border-[#0c0c02ad] appearance-none focus:outline-none focus:ring-0 focus:border-[#0c0c028c] peer`}
        placeholder=""
        maxLength={label === "" ? 20 : undefined}
      />
      {label && (
        <label
          htmlFor="search"
          className={`peer-focus:font-medium absolute text-sm text-[#0c0c02] opacity-80 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:opacity-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default Input;
