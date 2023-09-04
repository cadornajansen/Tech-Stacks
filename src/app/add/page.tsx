"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import useSWR from "swr";

const Add = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    about: "",
    tags: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const parseTags = (tagsInput: string) => {
    if (!tagsInput) {
      return [];
    }
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    const validTags = tagsArray.filter((tag) => tag !== "");
    return validTags;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const { data: fileData, error: fileError } = await supabase.storage
      .from("brand-assets")
      .upload(`${file.name}`, file);
    if (fileError) {
      console.error(fileError);
    }
    const { data: fileUrl, error: fileUrlError} = await supabase.storage
      .from("brand-assets")
      .createSignedUrl(`${file.name}`, 3153600000);
    console.log("File uploaded successfully:", fileData);
    const tagsList = parseTags(formData.tags);
    const submission = {
      title: formData.title,
      description: formData.desc,
      about: formData.about,
      tags: tagsList,
      image: fileUrl?.signedUrl,
    };

    const { data, error } = await supabase
      .from("technologies")
      .insert(submission);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
    toast({
      title: "Added Successfully",
      description: JSON.stringify({
        data,
      }),
    });
    setFormData({
      title: "",
      desc: "",
      about: "",
      tags: "",
    });
    setFile(null);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadLogo = async () => {};

  return (
    <section className="flex-grow flex flex-col items-center my-10">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex-grow flex flex-col w-full md:max-w-xs gap-6"
      >
        <div className="form-field">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter the title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="form-field">
          <Label htmlFor="desc">Description</Label>
          <Input
            id="desc"
            placeholder="Add a brief description"
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>

        <div className="form-field">
          <Label htmlFor="about">About Content</Label>
          <Input
            id="about"
            placeholder="Write a short introduction"
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
          />
        </div>

        <div className="form-field">
          <Label htmlFor="tags">Tags (max: 3)</Label>
          <Input
            id="tags"
            placeholder="Add tags, seperate with commas"
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className="form-field">
          <Label htmlFor="logo">Logo</Label>
          <Input
            onChange={(e) => handleFileSelected(e)}
            id="logo"
            accept="image/*"
            type="file"
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
};

export default Add;
