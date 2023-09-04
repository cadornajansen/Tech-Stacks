"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
const CardSkeleton = dynamic(() => import("@/components/ui/cardskeleton"), { ssr: false });


import { useEffect, useState } from "react";
import useSWR from "swr";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: technologies,
    error,
    isLoading,
  } = useSWR("technologies", async () => {
    const { data } = await supabase.from("technologies").select("*");
    return data;
  });

  return (
    <section className="min-h-[100dvh] flex flex-col my-20 gap-10">
      <div className="flex items-center justify-between gap-4">
        <div className="w-full sm:w-fit relative flex items-center">
          <input
            placeholder="Search frameworks, tools, etc."
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            className="cursor-pointer inline-flex outline-none items-center rounded-md font-medium transition-colors border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground pr-10 md:w-72 lg:w-80"
          />
          <Search className="absolute right-0 mr-3" size={18} />
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : (
          technologies
            ?.filter(
              (item: { title: string, tags: string[] }) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.some((tag: string) =>
                  tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
            .map((item: { id: string, image: string, title: string, description: string, about: string, tags: string[] }) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Image
                      className="w-12 h-12 inline rounded-md"
                      src={`${item.image}`}
                      alt={item.title}
                      width={250}
                      height={250}
                    />

                    <span className="font-bold">
                      {item.title}
                      <CardDescription className="font-medium">
                        {item.description}
                      </CardDescription>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4 max-w-prose [text-wrap: balance]">
                    {item.about}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  {item.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-zinc-900 rounded-lg text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            ))
        )}
      </div>
    </section>
  );
};

export default Browse;
