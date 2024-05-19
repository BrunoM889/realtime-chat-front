import { UserData } from "../types";
import { useState } from "react";
interface Props {
  handleSubmit: (user: UserData) => void;
}

function SignIn({ handleSubmit }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({
          username,
          password,
          contacts: [],
        });
      }}
      className="max-w-md mx-auto pt-[10vh]"
    >
      <h1 className="text-4xl">Sign in</h1>
      <p className="mb-10 mt-2 text-sm opacity-80">
        If you are already registered you can login here, otherwise you can also
        register here, with an unique username.
      </p>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_username"
          id="floating_username"
          className={`block py-2.5 px-0 w-full text-sm text-[#0c0c02] bg-transparent border-0 border-b border-[#0c0c02ad] appearance-none focus:outline-none focus:ring-0 focus:border-[#0c0c028c] peer`}
          placeholder=" "
          maxLength={20}
          required
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label
          htmlFor="floating_username"
          className={`peer-focus:font-medium absolute text-sm text-[#0c0c02] opacity-80 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:opacity-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Username
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          className={`block py-2.5 px-0 w-full text-sm text-[#0c0c02] bg-transparent border-0 border-b border-[#0c0c02ad] appearance-none focus:outline-none focus:ring-0 focus:border-[#0c0c028c] peer`}
          placeholder=" "
          required
          autoComplete="off"
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label
          htmlFor="floating_password"
          className={`peer-focus:font-medium absolute text-sm text-[#0c0c02] opacity-80 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:opacity-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Password
        </label>
      </div>

      <button
        type="submit"
        className={`text-[#ffffdd] bg-[#0c0c028c] hover:bg-[#0c0c02ad] focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-4 focus:scale-95 transition-all`}
      >
        Sign in
      </button>
    </form>
  );
}

export default SignIn;
