"use client";
import { getProjects } from "@/app/api/Project";
import { useState, useEffect } from "react";
import Carousel from "@/components/Carousel/Carousel";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Page = () => {
  const [image, setImage] = useState([]);
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) {
    router.push("/");
  }

  const fetchImages = async () => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.get(`${baseURL}/api/post`);
      if (response.status !== 200) {
        throw new Error("Something Went Wrong");
      }
      const data = response.data;
      const images = data.map((data) => {
        return data.images;
      });
      setImage(images);
    } catch (error) {
      toast.error("Failed to fetch images");
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col">
      <Carousel images={image} />
      <Toaster />
    </div>
  );
};
export default Page;
