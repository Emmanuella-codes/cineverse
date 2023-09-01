"use client";
import { Box, Container } from "@chakra-ui/react";
import { cache, useState, useEffect } from "react";
import {
  MovieCast,
  MovieCrew,
  MovieDetails,
  SeriesDetails,
} from "../../../../../../../typings";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const FooterCmp = dynamic(() => import("@/components/FooterCmp"));
const SearchCmp = dynamic(() => import("@/components/SearchCmp"));
const DetailsCmp = dynamic(() => import("@/components/DetailsCmp"));
const CastCmp = dynamic(() => import("@/components/CastCmp"));

interface Props {
  movieDetails: MovieDetails;
  seriesDetails: SeriesDetails;
  castResult: MovieCast[];
}

const DetailsPage = ({ movieDetails, seriesDetails, castResult }: Props) => {
  const { id, type } = useParams();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  let addEndpoint = "/credits";
  if (type === "tv") {
    addEndpoint = "/aggregate_credits";
  }

  /* for me --> use swr package for fetching
   * use append_to_response for the cast instead of fetching separately
   */

  const getMediaDetails = cache(async (id: string, type: string) => {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos`
    );

    const data = await res.json();
    return data;
  });

  const getCast = cache(async (id: string, type: string) => {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}${addEndpoint}?api_key=${API_KEY}&language=en-US`
    );

    const data = await res.json();
    return data;
  });

  const [mediaResult, setMediaResult] = useState<
    MovieDetails | SeriesDetails | null
  >(null);

  const [castDetails, setCastDetails] = useState<MovieCast[] | []>([]);

  const [crewDetails, setCrewDetails] = useState<MovieCrew[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getMediaDetails(id, type);
      setMediaResult(results);

      const fetchCast = await getCast(id, type);
      setCastDetails(fetchCast.cast);
      setCrewDetails(fetchCast.crew);
    };
    fetchData();
  }, [getCast, getMediaDetails, id, type]);

  return (
    <Container bg={"#212121"} maxW={""} centerContent color="#fff">
      <SearchCmp />
      <Box mt={7} w={"85%"}>
        {/* Pass the mediaResult to DetailsCmp */}
        {mediaResult && castDetails && (
          <Box>
            <DetailsCmp
              movieDetails={type === "movie" ? mediaResult : movieDetails}
              seriesDetails={type === "tv" ? mediaResult : seriesDetails}
              productionCrew={crewDetails}
            />
            <CastCmp castResult={castDetails} />
          </Box>
        )}
      </Box>
      <FooterCmp />
    </Container>
  );
};

export default DetailsPage;
