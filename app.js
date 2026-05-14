const QUESTION_PDF = "https://go100.com.tw/file/exam/S112-AST/112AST_Chemistry.pdf";
const LOCAL_STORAGE_KEY = "chem112.learning.progress.v1";

const PAGE_LABELS = {
  single: "單一選題",
  multiple: "多重選擇題",
  written: "非選擇題"
};

const ANSWERS = {
  q1: "D",
  q2: "B",
  q3: "C",
  q4: "C",
  q5: "A",
  q6: "A",
  q7: "E",
  q8: "A、C、E",
  q9: "A、B、E",
  q10: "A、C",
  q11: "C、E",
  q12: "B、C、D",
  q13: "B、D、E",
  q14: "A、B、E",
  q15: "B、D",
  q16: "A、D",
  q17: "B、E",
  q18: "C、D",
  q19: "B、C、E",
  q20: "A、D",
  q21: "C",
  q22: "見非選評分原則",
  q23: "見非選評分原則",
  q24: "見非選評分原則",
  q25: "見非選評分原則",
  q26: "見非選評分原則",
  q27: "見非選評分原則",
  q28: "見非選評分原則",
  q29: "見非選評分原則",
  q30: "見非選評分原則",
  q31: "見非選評分原則"
};

const TOPIC_LIBRARY = {
  atom: {
    name: "原子結構",
    concepts: ["有效核電荷增加會使價電子較難移除。", "同週期元素的第一游離能大致遞增，但需注意電子組態造成的例外。", "比較大小時要先定位週期與族，再比較遮蔽效應與半徑。"],
    calculation: "若要比較游離能，可用「有效核電荷較大、半徑較小 -> 吸引價電子較強 -> 游離能較高」作為判斷鏈。",
    diagnostics: [
      {
        prompt: "同週期由左到右，第一游離能大致增加的主因是什麼？",
        options: ["有效核電荷增加，價電子受吸引較強", "中子數一定減少", "原子量一定變小", "價電子層數增加"],
        answer: 0,
        explanation: "同週期元素的主量子數相同，遮蔽增加有限；核電荷增加使有效核電荷變大，價電子較難移除。"
      },
      {
        prompt: "比較兩個原子的半徑與游離能時，最合理的順序是？",
        options: ["先看週期與族，再看電子組態例外", "只看英文符號長短", "只看原子量大小", "只看是否為氣體"],
        answer: 0,
        explanation: "週期與族決定主要趨勢，電子組態可解釋少數例外；不能只靠外觀或原子量。"
      }
    ],
    transfer: {
      prompt: "類題：Na、Mg、Al 三者中，哪一個第一游離能通常最大？",
      options: ["Na", "Mg", "Al", "三者完全相同"],
      answer: 1,
      explanation: "Na、Mg、Al 同在第三週期，趨勢大致往右增加；但 Al 的外層電子進入 3p，較 Mg 的 3s 電子容易移除，因此 Mg 的第一游離能大於 Al。"
    }
  },
  bonding: {
    name: "化學鍵結",
    concepts: ["VSEPR 可用電子對數推論分子形狀。", "分子極性需同時考慮鍵的極性與分子形狀。", "孤電子對會壓縮鍵角，使實際角度偏離理想值。"],
    calculation: "若需判斷形式電荷，可用：形式電荷 = 價電子數 - 孤電子數 - 1/2 鍵結電子數。",
    diagnostics: [
      { prompt: "判斷分子是否有極性，最重要的是哪一組資訊？", options: ["鍵偶極與分子形狀", "摩爾質量與顏色", "熔點與外觀", "是否寫在同一行"], answer: 0, explanation: "鍵有極性不代表分子一定有極性；若幾何對稱使偶極抵消，分子可為非極性。" },
      { prompt: "NH3 的鍵角小於理想四面體角 109.5 度，主要原因是？", options: ["孤電子對排斥較強", "氮原子沒有質量", "氫原子帶正電太多", "分子一定是平面"], answer: 0, explanation: "孤電子對-鍵結電子對的排斥較大，因此壓縮 N-H 鍵角。" }
    ],
    transfer: {
      prompt: "類題：CO2 有兩個極性 C=O 鍵，為何整體分子為非極性？",
      options: ["線形且兩個鍵偶極互相抵消", "CO2 沒有電子", "氧沒有電負度", "碳氧鍵不是化學鍵"],
      answer: 0,
      explanation: "CO2 為 O=C=O 線形分子，兩端 C=O 鍵偶極大小相同方向相反，向量和為 0，因此整體非極性。"
    }
  },
  stoich: {
    name: "化學計量",
    concepts: ["先配平反應式，再使用係數莫耳比。", "限制試劑決定產物最大生成量。", "質量、體積與粒子數都應先轉為莫耳數。"],
    calculation: "常用流程：質量 g -> 莫耳 n = m / M；氣體體積可用 PV = nRT；再依配平係數換算。",
    diagnostics: [
      { prompt: "化學計量題開始計算前，最應先確認什麼？", options: ["反應式是否配平", "答案選項哪個最長", "題目字數多少", "顏色是否漂亮"], answer: 0, explanation: "反應係數代表莫耳比，未配平就換算會導致比例錯誤。" },
      { prompt: "若 2 mol A 與 1 mol B 依 A + B -> C 反應，誰是限制試劑？", options: ["B", "A", "C", "無法反應"], answer: 0, explanation: "反應式 A:B = 1:1；1 mol B 只能消耗 1 mol A，B 先用完，B 為限制試劑。" }
    ],
    transfer: {
      prompt: "類題：2H2 + O2 -> 2H2O。若有 5 mol H2 與 2 mol O2，最多生成多少 mol H2O？",
      options: ["2 mol", "4 mol", "5 mol", "7 mol"],
      answer: 1,
      explanation: "2 mol O2 需要 4 mol H2，可生成 4 mol H2O；H2 有 5 mol，剩 1 mol，因此 O2 為限制試劑。"
    }
  },
  acid: {
    name: "酸鹼水溶液",
    concepts: ["pH = -log[H+]。", "強酸強鹼中和可用 H+ 與 OH- 的莫耳數比較。", "混合後要用剩餘 H+ 或 OH- 除以總體積求濃度。"],
    calculation: "中和計算：n(H+) = M酸V酸，n(OH-) = M鹼V鹼；剩餘濃度 = 剩餘莫耳數 / 混合後總體積。",
    diagnostics: [
      { prompt: "25°C 時 pH = 3 的溶液，[H+] 為多少？", options: ["1.0 x 10^-3 M", "3.0 M", "1.0 x 10^3 M", "1.0 x 10^-11 M"], answer: 0, explanation: "pH = -log[H+]，所以 [H+] = 10^-3 M。" },
      { prompt: "強酸與強鹼混合後，判斷酸鹼性的關鍵量是什麼？", options: ["H+ 與 OH- 的剩餘莫耳數", "瓶子的形狀", "溶液顏色一定固定", "酸和鹼名稱長短"], answer: 0, explanation: "中和反應 H+ + OH- -> H2O，誰剩下就決定混合後偏酸或偏鹼。" }
    ],
    transfer: {
      prompt: "類題：0.10 M HCl 20.0 mL 與 0.10 M NaOH 10.0 mL 混合，混合後 pH 約為？",
      options: ["1.48", "7.00", "12.52", "0.10"],
      answer: 0,
      explanation: "n(H+) = 0.10 x 0.0200 = 0.00200 mol；n(OH-) = 0.10 x 0.0100 = 0.00100 mol；剩 H+ = 0.00100 mol，總體積 0.0300 L，[H+] = 0.0333 M，pH = -log 0.0333 約 1.48。"
    }
  },
  redox: {
    name: "氧化還原",
    concepts: ["氧化是失去電子、氧化數上升。", "還原是得到電子、氧化數下降。", "半反應配平時電子得失數必須相等。"],
    calculation: "半反應法核心：氧化半反應釋出 e-，還原半反應消耗 e-；將兩式乘係數使電子數相等後相加。",
    diagnostics: [
      { prompt: "某元素氧化數由 +2 變成 +5，這個元素發生什麼？", options: ["氧化", "還原", "酸鹼中和", "沉澱"], answer: 0, explanation: "氧化數上升代表失去電子，因此發生氧化。" },
      { prompt: "氧化劑在反應中本身會如何？", options: ["被還原", "被氧化", "完全不變", "一定沉澱"], answer: 0, explanation: "氧化劑使別人氧化，自己接受電子，因此本身被還原。" }
    ],
    transfer: {
      prompt: "類題：Zn + Cu2+ -> Zn2+ + Cu 中，哪一個是還原劑？",
      options: ["Zn", "Cu2+", "Zn2+", "Cu"],
      answer: 0,
      explanation: "Zn 由 0 變 +2，失去電子被氧化；使 Cu2+ 被還原，因此 Zn 是還原劑。"
    }
  },
  equilibrium: {
    name: "化學平衡",
    concepts: ["Q 與 K 的比較可判斷反應移動方向。", "平衡常數只受溫度影響。", "勒沙特列原理可預測系統受擾動後的移動。"],
    calculation: "以 aA + bB ⇌ cC + dD 為例，K = [C]^c[D]^d / ([A]^a[B]^b)，Q 的形式相同但使用當下濃度。",
    diagnostics: [
      { prompt: "若某反應 Q < K，反應會如何移動？", options: ["向右生成更多產物", "向左生成更多反應物", "完全停止", "K 變成 0"], answer: 0, explanation: "Q < K 表示產物相對不足，系統會向右移動使 Q 增加至 K。" },
      { prompt: "在固定溫度下加入催化劑，平衡常數 K 會如何？", options: ["不變", "一定變大", "一定變小", "變成負值"], answer: 0, explanation: "催化劑同時加快速正逆反應，不改變平衡組成，也不改變 K。" }
    ],
    transfer: {
      prompt: "類題：N2O4 ⇌ 2NO2，若壓縮體積，平衡往哪邊移動？",
      options: ["往 N2O4", "往 NO2", "不可能判斷", "反應停止"],
      answer: 0,
      explanation: "壓縮使壓力上升，系統偏向氣體莫耳數較少的一側。左側 1 mol，右側 2 mol，因此往 N2O4 移動。"
    }
  },
  thermo: {
    name: "熱化學",
    concepts: ["放熱反應的生成物焓低於反應物。", "反應熱可由生成物總焓減反應物總焓計算。", "催化劑降低活化能，但不改變反應焓變。"],
    calculation: "ΔH = ΣnΔHf(生成物) - ΣnΔHf(反應物)。若 ΔH < 0 為放熱，ΔH > 0 為吸熱。",
    diagnostics: [
      { prompt: "放熱反應的 ΔH 符號為何？", options: ["負值", "正值", "一定為 0", "無單位"], answer: 0, explanation: "系統放出熱，生成物焓低於反應物，因此 ΔH < 0。" },
      { prompt: "催化劑對反應能量圖的主要影響是？", options: ["降低活化能", "改變生成物焓", "讓 ΔH 變 0", "消耗產物"], answer: 0, explanation: "催化劑提供不同反應路徑，降低活化能，但反應物與生成物能量差不變。" }
    ],
    transfer: {
      prompt: "類題：若反應物總焓為 120 kJ，生成物總焓為 80 kJ，ΔH 為多少？",
      options: ["-40 kJ", "+40 kJ", "200 kJ", "0 kJ"],
      answer: 0,
      explanation: "ΔH = H生成物 - H反應物 = 80 - 120 = -40 kJ，為放熱反應。"
    }
  },
  rate: {
    name: "反應速率",
    concepts: ["速率受濃度、溫度、表面積與催化劑影響。", "活化能降低會提高有效碰撞比例。", "實驗速率常由濃度變化量除以時間求得。"],
    calculation: "平均速率 = -Δ[反應物]/Δt = Δ[生成物]/Δt；若用消失時間比較，常以 1/t 作為相對速率。",
    diagnostics: [
      { prompt: "若某實驗用沉澱遮住記號的時間 t 判斷速率，哪個量常可代表相對速率？", options: ["1/t", "t^2", "t + 1", "溫度名稱"], answer: 0, explanation: "達到同一可見終點所需時間越短，速率越快，因此可用 1/t 表示相對速率。" },
      { prompt: "升高溫度通常會增加反應速率，主要原因是？", options: ["有效碰撞比例增加", "反應物質量消失", "平衡常數必為 0", "分子停止運動"], answer: 0, explanation: "溫度升高使粒子動能增加，超過活化能的碰撞比例增加。" }
    ],
    transfer: {
      prompt: "類題：同一反應達終點所需時間由 80 s 變 40 s，相對速率約變成幾倍？",
      options: ["2 倍", "1/2 倍", "4 倍", "不變"],
      answer: 0,
      explanation: "相對速率可用 1/t；(1/40)/(1/80)=2，所以速率約變為 2 倍。"
    }
  },
  gas: {
    name: "氣體性質",
    concepts: ["理想氣體方程式為 PV = nRT。", "混合氣體中 Pi = XiPtotal。", "同溫同壓下氣體體積比等於莫耳數比。"],
    calculation: "PV = nRT；分壓 Pi = ni/ntotal x Ptotal；若 T、V 固定，P 與 n 成正比。",
    diagnostics: [
      { prompt: "定溫定容下，氣體莫耳數變為 2 倍，壓力如何變化？", options: ["變為 2 倍", "變為 1/2", "不變", "變為 0"], answer: 0, explanation: "PV=nRT，T 與 V 固定時，P 與 n 成正比。" },
      { prompt: "混合氣體中某成分分壓的計算式是？", options: ["Pi = XiPtotal", "Pi = Ptotal/Xi", "Pi = nRT", "Pi = m/V"], answer: 0, explanation: "道耳頓分壓定律：分壓等於莫耳分率乘總壓。" }
    ],
    transfer: {
      prompt: "類題：總壓 2.0 atm 的混合氣體中 O2 莫耳分率為 0.25，O2 分壓為多少？",
      options: ["0.50 atm", "0.25 atm", "2.0 atm", "8.0 atm"],
      answer: 0,
      explanation: "Pi = XiPtotal = 0.25 x 2.0 = 0.50 atm。"
    }
  },
  solution: {
    name: "溶液濃度",
    concepts: ["莫耳濃度 M = n/V。", "稀釋前後溶質莫耳數守恆。", "混合後需重新計算總體積與總莫耳數。"],
    calculation: "稀釋：M1V1 = M2V2；混合：n總 = M1V1 + M2V2，再除以 V總。",
    diagnostics: [
      { prompt: "稀釋時，下列哪一個量在加入水前後保持不變？", options: ["溶質莫耳數", "濃度", "體積", "水的莫耳數"], answer: 0, explanation: "稀釋只是加入溶劑，溶質莫耳數不變，濃度降低、體積增加。" },
      { prompt: "0.10 M NaCl 100 mL 含有多少 mol NaCl？", options: ["0.010 mol", "0.10 mol", "1.0 mol", "10 mol"], answer: 0, explanation: "n = MV = 0.10 x 0.100 = 0.010 mol。" }
    ],
    transfer: {
      prompt: "類題：將 0.50 M 溶液 20.0 mL 稀釋到 100.0 mL，濃度為多少？",
      options: ["0.10 M", "0.25 M", "0.50 M", "2.5 M"],
      answer: 0,
      explanation: "M1V1=M2V2；0.50 x 20.0 = M2 x 100.0，M2 = 0.10 M。"
    }
  },
  ksp: {
    name: "沉澱平衡",
    concepts: ["Qsp 與 Ksp 比較可判斷是否沉澱。", "共同離子會降低難溶鹽溶解度。", "離子濃度須依化學式係數作次方。"],
    calculation: "例如 Ag2CrO4(s) ⇌ 2Ag+ + CrO4^2-，Ksp = [Ag+]^2[CrO4^2-]。",
    diagnostics: [
      { prompt: "若 Qsp > Ksp，系統會發生什麼？", options: ["形成沉澱", "固體完全消失", "無法有離子", "Ksp 變成 0"], answer: 0, explanation: "Qsp 過大表示離子濃度超過飽和，會沉澱直到 Qsp 回到 Ksp。" },
      { prompt: "AgCl 的 Ksp 表示式為何？", options: ["[Ag+][Cl-]", "[Ag+]^2[Cl-]", "[Ag+]/[Cl-]", "[AgCl]"], answer: 0, explanation: "AgCl(s) ⇌ Ag+ + Cl-，固體不寫入平衡式，Ksp = [Ag+][Cl-]。" }
    ],
    transfer: {
      prompt: "類題：AgCl 的 Ksp = 1.8 x 10^-10，若 [Ag+] = [Cl-] = 1.0 x 10^-4 M，是否沉澱？",
      options: ["沉澱", "不沉澱", "一定爆炸", "無法比較"],
      answer: 0,
      explanation: "Qsp = 1.0 x 10^-4 x 1.0 x 10^-4 = 1.0 x 10^-8，大於 Ksp，其實會沉澱；若選項要精準，應選沉澱。"
    }
  },
  organic: {
    name: "有機化學",
    concepts: ["官能基決定有機分子的主要反應性。", "醛基可被銀鏡試劑氧化。", "水解反應常可將酯或醯基衍生物轉為羧酸相關產物。"],
    calculation: "有機題常不是數值計算，而是結構追蹤：找官能基 -> 判斷反應位置 -> 寫出產物結構或名稱。",
    diagnostics: [
      { prompt: "銀鏡反應常用來檢測哪一類官能基？", options: ["醛基", "烷類", "醚類", "苯環本身"], answer: 0, explanation: "醛基容易被 Tollens 試劑氧化，產生銀鏡；酮類通常不反應。" },
      { prompt: "酯類水解後通常會得到哪一組產物？", options: ["羧酸與醇", "烷與烯", "鹽酸與氫氣", "氧氣與水"], answer: 0, explanation: "酯的 C-O 鍵水解後形成羧酸和醇；鹼性水解則先形成羧酸鹽。" }
    ],
    transfer: {
      prompt: "類題：某化合物能使 Tollens 試劑產生銀鏡，最可能含有哪個基團？",
      options: ["-CHO", "-COOH", "-O-", "-NO2"],
      answer: 0,
      explanation: "-CHO 為醛基，可被 Tollens 試劑氧化，因此最可能產生銀鏡。"
    }
  },
  polymer: {
    name: "高分子材料",
    concepts: ["單體結構決定聚合物重複單元。", "加成聚合常由碳碳雙鍵打開形成長鏈。", "材料彈性與交聯程度、鏈長和分子間作用力有關。"],
    calculation: "聚合題常用重複單元計算：聚合度 n = 高分子莫耳質量 / 重複單元莫耳質量。",
    diagnostics: [
      { prompt: "加成聚合最常見的單體特徵是什麼？", options: ["含 C=C 雙鍵", "一定含金屬", "一定是離子晶體", "沒有任何鍵"], answer: 0, explanation: "C=C 雙鍵打開後可連接成長鏈，是加成聚合常見起點。" },
      { prompt: "高分子交聯程度增加，材料通常會如何？", options: ["較不易流動、彈性或硬度改變", "原子消失", "必定變成氣體", "聚合度一定為 0"], answer: 0, explanation: "交聯把鏈段連在一起，會影響彈性、硬度與熱塑/熱固性質。" }
    ],
    transfer: {
      prompt: "類題：乙烯 CH2=CH2 加成聚合後，重複單元為何？",
      options: ["-CH2-CH2-", "-COO-", "-NH-CO-", "-CHO"],
      answer: 0,
      explanation: "乙烯雙鍵打開，碳碳單鍵連成長鏈，重複單元為 -CH2-CH2-。"
    }
  },
  experiment: {
    name: "實驗與數據",
    concepts: ["實驗設計需控制變因，才能支持因果推論。", "圖表題要先辨認座標、單位、趨勢與例外。", "非選答案需把觀察、化學原理與結論連結。"],
    calculation: "圖表與數據題常用：斜率 = Δy/Δx；百分誤差 = |實驗值 - 理論值| / 理論值 x 100%。",
    diagnostics: [
      { prompt: "若要比較濃度對速率的影響，最重要的實驗設計是？", options: ["只改變濃度，其他條件盡量固定", "同時改變所有條件", "不記錄溫度", "只看喜歡的數據"], answer: 0, explanation: "控制變因才能把結果差異合理歸因於濃度。" },
      { prompt: "圖表判讀的第一步通常是什麼？", options: ["看清楚座標軸與單位", "直接猜結論", "只看圖的顏色", "忽略資料點"], answer: 0, explanation: "座標軸與單位決定資料代表的物理或化學意義，不能跳過。" }
    ],
    transfer: {
      prompt: "類題：某反應在 20°C 需 80 s 達終點，在 30°C 需 40 s。若終點相同，哪個敘述合理？",
      options: ["30°C 反應較快，約為 20°C 的 2 倍", "20°C 反應較快", "兩者速率完全相同", "無法由時間判斷"],
      answer: 0,
      explanation: "終點相同時相對速率可用 1/t；(1/40)/(1/80)=2，因此 30°C 約為 2 倍。"
    }
  }
};

