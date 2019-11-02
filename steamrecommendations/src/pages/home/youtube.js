import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

const data = [
  {
    src:
      "https://steamcdn-a.akamaihd.net/steam/apps/392110/header_alt_assets_1.jpg?t=1572279581",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396 k views",
    createdAt: "a week ago"
  },
  {
    src:
      "https://steamcdn-a.akamaihd.net/steam/subs/124923/header_ratio.jpg?t=1472603344",
    title: "Top Latino Songs 2019 - Luis Fonsi, Ozuna, Nicky Jam…",
    channel: "Dj Yanky Plus",
    views: "2.1 M views",
    createdAt: "4 months ago"
  },
  {
    src:
      "https://steamcdn-a.akamaihd.net/steam/apps/883710/header.jpg?t=1556224097",
    title: "Calvin Harris, Sam Smith - Promises (Official Video)",
    channel: "Calvin Harris",
    views: "130 M views",
    createdAt: "10 months ago"
  }
];

function Media(props) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box key={index} width={"40.3%"} marginRight={0} marginLeft={0} my={0}>
          {item ? (
            <img
              style={{ width: "90%", height: "250px" }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rect" width={"20%"} height={150} />
          )}

          {item ? (
            <Box paddingRight={5}>
              <Typography 
              gutterBottom variant="body2"
              color="error"
              >
                {item.title}
              </Typography>
              <Typography
                display="block"
                variant="caption"
                color="error"
              >
                {item.channel}
              </Typography>
              <Typography variant="caption" color="error">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <React.Fragment>
              <Skeleton />
              <Skeleton width="90%" />
            </React.Fragment>
          )}
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool
};

export default function YouTube() {
  return (
    <Box overflow="hidden" >
      <Box px={6}>
           <Media />
           <Media />
        </Box>
    </Box>
  );
}
