import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Home from './page'; 

test('renders the Home component', () => {
  render(<Home />);

  const getStartedText = screen.getByText('Get started by editing');
  const nextJsLogo = screen.getByAltText('Next.js Logo');
  const docsLink = screen.getByText('Docs');
  const learnLink = screen.getByText('Learn');
  const templatesLink = screen.getByText('Templates');
  const deployLink = screen.getByText('Deploy');

  expect(getStartedText).toBeInTheDocument();
  expect(nextJsLogo).toBeInTheDocument();
  expect(docsLink).toBeInTheDocument();
  expect(learnLink).toBeInTheDocument();
  expect(templatesLink).toBeInTheDocument();
  expect(deployLink).toBeInTheDocument();
});
