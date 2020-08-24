import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    // marginBottom: 20,
    marginLeft: 70,
  },
});

export default function ImgMediaCard({
  isLoaded,
  image,
  name,
  episodeCode,
  air_date,
}) {
  const classes = useStyles();

  return (
    <div>
      {isLoaded ? (
        <CircularProgress />
      ) : (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="No Such Episode"
              height="200"
              image={image}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {episodeCode}
                <br />
                {air_date}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}
