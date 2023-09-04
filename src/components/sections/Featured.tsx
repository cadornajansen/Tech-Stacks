import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Featured = () => {
  const featuredItems = [
    {
      title: "Convex",
      logo: "convex.png",
      description: "Backend App Platform",
      content: "Convex is a fullstack TypeScript development platform.",
      tags: ["Backend", "Database", "Cloud"],
    },
    {
      title: "Trigger",
      logo: "trigger.png",
      description: "Workflow Automations",
      content: "The complete open source Background Jobs framework",
      tags: ["Workflow", "Cloud", "Serverless"],
    },
    {
      title: "Singlestore",
      logo: "singlestore.png",
      description: "Backend App Platform",
      content: "The distributed SQL Database built to power intensive applications",
      tags: ["Database", "Machine Learning"],
    },
  ];

  return (
    <section className="flex flex-col justify-start items-start gap-8 mt-20 mb-10">
      <div>
        <h1 className="font-semibold text-lg">Featured Applications</h1>
      </div>
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 items-center gap-5">
        {featuredItems.map((featured, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Image
                  className="w-12 h-12 inline"
                  src={`/images/${featured.logo}`}
                  alt={featured.title}
                  width={250}
                  height={250}
                />

                <span className="font-bold">
                  {featured.title}
                  <CardDescription className="font-medium">
                    {featured.description}
                  </CardDescription>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="max-w-prose [text-wrap: balance]">
                {featured.content}
              </p>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                {featured.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-zinc-900 rounded-lg text-sm font-semibold">
                      {tag}
                    </span>
                ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Featured;
