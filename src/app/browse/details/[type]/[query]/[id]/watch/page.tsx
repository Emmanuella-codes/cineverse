"use client";

import { Box, Container, Text, Button, Flex } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Video } from "../../../../../../../../typings";
import { cache, useState, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

const FooterCmp = dynamic(() => import("@/components/FooterCmp"));
const Loader = dynamic(() => import("@/components/Loader"));

interface Props {
  cineverseVideo: Video[];
}

const PlayTrailer = ({ cineverseVideo }: Props) => {
  const { query, id, type } = useParams();
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const backToPrev = () => {
    router.push(`/browse/details/${type}/${query}/${id}`);
  };

  const goHome = () => {
    router.push(`/browse`);
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const fetchVideo = cache(async (type: string, id: string) => {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
  });

  const [videoResults, setVideoResults] = useState<Video[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchVideo(type, id);
      setVideoResults(result);
    };
    const timeout = setTimeout(() => {
      setLoading(false);
      fetchData();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fetchVideo, id, type]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Flex flexDir="row" my={4} gap={3}>
        <Button
          onClick={backToPrev}
          colorScheme="red"
          variant="outline"
          size={{ base: "sm", md: "lg" }}
        >
          Previous
        </Button>
        <Button
          onClick={goHome}
          colorScheme="red"
          variant="outline"
          size={{ base: "sm", md: "lg" }}
        >
          Home
        </Button>
      </Flex>
      <Box mb={3}>
        <Text
          fontSize={{ base: "", md: "2xl" }}
          textTransform="uppercase"
          color="gray.300"
        >
          Now Playing {`"${videoResults[0]?.name}"`}
        </Text>
      </Box>
      <Box w="100%" h="100%" display={{ base: "none", md: "block" }}>
        <YouTube
          opts={opts}
          onReady={onPlayerReady}
          videoId={videoResults[0]?.key}
          style={{ height: "70vh", pointerEvents: "auto" }}
        />
      </Box>
      <Box w="100%" h="100%" display={{ base: "block", md: "none" }}>
        <YouTube
          opts={opts}
          onReady={onPlayerReady}
          videoId={videoResults[0]?.key}
          style={{ height: "67vh", pointerEvents: "auto" }}
        />
      </Box>
      <FooterCmp />
    </>
  );
};

export default PlayTrailer;
