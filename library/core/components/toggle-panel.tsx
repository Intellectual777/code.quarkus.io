import * as React from 'react';
import { useLocalStorage } from '@rehooks/local-storage';
import './toggle-panel.scss';
import { Button } from 'react-bootstrap';
import { useAnalytics } from '@quarkusio/code-quarkus.core.analytics';
import { FaCaretSquareDown, FaCaretSquareLeft, FaCaretSquareRight, FaCaretSquareUp } from 'react-icons/fa';

interface TogglePanelProps {
  id: string;
  closeLabel?: string;
  openLabel?: string
  event?: string;
  eventContext?: object;
  mode?: 'vertical' | 'horizontal';
  children: React.ReactNode;
}

export function TogglePanel(props: TogglePanelProps) {
  const analytics = useAnalytics();
  const [ open, setOpen ] = useLocalStorage<boolean>(props.id, false);
  const mode = props.mode || 'vertical';
  const CloseIcon = mode === 'horizontal' ? <FaCaretSquareLeft/> : <FaCaretSquareUp/>;
  const OpenIcon = mode === 'horizontal' ? <FaCaretSquareRight/> : <FaCaretSquareDown/>;
  const flip = () => {
    if (props.event && props.event.length === 2) {
      let eventContext = props.eventContext || {};
      if (open) {
        analytics.event(props.event, { ...eventContext })
      }
    }
    setOpen(!open);
  };
  return (
    <>
      <div className={`toggle-panel ${mode} ${(open ? 'open' : '')}`}>
        {props.children}
      </div>
      <Button
        as="a"
        className="toggle-button"
        aria-label="Toggle panel"
        onClick={flip}
      >
        {open ? (<React.Fragment>{CloseIcon}<span className="toggle-label">{props.closeLabel || 'Close'}</span></React.Fragment>) : (
          <React.Fragment>{OpenIcon}<span className="toggle-label">{props.openLabel || 'Open'}</span></React.Fragment>)}
      </Button>
    </>
  );
}
