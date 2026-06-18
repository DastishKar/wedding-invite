import { render, screen } from '@testing-library/react';
import App from './App';

test('renders invitation title', () => {
  render(<App />);
  const titleElement = screen.getAllByText(/Қыз Ұзату/i)[0];
  expect(titleElement).toBeInTheDocument();
});
