import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Task, Inputs } from "./interfaces";

const App = () => {
  const [allTasks, setTasks] = useState<Task[]>([]);
  let [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  let activeTasks: Task[] = allTasks.filter((obj) => obj.active === true);
  let completedTasks: Task[] = allTasks.filter((obj) => obj.active === false);
  let [mode, setMode] = useState<string>("all");

  useEffect(() => {
    setMode(filter);
  }, [filter]);

  const { register, handleSubmit } = useForm<Inputs>();

  const addTask = (name: string): void => {
    if (name.trim().length === 0) {
      alert("Input can not be empty");
    }
    const newTasks = [...allTasks, { name, active: true }];
    setTasks(newTasks);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTask(newTask);
    setNewTask("");
  };

  const toogleDoneTask = (i: number): void => {
    const newTasks: Task[] = [...allTasks];
    newTasks[i].active = !newTasks[i].active;
    setTasks(newTasks);
  };

  const removeTasks = (i: number) => {
    const newTasks: Task[] = [...allTasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>, param: string) => {
    setFilter(param);
  };
  const handleEnterPress = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      handleSubmit(onSubmit);
    }
  };
  const handleClearButton = () => {
    setTasks(allTasks.filter((obj) => obj.active === true));
  };
  const selectedArr = (mode: string) => {
    switch (mode) {
      case "all":
        return allTasks;
      case "active":
        return activeTasks;
      case "completed":
        return completedTasks;
      default:
        return allTasks;
    }
  };
  return (
    <Container>
      <Paper sx={{ m: "0 auto", width: "50%" }}>
        <Typography component="h1" variant="h5">
          Todos
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              required
              id="task"
              autoFocus
              placeholder="What needs to be done?"
              {...register("task")}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleEnterPress}
              value={newTask}
            />
            <Button type="submit">Add</Button>
          </Box>
        </form>

        <List>
          {selectedArr(mode).map((task, idx) => (
            <ListItem key={idx} divider>
              <IconButton onClick={() => toogleDoneTask(idx)}>
                {task.active ? (
                  <RadioButtonUncheckedIcon />
                ) : (
                  <CheckCircleIcon />
                )}
              </IconButton>
              <Typography>{task.name}</Typography>
              <IconButton onClick={() => removeTasks(idx)}>
                <DeleteForeverIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
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
      </Paper>
    </Container>
  );
};
export default App;
