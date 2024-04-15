// Task.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Task from '../components/Task';

describe('Task component', () => {
  it('renders task correctly with title and description', () => {
    const task = { id: 1, title: 'test task', description: 'test task description goes here', completed: false };
    const { getByText } = render(<Task task={task} onDelete={() => {}} onToggleCompleted={() => {}} />);

    expect(getByText('test task')).toBeInTheDocument();
    expect(getByText('test task description goes here')).toBeInTheDocument();
  });

  it('renders completed task with completed class', () => {
    const task = { id: 1, title: 'test task', description: 'test task description goes here', completed: true };
    const { container } = render(<Task task={task} onDelete={() => {}} onToggleCompleted={() => {}} />);

    expect(container.querySelector('.task.completed')).toBeInTheDocument();
  });

  it('calls onDelete prop on delete button click', () => {
    const task = { id: 1, title: 'test task', description: 'test task description goes here', completed: false };
    const mockOnDelete = jest.fn();
    const { getByText } = render(<Task task={task} onDelete={mockOnDelete} onToggleCompleted={() => {}} />);

    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(task.id);
  });
});
