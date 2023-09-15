export interface Task {
  name: string;
  active: boolean;
}

export interface Inputs {
  task: string;
}

export interface InputFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  allTasks: Task[];
}

export interface TasksListProps {
  allTasks: Task[];
  activeTasks: Task[];
  mode: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export interface BottomMenuProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  allTasks: Task[];
  activeTasks: Task[];
}
