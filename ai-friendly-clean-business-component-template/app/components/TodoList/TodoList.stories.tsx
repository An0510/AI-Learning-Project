import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TodoList from './TodoList';
import { Task, TaskStatus } from './interface';

const meta: Meta<typeof TodoList> = {
  title: 'Components/TodoList',
  component: TodoList,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof TodoList>;

// 基础示例
const TaskManagerDemo: React.FC = () => {
  const [originalTasks] = useState<Task[]>([
    { id: '1', description: '任务一任务一任务一任务一任务一', status: 'done' },
    { id: '2', description: '任务二任务二任务二任务二任务二', status: 'done' },
    { id: '3', description: '任务三任务三任务三任务三任务三', status: 'todo' },
    { id: '4', description: '任务四任务四任务四任务四任务四', status: 'todo' }
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(originalTasks);

  const handleSearchTask = (keyword: string) => {
    const filtered = originalTasks.filter((task) => task.description.includes(keyword));
    setFilteredTasks(filtered);
  };

  const handleAddTask = (task: Task) => {
    setFilteredTasks([task, ...filteredTasks]);
  };

  const handleDeleteTask = (taskId: string) => {
    setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setFilteredTasks(
      filteredTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <TodoList
      tasks={filteredTasks}
      onSearchTask={handleSearchTask}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onUpdateTaskStatus={handleUpdateTaskStatus}
    />
  );
};

// 空列表示例
const EmptyTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSearchTask = () => {
    // 空列表搜索
  };

  const handleAddTask = (task: Task) => {
    setTasks([task, ...tasks]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)));
  };

  return (
    <TodoList
      tasks={tasks}
      onSearchTask={handleSearchTask}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onUpdateTaskStatus={handleUpdateTaskStatus}
    />
  );
};

// 大量任务示例
const ManyTasksManager: React.FC = () => {
  const generateTasks = (count: number): Task[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: `task-${index + 1}`,
      description: `这是第 ${index + 1} 个任务的描述，可能会很长很长很长很长很长很长`,
      status: index % 3 === 0 ? 'done' : 'todo'
    }));
  };

  const [originalTasks] = useState<Task[]>(generateTasks(20));
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(originalTasks);

  const handleSearchTask = (keyword: string) => {
    const filtered = originalTasks.filter((task) => task.description.includes(keyword));
    setFilteredTasks(filtered);
  };

  const handleAddTask = (task: Task) => {
    setFilteredTasks([task, ...filteredTasks]);
  };

  const handleDeleteTask = (taskId: string) => {
    setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setFilteredTasks(
      filteredTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <TodoList
      tasks={filteredTasks}
      onSearchTask={handleSearchTask}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onUpdateTaskStatus={handleUpdateTaskStatus}
    />
  );
};

// 全部已完成示例
const AllDoneTaskManager: React.FC = () => {
  const [originalTasks] = useState<Task[]>([
    { id: '1', description: '已完成任务一', status: 'done' },
    { id: '2', description: '已完成任务二', status: 'done' },
    { id: '3', description: '已完成任务三', status: 'done' },
    { id: '4', description: '已完成任务四', status: 'done' }
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(originalTasks);

  const handleSearchTask = (keyword: string) => {
    const filtered = originalTasks.filter((task) => task.description.includes(keyword));
    setFilteredTasks(filtered);
  };

  const handleAddTask = (task: Task) => {
    setFilteredTasks([task, ...filteredTasks]);
  };

  const handleDeleteTask = (taskId: string) => {
    setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setFilteredTasks(
      filteredTasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <TodoList
      tasks={filteredTasks}
      onSearchTask={handleSearchTask}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onUpdateTaskStatus={handleUpdateTaskStatus}
    />
  );
};

export const Default: Story = {
  render: () => <TaskManagerDemo />
};

export const EmptyList: Story = {
  render: () => <EmptyTaskManager />
};

export const ManyTasks: Story = {
  render: () => <ManyTasksManager />
};

export const AllDoneTasks: Story = {
  render: () => <AllDoneTaskManager />
};
