
import React, { useState } from 'react';
import { Palette as PaletteIcon, RotateCcw, X, ChevronUp, ChevronDown } from 'lucide-react';

interface PaletteProps {
    colors: string[];
    onChange: (index: number, color: string) => void;
    onReset: () => void;
}

const Palette: React.FC<PaletteProps> = ({ colors, onChange, onReset }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col items-start gap-4 font-sans">
            {/* 展開的面板 */}
            {isOpen && (
                <div className="absolute left-0 bottom-full mb-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#758ECD]/30 w-48 animate-in slide-in-from-bottom-5 duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-[#533E2D]">背景調色盤</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-[#758ECD] hover:text-[#533E2D] p-1 rounded-full hover:bg-black/5"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3">
                        {colors.map((color, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => onChange(index, e.target.value)}
                                    className="w-8 h-8 rounded-full cursor-pointer border-none bg-transparent hover:scale-110 transition-transform"
                                    title={`顏色 ${index + 1}`}
                                />
                                <span className="text-xs text-gray-500 font-mono uppercase">{color}</span>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-gray-200 my-3" />

                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 text-xs text-[#624CAB] hover:text-[#7189FF] font-medium transition-colors w-full justify-center py-1 rounded hover:bg-[#624CAB]/10"
                    >
                        <RotateCcw size={12} />
                        恢復預設
                    </button>
                </div>
            )}

            {/* 開關按鈕 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${isOpen
                    ? 'bg-[#624CAB] text-white rotate-180'
                    : 'bg-white text-[#624CAB] hover:scale-110 hover:bg-[#F0F4FF]'
                    }`}
                title="開啟調色盤"
            >
                <PaletteIcon size={24} />
            </button>
        </div>
    );
};

export default Palette;
