"use client";
import { useRouter, useParams } from "next/navigation";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Movie, SeriesDetails } from "../../../../typings";
import Image from "next/image";
import { useState, useEffect, cache } from "react";
import { baseUrl } from "@/constants/movie";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader"));

const SearchResultsPage = () => {
  const router = useRouter();
  const { movie } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const searchMovie = cache(async (query: string) => {
    const res = await fetch(
      `${BASE_URL}/search/multi?query=${query}&api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
  });

  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<(Movie | SeriesDetails)[]>(
    []
  );

  const handleRoute = (result: Movie | SeriesDetails) => {
    let mediaType = "movie";

    if ("title" in result) {
      mediaType = "movie";
    } else if ("name" in result) {
      mediaType = "tv";
    }

    router.push(`/browse/details/${mediaType}/${movie}/${result.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await searchMovie(movie);
        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movie, searchMovie]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Box mt={4}>
        <Text color={"#fff"}>
          search results for &quot;{decodeURIComponent(movie)}&quot;
        </Text>
      </Box>
      {/* main */}
      <Box
        w={{ base: "94%", md: "85%" }}
        display={"flex"}
        flexDir={"row"}
        flexWrap={"wrap"}
        mt={7}
        justifyContent={"space-between"}
      >
        {searchResults.map((result, idx) => {
          let releaseDate =
            (result as Movie).release_date ||
            (result as SeriesDetails).first_air_date;
          let year = releaseDate ? releaseDate.split("-")[0] : "N/A";
          return (
            <Box
              key={idx}
              maxW={{ base: "48%", md: "30%" }}
              borderWidth="1px"
              rounded="lg"
              shadow="lg"
              position="relative"
              mb={4}
              onClick={() => handleRoute(result)}
            >
              {result.poster_path ? (
                <Image
                  src={`${baseUrl}${result.poster_path}`}
                  alt="movie"
                  width={200}
                  height={200}
                  style={{
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                />
              ) : (
                <Image
                  src="/images/no-img.webp"
                  alt="movie"
                  width={200}
                  height={200}
                  style={{
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                />
              )}
              <Box p={3} maxW={200}>
                <Text
                  color={"gray.300"}
                  fontSize={{ base: "12px", md: "16px" }}
                >
                  {(result as Movie).title || (result as SeriesDetails).name}
                </Text>
                <Flex justifyContent="space-between" py={2}>
                  <Text
                    color={"gray.300"}
                    fontSize={{ base: "12px", md: "16px" }}
                  >
                    {year}
                  </Text>
                  <Box
                    borderWidth="1px"
                    borderColor="gray.300"
                    px={1}
                    borderRadius="sm"
                  >
                    <Text
                      color={"gray.300"}
                      fontSize={{ base: "12px", md: "16px" }}
                    >
                      {(result as Movie).media_type ||
                        (result as SeriesDetails).media_type}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default SearchResultsPage;
