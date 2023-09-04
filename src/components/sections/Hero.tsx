import { Button } from "../ui/button";

const Hero = () => (
    <section className="flex-grow flex flex-col items-center gap-8 my-20">
      <div className="text-center max-w-prose [text-wrap:balance] space-y-4">
        <span className="text-xs font-semibold border py-1.5 px-4 rounded-full">Trusted by Developers and Startups</span>
        <h1 className="text-5xl md:text-6xl font-bold">
          Discover modern <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
            technologies
          </span>{" "}
          for your next development
        </h1>
        <p className="font-medium">
          Whether you&apos;re building a fullstack web application or cloud
          application
        </p>
      </div>
      <div className="flex items-center gap-5">
        <Button>Browse Tech</Button>
        <Button variant={"ghost"}>Add Yours</Button>
      </div>
    </section>
)

export default Hero;