const QUESTION_SEEDS = [
  [1, "acid", "共軛酸鹼對與質子轉移", 2, "single", "titration"],
  [2, "atom", "碳原子的連續游離能與電子組態", 2, "single", "rank"],
  [3, "atom", "週期性變化與原子性質圖形判讀", 2, "single", "rank"],
  [4, "polymer", "多醣聚合、滲透壓與分子量", 2, "single", ""],
  [5, "stoich", "鐵氧化物還原、沉澱量與莫耳比", 3, "single", "precipitation"],
  [6, "bonding", "主客化學中的分子間作用力", 3, "single", "organic"],
  [7, "equilibrium", "錯合物形成平衡常數與濃度估算", 3, "single", "equilibrium"],
  [8, "organic", "阿司匹靈合成、酯化與實驗操作", 4, "multiple", "organic"],
  [9, "thermo", "Born-Haber 循環與反應焓判斷", 4, "multiple", "energy"],
  [10, "acid", "弱鹼滴定曲線與酸鹼濃度變化", 5, "multiple", "titration"],
  [11, "organic", "直鏈醇、烷、醛、羧酸的物性與反應", 6, "multiple", "organic"],
  [12, "organic", "有機化合物沸點、溶解度與氧化反應", 6, "multiple", "organic"],
  [13, "solution", "溶液濃度、稀釋與混合後離子濃度", 6, "multiple", ""],
  [14, "experiment", "定性分析、物質鑑別與證據推論", 6, "multiple", "experiment"],
  [15, "ksp", "溶度積、共同離子與沉澱判斷", 7, "multiple", "precipitation"],
  [16, "redox", "電化學、氧化還原與電極判斷", 7, "multiple", "redox"],
  [17, "rate", "反應速率資料、圖形與速率式判讀", 8, "multiple", "experiment"],
  [18, "gas", "氣體壓力、理想氣體與反應計量", 8, "multiple", "gas"],
  [19, "experiment", "實驗設計、控制變因與資料判讀", 8, "multiple", "experiment"],
  [20, "redox", "水電解裝置、電極反應與產物判斷", 9, "multiple", "redox"],
  [21, "experiment", "電解實驗條件與電極材料判斷", 9, "multiple", "experiment"],
  [22, "redox", "水電解反應式平衡", 9, "written", "redox"],
  [23, "stoich", "水電解氣體體積與莫耳比推論", 10, "written", "gas"],
  [24, "experiment", "電解產物觀察與檢驗方法", 10, "written", "experiment"],
  [25, "redox", "電解反應中的電子轉移與半反應", 10, "written", "redox"],
  [26, "solution", "濃度、溶液配製與計算式書寫", 11, "written", ""],
  [27, "acid", "酸鹼中和或滴定資料的計算推論", 11, "written", "titration"],
  [28, "experiment", "資料處理、有效數字與誤差說明", 11, "written", "experiment"],
  [29, "organic", "有機官能基辨識與反應結果推論", 12, "written", "organic"],
  [30, "organic", "結構式、分子式與官能基轉換", 12, "written", "organic"],
  [31, "experiment", "化學實驗結論的文字表達與證據連結", 12, "written", "experiment"]
];

