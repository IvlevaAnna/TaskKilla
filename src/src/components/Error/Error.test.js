import React from 'react';
import Error from './Error';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'

it('renders Error page', () => {
    render(
        <MemoryRouter>
            <Error />
        </MemoryRouter>
    );
    expect(screen.getByText('start page')).toBeInTheDocument();
});