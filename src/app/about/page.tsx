"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";

const interviewData = [
  {
    q: "여긴 어디인가요?",
    a: "제 머릿속 우주입니다. 환영해요!",
  },
  {
    q: "주특기가 뭐죠?",
    a: "상상하기, 그리고 그걸 코드로 만들기.",
  },
  {
    q: "왜 이름이 XOMXIK인가요?",
    a: "비밀입니다. (사실 고양이 소리?)",
  },
  {
    q: "좋아하는 것은?",
    a: "커피, 우주, 그리고 새벽 2시의 코딩.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navigation />
      
      <main className="container mx-auto px-6 py-32 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light mb-24 tracking-tighter"
        >
          Interview_Log_01
        </motion.h1>

        <div className="space-y-24">
          {interviewData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="text-sm font-mono text-gray-500 mb-2 tracking-widest">
                Q{index + 1}.
              </div>
              <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-300 group-hover:text-white transition-colors">
                {item.q}
              </h2>
              <div className="border-l-2 border-white/20 pl-6 ml-1 group-hover:border-white transition-colors duration-500">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-400 group-hover:text-gray-100 transition-colors">
                  {item.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-32 pt-16 border-t border-white/10 text-center text-gray-600 font-mono text-sm"
        >
          // END OF TRANSMISSION
        </motion.div>
      </main>
    </div>
  );
}
