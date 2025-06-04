import { render, screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Todos App')).toBeTruthy();
  });

  it('should render the task input and add button', () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<App />);

    expect(screen.getByPlaceholderText('Enter task name')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeTruthy();
  });

  it('should show message when no tasks are available', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<App />);

    expect(await screen.findByText('No tasks available.')).toBeTruthy();
  });
});
