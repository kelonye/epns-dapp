import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Loader from 'components/Loader';
import ConnectWallet from 'components/ConnectWallet';
import { useChannelOwner } from 'contexts/channel-owner';
import { useWallet } from 'contexts/wallet';
import * as epns from 'utils/epns';
import sl from 'utils/sl';

const NOTIFICATION_TYPE_BROADCAST = 'BROADCAST';
const NOTIFICATION_TYPE_SECRET = 'SECRET';
const NOTIFICATION_TYPE_TARGETED = 'TARGETED';

const NOTIFICATION_TYPES = [
  NOTIFICATION_TYPE_BROADCAST,
  NOTIFICATION_TYPE_SECRET,
  NOTIFICATION_TYPE_TARGETED,
];
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    minHeight: 300,
    padding: '20px 0',
  },
  paddingWrapper: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: '0 30px',
  },
  formRow: {
    margin: '10px 0',
  },
  formControl: {
    margin: '10px 0',
  },
  formButton: {},
}));

export default function Wrapper() {
  const classes = useStyles();
  const { isLoading, load, ownsChannel } = useChannelOwner();
  const { address: connected } = useWallet();

  React.useEffect(() => {
    connected && load();
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={clsx(classes.container, 'flex flex-col flex-grow')}>
      {!connected ? (
        <div className={classes.paddingWrapper}>
          <ConnectWallet />
        </div>
      ) : isLoading ? (
        <div className={classes.paddingWrapper}>
          <Loader />
        </div>
      ) : !ownsChannel ? (
        <Redirect to="/create-channel" />
      ) : (
        <div className={classes.paddingWrapper}>
          <ManageChannel />
        </div>
      )}
    </div>
  );
}

function ManageChannel() {
  const classes = useStyles();
  const [type, setType] = React.useState(NOTIFICATION_TYPE_BROADCAST);
  const isSecretOrTargeted = ~[
    NOTIFICATION_TYPE_SECRET,
    NOTIFICATION_TYPE_TARGETED,
  ].indexOf(type);

  const onSendNotification = async e => {
    e.preventDefault();
    const form = e.target;
    const props = { type: NOTIFICATION_TYPES.indexOf(type) + 1 };
    ['msg', 'recipientAddress', 'sub', 'cta', 'img'].forEach(key => {
      const val = form[key]?.value?.trim();
      if (val) {
        props[key] = val;
      }
    });
    console.log(props);

    await epns
      .ChannelOwner()
      .notify(
        props.type,
        props.msg,
        props.recipientAddress,
        props.sub,
        props.cta,
        props.img
      );

    sl('success', 'Notification has been sent!');

    form.reset();
  };

  return (
    <form
      className={clsx('flex flex-col flex-grow', classes.form)}
      onSubmit={onSendNotification}
    >
      <div className={classes.formRow}>
        <FormControl fullWidth>
          <InputLabel id="typeLabel">Type *</InputLabel>
          <Select
            labelId="typeLabel"
            id="type"
            value={type}
            onChange={event => setType(event.target.value)}
          >
            {NOTIFICATION_TYPES.map(t => (
              <MenuItem value={t} key={t}>
                {t} (IPFS PAYLOAD)
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {!isSecretOrTargeted ? null : (
        <div className={classes.formRow}>
          <TextField
            id="recipientAddress"
            label="Recipient Address"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
        </div>
      )}
      <div className={classes.formRow}>
        <TextField
          id="sub"
          label="Subject (optional)"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          id="cta"
          label="CTA link (optional)"
          type="url"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          id="img"
          label="Media link (optional)"
          type="url"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </div>
      <div className={classes.formRow}>
        <TextField
          id="msg"
          label="Message"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          rows={3}
          rowsMax={5}
          fullWidth
          required
        />
      </div>
      <div className={classes.formRow}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.formButton}
          type="submit"
        >
          Send Notification
        </Button>
      </div>
    </form>
  );
}
