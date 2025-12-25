
import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface ManifestoProps {
    isOpen: boolean;
    onClose: () => void;
}

const Manifesto: React.FC<ManifestoProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/10 backdrop-blur-[2px] transition-all duration-300"
                    onClick={onClose}
                >
                    {/* Glassmorphism Content Card */}
                    <div
                        className="relative bg-white/65 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 md:p-10 w-full max-w-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] animate-in fade-in zoom-in-95 duration-500 origin-center overflow-y-auto max-h-[85vh] m-4"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30 transition-colors text-[#624CAB]"
                        >
                            <X size={24} />
                        </button>

                        {/* Content */}
                        <div className="space-y-6 font-sans text-[#3E2D20]">
                            <div className="flex items-center gap-4 mb-2">
                                <img
                                    src="./images/profile.jpg"
                                    alt="Galing"
                                    className="w-12 h-12 rounded-full border-2 border-[#624CAB]/20 object-cover shadow-sm bg-white"
                                />
                                <h2 className="text-2xl font-bold tracking-wide text-[#624CAB]">藍莓宣言</h2>
                            </div>

                            <div className="space-y-4 leading-relaxed tracking-wide">
                                <p>
                                    歡迎來到我的數位花園，我是耕耘者 <span className="font-bold text-[#624CAB]">Galing</span>，戲劇學系畢業的我喜歡將腦中的想法轉化為可以被看見的實體；
                                    在2025下半年，我踏入了 Vibe Coding 的世界，這裡的每一顆藍莓都代表一個被實踐的靈感。
                                </p>
                                <p>
                                    除了因為我喜歡藍紫色，更因為藍莓的外表沉穩、內在飽滿，是我與 AI 共同耕耘的成果。
                                </p>

                                <div className="py-4 space-y-2">
                                    <p className="font-bold text-lg text-[#624CAB]">在這裡，你可以...</p>
                                    <ul className="list-disc pl-5 space-y-1 marker:text-[#624CAB]">
                                        <li><span className="font-bold">點擊藍莓</span>：探索專案的內核。</li>
                                        <li><span className="font-bold">點擊貓咪</span>：為花園增添一點音樂。</li>
                                        <li><span className="font-bold">漸層調色盤</span>：自訂你喜歡的網頁背景。</li>
                                        <li><span className="font-bold">揮灑畫筆</span>：留下你的創意痕跡。</li>
                                        <li><span className="font-bold">聯繫我</span>：歡迎一起交流 Vibe Coding 的感想。</li>
                                    </ul>
                                </div>

                                <p className="italic text-[#624CAB]/80 font-medium">
                                    這裡沒有複雜的選單，只有最直覺的「收穫」與「創作」。
                                </p>
                            </div>

                            <div className="pt-6 mt-6 border-t border-[#624CAB]/20 text-xs text-[#624CAB]/60 text-center">
                                AI協作：本網頁是透過 Antigravity 與 Google AI Studio 製作，<br />在1天內完成高度自定義的互動介面。請多多指教。
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Manifesto;
