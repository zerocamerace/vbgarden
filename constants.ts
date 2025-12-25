
import { Project } from './types';

export const PROJECTS: Project[] = [
  // 1. Point 1
  {
    id: 1,
    title: "Meow Yourself：AI陪你讀懂身心",
    description: "是我參加緯育AI商務應用人才養成班第二期的團體專題作品，我擔任Tech PM，並開發健檢報告辨識模組，以及負責於Cloud Run部署上線，Vibe Coding的工具主要是使用Google AI Studio跟Codex。結業後跟夥伴一起持續優化網頁、增加RAG電影推薦功能，參加全國AI創意專題競賽職能培力組獲得金牌。",
    link: "https://www.meowyourself.com",
    top: "31.5%",
    left: "91.1%",
    thumbnail: "./images/A2.png"
  },
  // 2. Point 2
  {
    id: 2,
    title: '每拍呷－營養標示一拍就懂 (LINE BOT)',
    description: `是我首次獨立開發的 Side Project，Vibe Coding工具為Gemini與Codex。使用 Gemini 2.5 Flash 模型辨識零嘴的營養標示，並根據我整理的衛福部 DIRS 跟用戶輸入資訊，計算出 BMI & 每日建議攝取熱量、運動換算（例如：約需散步 12 分鐘）等數據。

提供 AI 智能分析報告，將蛋白質、脂肪、碳水化合物代換成好懂的食物（例如：攝取 7 克蛋白質約等於攝取 1 顆雞蛋），特別提醒鈉含量與糖含量。

「智能擋駕」功能讓您可以標註零食為紅燈/黃燈，下次 AI 判斷您上傳相同的零嘴時，會建議您要忌口。

整體使用簡潔易懂的 Flex Message 搭配 Carousell 輪播式排版，便於閱讀，讓閱讀營養標示變得更輕鬆！`,
    link: 'https://lin.ee/NvTMJM3',
    top: '33.6%',
    left: '80.0%',
    thumbnail: './images/Gemini_Generated_Image_b8xvqnb8xvqnb8xv.png'
  },
  // 3. Point 3
  {
    id: 3,
    title: "模擬資料--氛圍引擎",
    description: "優先考量程式美學與情緒表達的開發框架。",
    link: "https://example.com/project3",
    top: "38.9%",
    left: "65.4%"
  },
  // 4. Point 4
  {
    id: 4,
    title: "模擬資料--創意畫布",
    description: "實驗性 SVG 動畫與互動式花園景觀開發專案。",
    link: "https://example.com/project4",
    top: "43.3%",
    left: "46.5%"
  },

  // 5. Point 5
  {
    id: 5,
    title: "模擬資料--代碼記憶花園",
    description: "將程式碼邏輯視覺化為不斷成長的數位植物。",
    link: "https://example.com/project5",
    top: "46.5%",
    left: "53.0%"
  },
  // 6. Point 6
  {
    id: 6,
    title: "模擬資料--視覺腳本工具",
    description: "將枯燥的邏輯流程轉換為優美的視覺呈現。",
    link: "https://example.com/project6",
    top: "57.3%",
    left: "36.1%"
  },
  // 7. Point 7
  {
    id: 7,
    title: "模擬資料--花園邏輯學",
    description: "探討如何使用 React 與 Framer Motion 構建數位生態系。",
    link: "https://example.com/project7",
    top: "55.2%",
    left: "44.8%"
  },
  // 8. Point 8
  {
    id: 8,
    title: "模擬資料--互動藍莓 II",
    description: "針對現代網頁應用強化的互動元素與微動效。",
    link: "https://example.com/project8",
    top: "73.2%",
    left: "51.2%"
  },

  // 9. Point 9
  {
    id: 9,
    title: "模擬資料--社群星系 AI",
    description: "結合人工智慧，打造更具溫度的社群溝通里程碑。",
    link: "https://example.com/project9",
    top: "69.7%",
    left: "61.5%"
  },
  // 10. Point 10
  {
    id: 10,
    title: "模擬資料--暮光選單系統",
    description: "追求極簡暗色調與字體美學的介面導航設計。",
    link: "https://example.com/project10",
    top: "57.7%",
    left: "63.7%"
  },
  // 11. Point 11
  {
    id: 11,
    title: "模擬資料--新專案範例 11",
    description: "這是一個新的專案位置。",
    link: "https://example.com/project11",
    top: "46.3%",
    left: "79.6%"
  },
  // 12. Point 12
  {
    id: 12,
    title: "模擬資料--新專案範例 12",
    description: "這是一個新的專案位置。",
    link: "https://example.com/project12",
    top: "48.6%",
    left: "96.2%"
  }
];

export const FOOTER_LINKS = [
  { name: "IG", url: "https://www.instagram.com/galingalinga/" },
  { name: "Threads", url: "https://www.threads.com/@galingalinga" },
  { name: "Medium", url: "https://medium.com/@galingalinga" }
];

export const BACKGROUND_IMAGE_URL = "./images/bg_blueberries.jpeg";
