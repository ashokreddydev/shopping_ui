
import Store from './Components/Store'
import { Provider } from 'react-redux';
import { applicationStore } from './store';

function App() {
  return (
    <div>
       <Provider store={applicationStore}>
      <Store />
      </Provider>
    </div>
  );
}

export default App;
