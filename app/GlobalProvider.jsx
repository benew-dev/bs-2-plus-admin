"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { HomePageProvider } from "@/context/HomePageContext";
import { SessionProvider } from "next-auth/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types
export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <SettingsProvider>
          <HomePageProvider>
            <OrderProvider>
              <ProductProvider>
                <SessionProvider>{children}</SessionProvider>
              </ProductProvider>
            </OrderProvider>
          </HomePageProvider>
        </SettingsProvider>
      </AuthProvider>
    </>
  );
}
