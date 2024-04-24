import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  title: string;
  name: string;
  movieYear: string;
  seriesYear: string;
  movieBgImage: string;
  seriesBgImage: string;
  moviePosterPath: string;
  seriesPosterPath: string;
  tagline?: string;
  genres: React.ReactNode;
  noOfSeasons: string;
  noOfEpisodes: string;
  addToList: React.ReactNode;
  overview: string;
  productionCrew: React.ReactNode;
  creator: React.ReactNode;
  playMovie: () => void;
}

const MovieDetailsCmp: FC<Props> = ({
  title,
  name,
  movieYear,
  seriesYear,
  movieBgImage,
  seriesBgImage,
  moviePosterPath,
  seriesPosterPath,
  tagline,
  genres,
  noOfSeasons,
  noOfEpisodes,
  addToList,
  overview,
  creator,
  productionCrew,
  playMovie,
}) => {
  return (
    <Box>
      <Text
        textTransform="uppercase"
        fontSize={{ base: "md", md: "3xl" }}
        py={2}
      >
        {`${title || name} (${movieYear || seriesYear})`}
      </Text>
      <Grid
        bgImage={movieBgImage || seriesBgImage}
        backgroundSize="cover"
        bgRepeat={"no-repeat"}
        width={"100%"}
        py={8}
        px={{ base: 3, md: 8 }}
        templateColumns="repeat(4, 1fr)"
        gap={4}
        borderRadius={"10px"}
      >
        <GridItem display={{ base: "none", md: "grid" }}>
          <Image
            src={moviePosterPath || seriesPosterPath}
            alt="poster"
            width={200}
            height={200}
          />
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 3 }}>
          {tagline && (
            <Text fontStyle="italic" fontSize={{ base: "14px", lg: "16px" }}>
              {tagline}
            </Text>
          )}
          {genres}
          {noOfSeasons && (
            <Flex flexDir="column" mt={2}>
              <Text fontSize={{ base: "14px", lg: "16px" }}>{noOfSeasons}</Text>
              <Text fontSize={{ base: "14px", lg: "16px" }}>
                {noOfEpisodes}
              </Text>
            </Flex>
          )}
          <Box mt={4}>{addToList}</Box>
          <Box mt={4}>
            <Text
              fontSize={{ base: "14px", lg: "16px" }}
              fontWeight={"semibold"}
            >
              Overview
            </Text>
            <Text fontSize={{ base: "13px", lg: "16px" }}>{overview}</Text>
          </Box>
          <UnorderedList display={"flex"} gap={8} listStyleType="none" pt={4}>
            {creator}
            {productionCrew}
          </UnorderedList>
          <Button
            className="play-btn"
            px={5}
            size={{ base: "sm", lg: "md" }}
            mt={2}
            onClick={playMovie}
          >
            Play
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MovieDetailsCmp;