const QUESTIONS = QUESTION_SEEDS.map(([number, topicKey, concept, pdfPage, page, simulation]) => {
  const topic = TOPIC_LIBRARY[topicKey];
  const id = `q${number}`;
  return {
    id,
    number,
    topicKey,
    topic: topic.name,
    concept,
    pdfPage,
    page,
    simulation,
    points: page === "written" ? 6 : number <= 7 ? 4 : 5,
    officialAnswer: ANSWERS[id],
    prompt: `請閱讀原試題第 ${number} 題，說明你如何使用「${concept}」完成判斷。`,
    concepts: topic.concepts,
    calculation: topic.calculation,
    explanation: explanationFor(number, topic.name, concept),
    steps: stepsFor(number, topic.name, concept, topic.calculation),
    diagnostics: topic.diagnostics.map((diagnostic) => ({
      ...diagnostic,
      prompt: `第 ${number} 題概念「${concept}」診斷：${diagnostic.prompt}`
    })),
    transfer: {
      ...topic.transfer,
      prompt: `第 ${number} 題類題（${concept}）：${topic.transfer.prompt.replace(/^類題：/, "")}`
    }
  };
});

const state = {
  route: "home",
  activeQuestionByPage: { single: "q1", multiple: "q8", written: "q22" },
  progress: readJson(LOCAL_STORAGE_KEY, {}),
  selectedRole: "student",
  paused: false
};

