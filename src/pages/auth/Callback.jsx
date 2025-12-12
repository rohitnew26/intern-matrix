import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

/**
 * Callback component handles OAuth redirects from Supabase
 * This page receives the auth code/tokens and exchanges them for a session
 */
export default function Callback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.debug("[Callback] Starting callback handler");
        
        // Supabase SDK automatically handles the URL and extracts the session
        const { data, error } = await supabase.auth.getSession();

        console.debug("[Callback] getSession result:", { data, error });

        if (error) {
          console.error("[Callback] Session error:", error);
          setError(error.message);
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          return;
        }

        if (data?.session) {
          console.debug("[Callback] Session found, storing tokens...");
          
          // Session established successfully
          localStorage.setItem('token', data.session.access_token);
          
          // Store user data if available
          if (data.session.user) {
            const userData = {
              id: data.session.user.id,
              email: data.session.user.email,
              user_metadata: data.session.user.user_metadata,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('session', JSON.stringify(data.session));
          }

          console.debug("[Callback] Tokens stored, redirecting to dashboard...");
          
          // Get redirect param if available
          const redirectParam = new URLSearchParams(location.search).get("redirect");
          const redirectTo = redirectParam ? decodeURIComponent(redirectParam) : "/dashboard";
          
          navigate(redirectTo, { replace: true });
        } else {
          console.warn("[Callback] No session found after OAuth");
          setError("Authentication failed: No session established");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
        }
      } catch (err) {
        console.error("[Callback] Unexpected error:", err);
        setError(err.message || "An unexpected error occurred");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        {error ? (
          <>
            <div className="text-red-500 text-xl font-semibold">❌ Error</div>
            <p className="text-gray-600 text-center">{error}</p>
            <p className="text-gray-400 text-sm">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            <p className="text-gray-600 text-center">Completing login...</p>
          </>
        )}
      </div>
    </div>
  );
}
