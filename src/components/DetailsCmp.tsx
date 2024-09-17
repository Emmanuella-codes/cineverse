import {
  Box,
  UnorderedList,
  ListItem,
  Text,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { SeriesDetails, MovieDetails, MovieCrew, Movie } from "../../typings";
import { baseUrl } from "@/constants/movie";
import "./styles/buttons.css";
import { FaHeart } from "react-icons/fa";
import {
  addToFavorites,
  addToWatchLater,
  removeFromFavorites,
  removeFromWatchLater,
} from "@/lib/features/movieSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";
import MovieDetailsCmp from "./MovieDetailsCmp";

interface Props {
  movieDetails: MovieDetails;
  seriesDetails: SeriesDetails;
  productionCrew: MovieCrew[];
  playMovie: () => void;
}

const DetailsCmp = ({
  movieDetails,
  seriesDetails,
  productionCrew,
  playMovie,
}: Props) => {
  const sliceCrew = productionCrew.slice(0, 2);

  const dispatch = useAppDispatch();
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [isAddedToWatchLater, setIsAddedToWatchLater] = useState(false);

  const addMovieToFavorites = (movie: Movie) => {
    dispatch(addToFavorites(movie));
    setIsAddedToFav(true);
  };

  const addMovieToWatchLater = (movie: Movie) => {
    dispatch(addToWatchLater(movie));
    setIsAddedToWatchLater(true);
  };

  const removeMovieFromFavorites = (movieId: number) => {
    dispatch(removeFromFavorites(movieId));
    setIsAddedToFav(false);
  };

  const removeMovieFromWatchLater = (movieId: number) => {
    dispatch(removeFromWatchLater(movieId));
    setIsAddedToWatchLater(false);
  };

  const movieRuntime = (time: number) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    return `${hours}h ${minutes}m`;
  };

  if (movieDetails) {
    const movieDate = movieDetails?.release_date;
    const seriesDate = seriesDetails?.first_air_date;
    let movieYear, seriesYear;

    if (movieDate) {
      const releaseDate = new Date(movieDate);
      movieYear = releaseDate.getFullYear();
    } else if (seriesDate) {
      const releaseDate = new Date(seriesDate);
      seriesYear = releaseDate.getFullYear();
    }

    return (
      <>
        <MovieDetailsCmp
          title={`${movieDetails?.title}`}
          name={`${seriesDetails?.name}`}
          movieYear={`${movieYear}`}
          seriesYear={`${seriesYear}`}
          movieBgImage={`linear-gradient(to right, rgba(0, 0, 0, 0.5) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.84) 50%, rgba(0, 0, 0, 0.84) 100%), url(${baseUrl}${movieDetails?.backdrop_path})`}
          seriesBgImage={`linear-gradient(to right, rgba(0, 0, 0, 0.5) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.84) 50%, rgba(0, 0, 0, 0.84) 100%), url(${baseUrl}${seriesDetails?.backdrop_path})`}
          moviePosterPath={`${baseUrl}${movieDetails?.poster_path}`}
          seriesPosterPath={`${baseUrl}${seriesDetails?.poster_path}`}
          genres={
            <>
              {movieDetails && (
                <HStack>
                  <UnorderedList
                    display={"flex"}
                    flexDir="row"
                    flexWrap="wrap"
                    listStyleType="none"
                    gap={5}
                  >
                    {movieDetails?.genres?.map((genre, idx) => (
                      <ListItem
                        key={idx}
                        fontSize={{ base: "14px", lg: "16px" }}
                      >
                        {genre.name}
                      </ListItem>
                    ))}
                  </UnorderedList>
                  <Text>|</Text>
                  <Box display={{ base: "none", md: "block" }}>
                    <Text fontSize={{ base: "14px", lg: "16px" }}>
                      {movieDetails?.runtime
                        ? movieRuntime(movieDetails.runtime)
                        : "N/A"}
                    </Text>
                  </Box>
                </HStack>
              )}{" "}
              {seriesDetails && (
                <UnorderedList
                  display={"flex"}
                  flexDir="row"
                  listStyleType="none"
                  gap={5}
                >
                  {seriesDetails?.genres?.map((genre, idx) => (
                    <ListItem key={idx} fontSize={{ base: "14px", lg: "16px" }}>
                      <Text>{genre.name}</Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              )}
            </>
          }
          noOfSeasons={`(${seriesDetails?.number_of_seasons || "N/A"})`}
          noOfEpisodes={`(${seriesDetails?.number_of_episodes || "N/A"})`}
          addToList={
            <>
              <Flex>
                <Text>Add to Favorites</Text>
                <Icon as={FaHeart} />
              </Flex>
              <Flex>
                <Text>Add to Watch List</Text>
                <Icon />
              </Flex>
            </>
          }
          overview={movieDetails?.overview || seriesDetails?.overview}
          productionCrew={
            <>
              {productionCrew &&
                sliceCrew.map((crew) => (
                  <ListItem key={crew.id}>
                    <Text
                      fontSize={{ base: "14px", lg: "16px" }}
                      fontWeight="bold"
                    >
                      {crew.name}
                    </Text>
                    <Text fontSize={{ base: "14px", lg: "16px" }}>
                      {crew.job}
                    </Text>
                  </ListItem>
                ))}
            </>
          }
          creator={
            <>
              {seriesDetails?.created_by && seriesDetails?.created_by.length > 0
                ? seriesDetails.created_by.map((crew, idx) => (
                    <ListItem key={idx}>
                      <Text
                        fontSize={{ base: "14px", lg: "16px" }}
                        fontWeight={"bold"}
                      >
                        {crew.name}
                      </Text>
                      <Text fontSize={{ base: "14px", lg: "16px" }}>
                        Creator
                      </Text>
                    </ListItem>
                  ))
                : seriesDetails?.aggregate_credits &&
                  seriesDetails?.aggregate_credits.crew
                ? seriesDetails?.aggregate_credits.crew
                    .slice(0, 2)
                    .map((crew, idx) => (
                      <ListItem key={idx}>
                        <Text
                          fontSize={{ base: "14px", lg: "16px" }}
                          fontWeight={"bold"}
                        >
                          {crew.name}
                        </Text>
                        <Text fontSize={{ base: "14px", lg: "16px" }}>
                          {crew.jobs && crew.jobs.length > 0
                            ? crew.jobs[0].job
                            : "Creator"}
                        </Text>
                      </ListItem>
                    ))
                : null}
            </>
          }
          playMovie={playMovie}
        />
      </>
    );
  }
};

export default DetailsCmp;
