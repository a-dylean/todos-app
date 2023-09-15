import { FormControl, Input, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputFormProps, Inputs } from "../app/interfaces";
import AddIcon from "@mui/icons-material/Add";

export const InputForm = ({ allTasks, setTasks }: InputFormProps) => {
  const { register, handleSubmit } = useForm<Inputs>();
  let [newTask, setNewTask] = useState<string>("");
  const handleEnterPress = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      handleSubmit(onSubmit);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTask(newTask);
    setNewTask("");
  };
  const addTask = (name: string): void => {
    if (name.trim().length === 0) {
      alert("Input can not be empty");
    }
    const newTasks = [...allTasks, { name, active: true }];
    setTasks(newTasks);
  };
  return (
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
  );
};
