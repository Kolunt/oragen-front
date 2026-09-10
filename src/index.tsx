import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ReactDOM from 'react-dom/client';
import relativeTime from 'dayjs/plugin/relativeTime';
import './styles/vars.scss';
import 'react-perfect-scrollbar/dist/css/styles.min.css';
import './styles/global.scss';
import './styles/reset.scss';
import './styles/сolors.scss';
import './styles/style-button.scss';
import './styles/style-element.scss';
import './styles/style-antd.scss';
import { App } from 'App';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';
import { authServiceInterceptors } from 'config/authServiceInterceptors';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(weekday);
dayjs.extend(localeData);

authServiceInterceptors();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // По умолчанию в приложение при смене фокуса окон идет повторный запрос
      // отменяем действие по умолчанию при потере фокуса окна
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename={process.env.REACT_APP_SUBDIR}>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
