"use client";

import {
  Box,
  Text,
  Flex,
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { MovieCast, MovieCrew } from "../../../../../../../../typings";
import { cache, useState, useEffect } from "react";
import { baseUrl } from "@/constants/movie";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const FooterCmp = dynamic(() => import("@/components/FooterCmp"));
const Loader = dynamic(() => import("@/components/Loader"));

const CastPage = () => {
  const { id, type } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const router = useRouter();

  const prevPage = () => {
    router.back();
  };

  let addEndpoint = "/credits";
  if (type === "tv") {
    addEndpoint = "/aggregate_credits";
  }

  const getCast = cache(async (id: string, type: string) => {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}${addEndpoint}?api_key=${API_KEY}&language=en-US`
    );
    const data = await res.json();
    return data;
  });

  const [loading, setLoading] = useState(true);
  const [castDetails, setCastDetails] = useState<MovieCast[] | []>([]);
  const [crewDetails, setCrewDetails] = useState<MovieCrew[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = isLargerThan768 ? 15 : 7;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCast(id, type);
      setCastDetails(result.cast);
      setCrewDetails(result.crew);
    };
    const timeout = setTimeout(() => {
      setLoading(false);
      fetchData();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [getCast, id, type]);

  const startIdx = (currentPage - 1) * resultsPerPage;
  const endIdx = startIdx + resultsPerPage;
  const slicedCast = castDetails.slice(startIdx, endIdx);
  const slicedCrew = crewDetails.slice(startIdx, endIdx);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (endIdx < castDetails.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <IconButton
        my={5}
        isRound={true}
        variant="outline"
        colorScheme="red"
        fontSize="md"
        aria-label="Done"
        onClick={prevPage}
        icon={<ChevronLeftIcon />}
      />
      <Box mt={7} w={{ base: "90%", md: "85%" }}>
        <Flex
          justifyContent={"space-between"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box>
            <Text>Cast ({castDetails.length})</Text>
            {slicedCast?.map((cast, idx) => (
              <Flex key={idx} gap={3} py={2}>
                {/* fix image here */}
                {cast.profile_path ? (
                  <Box>
                    <Image
                      src={`${baseUrl}${cast.profile_path}`}
                      alt="cast-picture"
                      width={90}
                      height={90}
                      style={{ borderRadius: "5.2px" }}
                    />
                  </Box>
                ) : (
                  <Flex
                    w={90}
                    h={130}
                    bg="gray.200"
                    style={{
                      borderRadius: "5.2px",
                    }}
                    py={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar size="lg" src="https://bit.ly/broken-link" />
                  </Flex>
                )}
                <Box>
                  <Text
                    fontWeight={"bold"}
                    fontSize={{ base: "13px", md: "16px" }}
                  >
                    {cast.name}
                  </Text>
                  <Text fontSize={{ base: "13px", md: "16px" }}>
                    {cast.character}
                  </Text>
                  {cast.roles && cast.roles.length > 0 && (
                    <Box>
                      <Text fontSize={{ base: "13px", md: "16px" }}>
                        {cast.roles[0].character}
                      </Text>
                      <Text
                        fontSize={{ base: "13px", md: "16px" }}
                      >{`${cast.roles[0].episode_count} Episodes`}</Text>
                    </Box>
                  )}
                </Box>
              </Flex>
            ))}
          </Box>
          <Box>
            <Text>Crew ({crewDetails.length})</Text>
            {slicedCrew?.map((crew, idx) => (
              <Flex key={idx} py={2}>
                <Box>
                  <Flex gap={3}>
                    {crew.profile_path ? (
                      <Box>
                        <Image
                          src={`${baseUrl}${crew.profile_path}`}
                          alt="crew-picture"
                          width={90}
                          height={90}
                          style={{
                            borderRadius: "5.2px",
                          }}
                        />
                      </Box>
                    ) : (
                      <Flex
                        w={90}
                        h={130}
                        bg="gray.200"
                        style={{
                          borderRadius: "5.2px",
                        }}
                        py={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar size="lg" src="https://bit.ly/broken-link" />
                      </Flex>
                    )}

                    <Box>
                      <Text
                        fontWeight={"bold"}
                        fontSize={{ base: "13px", md: "16px" }}
                      >
                        {crew.name}
                      </Text>
                      <Text fontSize={{ base: "13px", md: "16px" }}>
                        {crew.job}
                      </Text>
                      {crew.jobs && crew.jobs.length > 0 && (
                        <Text fontSize={{ base: "13px", md: "16px" }}>
                          {crew.jobs[0].job}
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Box>
        </Flex>
        <Flex mt={5} justifyContent="space-around" alignItems="center">
          <Button
            colorScheme="red"
            variant="outline"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            PREVIOUS
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={nextPage}
            disabled={endIdx >= castDetails.length}
          >
            NEXT
          </Button>
        </Flex>
      </Box>
      <FooterCmp />
    </>
  );
};

export default CastPage;
