import { Movie, Video } from "../../typings";
import { Box, Flex, Text, Button, Skeleton } from "@chakra-ui/react";
import { baseUrl } from "@/constants/movie";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./styles/swiper.module.css";
import YoutubeCmp from "./YoutubeCmp";
import { cache, useState, useEffect } from "react";
import Link from "next/link";
// swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Props {
  cineverseOriginals: Movie[];
}

const Banner = ({ cineverseOriginals }: Props) => {
  const slicedMovies = cineverseOriginals.slice(0, 10);
  const [showVideo, setShowVideo] = useState<Video | null>(null);
  const [movieVideos, setMovieVideos] = useState<Record<number, Video[]>>({});

  const handleClick = (video: Video) => {
    setShowVideo(video);
  };

  const handleClose = () => {
    setShowVideo(null);
  };

  const handleTitle = (word: string) => {
    return encodeURIComponent(word.split(" ").join("-").toLowerCase());
  };

  useEffect(() => {
    const fetchMovieVideos = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const videos: Record<number, Video[]> = {};

      for (const movie of slicedMovies) {
        const res = await fetch(
          `${baseUrl}/movie/${movie.id}/videos?api_key=${apiKey}`
        );

        if (res.ok) {
          const data = await res.json();
          videos[movie.id] = data.results;
        }
      }
      setMovieVideos(videos);
    };
    fetchMovieVideos();
  }, [slicedMovies]);

  return (
    <Box mt={12} w={{ base: "97%", md: "90%" }}>
      <Swiper
        pagination={{ type: "progressbar" }}
        // autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <Skeleton isLoaded={!slicedMovies}>
          {slicedMovies.map((movie, idx) => (
            <SwiperSlide
              key={idx}
              className={style.swiperSlide}
              style={{
                backgroundImage: `url(${baseUrl}${
                  movie.backdrop_path || movie.poster_path
                })`,
                backgroundSize: "cover",
                minHeight: "60vh",
                ...(window.innerWidth <= 768 && {
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  backgroundImage: `url(${baseUrl}${movie.poster_path})`,
                }),
              }}
            >
              <Box
                pos="absolute"
                bottom={0}
                left={0}
                bg="linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7))"
                w="100%"
                h="50%"
              />
              <Box
                display={"flex"}
                flexDir={"column"}
                pos="absolute"
                bottom={0}
                px={8}
                pb={4}
                maxW={{ base: "100%", md: "70%" }}
                left={0}
              >
                <Text
                  color={"#fff"}
                  fontWeight={700}
                  fontSize={"2xl"}
                  display={{ base: "none", md: "block" }}
                >
                  {movie.original_title || movie.title}
                </Text>
                <Text
                  color={"#fff"}
                  fontSize={"lg"}
                  display={{ base: "none", md: "block" }}
                >
                  {movie.overview &&
                    movie.overview.slice(0, movie.overview.indexOf(".") + 1)}
                </Text>
                <Flex gap={6} mt={3}>
                  {/* <Button
                  onClick={() => {
                    if (showVideo) {
                      handleClose();
                    } else {
                      handleClick(movieVideos[movie.id]?.[0]);
                    }
                  }}
                >
                  {showVideo ? "CANCEL" : "PLAY"}
                </Button> */}
                  <Link
                    href={`/browse/details/movie/${handleTitle(movie.title)}/${
                      movie.id
                    }`}
                  >
                    <Button>More Info</Button>
                  </Link>
                </Flex>
                {/*   {showVideo && (
                <YoutubeCmp key={showVideo.key} cineverseVideos={showVideo} />
              )} */}
              </Box>
            </SwiperSlide>
          ))}
        </Skeleton>
      </Swiper>
    </Box>
  );
};

export default Banner;
