import type { Meta, StoryObj } from '@storybook/react';
import { TaskManagementPanel } from './index';
import { useState } from 'react';
import type { Task } from './interface';

const meta: Meta<typeof TaskManagementPanel> = {
  title: 'Business/TaskManagementPanel',
  component: TaskManagementPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskManagementPanel>;

// 基础使用示例
export const Basic: Story = {
  render: () => {
    const [tasks, setTasks] = useState<Task[]>([
      { id: '1', content: '任务一任务一任务一任务一任务一', completed: true },
      { id: '2', content: '任务二任务二任务二任务二任务二任务二任务二', completed: true },
      { id: '3', content: '任务三任务三任务三任务三任务三任务三任务三任务三任务三', completed: false },
      { id: '4', content: '任务四任务四任务四任务四任务四任务四任务四任务四任务四任务四任务四', completed: false },
    ]);

    const handleTasksChange = (newTasks: Task[]) => {
      setTasks(newTasks);
      console.log('Tasks changed:', newTasks);
    };

    const handleSearch = (searchText: string) => {
      console.log('Search:', searchText);
    };

    const handleTaskAdd = (task: Omit<Task, 'id'>) => {
      const newTask = {
        ...task,
        id: Date.now().toString(),
      };
      setTasks([...tasks, newTask]);
      console.log('Task added:', newTask);
    };

    const handleTaskDelete = (taskId: string) => {
      setTasks(tasks.filter(task => task.id !== taskId));
      console.log('Task deleted:', taskId);
    };

    const handleTaskStatusChange = (taskId: string, completed: boolean) => {
      setTasks(
        tasks.map(task => 
          task.id === taskId ? { ...task, completed } : task
        )
      );
      console.log('Task status changed:', taskId, completed);
    };

    return (
      <div className="w-[800px]">
        <TaskManagementPanel
          initialTasks={tasks}
          onTasksChange={handleTasksChange}
          onSearch={handleSearch}
          onTaskAdd={handleTaskAdd}
          onTaskDelete={handleTaskDelete}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>
    );
  },
};

// 空数据示例
export const Empty: Story = {
  render: () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
      <div className="w-[800px]">
        <TaskManagementPanel
          initialTasks={tasks}
          onTasksChange={setTasks}
        />
      </div>
    );
  },
};