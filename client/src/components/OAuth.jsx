import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export const OAuth = () => {
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={handleClick}
      className=" relative text-lg bg-transparent t border border-[#999999] p-3 rounded-lg"
    >
      <FcGoogle
        size={23}
        style={{ position: "absolute", top: "15px", left: "20px" }}
      />
      Continue with google
    </button>
  );
};
