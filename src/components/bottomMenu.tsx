import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { BottomMenuProps } from "../app/interfaces";

export const BottomMenu = ({
  filter,
  setFilter,
  setTasks,
  activeTasks,
  allTasks,
}: BottomMenuProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newparam: string
  ) => {
    setFilter(newparam);
  };
  const handleClearButton = () => {
    setTasks(allTasks.filter((obj) => obj.active === true));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        p: 2,
      }}
    >
      <Typography sx={{ display: { xs: "none", sm: "block" } }}>
        {activeTasks.length} items left
      </Typography>
      <ToggleButtonGroup
        size="small"
        value={filter}
        onChange={handleChange}
        exclusive
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
      </ToggleButtonGroup>
      <Button size="small" onClick={handleClearButton}>
        Clear completed
      </Button>
    </Box>
  );
};
