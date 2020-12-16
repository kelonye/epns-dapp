import 'nprogress/nprogress.css';
import './styles';

import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'contexts/theme';
import { WalletProvider } from 'contexts/wallet';
import { ChannelsProvider } from 'contexts/channels';
import { NotificationsProvider } from 'contexts/notifications';
import { ChannelOwnerProvider } from 'contexts/channel-owner';
import App from 'pages/App';

(async () => {
  document.documentElement.classList.remove('anim-loading');
  document.getElementById('loader-container').remove();
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);

  render(
    <WalletProvider>
      <ThemeProvider>
        <ChannelsProvider>
          <NotificationsProvider>
            <ChannelOwnerProvider>
              <App />
            </ChannelOwnerProvider>
          </NotificationsProvider>
        </ChannelsProvider>
      </ThemeProvider>
    </WalletProvider>,
    document.getElementById('root')
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
