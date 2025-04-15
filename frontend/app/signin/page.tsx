"use client";
import React, { useState } from "react";
import { ArrowRight, LockIcon, Pencil, Share2, Sparkles, User2Icon, Users } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HTTP_Backend } from "@/config";

// Main SignIn component
export default function SignIn() {
    // React state hooks
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<{ field?: string; message: string } | null>(null);
    const router = useRouter();
  
    // Function to handle signin form submission
    async function handleSignin(event: React.FormEvent) {
      event.preventDefault();
      setError(null); // Clear any previous error

      // Frontend input validation
      if (!username.trim() || !password.trim()) {
        setError({ message: "All fields are required!" });
        return;
      }
  
      try {
        setIsLoading(true);
        // Make POST request to backend for authentication
        const response = await axios.post(`${HTTP_Backend}/signin`, {
          username,
          password,
        });

        // Save token and username in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
  
        // Navigate to /join if login is successful
        if (response.status === 200) {
          router.push("/join");
        } else {
          setError({ message: response.data.msg || "Signin failed. Please try again." });
        }
      } catch (error: any) {
        // Handle errors from the server
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 411) {
            setError({ message: "Username and password doesn't match" });
          } else {
            setError({ message: "Username and password doesn't match" });
          }
        } else {
          // Network error fallback
          setError({ message: "Network error. Please check your connection." });
        }
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    }

    return (
      <div 
        className="min-h-screen overflow-hidden relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
        style={{ animation: 'gradientShift 15s ease infinite' }}
      >
        {/* Custom animations and styles */}
        <style jsx>{`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
          .feature-grid {
            background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}</style>
  
        {/* Decorative background elements */}
        <div className="absolute inset-0 feature-grid opacity-20"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
        {/* Main layout container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">

          {/* Left section - Feature highlights */}
          <div className="hidden lg:flex flex-col flex-1 text-white pr-12">
            <h1 className="text-5xl font-bold mb-8 animate-fade-in">
              Create Together,
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Collaborate Better
              </span>
            </h1>

            {/* Feature List */}
            <div className="space-y-8 mt-12">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4 animate-float">
                <div className="flex-shrink-0 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                  <Pencil className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Intuitive Drawing Tools</h3>
                  <p className="text-zinc-300/80">Create beautiful diagrams and sketches with our easy-to-use tools</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4 animate-float" style={{ animationDelay: '0.2s' }}>
                <div className="flex-shrink-0 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                  <Share2 className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
                  <p className="text-zinc-300/80">Work together with your team in real-time, anywhere in the world</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4 animate-float" style={{ animationDelay: '0.4s' }}>
                <div className="flex-shrink-0 bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Seamless Collaboration</h3>
                  <p className="text-zinc-300/80">Experience real-time coding, voice communication, and an interactive chat—all in one place.</p>
                </div>
              </div>
            </div>

            {/* Footer trust badge */}
            <div className="mt-16 border-t border-white/10 pt-8">
              <p className="flex items-center text-lg text-zinc-300/90">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                Trusted by creators worldwide
              </p>
            </div>
          </div>

          {/* Right section - Signin form */}
          <div className="w-full max-w-md animate-fade-in">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-1">
                <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-rose-400 via-teal-400 to-cyan-400"></div>
              </div>

              {/* Signin form container */}
              <div className="relative bg-zinc-900/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                  <p className="mt-2 text-sm text-zinc-300/80">
                    'Great things are built together. Join a thriving community of creators and collaborators.'
                  </p>
                </div>

                {/* Signin form */}
                <form onSubmit={handleSignin} className="space-y-6">
                  <div className="space-y-4">
                    {/* Username input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-300">Username</label>
                      <div className="mt-1 relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User2Icon className="h-5 w-5 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                        </div>
                        <input
                          id="email"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all hover:border-zinc-600"
                          placeholder="johndoe"
                        />
                      </div>
                    </div>

                    {/* Password input */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-zinc-300">Password</label>
                      <div className="mt-1 relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LockIcon className="h-5 w-5 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                        </div>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all hover:border-zinc-600"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="text-rose-500 text-sm text-center">{error.message}</div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group bg-gradient-to-r from-rose-400 via-teal-400 to-cyan-400 p-[1px] rounded-xl"
                  >
                    <div className="relative bg-zinc-900 rounded-xl py-3 px-4 group-hover:bg-opacity-90 transition-all">
                      <span className="flex items-center justify-center text-white font-medium">
                        {isLoading ? 'Signing in...' : 'Signin'}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </button>
                </form>

                {/* Link to Sign up */}
                <p className="mt-6 text-center text-sm text-zinc-400">
                  Don't have an account?{" "}
                  <a href="/signup" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
