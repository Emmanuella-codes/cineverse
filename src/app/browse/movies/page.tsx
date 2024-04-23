"use client";
import { Container, Box, Text } from "@chakra-ui/react";
import { Movie } from "../../../../typings";
import useSWR from "swr";
import * as fetchers from "../../../utils/fetchData";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MovieRow = dynamic(() => import("@/components/MovieRow"));
const Loader = dynamic(() => import("@/components/Loader"));

interface Props {
  trendingMovies: Movie[];
  popularMovies: Movie[];
  upcomingMovies: Movie[];
  topRatedMovies: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  romanceMovies: Movie[];
  dramaMovies: Movie[];
  animationMovies: Movie[];
  adventureMovies: Movie[];
  horrorMovies: Movie[];
}

const MoviesPage: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  const { data: trendingMovies } = useSWR(
    "trendingMovies",
    fetchers.fetchTrendingMovies
  );
  const { data: popularMovies } = useSWR(
    "popularMovies",
    fetchers.fetchPopular
  );
  const { data: upcomingMovies } = useSWR(
    "upcomingMovies",
    fetchers.fetchUpcoming
  );
  const { data: topRatedMovies } = useSWR(
    "topRatedMovies",
    fetchers.fetchTopRated
  );
  const { data: actionMovies } = useSWR("actionMovies", fetchers.fetchAction);
  const { data: comedyMovies } = useSWR("comedyMovies", fetchers.fetchComedy);
  const { data: romanceMovies } = useSWR(
    "romanceMovies",
    fetchers.fetchRomance
  );
  const { data: dramaMovies } = useSWR("dramaMovies", fetchers.fetchDrama);
  const { data: animationMovies } = useSWR(
    "animationMovies",
    fetchers.fetchAnimation
  );
  const { data: adventureMovies } = useSWR(
    "adventureMovies",
    fetchers.fetchAdventure
  );
  const { data: horrorMovies } = useSWR("horrorMovies", fetchers.fetchHorror);

  useEffect(() => {
    if (
      trendingMovies &&
      popularMovies &&
      upcomingMovies &&
      topRatedMovies &&
      actionMovies &&
      comedyMovies &&
      romanceMovies &&
      dramaMovies &&
      animationMovies &&
      adventureMovies &&
      horrorMovies
    ) {
      setLoading(false);
    }
  }, [
    actionMovies,
    adventureMovies,
    animationMovies,
    comedyMovies,
    dramaMovies,
    horrorMovies,
    popularMovies,
    romanceMovies,
    topRatedMovies,
    trendingMovies,
    upcomingMovies,
  ]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Box mt={7}>
        {/* trending movies */}
        <Box>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Trending Movies
          </Text>
          <MovieRow movies={trendingMovies || []} />
        </Box>

        {/* popular movies */}
        <Box pt={{ base: 2, md: 14 }}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Popular Movies
          </Text>
          <MovieRow movies={popularMovies || []} />
        </Box>

        {/* upcoming movies */}
        <Box pt={{ base: 2, md: 14 }}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Upcoming Movies
          </Text>
          <MovieRow movies={upcomingMovies || []} />
        </Box>

        {/* top rated movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Top Rated Movies
          </Text>
          <MovieRow movies={topRatedMovies || []} />
        </Box>

        {/* action movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Action Movies
          </Text>
          <MovieRow movies={actionMovies || []} />
        </Box>

        {/* comedy movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Comedy Movies
          </Text>
          <MovieRow movies={comedyMovies || []} />
        </Box>

        {/* romance movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Romance Movies
          </Text>
          <MovieRow movies={romanceMovies || []} />
        </Box>

        {/* drama movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Drama
          </Text>
          <MovieRow movies={dramaMovies || []} />
        </Box>

        {/* animation movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Animation Movies
          </Text>
          <MovieRow movies={animationMovies || []} />
        </Box>

        {/* adventure movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Adventure Movies
          </Text>
          <MovieRow movies={adventureMovies || []} />
        </Box>

        {/* horror movies */}
        <Box pt={14}>
          <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
            Horror Movies
          </Text>
          <MovieRow movies={horrorMovies || []} />
        </Box>
      </Box>
    </>
  );
};

export default MoviesPage;
