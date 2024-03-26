import { type ReactNode, createContext, useContext, useReducer } from 'react';

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimerContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const timersCtx = useContext(TimerContext);
  if (timersCtx === null) {
    throw new Error('TimersContext is null - that should not be the case!');
  }

  return timersCtx;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

type StartTimerAction = {
  type: 'START_TIMERS';
};

type StopTimerAction = {
  type: 'STOP_TIMERS';
};

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
};

type Action = StartTimerAction | StopTimerAction | AddTimerAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload!.name,
            duration: action.payload!.duration,
          },
        ],
      };
    case 'START_TIMERS':
      return {
        ...state,
        isRunning: true,
      };
    case 'STOP_TIMERS':
      return {
        ...state,
        isRunning: false,
      };
    default:
      return state;
  }
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timersData) {
      dispatch({ type: 'ADD_TIMER', payload: timersData });
    },
    startTimers() {
      dispatch({ type: 'START_TIMERS' });
    },
    stopTimers() {
      dispatch({ type: 'STOP_TIMERS' });
    },
  };
  return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>;
}
