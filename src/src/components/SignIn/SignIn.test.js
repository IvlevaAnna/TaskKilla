import React from 'react';
import SignIn from './SignIn';
import { MemoryRouter } from 'react-router-dom'
import { screen, render} from '@testing-library/react'; 
import { Provider } from 'react-redux'
import store from "../../store"

//Мок не работает
// jest.mock('react-google-login', () => {
//     const defaultMockSuccess = {
//       tokenId: 'tokenId',
//     };
  
//     const GoogleLogin = ({ onSuccess, buttonText }) => {
//       const handleClick = () => {
//         onSuccess(defaultMockSuccess);
//       };
  
//       return <button onClick={handleClick}>login</button>;
//     };
  
//     return GoogleLogin;
//   });

// let container;
//   beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//   });
  
//   afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
//   });

it('renders signIn', () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        </Provider>);

    expect(screen.queryByText('Welcome')).toBeInTheDocument();
});
