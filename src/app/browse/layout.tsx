"use client";

import SearchCmp from "@/components/SearchCmp";
import { Container } from "@chakra-ui/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container bg={"#212121"} maxW={""} centerContent overflow={"hidden"}>
      <SearchCmp />
      {children}
    </Container>
  );
}
