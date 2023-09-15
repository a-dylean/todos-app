import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
import AddIcon from "@mui/icons-material/Add";

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
        <Typography variant="h5">Todos</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ display: "flex", alignItems: "center" }}>
            <Input
              required
              id="task"
              autoFocus
              placeholder="What needs to be done?"
              {...register("task")}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleEnterPress}
              value={newTask}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="add task" type="submit">
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>

        <List>
          {selectedArr(mode).map((task, idx) => (
            <ListItem key={idx} divider secondaryAction={
              <IconButton onClick={() => removeTasks(idx)} edge="end" aria-label="delete task">
                  <DeleteForeverIcon />
                </IconButton>
            }
            >
                <IconButton onClick={() => toogleDoneTask(idx)}>
                  {task.active ? (
                    <RadioButtonUncheckedIcon />
                  ) : (
                    <CheckCircleIcon />
                  )}
                </IconButton>
                <ListItemText>{task.name}</ListItemText>
                
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
