import React from 'react';
import { motion } from 'motion/react';

export function NoticeBoard() {
  return (
    <div className="w-full bg-amber-500 dark:bg-amber-600 text-blue-950 dark:text-slate-900 flex items-center overflow-hidden h-12 relative shadow-sm z-20 transition-colors duration-300">
      <div className="bg-blue-900 dark:bg-slate-800 text-white font-bold h-full flex items-center px-4 md:px-6 z-10 whitespace-nowrap shadow-md uppercase text-sm tracking-wider flex-shrink-0 transition-colors duration-300">
        Notice Board
      </div>
      
      {/* Ticker Container */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center bg-amber-400 dark:bg-amber-500 transition-colors duration-300">
        <motion.div 
          className="whitespace-nowrap flex items-center gap-12 font-medium"
          animate={{ x: ["100vw", "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          <span>📢 Final Exams timetable for Class X and XII has been released.</span>
          <span>📢 Annual Sports Day is scheduled for next month. Parents are invited!</span>
          <span>📢 Last date for fee submission is the 15th of this month.</span>
          <span>📢 School remains closed on Friday due to public holiday.</span>
        </motion.div>
      </div>
    </div>
  );
}
