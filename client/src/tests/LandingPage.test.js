import { render, screen} from '@testing-library/react';
import LandingPage from '../components/LandingPage'
import { Link, MemoryRouter } from 'react-router-dom';
import React from 'react';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });


test('Renderiza texto de bienvenida', () => {
    render(<LandingPage />, { wrapper: MemoryRouter})
    expect(screen.getByText('Welcome to my final project!')).toBeInTheDocument()

}) 

test('Debe contener un link a /home',()=>{
  let landingPage = shallow(<LandingPage/>);
  expect(landingPage.find(Link).at(0).prop("to")).toEqual("/home");
})

test('Debe contener un botón para ingresar al home de la pagina',()=>{
  let landingPage = shallow(<LandingPage/>);
  expect(landingPage.find(Link).at(0).text()).toEqual("<AiOutlineHome />");
})