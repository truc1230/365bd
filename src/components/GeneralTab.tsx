import { Grid, Stack, TextField } from "@mui/material";
import React, { ChangeEventHandler } from "react";

type Props = {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function GeneralTab({ handleChange }: Props) {
  return (
    <Stack spacing={4}>
      <Grid container className="justify-between">
        <Grid>
          <TextField
            name="title"
            id="title"
            label=" lead Title"
            variant="filled"
            onChange={handleChange}
          />
        </Grid>
        <Grid>
          <TextField
            name="address"
            id="address"
            label="Address"
            variant="filled"
            onChange={handleChange}
          />
        </Grid>
        <Grid>
          <TextField
            name="city"
            id="city"
            label="City"
            variant="filled"
            onChange={handleChange}
          />
        </Grid>
        <Grid>
          <TextField
            name="state"
            id="state"
            label="State"
            variant="filled"
            onChange={handleChange}
          />
        </Grid>
        <Grid>
          <TextField
            name="zipcode"
            id="zipcode"
            label="Zip Code"
            variant="filled"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid>
        <TextField
          fullWidth
          name="notes"
          multiline
          rows={4}
          placeholder="Notes"
          // error={Boolean(touched.content && errors.content)}
          // helperText={touched.content && errors.content}
          variant="filled"
          onChange={handleChange}
        />
      </Grid>
    </Stack>
  );
}
