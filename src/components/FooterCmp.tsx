import {
  Box,
  Container,
  Stack,
  Flex,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";

const Logo = () => {
  return (
    <Box>
      <Image
        src="/images/cineverse-logo.png"
        alt="logo"
        width={200}
        height={20}
      />
    </Box>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default function FooterCmp() {
  return (
    <Box color="gray.300" w={"95%"}>
      <Container as={Stack} maxW={""} py={10} overflow={"hidden"}>
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems={"center"}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <Box>
            <Logo />
          </Box>
          <Text fontSize={"sm"}>
            © 2022 Chakra Templates. All rights reserved
          </Text>
        </Flex>
        <Stack direction={"row"} spacing={6} justifyContent={"center"}>
          <SocialButton label={"Twitter"} href={"#"}>
            <FaTwitter color="#fff" />
          </SocialButton>
          <SocialButton label={"YouTube"} href={"#"}>
            <FaYoutube color="#fff" />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"}>
            <FaInstagram color="#fff" />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
