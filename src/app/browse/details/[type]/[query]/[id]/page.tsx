"use client";
import { Box, Container } from "@chakra-ui/react";
import { cache, useState, useEffect } from "react";
import {
  MovieCast,
  MovieCrew,
  MovieDetails,
  SeriesDetails,
} from "../../../../../../../typings";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FooterCmp = dynamic(() => import("@/components/FooterCmp"));
const DetailsCmp = dynamic(() => import("@/components/DetailsCmp"));
const CastCmp = dynamic(() => import("@/components/CastCmp"));
const Loader = dynamic(() => import("@/components/Loader"));

interface Props {
  movieDetails: MovieDetails;
  seriesDetails: SeriesDetails;
  castResult: MovieCast[];
}

const DetailsPage = ({ movieDetails, seriesDetails, castResult }: Props) => {
  const { id, type, query } = useParams();
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  /* for me --> use swr package for fetching */

  const getMediaDetails = cache(async (id: string, type: string) => {
    const res = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,casts,aggregate_credits`
    );

    const data = await res.json();
    return data;
  });

  const routeToWatch = () => {
    router.push(`/browse/details/${type}/${query}/${id}/watch`);
  };

  const [mediaResult, setMediaResult] = useState<
    MovieDetails | SeriesDetails | null
  >(null);

  const [castDetails, setCastDetails] = useState<MovieCast[] | []>([]);
  const [crewDetails, setCrewDetails] = useState<MovieCrew[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getMediaDetails(id, type);
      setMediaResult(results);

      if (results.casts) {
        setCastDetails(results.casts.cast);
        setCrewDetails(results.casts.crew);
      } else {
        setCastDetails(results.aggregate_credits.cast);
        setCrewDetails(results.aggregate_credits.crew);
      }
    };

    const timeout = setTimeout(() => {
      setLoading(false);
      fetchData();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [getMediaDetails, id, type]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Box mt={7} w={{ base: "93%", md: "85%" }}>
        {/* Pass the mediaResult to DetailsCmp */}
        {mediaResult && castDetails && (
          <Box>
            <DetailsCmp
              movieDetails={type === "movie" ? mediaResult : movieDetails}
              seriesDetails={type === "tv" ? mediaResult : seriesDetails}
              productionCrew={crewDetails}
              playMovie={routeToWatch}
            />
            <CastCmp castResult={castDetails} />
          </Box>
        )}
      </Box>
      <FooterCmp />
    </>
  );
};

export default DetailsPage;
