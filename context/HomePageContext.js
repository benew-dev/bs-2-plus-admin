"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const createHomePage = async (homePageData) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/homepage`,
        homePageData,
      );

      if (data.success) {
        toast.success("Page d'accueil créée avec succès!");
        router.push("/admin/homepage");
        router.refresh();
        setLoading(false);
        return { success: true, data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to create homepage";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      throw error;
    }
  };

  const updateHomePage = async (homePageData) => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/homepage`,
        homePageData,
      );

      if (data.success) {
        toast.success("Page d'accueil mise à jour avec succès!");
        router.push("/admin/homepage");
        router.refresh();
        setLoading(false);
        return { success: true, data };
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to update homepage";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      throw error;
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <HomePageContext.Provider
      value={{
        error,
        loading,
        createHomePage,
        updateHomePage,
        clearErrors,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContext;
