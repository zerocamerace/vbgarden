
import React from 'react';
import { Project } from '../types';

interface HotspotProps {
  project: Project;
  onClick: (project: Project) => void;
}

const Hotspot: React.FC<HotspotProps> = ({ project, onClick }) => {
  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0% {
              opacity: 0.6;
              box-shadow: 0 0 5px 2px rgba(113, 137, 255, 0.4), inset 0 0 5px rgba(113, 137, 255, 0.2);
            }
            50% {
              opacity: 1;
              box-shadow: 0 0 20px 5px rgba(113, 137, 255, 0.8), inset 0 0 15px rgba(113, 137, 255, 0.5);
            }
            100% {
              opacity: 0.6;
              box-shadow: 0 0 5px 2px rgba(113, 137, 255, 0.4), inset 0 0 5px rgba(113, 137, 255, 0.2);
            }
          }
        `}
      </style>
      <button
        onClick={() => onClick(project)}
        style={{
          top: project.top,
          left: project.left,
          width: '10%',
          paddingBottom: '10%',
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer group transition-all pointer-events-auto"
        aria-label={`查看專案：${project.title}`}
      >
        {/* 閃爍光暈效果 - 無邊框，純光影 (Soft Glow) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            animation: 'twinkle 2s infinite ease-in-out',
          }}
        />

        {/* 核心微光 */}
        <div className="absolute inset-0 rounded-full bg-[#7189FF]/10" />

        {/* 滑鼠懸停時的更強烈恆亮 */}
        <div className="absolute inset-0 rounded-full bg-[#7189FF]/0 group-hover:bg-[#7189FF]/20 group-hover:shadow-[0_0_30px_rgba(113,137,255,0.9)] transition-all duration-300" />
      </button>
    </>
  );
};

export default Hotspot;
