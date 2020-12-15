import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Loader from 'components/Loader';
import { useChannels } from 'contexts/channels';
import { wallet, useWallet } from 'contexts/wallet';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    minHeight: 300,
  },
  paddingWrapper: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    lineHeight: '1.5rem',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
    '& a': { color: theme.palette.secondary.main },
  },
  itemMainContent: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  itemIcon: {
    borderRadius: 8,
    marginRight: 20,
    width: 80,
    height: 80,
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
      marginTop: 7,
    },
  },
}));

export default function ChannelList() {
  const classes = useStyles();
  const { isLoading, channels } = useChannels();

  return (
    <div className={clsx(classes.container, 'flex flex-grow')}>
      {isLoading ? (
        <div className={classes.paddingWrapper}>
          <Loader />
        </div>
      ) : !channels.length ? (
        <div className={classes.paddingWrapper}>
          No channels have been created yet.
        </div>
      ) : (
        <div className="flex flex-col">
          {channels.map(channel => (
            <ChannelListItem key={channel.id} {...{ channel }} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChannelListItem({ channel }) {
  const classes = useStyles();
  const { address: connected } = useWallet();

  // const onChangeSubscriptionState = s => this.setIsSubscribed(s);
  // const onLoad = async () => {
  //   // let channel;
  //   // if (connected) {
  //   //   channel = await wallet.epns.getChannel(channel.id);
  //   //   channel.onChangeSubscriptionState(onChangeSubscriptionState);
  //   //   this.setIsSubscribed(await channel.getIsSubscribed());
  //   // }
  //   // return () => {
  //   //   channel.offChangeSubscriptionState(onChangeSubscriptionState);
  //   // };
  // };

  // React.useEffect(() => {
  //   onLoad();
  // }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={clsx(classes.item, 'flex flex-grow')}>
      <img src={channel.icon} alt={channel.name} className={classes.itemIcon} />
      <div className={classes.itemMainContent}>
        <div className="flex flex-col flex-grow">
          <div>{channel.name}</div>
          <div>{channel.info}</div>
          <div>
            <a href={channel.url} target="_blank" rel="noopener noreferrer">
              {channel.url}
            </a>
          </div>
          <div className="flex">
            <img src="/users.svg" width={15} alt="Channel members count" />
            &nbsp;
            {channel.membersCount ?? 0}
            &nbsp; &nbsp; &nbsp;
            <img
              src="/contributions.svg"
              width={15}
              alt="Total channel pool contributions"
            />
            &nbsp;
            {channel.poolContribution ?? 0} DAI
          </div>
        </div>
        {!connected ? null : (
          <div>
            <ToggleSubscriptionState channelAddress={channel.id} />
          </div>
        )}
      </div>
    </div>
  );
}

function ToggleSubscriptionState({ channelAddress }) {
  // const classes = useStyles();
  const { address: userAddress } = useWallet();
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onToggle = async e => {
    await wallet.epnsContract[!isSubscribed ? 'subscribe' : 'unsubscribe'](
      channelAddress
    );
    setIsSubscribed(!isSubscribed);
  };

  const handle = b => (_channelAddress, _userAddress) => {
    if (userAddress === _userAddress && _channelAddress === channelAddress) {
      setIsSubscribed(b);
    }
  };

  const on = (event, b) => {
    const fn = handle(b);
    wallet.epnsContract.on(event, fn);
    return () => wallet.epnsContract.off(event, fn);
  };

  const onLoad = async () => {
    const offs = [
      on('Subscribe', () => setIsSubscribed(true)),
      on('Unsubscribe', () => setIsSubscribed(false)),
    ];
    setIsSubscribed(
      await wallet.epnsContract.memberExists(userAddress, channelAddress)
    );
    setIsLoaded(true);
    return () => {
      offs.map(off => off());
    };
  };

  React.useEffect(() => {
    onLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Button
      color="secondary"
      variant="outlined"
      onClick={onToggle}
      disabled={!isLoaded}
    >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </Button>
  );
}
