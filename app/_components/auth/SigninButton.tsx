import { signInAction } from "@/app/_lib/actions";
import Image from "next/image";

export default function SigninButton() {
  return (
    <form action={signInAction}>
      <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cyan-600 px-8 py-3 text-lg tracking-widest text-white transition-all hover:bg-cyan-700">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={24}
          width={24}
          className="rounded-full border border-white bg-white"
        />
        <span>Continuar com Google</span>
      </button>
    </form>
  );
}
