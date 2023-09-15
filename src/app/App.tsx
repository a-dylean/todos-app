import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "./interfaces";
import { InputForm } from "../components/inputForm";
import { TasksList } from "../components/tasksList";
import { BottomMenu } from "../components/bottomMenu";

const App = () => {
  const [allTasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  let activeTasks: Task[] = allTasks.filter((obj) => obj.active === true);
  let [mode, setMode] = useState<string>("all");

  useEffect(() => {
    setMode(filter);
  }, [filter]);

  return (
    <Container>
      <Paper sx={{ m: "0 auto", width: "50%" }}>
        <Typography variant="h5">Todos</Typography>
        <InputForm allTasks={allTasks} setTasks={setTasks}/>
        <TasksList allTasks={allTasks} activeTasks={activeTasks} mode={mode} setTasks={setTasks}/>
        <BottomMenu setFilter={setFilter} setTasks={setTasks} allTasks={allTasks} activeTasks={activeTasks}/>
      </Paper>
    </Container>
  );
};
export default App;
