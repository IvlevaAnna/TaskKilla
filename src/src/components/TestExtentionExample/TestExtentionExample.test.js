import React from 'react';
import TestExtentionExample from './TestExtentionExample';
import { MemoryRouter } from 'react-router-dom'
import { screen, act} from '@testing-library/react'; 
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux'
import store from "../../store"

const data = [
    {
      title: "Task1",
      description: "description1"
    },
    {
      title: "Task2",
      description: "description2"
    },
    {
      title: "Task3",
      description: "description3"
    }
];

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  jest.clearAllMocks();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders TestExtentionExample with not empty taskList', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data)
        })
    );
    
    await act(async () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <TestExtentionExample />
            </MemoryRouter>
        </Provider>, container);
      });

    expect(screen.queryByTestId("test-component")).toBeInTheDocument();
    expect(store.getState().app.taskList).toHaveLength(3);
    expect(screen.getByText("Task1")).toBeInTheDocument();
    expect(screen.getByText("Task2")).toBeInTheDocument();
    expect(screen.getByText("Task3")).toBeInTheDocument();
});