const views = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  ["home", "single", "multiple", "written"].forEach((route) => {
    views[route] = document.getElementById(`${route}View`);
  });
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.route));
  });
  renderAll();
}

function renderAll() {
  renderHome();
  renderLearningPage("single");
  renderLearningPage("multiple");
  renderLearningPage("written");
  showRoute(state.route);
}

function renderHome() {
  views.home.innerHTML = `
    <div class="home-grid">
      <section class="intro-panel">
        <p class="eyebrow">Chemistry Learning Studio</p>
        <h2>112年化學分科測驗試題學習網頁</h2>
        <p>這個網頁依照 114 年學習站的架構重整，將原試題閱讀、題號小卡、逐題解析、模擬動畫與最後檢核放在同一個學習工作區。</p>
        <div class="feature-list">
          <div><strong>試題定位</strong><span>每題內嵌 112 年化學分科測驗 PDF，並以頁碼定位到該題所在頁面。</span></div>
          <div><strong>逐題解析</strong><span>每題提供答案、核心概念、詳細解題步驟；若需要計算，會列出公式、代入邏輯與單位提醒。</span></div>
          <div><strong>診斷式檢核</strong><span>頁面最後提供兩題核心概念診斷題，以及一題原試題類題，作答後會顯示詳解。</span></div>
          <div><strong>類題練習</strong><span>每題最後提供同概念的類題練習，協助學生確認能否遷移應用。</span></div>
        </div>
      </section>
      <section class="login-panel">
        ${loginPanelHtml()}
      </section>
    </div>
  `;

  views.home.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedRole = button.dataset.role;
      renderHome();
    });
  });
  views.home.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.jump));
  });
}

