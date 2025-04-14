/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * 过滤任务列表
 * @param tasks 任务列表
 * @param searchText 搜索文本
 * @returns 过滤后的任务列表
 */
export const filterTasks = (tasks: Array<{content: string}>, searchText: string) => {
  if (!searchText.trim()) return tasks;
  
  const lowerSearchText = searchText.toLowerCase();
  return tasks.filter(task => 
    task.content.toLowerCase().includes(lowerSearchText)
  );
};