import Link from "next/link";
import Image from "next/image";
import ensad from "@/public/logos/ensad.jpg";
import inja from "@/public/logos/inja.jpg";
import psl from "@/public/logos/psl.jpg";

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-between">
      <section
        className={
          "flex w-full h-[100vh] flex-col items-center justify-between"
        }
      >
        <div className="w-full items-center justify-between h-1/4 flex bg-secondary" />

        <div
          className={
            "bg-primary w-full h-3/4 flex items-center justify-center text-8xl"
          }
        >
          INJEU
        </div>
      </section>

      <section
        className={
          "flex w-full h-[100vh] flex-col items-center justify-between"
        }
      >
        <div
          className={
            "flex flex-col items-center justify-center w-full h-4/6 bg-primary gap-10 text-center"
          }
        >
          <span className={"px-4 text-5xl leading-extra-tight"}>
            Bienvenu dans l'expérience INJEU
          </span>
          <span className={"text-2xl"}>Développé par</span>
          <div className={"flex gap-8 px-4"}>
            <Image src={ensad} alt={"logo ENSAD"} width={80} height={80} />
            <Image src={inja} alt={"logo INJA"} width={80} height={80} />
            <Image src={psl} alt={"logo PSL"} width={80} height={80} />
          </div>
        </div>
        <Link
          href={"/start"}
          className={
            "w-full h-2/6 bg-secondary flex flex-col justify-center items-center gap-4"
          }
        >
          <span className={"md:text-6xl text-5xl"}>COMMENCER</span>
          <span className={"md:hidden text-sm"}>
            (N'oubliez pas de désactiver le mode silencieux)
          </span>
        </Link>
      </section>
    </main>
  );
}