function loginPanelHtml() {
  const roleHtml = {
    student: `
      <form class="login-form" onsubmit="return false">
        <label>學校<input placeholder="例如：高雄中學" /></label>
        <label>班級<input placeholder="例如：三年一班" /></label>
        <label>座號與姓名<input placeholder="例如：12 王小明" /></label>
        <button class="primary-button" type="button" data-jump="single">以學生身分進入</button>
        <p class="helper">目前為本機預覽登入格式，之後可接 Firebase 或 GitHub Pages 的雲端資料庫。</p>
      </form>
    `,
    guest: `
      <div class="login-form">
        <p class="helper">訪客模式適合公開試用，不需要班級資料。</p>
        <button class="primary-button" type="button" data-jump="single">以訪客身分進入</button>
      </div>
    `,
    teacher: `
      <form class="login-form" onsubmit="return false">
        <label>教師名稱<input placeholder="輸入教師名稱" /></label>
        <label>班級代碼<input placeholder="可先留白" /></label>
        <button class="primary-button" type="button" data-jump="single">以教師身分預覽</button>
        <p class="helper">教師管理與作答彙整可在後續版本接回雲端服務。</p>
      </form>
    `
  };

  return `
    <p class="eyebrow">Login</p>
    <h2>登入學習身分</h2>
    <div class="role-tabs" role="tablist" aria-label="登入身份">
      <button class="role-tab ${state.selectedRole === "student" ? "active" : ""}" type="button" data-role="student">學生</button>
      <button class="role-tab ${state.selectedRole === "guest" ? "active" : ""}" type="button" data-role="guest">訪客</button>
      <button class="role-tab ${state.selectedRole === "teacher" ? "active" : ""}" type="button" data-role="teacher">老師</button>
    </div>
    ${roleHtml[state.selectedRole]}
  `;
}

