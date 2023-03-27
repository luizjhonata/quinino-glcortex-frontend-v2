import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import TariffPage from './components/Tariff';
import PlanPage from './components/PlanPage';
import { ProtectedLayout } from './components/ProtectedLayout';
import { AuthProvider } from './components/context/AuthProvider';

export default function AppRoutes() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="tariff" element= {
                        <ProtectedLayout>
                            <TariffPage/>
                        </ProtectedLayout>} />
                        <Route path="plan" element= {
                        <ProtectedLayout>
                            <PlanPage/>
                        </ProtectedLayout>} />   
                </Routes>
            </Router>
        </AuthProvider>
    )
}