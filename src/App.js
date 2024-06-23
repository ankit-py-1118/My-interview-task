import Login from './components/Login';
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {

const router = createBrowserRouter([{
  path: "/", 
  element: <Login />
},
{
  path: "/signup",
  element: <SignUp/>
},
{
  path: "/home",
  element: <Home />
}
]);

  return (
  <>
  <RouterProvider router={router} />
  </>
  );
}

export default App;
