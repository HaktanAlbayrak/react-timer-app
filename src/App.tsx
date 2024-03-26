import AddTimer from './components/AddTimer.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';
import TimersContextProvider from './context/timers-context.tsx';

function App() {
  return (
    <TimersContextProvider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimersContextProvider>
  );
}

export default App;
