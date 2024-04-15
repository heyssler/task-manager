import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import Task from '../components/Task';

// mocking the Task component here so that we don't rewrite tests
jest.mock('../components/Task', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('TaskList component', () => {
  it('renders an empty list when no tasks are provided', () => {
    const tasks = [];
    render(<TaskList tasks={tasks} onDelete={() => {}} onToggleCompleted={() => {}} sortField='' sortOrder='' />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByText('test task')).not.toBeInTheDocument();
  });

  it('renders tasks from the provided list', () => {
    const tasks = [
      { id: 1, title: 'test task 1', description: 'test task 1 description goes here', completed: false },
      { id: 2, title: 'test task 2', description: 'test task 2 description goes here', completed: true },
    ];
    render(<TaskList tasks={tasks} onDelete={() => {}} onToggleCompleted={() => {}} sortField='' sortOrder='' />);

    expect(screen.getAllByRole('list')[0]).toBeInTheDocument();
    expect(Task).toHaveBeenCalledTimes(tasks.length);
  });
});
