import Link from "next/link";

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
            "flex flex-col items-center justify-center w-full h-4/6 bg-primary gap-16 text-center"
          }
        >
          <span className={"text-6xl leading-extra-tight"}>
            Bienvenu dans l'expérience INJEU
          </span>
          <span className={"text-3xl"}>Développé par NOM</span>
          <span className={"text-3xl"}>LOGOS</span>
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