function renderLearningPage(page) {
  const questions = QUESTIONS.filter((question) => question.page === page);
  const active = getQuestion(state.activeQuestionByPage[page]) || questions[0];
  views[page].innerHTML = `
    <section class="page-panel">
      <div class="page-heading">
        <div>
          <p class="eyebrow">Advanced Subjects Test</p>
          <h2>${PAGE_LABELS[page]}</h2>
          <p class="helper">先從題號小卡辨認核心概念，再進入下方題目工作區。</p>
        </div>
        <span class="score-pill">${questions.length} 題</span>
      </div>
      <div class="question-cards">
        ${questions.map((question) => questionCardHtml(question, active.id)).join("")}
      </div>
    </section>
    <section id="${page}QuestionWorkspace" class="question-workspace">
      ${questionWorkspaceHtml(active)}
    </section>
  `;

  views[page].querySelectorAll("[data-question-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeQuestionByPage[page] = button.dataset.questionId;
      renderLearningPage(page);
      document.getElementById(`${page}QuestionWorkspace`).scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  bindQuestionWorkspace(views[page], active);
}

function questionCardHtml(question, activeId) {
  const done = state.progress[question.id]?.done;
  return `
    <button class="question-card ${question.id === activeId ? "active" : ""}" type="button" data-question-id="${question.id}">
      <strong>第 ${question.number} 題</strong>
      <span>${escapeHtml(question.concept)}</span>
      <footer>
        <span>${escapeHtml(question.topic)}</span>
        <span>${done ? "已檢核" : `${question.points} 分`}</span>
      </footer>
    </button>
  `;
}

function questionWorkspaceHtml(question) {
  const progress = state.progress[question.id] || {};
  return `
    <div class="question-title-row">
      <div>
        <p class="eyebrow">${PAGE_LABELS[question.page]}</p>
        <h3>第 ${question.number} 題：${escapeHtml(question.topic)}</h3>
        <p>${escapeHtml(question.prompt)}</p>
      </div>
      <span class="question-badge">答案：${escapeHtml(question.officialAnswer)}</span>
    </div>

    <section class="content-section">
      <h4>原試題閱讀區</h4>
      ${pdfViewerHtml(question)}
    </section>

    <section class="content-section">
      <h4>詳解、核心概念與解題步驟</h4>
      <div class="answer-layout">
        <div class="answer-main">
          ${embeddedLearningFrame(question, "original", 1, "本題詳解")}
        </div>
        <aside class="answer-side">
          <div class="choice-box">
            <strong>作答紀錄</strong>
            <div class="choice-options">${choiceInputs(question, progress)}</div>
            <textarea id="studentNote" rows="6" placeholder="可在這裡記下自己的判斷依據、計算或錯題提醒。">${escapeHtml(progress.note || "")}</textarea>
            <button class="primary-button" type="button" data-save-note>儲存作答紀錄</button>
            <p id="saveMessage" class="save-message">本機自動保留在這台電腦的瀏覽器中。</p>
          </div>
        </aside>
      </div>
    </section>

    ${question.simulation ? simulationHtml(question) : ""}
    <section class="content-section">
      <h4>最後檢核</h4>
      <div class="embedded-check-grid">
        ${diagnosticCardHtml(question, 0, progress)}
        ${diagnosticCardHtml(question, 1, progress)}
        ${transferCardHtml(question, progress)}
      </div>
    </section>
  `;
}

function diagnosticCardHtml(question, index, progress) {
  return embeddedLearningFrame(question, "diagnostic", index + 1, `核心概念診斷 ${index + 1}`);
}

function transferCardHtml(question, progress) {
  return `
    <article class="embedded-card transfer-card">
      <h3>類題練習</h3>
      <div class="embedded-stack">
        ${embeddedLearningFrame(question, "similar", 1, "類題 1")}
        ${embeddedLearningFrame(question, "similar", 2, "類題 2")}
      </div>
    </article>
  `;
}

function embeddedLearningFrame(question, kind, index, title) {
  const number = String(question.number).padStart(2, "0");
  const file =
    kind === "original"
      ? `original/q${number}.html`
      : kind === "diagnostic"
        ? `diagnostic/q${number}_d${index}.html`
        : `similar/q${number}_s${index}.html`;
  const src = `assets/112_ast_chem_embed/${file}`;
  const embeddedHtml = window.EMBEDDED_LEARNING_HTML?.[file] || "";
  const iframeSource = embeddedHtml ? `srcdoc="${escapeHtml(embeddedHtml)}"` : `src="${src}"`;
  const openHref = embeddedHtml ? `data:text/html;charset=utf-8,${encodeURIComponent(embeddedHtml)}` : src;
  return `
    <article class="embedded-card">
      <div class="embedded-card-header">
        <h3>${escapeHtml(title)}</h3>
        <a class="secondary-button small-button" href="${openHref}" target="_blank" rel="noopener">另開</a>
      </div>
      <iframe class="learning-embed" title="第 ${question.number} 題 ${escapeHtml(title)}" ${iframeSource} loading="lazy"></iframe>
    </article>
  `;
}

function bindQuestionWorkspace(root, question) {
  const note = root.querySelector("#studentNote");
  root.querySelector("[data-save-note]")?.addEventListener("click", () => {
    state.progress[question.id] = { ...(state.progress[question.id] || {}), note: note?.value || "", selected: selectedChoices(root) };
    writeJson(LOCAL_STORAGE_KEY, state.progress);
    root.querySelector("#saveMessage").textContent = "已儲存作答紀錄。";
  });

  root.querySelector("[data-toggle-sim]")?.addEventListener("click", () => {
    state.paused = !state.paused;
    renderLearningPage(question.page);
  });

  root.querySelectorAll("[data-check]").forEach((group) => {
    const key = group.dataset.check;
    const quiz = key === "transfer" ? question.transfer : question.diagnostics[Number(key.replace("diag", "")) - 1];
    group.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const correct = Number(button.dataset.option) === quiz.answer;
        button.classList.add(correct ? "correct" : "wrong");
        root.querySelector(`[data-feedback="${key}"]`).textContent = `${correct ? "答對。" : "再修正一下。"}詳解：${quiz.explanation}`;
        state.progress[question.id] = { ...(state.progress[question.id] || {}), [key]: correct };
        const p = state.progress[question.id];
        if (p.diag1 && p.diag2 && p.transfer) p.done = true;
        writeJson(LOCAL_STORAGE_KEY, state.progress);
        renderHome();
        renderLearningPage(question.page);
      });
    });
  });
}

function pdfViewerHtml(question) {
  const url = pdfSrc(question.pdfPage);
  return `
    <div class="question-pdf-viewer">
      <div class="question-pdf-toolbar">
        <span>112 年化學分科測驗試題 PDF｜定位至第 ${question.pdfPage} 頁</span>
        <div class="question-pdf-actions">
          <a class="mini-button" href="${url}" target="_blank" rel="noreferrer">另開 PDF</a>
          <a class="mini-button" href="https://go100.com.tw/file/exam/S112-AST/112AST_Chemistry.pdf" target="_blank" rel="noreferrer">完整試卷</a>
        </div>
      </div>
      <div class="question-pdf-scroll"><iframe src="${url}" title="112 年化學分科測驗第 ${question.number} 題"></iframe></div>
    </div>
  `;
}

function simulationHtml(question) {
  return `
    <section class="content-section">
      <h4>模擬動畫</h4>
      <div class="sim-shell">
        <p class="sim-intro">${escapeHtml(simulationIntro(question.simulation))}</p>
        <div class="button-row"><button class="secondary-button" type="button" data-toggle-sim>${state.paused ? "播放" : "暫停"}</button></div>
        <div class="inline-sim-host"><div class="simulation-stage ${state.paused ? "paused" : ""}">${animationMarkup(question.simulation)}</div></div>
      </div>
    </section>
  `;
}

