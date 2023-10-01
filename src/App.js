import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import RoutePrive from './pages/RoutePrive/RoutePrive';
import RoutePriveHome from './pages/RoutePrive/RoutePriveHome/RoutePriveHome'
import SignInModal from './components/SignInModal';

function App() {
  return (
    <>
    <SignUpModal/>
    <SignInModal/>
    <Navbar/>
    <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/RoutePrive' element={<RoutePrive/>}>
          <Route path='/RoutePrive/RoutePriveHome' element ={<RoutePriveHome/>}/>
      </Route> 
    </Routes>
      
    </>
  );
}

export default App;
