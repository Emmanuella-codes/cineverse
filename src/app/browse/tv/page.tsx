"use client";
import { Container, Box, Text } from "@chakra-ui/react";
import { SeriesDetails } from "../../../../typings";
import useSWR from "swr";
import * as fetchers from "../../../utils/fetchData";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MovieRow = dynamic(() => import("@/components/MovieRow"));
const FooterCmp = dynamic(() => import("@/components/FooterCmp"));
const SearchCmp = dynamic(() => import("@/components/SearchCmp"));
const Loader = dynamic(() => import("@/components/Loader"));

interface Props {
  trendingSeries: SeriesDetails[];
  popularSeries: SeriesDetails[];
  docSeries: SeriesDetails[];
  actionSeries: SeriesDetails[];
  realitySeries: SeriesDetails[];
  kidsSeries: SeriesDetails[];
  familySeries: SeriesDetails[];
  mysterySeries: SeriesDetails[];
}

const SeriesPage: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  const { data: trendingSeries } = useSWR(
    "trendingSeries",
    fetchers.fetchTrendingSeries
  );
  const { data: popularSeries } = useSWR(
    "popularSeries",
    fetchers.fetchPopularSeries
  );
  const { data: docSeries } = useSWR("docSeries", fetchers.fetchDocSeries);
  const { data: actionSeries } = useSWR(
    "actionSeries",
    fetchers.fetchActionSeries
  );
  const { data: realitySeries } = useSWR(
    "realitySeries",
    fetchers.fetchRealitySeries
  );
  const { data: kidsSeries } = useSWR("kidsSeries", fetchers.fetchKidSeries);
  const { data: familySeries } = useSWR(
    "familySeries",
    fetchers.fetchFamilySeries
  );
  const { data: mysterySeries } = useSWR(
    "mysterySeries",
    fetchers.fetchMysterySeries
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container bg={"#212121"} maxW={""} centerContent overflow={"hidden"}>
      <SearchCmp />
      {/* main */}
      {loading ? (
        <Loader />
      ) : (
        <Box mt={7}>
          {/* trending */}
          <Box>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Trending Shows
            </Text>
            <MovieRow series={trendingSeries || []} />
          </Box>
          {/* popular */}
          <Box mt={14}>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Popular Shows
            </Text>
            <MovieRow series={popularSeries || []} />
          </Box>
          {/* documentary */}
          <Box mt={14}>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Documentary
            </Text>
            <MovieRow series={docSeries || []} />
          </Box>
          {/* action */}
          <Box mt={14}>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Action Shows
            </Text>
            <MovieRow series={actionSeries || []} />
          </Box>
          {/* reality */}
          <Box mt={14}>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Reality Shows
            </Text>
            <MovieRow series={realitySeries || []} />
          </Box>
          {/* kids Series */}
          <Box mt={14}>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Kid Shows
            </Text>
            <MovieRow series={kidsSeries || []} />
          </Box>
          {/* family */}
          <Box mt={14}>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Family Shows
            </Text>
            <MovieRow series={familySeries || []} />
          </Box>
          {/* mystery */}
          <Box mt={14}>
            <Text fontSize={"xl"} fontWeight={600} color={"#fff"}>
              Mystery
            </Text>
            <MovieRow series={mysterySeries || []} />
          </Box>
        </Box>
      )}
      <FooterCmp />
    </Container>
  );
};

export default SeriesPage;
