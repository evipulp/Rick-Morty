import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div style={{ marginBottom: 14, marginLeft: 14 }}>
        <Grid item alignItems="center" direction="row" justify="center" lg={12}>
          <TextField
            variant="outlined"
            placeholder="Search Episode"
            label="Episode Name"
            value={this.state.term}
            onChange={(event) => {
              this.setState({ term: event.target.value }, () => {
                this.props.onSubmit(this.state.term);
              });
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </div>
    );
  }
}

export default SearchBar;
