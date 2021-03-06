import { createRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  Notifier,
  NotifierConfig,
  NotifierData,
  RenderNotifier,
} from './typings';
import NotifierManager, { NotifierController } from './NotifierManager';

export interface CreateNotifierProps<
  N extends NotifierData,
  C extends NotifierConfig,
  > extends NotifierConfig {
  /**
   * Customizable config for notifier. The given values should be retrivable from your notification carrier.
   */
  config?: C;
  /**
   * The render props for notification carrier(UI component).
   */
  render: RenderNotifier<N>;
  /**
   * The method to set attributes or listeners to root.
   */
  setRoot?: (root: HTMLDivElement) => void;
}

export default function createNotifier<N extends NotifierData, C extends NotifierConfig = NotifierConfig>(
  props: CreateNotifierProps<N, C>,
): Notifier<N, C> {
  const {
    config: configProp,
    render: renderNotifier,
    setRoot,
    duration,
    maxCount,
    ...restNotifierProps
  } = props;
  const root = document.createElement('div');
  const controllerRef = createRef<NotifierController<N>>();
  let currentConfig = {
    duration,
    maxCount,
    ...configProp,
  };

  if (setRoot) {
    setRoot(root);
  }

  return {
    add(notifier) {
      document.body.appendChild(root);

      const key = notifier.key ?? Date.now();

      const resolvedNotifier = {
        ...restNotifierProps,
        ...notifier,
        ...currentConfig,
        duration: notifier.duration ?? currentConfig.duration,
        key,
        instanceKey: key,
      };

      if (controllerRef.current) {
        controllerRef.current.add(resolvedNotifier);
      } else {
        render(
          (
            <NotifierManager<N>
              controllerRef={controllerRef}
              defaultNotifiers={[resolvedNotifier]}
              maxCount={currentConfig.maxCount}
              render={renderNotifier}
            />
          ),
          root,
        );
      }

      return resolvedNotifier.key;
    },
    remove(key) {
      if (controllerRef.current) {
        controllerRef.current.remove(key);
      }
    },
    destroy() {
      unmountComponentAtNode(root);

      if (root.parentNode) {
        root.parentNode.removeChild(root);
      }
    },
    config(config) {
      currentConfig = {
        ...currentConfig,
        ...config,
      };
    },
    getConfig() {
      return currentConfig as C;
    },
  };
}
