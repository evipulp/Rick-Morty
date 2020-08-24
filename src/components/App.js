import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import apicall from "../api/apicall";
import EpisodeCard from "./EpisodeCard";
import PaginationLink from "./PaginationLink";
import { Grid, Typography, CircularProgress } from "@material-ui/core";

const App = () => {
  const [both, setBoth] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParams] = useState("");
  const [loader, setLoader] = useState(true);

  const getEpisodesData = async (pageNumber) => {
    const {
      data: { results },
    } = await apicall.get(`/episode/?page=${pageNumber}`);
    return results;
  };
  const getCharacterDtata = async (pageNumber) => {
    const {
      data: { results },
    } = await apicall.get(`/character/?page=${pageNumber}`);
    return results;
  };

  const fetchData = async (pageNumber) => {
    const [episodes, character] = await Promise.all([
      getEpisodesData(pageNumber),
      getCharacterDtata(pageNumber),
    ]);
    let both = [];
    if (searchParams === "") {
      both = episodes.map((e) => {
        if (character.find((f) => f.id === e.id)) {
          const obj = character.find((f) => f.id === e.id);
          return { ...e, image: obj.image };
        }
        return e;
      });
    } else {
      both = episodes
        .map((e) => {
          if (character.find((f) => f.id === e.id)) {
            const obj = character.find((f) => f.id === e.id);
            return { ...e, image: obj.image };
          }
          return e;
        })
        .filter((g) =>
          g.name.toLowerCase().includes(searchParams.toLowerCase())
        );
    }
    setBoth(both);
    setLoader(false);
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [searchParams]);

  const onSearchSubmit = (searchName) => {
    setSearchParams(searchName);
  };

  const pickPageNumber = (page) => {
    setPageNumber(page);
    fetchData(page);
  };

  return (
    <Grid container spacing={2}>
      <Grid container alignItems="center" direction="row" justify="center">
        <Typography
          variant="h3"
          style={{
            margin: 10,
            padding: 0,
            alignItems: "center",
            borderSpacing: 0,
            border: `1 !solid`,
            direction: "row",
          }}
        >
          Rick & Morty
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <SearchBar onSubmit={onSearchSubmit} />
      </Grid>
      {both.length > 0 ? (
        both.map((e, idx) => (
          <Grid item lg={3} md={3} sm={4} xs={6}>
            <EpisodeCard
              key={idx}
              name={e.name}
              episodeCode={e.episode}
              air_date={e.air_date}
              image={e.image}
              isLoaded={loader}
            />
          </Grid>
        ))
      ) : (
        <Grid container alignItems="center" direction="row" justify="center">
          {loader ? (
            <CircularProgress />
          ) : (
            <Typography
              variant="h6"
              style={{
                margin: 10,
                padding: 0,
                alignItems: "center",
                borderSpacing: 0,
                border: `1 !solid`,
                direction: "row",
              }}
            >
              No result to display
            </Typography>
          )}
        </Grid>
      )}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Grid container alignItems="center" direction="row" justify="center">
          <PaginationLink pickPageNumber={pickPageNumber} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
