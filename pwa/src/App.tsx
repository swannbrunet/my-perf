import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './app/';
import DefaultLayout from './layouts/defaultLayout';
import Session from './components/session'
import { GlobalStateProvider } from './contexts/globalState.context';
import { Stats } from './app/stats';
import { ConfigPage } from './app/config';
import { ExercisesTypeProvider } from './contexts/exercicesType.context';

function MyPerfApp() {
  return (
    <GlobalStateProvider>
      <ExercisesTypeProvider>
        <BrowserRouter>
          <DefaultLayout>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/stat' element={<Stats />} />
              <Route path='/config' element={<ConfigPage />} />
            </Routes>
          </DefaultLayout>
        </BrowserRouter>
      </ExercisesTypeProvider>
    </GlobalStateProvider>
  );
}

export default MyPerfApp;