function choiceInputs(question, progress) {
  if (question.page === "written") return `<span class="helper">非選擇題請用文字紀錄你的作答重點。</span>`;
  const choices = ["A", "B", "C", "D", "E"];
  const selected = new Set(progress.selected || []);
  return choices.map((choice) => `<label><input type="${question.page === "single" ? "radio" : "checkbox"}" name="choice-${question.id}" value="${choice}" ${selected.has(choice) ? "checked" : ""} />${choice}</label>`).join("");
}

function selectedChoices(root) {
  return [...root.querySelectorAll(".choice-options input:checked")].map((input) => input.value);
}

function optionButtons(quiz) {
  return quiz.options.map((option, index) => `<button class="option" type="button" data-option="${index}">${String.fromCharCode(65 + index)}. ${escapeHtml(option)}</button>`).join("");
}

function answerText(question) {
  if (question.page === "written") return `本題參考答案重點：${question.officialAnswer}。非選題應呈現推論依據、化學表徵、必要計算與完整結論。`;
  return `官方選擇題參考答案為 ${question.officialAnswer}。建議先自己判斷，再用下方步驟核對每個條件。`;
}

function formulaHtml(question) {
  const lines = equationLines(question);
  return `
    <div class="formula-box" aria-label="計算式或判斷式">
      ${lines.map((line) => `<div class="formula-line">${line}</div>`).join("")}
    </div>
  `;
}

function fraction(numerator, denominator) {
  return `<span class="fraction"><span>${numerator}</span><span>${denominator}</span></span>`;
}

function equationLines(question) {
  const byTopic = {
    atom: [
      `<span>Z<sub>eff</sub> ↑</span><span class="arrow">→</span><span>原子半徑 ↓</span>`,
      `<span>價電子受吸引力 ↑</span><span class="arrow">→</span><span>第一游離能 IE<sub>1</sub> ↑</span>`
    ],
    bonding: [
      `<span>形式電荷</span><span>=</span><span>價電子數 - 孤電子數 - ${fraction("鍵結電子數", "2")}</span>`,
      `<span>分子極性</span><span>由</span><span>鍵偶極向量和 Σμ 判斷</span>`,
      `<span>Σμ = 0</span><span>→</span><span>非極性分子</span>`
    ],
    stoich: [
      `<span>n</span><span>=</span><span>${fraction("m", "M")}</span>`,
      `<span>PV</span><span>=</span><span>nRT</span>`,
      `<span>${fraction("n<sub>A</sub>", "係數 A")}</span><span>=</span><span>${fraction("n<sub>B</sub>", "係數 B")}</span>`
    ],
    acid: [
      `<span>pH</span><span>=</span><span>-log[H<sup>+</sup>]</span>`,
      `<span>n(H<sup>+</sup>)</span><span>=</span><span>M<sub>酸</sub>V<sub>酸</sub></span>`,
      `<span>n(OH<sup>-</sup>)</span><span>=</span><span>M<sub>鹼</sub>V<sub>鹼</sub></span>`,
      `<span>[剩餘離子]</span><span>=</span><span>${fraction("剩餘 mol", "V<sub>總</sub>")}</span>`
    ],
    redox: [
      `<span>氧化</span><span>:</span><span>失去 e<sup>-</sup>，氧化數上升</span>`,
      `<span>還原</span><span>:</span><span>得到 e<sup>-</sup>，氧化數下降</span>`,
      `<span>氧化半反應釋出 e<sup>-</sup></span><span>=</span><span>還原半反應消耗 e<sup>-</sup></span>`
    ],
    equilibrium: [
      `<span>aA + bB</span><span>⇌</span><span>cC + dD</span>`,
      `<span>K</span><span>=</span><span>${fraction("[C]<sup>c</sup>[D]<sup>d</sup>", "[A]<sup>a</sup>[B]<sup>b</sup>")}</span>`,
      `<span>Q</span><span>=</span><span>${fraction("[C]<sup>c</sup>[D]<sup>d</sup>", "[A]<sup>a</sup>[B]<sup>b</sup>")}（代入當下濃度）</span>`,
      `<span>Q &lt; K</span><span>→</span><span>向右移動；Q &gt; K → 向左移動</span>`
    ],
    thermo: [
      `<span>ΔH</span><span>=</span><span>ΣnΔH<sub>f</sub>(生成物) - ΣnΔH<sub>f</sub>(反應物)</span>`,
      `<span>ΔH &lt; 0</span><span>→</span><span>放熱反應</span>`,
      `<span>ΔH &gt; 0</span><span>→</span><span>吸熱反應</span>`
    ],
    rate: [
      `<span>平均速率</span><span>=</span><span>-${fraction("Δ[反應物]", "Δt")}</span>`,
      `<span>平均速率</span><span>=</span><span>${fraction("Δ[生成物]", "Δt")}</span>`,
      `<span>相對速率</span><span>∝</span><span>${fraction("1", "t")}</span>`
    ],
    gas: [
      `<span>PV</span><span>=</span><span>nRT</span>`,
      `<span>X<sub>i</sub></span><span>=</span><span>${fraction("n<sub>i</sub>", "n<sub>total</sub>")}</span>`,
      `<span>P<sub>i</sub></span><span>=</span><span>X<sub>i</sub>P<sub>total</sub></span>`
    ],
    solution: [
      `<span>M</span><span>=</span><span>${fraction("n", "V")}</span>`,
      `<span>M<sub>1</sub>V<sub>1</sub></span><span>=</span><span>M<sub>2</sub>V<sub>2</sub></span>`,
      `<span>M<sub>混合</sub></span><span>=</span><span>${fraction("M<sub>1</sub>V<sub>1</sub> + M<sub>2</sub>V<sub>2</sub>", "V<sub>總</sub>")}</span>`
    ],
    ksp: [
      `<span>Ag<sub>2</sub>CrO<sub>4</sub>(s)</span><span>⇌</span><span>2Ag<sup>+</sup> + CrO<sub>4</sub><sup>2-</sup></span>`,
      `<span>K<sub>sp</sub></span><span>=</span><span>[Ag<sup>+</sup>]<sup>2</sup>[CrO<sub>4</sub><sup>2-</sup>]</span>`,
      `<span>Q<sub>sp</sub> &gt; K<sub>sp</sub></span><span>→</span><span>產生沉澱</span>`
    ],
    organic: [
      `<span>官能基</span><span>→</span><span>反應位置</span>`,
      `<span>醛基</span><span>:</span><span>R-CHO + Tollens 試劑 → 銀鏡</span>`,
      `<span>酯水解</span><span>→</span><span>羧酸 + 醇</span>`
    ],
    polymer: [
      `<span>聚合度 n</span><span>=</span><span>${fraction("高分子莫耳質量", "重複單元莫耳質量")}</span>`,
      `<span>C=C</span><span>→</span><span>-C-C- 重複單元</span>`,
      `<span>交聯程度 ↑</span><span>→</span><span>鏈段活動度 ↓</span>`
    ],
    experiment: [
      `<span>斜率</span><span>=</span><span>${fraction("Δy", "Δx")}</span>`,
      `<span>百分誤差</span><span>=</span><span>${fraction("|實驗值 - 理論值|", "理論值")} × 100%</span>`,
      `<span>控制變因</span><span>:</span><span>一次主要改變一個變因</span>`
    ]
  };
  return byTopic[question.topicKey] || [`<span>${escapeHtml(question.calculation)}</span>`];
}

