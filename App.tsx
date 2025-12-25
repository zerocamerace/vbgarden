
import React, { useState, useCallback, useRef } from 'react';
import { PROJECTS, BACKGROUND_IMAGE_URL } from './constants';
import { Project } from './types';
import Hotspot from './components/Hotspot';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';
import Palette from './components/Palette';
import PaintCanvas, { PaintCanvasHandle } from './components/PaintCanvas';
import SnowEffect from './components/SnowEffect';
import Manifesto from './components/Manifesto';
import { Pencil, MousePointer2, Eraser, Snowflake, Trash2, Sparkles } from 'lucide-react';

const DEFAULT_BG_COLORS = ['#C1CEFE', '#C1CEFE', '#C1CEFE'];

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bgColors, setBgColors] = useState<string[]>(DEFAULT_BG_COLORS);
  type ToolType = 'none' | 'pen' | 'eraser';
  const [drawingTool, setDrawingTool] = useState<ToolType>('none');
  const [isSnowing, setIsSnowing] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [brushColor, setBrushColor] = useState('#8D6E63');
  const [brushSize, setBrushSize] = useState(5);

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Paint Canvas State & Ref
  const paintCanvasRef = useRef<PaintCanvasHandle>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const isDrawingMode = drawingTool !== 'none';

  // Toggle Music Logic
  const handleCatClick = () => {
    if (isDrawingMode) return;
    setShowMusicPrompt(true);
  };

  const confirmMusicAction = (shouldPlay: boolean) => {
    setShowMusicPrompt(false);
    if (!audioRef.current) return;

    if (shouldPlay) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleOpenProject = useCallback((project: Project) => {
    // 塗鴉模式下不允許點擊藍莓
    if (!isDrawingMode) {
      setSelectedProject(project);
    }
  }, [isDrawingMode]);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleBgChange = (index: number, color: string) => {
    const newColors = [...bgColors];
    newColors[index] = color;
    setBgColors(newColors);
  };

  const handleResetBg = () => {
    setBgColors(DEFAULT_BG_COLORS);
  };

  const toggleTool = (tool: ToolType) => {
    if (drawingTool === tool) {
      setDrawingTool('none');
    } else {
      setDrawingTool(tool);
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col font-handwritten selection:bg-[#7189FF] selection:text-white transition-colors duration-500"
      style={{
        background: `linear-gradient(180deg, ${bgColors[0]} 0%, ${bgColors[1]} 50%, ${bgColors[2]} 100%)`
      }}
    >
      {/* Audio Element */}
      <audio ref={audioRef} src="/music/Crinoline Dreams.mp3" loop />

      {/* 塗鴉畫布 - 位於最底層 (z-0) */}
      <PaintCanvas
        ref={paintCanvasRef}
        tool={drawingTool}
        brushColor={brushColor}
        brushSize={brushSize}
      />

      {/* 藍莓宣言 - 懸浮按鈕與視窗 (z-40/50) */}
      <Manifesto isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />

      {/* 音樂版權宣告懸浮視窗 - 置中於底部與樹之間 */}
      {isPlaying && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 bg-white/60 backdrop-blur-md border border-white/40 p-3 sm:p-5 rounded-3xl shadow-2xl w-[90%] max-w-xs animate-in slide-in-from-bottom-4 fade-in duration-700 select-none text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="animate-spin-slow">🎵</span>
            <p className="text-xs font-bold text-[#624CAB] tracking-widest uppercase">Now Playing</p>
          </div>
          <p className="text-sm sm:text-base font-bold text-[#3E2D20] mb-0.5">Crinoline Dreams</p>
          <p className="text-xs text-[#533E2D] opacity-80">Kevin MacLeod (incompetech.com)</p>
          <p className="text-[10px] text-[#533E2D]/60 mt-2 leading-tight">
            Licensed under Creative Commons: By Attribution 4.0 License<br />
            <span className="opacity-70">http://creativecommons.org/licenses/by/4.0/</span>
          </p>

          <button
            onClick={() => confirmMusicAction(false)}
            className="mt-4 px-8 py-1.5 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] rounded-full text-xs font-bold tracking-widest transition-all border border-[#EF4444]/20 hover:scale-105 active:scale-95 pointer-events-auto"
          >
            STOP
          </button>
        </div>
      )}

      {/* 音樂確認對話框 */}
      {showMusicPrompt && !isPlaying && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowMusicPrompt(false)}
        >
          <div
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-sm w-full border border-[#758ECD]/30 animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#3E2D20] mb-2 text-center">
              播放背景音樂？
            </h3>
            <p className="text-[#4B5E99] text-center mb-6">
              是否要播放 "Crinoline Dreams" 來放鬆一下？
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => confirmMusicAction(true)}
                className="px-6 py-2 bg-[#624CAB] text-white rounded-full font-bold hover:bg-[#7189FF] transition-all hover:scale-105 shadow-md"
              >
                播放
              </button>
              <button
                onClick={() => setShowMusicPrompt(false)}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-all"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 清空畫布確認對話框 */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowClearConfirm(false)}
        >
          <div
            className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-sm w-full border border-red-100 animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#3E2D20] mb-2 text-center">
              是否要清除全部塗鴉？
            </h3>
            <p className="text-gray-500 text-center mb-6">
              清除後將無法恢復喔！
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  paintCanvasRef.current?.clearCanvas();
                  setShowClearConfirm(false);
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all hover:scale-105 shadow-md"
              >
                確認清除
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-all"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 下雪特效 - 位於最上層 (z-50) 已在組件內設定，這裡只需渲染 */}
      {isSnowing && <SnowEffect />}

      {/* 互動與文字內容層 - 需確保滑鼠事件能穿透到畫布 (當在塗鴉模式時的空白處) */}
      {/*
         邏輯：
         當 isDrawingMode = true 時，為了能畫到背景，content 層不能完全擋住。
         但 Image 和 UI 必須能擋住畫筆 (畫在樹後)。

         PaintCanvas 是 fixed inset-0。
         如果 Content 是 relative z-10，那它會蓋住 Canvas。
         所以我們讓 Content 容器 pointer-events-none，
         然後其內部元素 (Title, Image, Footer) pointer-events-auto。
      */}
      <div className={`relative flex-grow flex flex-col items-center justify-start z-10 w-full overflow-y-auto ${isDrawingMode ? 'pointer-events-none' : ''}`}>

        {/* 標題區域 */}
        <div className="w-full px-4 text-center mt-8 mb-4 flex flex-col items-center justify-center z-10 pointer-events-auto select-none">
          <h1 className="garden-title flex flex-col items-center gap-1 sm:gap-2 leading-none tracking-widest animate-in slide-in-from-top duration-1000 uppercase font-bold text-center text-balance">
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] transition-all">
              GALING'S
            </span>
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl leafy-garden drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] transition-all opacity-90">
              VIBE CODING GARDEN
            </span>
          </h1>

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <button
              onClick={() => setIsManifestoOpen(true)}
              className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all duration-300 shadow-sm border border-white/20 bg-white/40 text-[#624CAB]/80 hover:bg-white hover:text-[#624CAB] backdrop-blur-sm hover:scale-105 active:scale-95`}
            >
              <Sparkles size={16} className="animate-pulse" />
              ABOUT ME
            </button>
            <button
              onClick={() => setIsSnowing(!isSnowing)}
              className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all duration-300 shadow-sm border border-white/20 ${isSnowing
                ? 'bg-white text-[#624CAB] shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                : 'bg-white/40 text-[#624CAB]/80 hover:bg-white hover:text-[#624CAB] backdrop-blur-sm'
                }`}
            >
              <Snowflake size={16} className={isSnowing ? 'animate-spin-slow' : ''} />
              {isSnowing ? 'SNOW ON' : 'SNOW OFF'}
            </button>
          </div>
        </div>

        {/* 圖片與熱區容器 */}
        <div className="relative w-[63%] max-w-[700px] mt-4 mb-20 mx-auto select-none pointer-events-auto">
          {/* 背景圖 */}
          <img
            src={BACKGROUND_IMAGE_URL}
            alt="Blueberry Garden"
            className="w-full h-full object-contain drop-shadow-xl rounded-3xl"
            draggable={false}
          />

          {/* 貓咪熱區 (由用戶提供座標) */}
          <div
            className="absolute cursor-pointer hover:bg-white/10 rounded-lg transition-colors z-30"
            style={{
              top: '79.2%',
              left: '0%',
              width: '39.5%',
              height: '20.3%'
            }}
            onClick={handleCatClick}
          >
            {/* 可以加一個隱藏的表情符號或光暈來提示 */}
            <div className={`w-full h-full ${isPlaying ? 'animate-pulse bg-white/5' : ''}`} />
          </div>

          {/* 藍莓互動熱區 */}
          <div className="absolute inset-0 z-20">
            {PROJECTS.map((project) => (
              <Hotspot
                key={project.id}
                project={project}
                onClick={handleOpenProject}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 底部 UI 區域 (Palette, Toggle) - z-40 確保在熱區之上 */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-4 font-sans pointer-events-auto max-w-[calc(100vw-3rem)]">
        <Palette
          colors={bgColors}
          onChange={handleBgChange}
          onReset={handleResetBg}
        />

        {/* 工具按鈕組 */}
        <div className="flex flex-col gap-3 relative">
          {/* 畫筆設定面板 - 當選擇畫筆時顯示 */}
          {drawingTool === 'pen' && (
            <div className="absolute left-0 sm:left-full bottom-[110%] sm:bottom-0 sm:ml-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-[#8D6E63]/30 w-[200px] sm:w-48 animate-in zoom-in-95 slide-in-from-bottom-2 sm:slide-in-from-left-5 duration-300">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center sm:hidden mb-1">
                  <label className="text-xs font-bold text-[#533E2D]">畫筆設定</label>
                  <button onClick={() => setDrawingTool('none')} className="text-gray-400"><MousePointer2 size={14} /></button>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#533E2D] mb-2 block">顏色</label>
                  <div className="flex gap-2 flex-wrap">
                    {['#8D6E63', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#000000'].map(color => (
                      <button
                        key={color}
                        onClick={() => setBrushColor(color)}
                        className={`w-6 h-6 rounded-full border border-gray-200 transition-transform active:scale-90 ${brushColor === color ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="w-6 h-6 p-0 border-0 rounded-full overflow-hidden cursor-pointer bg-transparent"
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <label className="text-xs font-bold text-[#533E2D] mb-2 flex justify-between">
                    <span>粗細</span>
                    <span className="opacity-60">{brushSize}px</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full accent-[#8D6E63] h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 塗鴉模式 - 畫筆 */}
          <button
            onClick={() => toggleTool('pen')}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${drawingTool === 'pen'
              ? 'text-white scale-110 ring-4 ring-opacity-30'
              : 'bg-white text-[#8D6E63] hover:scale-110 hover:bg-[#F0F4FF]'
              }`}
            style={drawingTool === 'pen' ? { backgroundColor: brushColor, ringColor: brushColor } : {}}
            title="畫筆工具"
          >
            <Pencil size={24} />
          </button>

          {/* 塗鴉模式 - 橡皮擦 */}
          <button
            onClick={() => toggleTool('eraser')}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${drawingTool === 'eraser'
              ? 'bg-[#EF4444] text-white scale-110 ring-4 ring-[#EF4444]/30'
              : 'bg-white text-[#EF4444] hover:scale-110 hover:bg-[#FFF0F0]'
              }`}
            title="橡皮擦"
          >
            <Eraser size={24} />
          </button>

          {/* 塗鴉模式 - 一鍵清空 */}
          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 hover:bg-red-50"
            title="清空全部塗鴉"
          >
            <Trash2 size={24} />
          </button>

          {/* 關閉塗鴉 (顯示游標圖案作為'恢復預設'的隱喻，或者只是當前狀態指示?)
               其實上方兩個按鈕是 Toggle。如果都沒選就是 Mouse。
               可以加一個 'Mouse' 按鈕明確切換回選取模式，或者讓 toggleTool 處理。
               為了 UI 簡單清楚，我們保留 Mouse 按鈕作為 "停止繪圖" 的明確選項?
               或者，如果 drawingTool !== 'none'，顯示一個 "Close Drawing" 按鈕?

               方案：始終顯示三個按鈕?
               1. Palette
               2. Eraser
               3. Pen

               如果 Pen 或 Eraser 激活，則顯示 Mouse 供切換?
               不，直接點 Pen/Eraser 切換即可。如果再次點擊或是點別的，就切換。

               為了方便，我們可以加一個 "Mouse" 按鈕，明確表示 "瀏覽模式"。
            */}
        </div>
      </div>

      {/* 頁腳 */}
      <Footer />

      {/* 彈出式專案卡片 */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
