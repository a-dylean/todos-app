import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Task, Inputs } from "./interfaces";

const App = () => {
  let [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const { register, handleSubmit } = useForm<Inputs>();

  const addTask = (name: string): void => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTask(newTask);
    setNewTask("");
    //taskInput.current?.focus();
  };

  const toogleDoneTask = (i: number): void => {
    const newTasks: Task[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTasks = (i: number) => {
    const newTasks: Task[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
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
              //fullWidth
              id="task"
              autoFocus
              placeholder="What needs to be done?"
              {...register("task", { required: true })}
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
            />
            <Button type="submit">Add</Button>
          </Box>
        </form>

        <List>
          {tasks.map((t: Task, i: number) => (
            <ListItem key={i}>
              <IconButton disableRipple onClick={() => toogleDoneTask(i)}>
                {t.done ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
              </IconButton>
              <Typography>{t.name}</Typography>

              <div>
                <IconButton onClick={() => removeTasks(i)}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};
export default App;
