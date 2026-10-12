import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize axios defaults
    axios.defaults.baseURL = 'http://127.0.0.1:5000';

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.get('/api/auth/me');
                setUser(res.data.user);
            } catch (err) {
                console.error("Token verification failed", err);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                delete axios.defaults.headers.common['Authorization'];
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password, readiness = null, humanScore = 0) => {
        setError(null);
        try {
            const res = await axios.post('/api/auth/login', {
                email,
                password,
                readiness, // Pass CRG state to backend
                human_score: humanScore // Pass Soft CAPTCHA score
            });

            const { access_token, user, security_context } = res.data;

            localStorage.setItem('token', access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setUser(user);

            return {
                success: true,
                security_context // Return for UI visualization
            };
        } catch (err) {
            console.error("Login failed", err);
            const errorMsg = err.response?.data?.error || 'Login failed';
            setError(errorMsg);

            // Updated check for needs_verification (403 or specific flag)
            if (err.response?.data?.needs_verification) {
                return { success: false, needsVerification: true };
            }
            return { success: false };
        }
    };

    const register = async (name, email, password, phone = '') => {
        setError(null);
        try {
            const res = await axios.post('/api/auth/register', { name, email, password, phone });
            return { success: true, message: res.data.message };
        } catch (err) {
            console.error("Registration failed", err);
            setError(err.response?.data?.error || 'Registration failed');
            return { success: false };
        }
    };

    const verifyOtp = async (email, otp) => {
        setError(null);
        try {
            await axios.post('/api/auth/verify-otp', { email, otp });
            return { success: true };
        } catch (err) {
            console.error("OTP Verification failed", err);
            setError(err.response?.data?.error || 'Verification failed');
            return { success: false };
        }
    };

    const logout = async () => {
        try { await axios.post('/api/auth/logout'); } catch { }
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const loginWithToken = (token, userData) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
    };

    const uploadProfileImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/api/user/upload-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update local user state with new image
            if (user) {
                const updatedUser = { ...user, profile_image: res.data.profile_image };
                setUser(updatedUser);
            }
            return true;
        } catch (err) {
            console.error("Upload failed", err);
            return false;
        }
    };

    const resendOtp = async (email) => {
        setError(null);
        try {
            await axios.post('/api/auth/resend-otp', { email });
            return { success: true };
        } catch (err) {
            console.error("OTP Resend failed", err);
            setError(err.response?.data?.error || 'Resend failed');
            return { success: false };
        }
    };

    const enrollBiometrics = async (biometricData) => {
        try {
            const res = await axios.post('/api/auth/enroll-biometrics', biometricData);
            // Refresh user data to show has_face_id etc
            await checkUserLoggedIn();
            return { success: true, message: res.data.message };
        } catch (err) {
            console.error("Biometric enrollment failed", err);
            return { success: false, error: err.response?.data?.error || 'Enrollment failed' };
        }
    };

    const verifyBiometric = async (type, embedding) => {
        try {
            const res = await axios.post('/api/auth/verify-biometric', { type, embedding });
            return { success: true, verified: res.data.verified };
        } catch (err) {
            console.error("Biometric verification failed", err);
            return { success: false, error: err.response?.data?.error || 'Verification failed' };
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        loginWithToken,
        register,
        verifyOtp,
        resendOtp,
        logout,
        uploadProfileImage,
        enrollBiometrics,
        verifyBiometric
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
                    <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-8" />
                    <div className="text-emerald-500 font-black uppercase tracking-[0.5em] text-xs animate-pulse">
                        Initializing Neural Link
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
