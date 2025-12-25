
import React from 'react';
import { Project } from '../types';
import { X, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#624CAB]/20 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white/95 backdrop-blur-md w-full max-w-xl rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 border border-[#758ECD]/30 relative flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* 固定在右上角的關閉按鈕 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm hover:bg-[#C1CEFE] rounded-full transition-colors group shadow-sm"
          title="關閉"
        >
          <X size={24} className="text-[#624CAB] group-hover:scale-110 transition-transform" />
        </button>

        {/* 可滾動的內容區域 */}
        <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="flex flex-col gap-6">
            <div className="w-full bg-[#C1CEFE]/30 rounded-2xl flex items-center justify-center overflow-hidden border border-[#758ECD]/30 aspect-video">
              <img
                src={project.thumbnail || `https://picsum.photos/seed/${project.id + 100}/400/300`}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-[#3E2D20] leading-tight text-balance">
                {project.title}
              </h2>
              <p className="text-[#4B5E99] font-medium text-base leading-relaxed whitespace-pre-wrap text-pretty">
                {project.description}
              </p>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#624CAB] text-white rounded-full text-base font-bold hover:bg-[#7189FF] transition-all hover:scale-[1.02] shadow-lg shadow-[#624CAB]/20 mt-auto"
            >
              造訪專案
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
