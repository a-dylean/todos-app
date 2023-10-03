import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import { Task, TasksListProps } from "../app/interfaces";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const TasksList = ({
  allTasks,
  activeTasks,
  filter,
  setTasks,
}: TasksListProps) => {
  const completedTasks: Task[] = allTasks.filter((obj) => obj.active === false);
  const selectedArr = (filter: string) => {
    switch (filter) {
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
  return (
    <List>
      {selectedArr(filter).map((task, idx) => (
        <ListItem
          key={idx}
          divider
          secondaryAction={
            <IconButton
              onClick={() => removeTasks(idx)}
              edge="end"
              aria-label="delete task"
            >
              <DeleteForeverIcon />
            </IconButton>
          }
        >
          <IconButton onClick={() => toogleDoneTask(idx)}>
            {task.active ? <RadioButtonUncheckedIcon /> : <CheckCircleIcon />}
          </IconButton>
          <ListItemText>{task.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
