import React from 'react';
import Map from './Map';
import { MemoryRouter } from 'react-router-dom'
import { screen, act } from '@testing-library/react';
import { render, unmountComponentAtNode } from "react-dom";
import { Provider } from 'react-redux'
import store from "../../store"
import userEvent from '@testing-library/user-event';

jest.mock('mapbox-gl', () => ({
  Map: function () {
    this.on = jest.fn();
    this.flyTo = jest.fn();
    this.remove = jest.fn();
  }
}));

const data = {
  name: "Test_User",
  features: [{place_name:'SPB'}, {address: 'MACDONALDS'}]
};

const spyDispatch = jest.spyOn(store, 'dispatch');

let container = null;

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(data)
        })
  );

  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  jest.clearAllMocks();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders map and closes', async () => {
  Object.defineProperty(window.navigator, 
    'permissions', 
    {
      value: {
        query: jest.fn().mockImplementation(() => Promise.resolve({ state: 'granted' })), configurable: true
      }
    
    });

  Object.defineProperty(window.navigator, 
    'geolocation', 
      {value: 
        {
          getCurrentPosition: jest.fn().mockImplementation((success) =>
            Promise.resolve(
              success(
              {
                coords: {
                  latitude: 30.3609,
                  longitude: 59.9311,
                },
              })
            )
        ), configurable: true
        }
    });

      await act(async () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <Map />
            </MemoryRouter>
        </Provider>, container);
      });

    expect(screen.queryByText(/Longitude/)).toBeInTheDocument();
    userEvent.click(screen.queryByTestId('map_success'));
    expect(spyDispatch).toHaveBeenCalled();
    userEvent.click(screen.queryByTestId('map_close'));
    expect(screen.queryByTestId("maр_global")).toBeNull();
});