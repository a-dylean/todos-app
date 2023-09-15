import { Box, Typography, ButtonGroup, Button } from "@mui/material"
import { BottomMenuProps } from "../app/interfaces";

export const BottomMenu =({setFilter, setTasks, activeTasks, allTasks}: BottomMenuProps) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>, param: string) => {
        setFilter(param);
      };
    
      const handleClearButton = () => {
        setTasks(allTasks.filter((obj) => obj.active === true));
      };
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>{activeTasks.length} items left</Typography>
          <ButtonGroup size="small">
            <Button onClick={(e) => handleClick(e, "all")}>All</Button>
            <Button onClick={(e) => handleClick(e, "active")}>Active</Button>
            <Button onClick={(e) => handleClick(e, "completed")}>
              Completed
            </Button>
          </ButtonGroup>
          <Button onClick={handleClearButton}>Clear completed</Button>
        </Box>
    )
}