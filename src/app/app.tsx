import { Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Task } from "./interfaces";
import { InputForm } from "../components/inputForm";
import { TasksList } from "../components/tasksList";
import { BottomMenu } from "../components/bottomMenu";

const App = () => {
  const [allTasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const activeTasks: Task[] = allTasks.filter((obj) => obj.active === true);

  useEffect(() => {
    setFilter(filter);
  }, [filter]);

  return (
    <Container>
      <Paper
        sx={{
          m: "0 auto",
          width: { xs: "100%", sm: "60%" },
          backgroundColor: "#fffee0",
        }}
      >
        <Typography align="center" variant="h4" sx={{ p: 1 }}>
          Todos:
        </Typography>
        <InputForm allTasks={allTasks} setTasks={setTasks} />
        <TasksList
          allTasks={allTasks}
          activeTasks={activeTasks}
          filter={filter}
          setTasks={setTasks}
        />
        <BottomMenu
          filter={filter}
          setFilter={setFilter}
          setTasks={setTasks}
          allTasks={allTasks}
          activeTasks={activeTasks}
        />
      </Paper>
    </Container>
  );
};
export default App;
