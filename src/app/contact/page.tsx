"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/layout/Navigation";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black p-4 flex flex-col relative overflow-hidden">
      <Navigation />
      
      {/* Background Noise/Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10" 
        style={{ backgroundImage: "linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)", backgroundSize: "20px 20px" }} 
      />
      
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-green-500/30 bg-black/80 backdrop-blur-sm p-8 rounded-lg w-full shadow-[0_0_20px_rgba(0,255,0,0.2)]"
        >
          <div className="flex justify-between items-center mb-8 border-b border-green-500/20 pb-4">
            <h1 className="text-xl tracking-widest text-green-400">
              <span className="animate-pulse">●</span> SECURE_CHANNEL
            </h1>
            <span className="text-xs text-green-700">ENCRYPTED: AES-256</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs text-green-600 mb-2 tracking-widest">TRANSMISSION_DATA</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Initialize communication protocol..."
                className="w-full bg-black border border-green-500/30 text-green-400 p-4 h-40 focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)] placeholder-green-800 resize-none transition-all"
                disabled={status !== "idle"}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status !== "idle" || !message}
                className={`
                  relative px-8 py-3 text-sm tracking-[0.2em] transition-all duration-300
                  ${status === "idle" 
                    ? "bg-green-500/10 hover:bg-green-500 hover:text-black border border-green-500 text-green-500" 
                    : "border border-green-900 text-green-900 cursor-not-allowed"}
                `}
              >
                {status === "idle" && "SEND_SIGNAL"}
                {status === "sending" && "TRANSMITTING..."}
                {status === "sent" && "SIGNAL_RECEIVED"}
                
                {status === "sending" && (
                  <span className="absolute inset-0 bg-green-500/20 animate-pulse" />
                )}
              </button>
            </div>
          </form>

          {/* Status Console */}
          <div className="mt-8 font-mono text-xs text-green-800 h-20 overflow-hidden border-t border-green-900/50 pt-4">
            <p>{'>'} System ready...</p>
            {message.length > 0 && <p>{'>'} Input detected: {message.length} bytes</p>}
            {status === "sending" && (
              <>
                <p className="animate-pulse">{'>'} Uplink established...</p>
                <p>{'>'} Encrypting payload...</p>
              </>
            )}
            {status === "sent" && <p className="text-green-400">{'>'} Transmission successful. Awaiting response.</p>}
          </div>
        </motion.div>
      </main>
      
      {/* Floating particles or signal waves could go here */}
    </div>
  );
}
