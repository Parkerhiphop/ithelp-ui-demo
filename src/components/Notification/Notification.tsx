import { TimesIcon } from '../Icon/src';
import {
  FC,
  Key,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import Icon from '../Icon/Icon';
import {
  CheckCircleFilledIcon,
  ExclamationCircleFilledIcon,
  MinusCircleFilledIcon,
  InfoCircleFilledIcon,
} from '../Icon/src';
import { Notifier, NotifierConfig, NotifierData } from '../Notifier/typings';
import { Fade } from '../Transition/Fade/Fade';
import { SeverityWithInfo } from '../../system/typings';
import createNotifier from '../Notifier/createNotifier';

export const NotificationIcons = {
  success: CheckCircleFilledIcon,
  warning: ExclamationCircleFilledIcon,
  error: MinusCircleFilledIcon,
  info: InfoCircleFilledIcon,
};

export const NotificationSeverity = {
  success: "",
  warning: '',
  error: '',
  info: '',
};

export interface NotificationConfigProps extends Pick<NotifierConfig, 'duration'> { }

export interface NotificationData extends NotifierData, NotificationConfigProps {
  /**
   * Cancel button text;
   */
  cancelText?: ReactNode;
  /**
   * Confirm button text;
   */
  confirmText?: ReactNode;
  /**
   * Cancel button click event handler. <br />
   * If not provided, the event handler will fallback to a close function using `Notification.remove`.
   */
  onCancel?: VoidFunction;
  /**
   * Confirm button click event handler. <br />
   * If given, will render action button group.
   */
  onConfirm?: VoidFunction;
  /**
   * If given, the message will be closed after the amount of time.
   * You can use `Message.config` to overwrite.
   * @default false
   */
  /**
   * The identifier of the notification.
   */
  reference?: Key;
  /**
   * The severity of the message.
   * @default info
   */
  severity?: SeverityWithInfo;
  /**
   * The title of notification.
   */
  title?: ReactNode;
}

export interface Notification
  extends
  FC<NotificationData>,
  Notifier<NotificationData, NotificationConfigProps>,
  Record<
  SeverityWithInfo,
  (
    props?: Omit<NotificationData, 'severity'>,
  ) => Key
  > {
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Notification: Notification = ((
  props: PropsWithChildren<NotificationData> & { reference: Key },
) => {
  const {
    cancelText,
    children,
    confirmText,
    duration,
    onCancel: onCancelProp,
    onClose: onCloseProp,
    onConfirm: onConfirmProp,
    reference,
    severity,
    title,
  } = props;

  const targetIcon = severity ? NotificationIcons[severity] : null;

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open && duration) {
      const timer = window.setTimeout(() => {
        setOpen(false);
      }, duration);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [open, duration]);

  const onClose = () => {
    setOpen(false);

    if (onCloseProp) {
      onCloseProp(reference);
    }
  };

  const onConfirm = onConfirmProp ? () => {
    setOpen(false);

    onConfirmProp();
  } : undefined;

  const onCancel = onCancelProp ? () => {
    setOpen(false);

    onCancelProp();
  } : undefined;

  return (
    <Fade
      in={open}
      addEndListener={() => { }}
    >
      <div className={`host ${severity ? NotificationSeverity[severity] : ""}`}>
        {targetIcon ? (
          <div className="iconContainer">
            <Icon
              icon={targetIcon}
              className="severityIcon"
            />
          </div>
        ) : null}
        <div className="body">
          <h4 className="title">
            {title}
          </h4>
          <div className="content">
            {children}
          </div>
          {onConfirm && !severity ? (
            <ButtonGroup className="action">
              <Button
                variant="contained"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
              <Button
                variant="outlined"
                onClick={onCancel || onClose}
              >
                {cancelText}
              </Button>
            </ButtonGroup>
          ) : null}
        </div>
        <Icon
          icon={TimesIcon}
          className="closeIcon"
          onClick={onClose}
        />
      </div>
    </Fade>
  );
}) as Notification;

const {
  add,
  config,
  destroy,
  remove,
} = createNotifier<NotificationData, NotificationConfigProps>({
  duration: false,
  render: (notif) => <Notification {...notif} />,
  setRoot: (root) => {
    root.setAttribute('class', "root");
  },
});

Notification.add = add;
Notification.config = config;
Notification.destroy = destroy;
Notification.remove = remove;

(['success', 'warning', 'error', 'info'] as const).forEach((severity) => {
  Notification[severity] = (props) => Notification.add({
    ...props,
    severity,
  });
});

export default Notification;

