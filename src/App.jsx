import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { intervalToDuration, isAfter, isBefore, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import CountUp from "react-countup";

function formatNumber(number) {
  if (number < 10) {
    return "0";
  }
  return "";
}

function App() {
  const [different, setDifferrent] = useState(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data, e) {
    e.preventDefault();
    const start = parseISO(data.startDate);
    const end = parseISO(data.endDate);

    const { years, months, days } = intervalToDuration({
      start,
      end,
    });
    setDifferrent({
      years,
      months,
      days,
    });
  }

  function onReset() {
    reset();
    setDifferrent(null);
  }

  return (
    <Grid
      container
      spacing={1}
      rowSpacing={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        <img
          src="/logo.png"
          alt="logo"
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container justifyContent={"center"} spacing={1}>
                <Grid item xs={6}>
                  <InputLabel htmlFor="startDate">Start Date</InputLabel>
                  <TextField
                    id="startDate"
                    type="date"
                    name="startDate"
                    {...register("startDate", {
                      required: {
                        value: true,
                        message: "Start Date is required",
                      },
                    })}
                    fullWidth
                    error={Boolean(errors.startDate)}
                    helperText={errors.startDate?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel htmlFor="endDate">End Date</InputLabel>
                  <TextField
                    id="endDate"
                    type="date"
                    name="endDate"
                    {...register("endDate", {
                      required: {
                        value: true,
                        message: "End Date is required",
                      },
                      validate: (value) => {
                        return (
                          isBefore(
                            parseISO(getValues("startDate")),
                            parseISO(value)
                          ) || "End Date must be after Start Date"
                        );
                      },
                    })}
                    fullWidth
                    error={Boolean(errors.endDate)}
                    helperText={errors.endDate?.message}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                type="submit"
                startIcon={<KeyboardDoubleArrowDownIcon />}
                fullWidth
              >
                Calculate
              </Button>
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={onReset}
                fullWidth
              >
                Reset
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      {different && (
        <Grid item container xs={12} spacing={1} rowSpacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" textAlign={"center"}>
              🗓️ Get ready for the big day! Only:
            </Typography>
          </Grid>

          <Grid item container xs={4}>
            <Button variant="outlined" fullWidth>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    {formatNumber(different.years)}
                    <CountUp end={different.years} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ typography: { sm: "h5", md: "h3" } }}>
                    Years
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item container xs={4}>
            <Button variant="outlined" fullWidth>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    {formatNumber(different.months)}
                    <CountUp end={different.months} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ typography: { sm: "h5", md: "h3" } }}>
                    Months
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item container xs={4}>
            <Button variant="outlined" fullWidth>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    {formatNumber(different.days)}
                    <CountUp end={different.days} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ typography: { sm: "h5", md: "h3" } }}>
                    Days
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default App;
