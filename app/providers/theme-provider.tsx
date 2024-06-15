"use client";
import { ConfigProvider } from "antd";
import React from "react";

let primaryColor = "#0B2239";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Primary color for all antd components
          colorPrimary: primaryColor,
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 42,
            colorBorder: primaryColor,
            boxShadow: "none",
            controlOutline: "none",
          },
          Input: {
            controlHeight: 45,
            activeShadow: "none",
            colorBorder: "#ccc",
          },
          Select: {
            controlHeight: 45,
            colorBorder: "#ccc",
            boxShadow: "none",
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
