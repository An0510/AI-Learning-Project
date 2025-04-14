export interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export interface TaskManagementPanelProps {
  /**
   * 任务列表初始数据
   */
  initialTasks?: Task[];
  
  /**
   * 当任务数据发生变化时触发的回调
   */
  onTasksChange?: (tasks: Task[]) => void;
  
  /**
   * 当搜索任务时触发的回调
   */
  onSearch?: (searchText: string) => void;
  
  /**
   * 当添加新任务时触发的回调
   */
  onTaskAdd?: (task: Omit<Task, 'id'>) => void;
  
  /**
   * 当删除任务时触发的回调
   */
  onTaskDelete?: (taskId: string) => void;
  
  /**
   * 当任务状态改变时触发的回调
   */
  onTaskStatusChange?: (taskId: string, completed: boolean) => void;
}