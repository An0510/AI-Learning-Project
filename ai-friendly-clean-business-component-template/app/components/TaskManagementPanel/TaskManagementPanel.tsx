import React, { useState, useEffect } from 'react';
import { Input, Button, List, Checkbox } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Task, TaskManagementPanelProps } from './interface';
import { generateId } from './helpers';

const TaskManagementPanel: React.FC<TaskManagementPanelProps> = ({
  initialTasks = [],
  onTasksChange,
  onSearch,
  onTaskAdd,
  onTaskDelete,
  onTaskStatusChange,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchText, setSearchText] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // 当外部initialTasks变化时更新内部状态
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // 处理内部任务变更，并通过回调通知外部
  const handleTasksChange = (newTasks: Task[]) => {
    setTasks(newTasks);
    onTasksChange?.(newTasks);
  };

  // 处理搜索
  const handleSearch = () => {
    onSearch?.(searchText);
  };

  // 处理添加任务
  const handleAddTask = () => {
    if (!newTaskContent.trim()) return;
    
    const newTask: Omit<Task, 'id'> = {
      content: newTaskContent.trim(),
      completed: false,
    };
    
    // 如果提供了外部添加回调，则使用它
    if (onTaskAdd) {
      onTaskAdd(newTask);
    } else {
      // 否则在内部处理
      const taskWithId: Task = {
        ...newTask,
        id: generateId(),
      };
      handleTasksChange([...tasks, taskWithId]);
    }
    
    // 重置状态
    setNewTaskContent('');
    setIsAddingTask(false);
  };

  // 处理删除任务
  const handleDeleteTask = (taskId: string) => {
    if (onTaskDelete) {
      onTaskDelete(taskId);
    } else {
      handleTasksChange(tasks.filter(task => task.id !== taskId));
    }
  };
  // 处理任务状态更改
  const handleTaskStatusChange = (taskId: string, completed: boolean) => {
    if (onTaskStatusChange) {
      onTaskStatusChange(taskId, completed);
    } else {
      handleTasksChange(
        tasks.map(task => (task.id === taskId ? { ...task, completed } : task))
      );
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white">
      <h1 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">任务管理面板</h1>
      
      {/* 搜索和添加区域 */}
      <div className="flex gap-4 mb-4">
        <Input 
          placeholder="请输入任务进行搜索" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          prefix={<SearchOutlined />}
          className="flex-1"
        />
        <Button 
          type="primary" 
          onClick={() => setIsAddingTask(true)}
          icon={<PlusOutlined />}
        >
          新增任务
        </Button>
      </div>

      {/* 新增任务输入区域 */}
      {isAddingTask && (
        <div className="mb-4 p-4 border border-gray-200 rounded-md">
          <p className="mb-2">请输入新增的任务信息</p>
          <div className="flex items-center">
            <Input 
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
              onPressEnter={handleAddTask}
              className="flex-1 mr-2"
            />
            <div className="flex gap-2">
              <Button type="primary" onClick={handleAddTask}>确认</Button>
              <Button onClick={() => {
                setIsAddingTask(false);
                setNewTaskContent('');
              }}>取消</Button>
            </div>
          </div>
        </div>
      )}

      {/* 任务列表 */}
      <List
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item className="border border-gray-200 rounded-md p-2 mb-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Checkbox 
                  checked={task.completed}
                  onChange={(e) => handleTaskStatusChange(task.id, e.target.checked)}
                  className="mr-3"
                />
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                  {task.content}
                </span>
              </div>
              <Button 
                type="link" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => handleDeleteTask(task.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                删除
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskManagementPanel;