import { Box, Flex, Text, Button, useMediaQuery } from "@chakra-ui/react";
import { MovieCast } from "../../typings";
import Image from "next/image";
import { baseUrl } from "@/constants/movie";
import { useRouter, useParams } from "next/navigation";

interface Props {
  castResult: MovieCast[];
}

const CastCmp = ({ castResult }: Props) => {
  const [isLessThan386] = useMediaQuery("(max-width: 386px)");
  const slicedCast = castResult.slice(0, 6);
  const router = useRouter();
  const params = useParams();
  const { id, type, query } = params;

  const handleClick = () => {
    router.push(
      `/browse/details/${type}/${encodeURIComponent(query)
        .split(" ")
        .join("-")
        .toLowerCase()}/${id}/cast`
    );
  };

  return (
    <Box>
      <Flex
        display={"flex"}
        flexDir={"row"}
        flexWrap={"wrap"}
        mt={7}
        justifyContent={"space-between"}
        alignItems="center"
        w={"full"}
        gap={{ base: 2, md: 3 }}
      >
        {castResult &&
          slicedCast.map((cast, idx) => (
            <Box
              key={idx}
              // maxW={{ base: "46%", md: "30%", lg: "15%" }}
              width={{ base: "45%", md: "20%" }}
              borderWidth="1px"
              rounded="lg"
              shadow="lg"
              position="relative"
              mb={4}
            >
              {cast.profile_path ? (
                <Image
                  src={`${baseUrl}${cast.profile_path}`}
                  alt="cast-picture"
                  width={200}
                  height={200}
                  style={{
                    borderRadius: "5.2px",
                  }}
                />
              ) : (
                <Box
                  // w={{ base: 150, lg: 200 }}
                  height={{ base: 240, md: 300 }}
                  style={{
                    borderRadius: "5.2px",
                  }}
                  bgColor={"gray.900"}
                  textAlign={"center"}
                  fontSize={{ base: "13px", md: "16px" }}
                >
                  NO IMAGE
                </Box>
              )}
              <Box
                p={2}
                w={isLessThan386 ? 146 : !isLessThan386 ? 150 : { lg: 200 }}
                h={{ base: 137, md: 115 }}
              >
                <Text fontWeight={"bold"} fontSize={"13px"}>
                  {cast.name}
                </Text>
                <Text fontSize={"13px"} noOfLines={1} w={["121px", "100%"]}>
                  {cast.character}
                </Text>
                {cast.roles && cast.roles.length > 0 && (
                  <Box w={"121px"}>
                    <Text fontSize={"13px"} noOfLines={1}>
                      {cast.roles[0].character}
                    </Text>
                    <Text
                      fontSize={"13px"}
                    >{`${cast.roles[0].episode_count} Episodes`}</Text>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
      </Flex>
      <Box>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={handleClick}
          fontSize={{ base: "13px", md: "16px" }}
          p={3}
        >
          FULL CAST
        </Button>
      </Box>
    </Box>
  );
};

export default CastCmp;
