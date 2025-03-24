import { useEffect, useState, createContext, useContext } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Auto-limpiar errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // ✅ Función de registro
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200 && res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al registrarse";
      setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
    }
  };

  // ✅ Función de login
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.status === 200 && res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al iniciar sesión";
      setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
    }
  };

  // ✅ Función de logout
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  // ✅ Verificar sesión al cargar la app
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
