import { 
    Routes, 
    Route, 
    Navigate, 
    useLocation 
} from 'react-router-dom';
import Home from './Home';
import About from './About';
import PostNew from './PostNew';
import Login from './accounts/Login';
import Profile from './accounts/Profile';
import Signup from './accounts/Signup';
import { useAppContext } from "store";


function Root() {
    const location = useLocation();

    const {
        store: { isAuthenticated }
    } = useAppContext();

    return (
        <>
            <Routes>
                <Route 
                    path="/*" 
                    element={
                        isAuthenticated ? 
                        <Home /> : 
                        <Navigate 
                            replace 
                            to='/accounts/login' 
                            state={{ from: location }} 
                        />
                    } 
                />

                <Route 
                    path='/about/*' 
                    element={<About />} 
                />

                <Route 
                    path='posts/new/*'
                    element={<PostNew />} 
                />

                <Route 
                    path='/accounts/profile/*'
                    element={
                        isAuthenticated ? 
                        <Profile /> :
                        <Navigate 
                            replace 
                            to='/accounts/login' 
                            state={{ from: location }} 
                        />
                    }
                />

                <Route 
                    path='/accounts/login/*'
                    element={<Login />}
                />

                <Route 
                    path='/accounts/signup/*'
                    element={<Signup />}
                />
            </Routes>
        </>
    );
};

export default Root;