import Link from "next/link";
import Image from "next/image";
import ensad from "@/public/logos/ensad.jpg";
import inja from "@/public/logos/inja.jpg";
import psl from "@/public/logos/psl.jpg";

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-between">
      <section
        className={"flex w-full h-screen flex-col items-center justify-between"}
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
        className={"flex w-full h-screen flex-col items-center justify-between"}
      >
        <div
          className={
            "flex flex-col items-center justify-center w-full h-4/6 bg-primary gap-10 text-center"
          }
        >
          <span className={"text-6xl leading-extra-tight"}>
            Bienvenu dans l'expérience INJEU
          </span>
          <span className={"text-3xl"}>Développé par NOM</span>
          <div className={"flex gap-10"}>
            <Image src={ensad} alt={"logo ENSAD"} width={100} height={100} />
            <Image src={inja} alt={"logo INJA"} width={100} height={100} />{" "}
            <Image src={psl} alt={"logo PSL"} width={100} height={100} />
          </div>
        </div>
        <Link
          href={"/start"}
          className={
            "w-full h-2/6 bg-secondary flex justify-center items-center"
          }
        >
          <span className={"md:text-6xl text-5xl"}>COMMENCER</span>
        </Link>
      </section>
    </main>
  );
}