function stepsFor(number, topic, concept, calculation) {
  if (number === 26) return ["從題目反應證據判斷未知片段含有可被銀鏡試劑氧化的醛基。", "將未知取代基 R 與母體結構比對，找出可提供醛基反應性的片段。", "以 -CHO 表示 R，並檢查連接位置是否清楚。", "確認答案同時符合分子式、反應現象與官能基性質。"];
  if (number === 27) return ["辨認題目中的反應屬於有機水解或官能基轉換。", "追蹤芳香環與羧基片段，判斷水解後形成的酸性產物。", "將產物與防腐劑情境連結，確認丁為苯甲酸。", "答案需寫出名稱；若用結構式作答，需清楚呈現苯環連接羧基。"];
  return [
    `回到原試題第 ${number} 題，圈出已知量、限制條件與要求目標。`,
    `辨認本題落在「${topic}」中的「${concept}」，避免只憑關鍵字猜答。`,
    "列出可用關係式，並依上方方程式區的符號、單位與係數進行代入。",
    "將題目給定的數值或敘述轉換成化學表徵，例如反應式、平衡式、能量圖、濃度關係或官能基結構。",
    `依據核心概念逐一檢查選項或計算步驟，排除與「${concept}」矛盾的敘述。`,
    `用答案 ${ANSWERS[`q${number}`]} 回頭核對題幹條件，確認沒有忽略單位、係數、方向或例外。`
  ];
}

function explanationFor(number, topic, concept) {
  return `第 ${number} 題主要測驗「${topic}」中的「${concept}」。作答時要把題幹條件轉成化學模型、公式或結構判斷，再回到選項或非選要求驗證。`;
}

function pdfSrc(page) {
  return `${QUESTION_PDF}#page=${page}&zoom=page-width&toolbar=1&navpanes=0`;
}

function goTo(route) {
  state.route = route;
  showRoute(route);
}

function showRoute(route) {
  Object.entries(views).forEach(([name, view]) => view.classList.toggle("hidden", name !== route));
  document.querySelectorAll("[data-route]").forEach((button) => button.classList.toggle("active", button.dataset.route === route));
}

function getQuestion(id) {
  return QUESTIONS.find((question) => question.id === id) || QUESTIONS[0];
}

function simulationIntro(kind) {
  const labels = {
    rank: "用不同高度的柱狀變化觀察週期趨勢，提醒學生比較時不能只看單一因素。",
    titration: "酸鹼粒子逐步中和，提示當量與 pH 變化需要搭配題目條件。",
    redox: "電子在粒子間轉移，協助辨認氧化劑、還原劑與氧化數變化。",
    equilibrium: "反應物與生成物動態互換，顯示平衡不是停止，而是正逆反應速率相等。",
    energy: "能量曲線起伏可用來比較活化能與反應熱。",
    gas: "氣體粒子運動與碰撞提醒壓力、體積、溫度與莫耳數的關係。",
    precipitation: "離子相遇形成沉澱，對應 Qsp 和 Ksp 的比較。",
    organic: "官能基片段在反應中保留或轉換，協助追蹤產物。",
    experiment: "資料柱狀變化提示先讀座標、單位與控制變因。",
    separation: "上下層分離提示溶解度、密度與操作順序。"
  };
  return labels[kind] || "用動態圖像輔助觀察題目中的化學變化。";
}

function animationMarkup(kind) {
  if (kind === "energy" || kind === "equilibrium") return '<span class="curve"></span><span class="particle" style="left:12%;top:138px"></span><span class="particle green" style="left:44%;top:96px;animation-delay:.8s"></span><span class="particle amber" style="left:70%;top:140px;animation-delay:1.5s"></span>';
  if (kind === "experiment" || kind === "rank") return '<span class="bar" style="left:16%;height:54px"></span><span class="bar" style="left:36%;height:88px;animation-delay:.4s"></span><span class="bar" style="left:56%;height:116px;animation-delay:.8s"></span><span class="bar" style="left:76%;height:72px;animation-delay:1.2s"></span>';
  if (kind === "separation") return '<span class="bar" style="left:18%;width:70%;height:72px;background:#7db8c5"></span><span class="bar" style="left:18%;width:70%;height:128px;background:#d8aa62;opacity:.88;animation-delay:.6s"></span>';
  return '<span class="particle" style="left:4%;top:140px"></span><span class="particle green" style="left:18%;top:90px;animation-delay:.5s"></span><span class="particle amber" style="left:30%;top:160px;animation-delay:1s"></span><span class="particle" style="left:48%;top:105px;animation-delay:1.4s"></span><span class="particle green" style="left:62%;top:142px;animation-delay:1.9s"></span>';
}

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch (_) { return fallback; }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

