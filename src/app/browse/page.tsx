"use client";

import { Box, Container, Text } from "@chakra-ui/react";
import { Movie } from "../../../typings";
import useSWR from "swr";
import * as fetchers from "../../utils/fetchData";
import dynamic from "next/dynamic";

const MovieRow = dynamic(() => import("@/components/MovieRow"));
const FooterCmp = dynamic(() => import("@/components/FooterCmp"));
const Banner = dynamic(() => import("@/components/BannerCmp"));
const SearchCmp = dynamic(() => import("@/components/SearchCmp"));

interface Props {
  cineverseOriginals: Movie[];
  popularMovies: Movie[];
  trendingNow: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  kidsSeries: Movie[];
  realitySeries: Movie[];
  romanceMovies: Movie[];
}

const Home: React.FC<Props> = () => {
  const { data: cineverseOriginals } = useSWR(
    "cineverseOriginals",
    fetchers.fetchCineverseOriginals
  );
  const { data: popularMovies } = useSWR(
    "popularMovies",
    fetchers.fetchPopular
  );
  const { data: trendingNow } = useSWR(
    "trendingNow",
    fetchers.fetchTrendingMovies
  );
  const { data: actionMovies } = useSWR("actionMovies", fetchers.fetchAction);
  const { data: comedyMovies } = useSWR("comedyMovies", fetchers.fetchComedy);
  const { data: kidsSeries } = useSWR("kidsSeries", fetchers.fetchKidSeries);
  const { data: realitySeries } = useSWR(
    "realitySeries",
    fetchers.fetchRealitySeries
  );
  const { data: romanceMovies } = useSWR(
    "romanceMovies",
    fetchers.fetchRomance
  );

  return (
    <Container bg={"#212121"} maxW={""} centerContent>
      <SearchCmp />

      <Banner cineverseOriginals={cineverseOriginals || []} />

      <Box mt={3}>
        {/* popular movies */}
        <Box>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Popular Movies
          </Text>
          <MovieRow movies={popularMovies || []} />
        </Box>

        {/* trending now */}
        <Box mt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Trending Now
          </Text>
          <MovieRow movies={trendingNow || []} />
        </Box>
        {/* action movies */}
        <Box mt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Action Movies
          </Text>
          <MovieRow movies={actionMovies || []} />
        </Box>
        {/* comedy movies */}
        <Box mt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Comedy Movies
          </Text>
          <MovieRow movies={comedyMovies || []} />
        </Box>
        {/* kid series */}
        <Box mt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Kids Series
          </Text>
          <MovieRow series={kidsSeries || []} />
        </Box>
        {/* reality series */}
        <Box mt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Reality Series
          </Text>
          <MovieRow series={realitySeries || []} />
        </Box>
        {/* romance movies */}
        <Box mt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Romance Movies
          </Text>
          <MovieRow movies={romanceMovies || []} />
        </Box>
      </Box>
      <FooterCmp />
    </Container>
  );
};

export default Home;
