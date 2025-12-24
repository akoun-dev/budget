import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";

const Index: React.FC = () => {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
};

export default Index;
