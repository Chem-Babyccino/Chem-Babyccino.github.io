const QUESTION_PDF = "./assets/113-chemistry-exam.pdf";
const LOCAL_STORAGE_KEY = "chem113.nature.progress.v1";

const PAGE_LABELS = {
  single: "單一選題",
  multiple: "多重選擇題",
  written: "非選擇題"
};

const answerMap = {
  q1: "A", q2: "E", q3: "A", q4: "C", q5: "B", q6: "E", q7: "B",
  q8: "A、B、C", q9: "A、C、E", q10: "A、B、D", q11: "A、C、E", q12: "A、B、E", q13: "A、B、E",
  q14: "A、B、D", q15: "A、B、E", q16: "A、B、E", q17: "B、D、E", q18: "A、B、D", q19: "B、C、E",
  q20: "見非選評分原則", q21: "見非選評分原則", q22: "D、E", q23: "B、E",
  q24: "見非選評分原則", q25: "見非選評分原則", q26: "R = -CHO", q27: "丁為苯甲酸"
};

const seeds = [
  [1, "原子結構", "游離能與週期趨勢", 2, "single", "rank"],
  [2, "化學鍵結", "分子形狀、極性與鍵角", 2, "single", ""],
  [3, "化學計量", "配平、限制試劑與莫耳比", 2, "single", ""],
  [4, "酸鹼水溶液", "pH、指示劑與中和", 3, "single", "titration"],
  [5, "氧化還原", "氧化數、半反應與電子守恆", 3, "single", "redox"],
  [6, "化學平衡", "反應商、平衡常數與移動方向", 3, "single", "equilibrium"],
  [7, "熱化學", "焓變、能量圖與反應熱", 3, "single", "energy"],
  [8, "反應速率", "活化能、催化劑與碰撞理論", 4, "multiple", "energy"],
  [9, "氣體性質", "分壓、理想氣體與莫耳分率", 4, "multiple", "gas"],
  [10, "溶液濃度", "稀釋、混合與濃度換算", 4, "multiple", ""],
  [11, "沉澱平衡", "Ksp、共同離子與沉澱判斷", 5, "multiple", "precipitation"],
  [12, "有機化學", "官能基辨識與異構物", 5, "multiple", "organic"],
  [13, "高分子材料", "聚合反應與結構性質", 5, "multiple", ""],
  [14, "晶體與鍵結", "粒子間作用力與物性", 6, "multiple", ""],
  [15, "酸鹼平衡", "緩衝溶液與滴定曲線", 7, "multiple", "titration"],
  [16, "電化學", "原電池、電解與電位", 7, "multiple", "redox"],
  [17, "平衡圖表", "K值、濃度變化與圖形判讀", 8, "multiple", "equilibrium"],
  [18, "實驗設計", "變因控制、誤差與資料判讀", 8, "multiple", "experiment"],
  [19, "分析化學", "定性分析、光譜與證據推論", 8, "multiple", ""],
  [20, "定量非選", "反應式、氣體生成與計算過程", 9, "written", "gas"],
  [21, "數據非選", "圖表、比較推論與有效數字", 9, "written", "experiment"],
  [22, "有機反應", "官能基轉換與反應判斷", 10, "multiple", "organic"],
  [23, "環境化學", "氧化還原、污染物與水質", 11, "multiple", "redox"],
  [24, "實驗非選", "萃取、分層與操作推理", 11, "written", "separation"],
  [25, "整合非選", "圖表模型與文字解釋", 12, "written", "equilibrium"],
  [26, "有機結構推論", "銀鏡反應、官能基與結構式", 12, "written", "organic"],
  [27, "有機產物判斷", "水解反應、羧酸與防腐劑", 12, "written", "organic"]
];

const conceptBank = {
  "原子結構": ["有效核電荷與遮蔽效應會影響電子移除難易。", "同週期趨勢可協助判斷游離能、原子半徑與電負度。", "排序題需先定位元素，再處理例外。"],
  "化學鍵結": ["VSEPR 可推論電子對排列與分子形狀。", "分子極性同時取決於鍵偶極與幾何對稱。", "孤電子對會影響鍵角與分子形狀。"],
  "化學計量": ["配平反應式後才能使用係數莫耳比。", "限制試劑決定產物最大生成量。", "質量、體積、粒子數需先轉成莫耳比較。"],
  "酸鹼水溶液": ["pH 與氫離子濃度呈負對數關係。", "強酸強鹼中和可用等當量判斷。", "指示劑顏色需對應變色範圍。"],
  "氧化還原": ["氧化是失電子、氧化數上升；還原相反。", "半反應法可追蹤電子守恆。", "氧化劑本身被還原，還原劑本身被氧化。"],
  "化學平衡": ["Q 與 K 的比較可判斷反應移動方向。", "平衡常數只受溫度影響。", "勒沙特列原理描述系統對擾動的反應。"],
  "熱化學": ["反應熱等於生成物與反應物焓差。", "放熱反應生成物能量較低。", "催化劑不改變總焓變。"],
  "反應速率": ["速率受濃度、溫度、表面積與催化劑影響。", "活化能降低會提高有效碰撞比例。", "速率機構不可只由總反應式直接判斷。"],
  "氣體性質": ["理想氣體方程式連結 P、V、n、T。", "分壓等於莫耳分率乘總壓。", "同溫同壓下氣體體積比可對應莫耳比。"],
  "溶液濃度": ["稀釋前後溶質莫耳數守恆。", "混合題需分清濃度、體積與莫耳數。", "單位換算錯誤會造成量級偏差。"],
  "沉澱平衡": ["Qsp 與 Ksp 比較可判斷是否沉澱。", "共同離子會降低難溶鹽溶解度。", "離子濃度須依化學式次方帶入。"],
  "有機化學": ["官能基決定主要反應性。", "同分異構物可有相同分子式但性質不同。", "氧化、還原、水解與酯化是常見轉換。"],
  "高分子材料": ["單體結構決定聚合物重複單元。", "加成聚合常由不飽和鍵開啟。", "材料性質與鏈結構及分子間作用力相關。"],
  "晶體與鍵結": ["離子、共價網狀、金屬與分子晶體物性不同。", "熔點與導電性常可回推粒子間作用。", "不能只用外觀判斷鍵結型態。"],
  "酸鹼平衡": ["弱酸與共軛鹼形成緩衝系統。", "滴定曲線包含起點、半當量點與當量點。", "Ka、Kb 與 pH 可互相推算。"],
  "電化學": ["原電池陽極氧化、陰極還原。", "電子由陽極經外電路流向陰極。", "標準電位可判斷反應自發性。"],
  "平衡圖表": ["圖表題要先辨認座標與變因。", "濃度改變後反應朝消耗擾動方向移動。", "K值表達平衡狀態下濃度比。"],
  "實驗設計": ["控制變因使因果推論更可信。", "對照組與實驗組差異要明確。", "資料判讀須連結目的與誤差來源。"],
  "分析化學": ["定性分析重視證據與物質辨識。", "光譜或沉澱證據需和可能物種對照。", "單一觀察常不足以排除所有替代解釋。"],
  "定量非選": ["非選計算須呈現反應式、代入與單位。", "過程分數來自合理步驟。", "有效數字與化學意義都要兼顧。"],
  "數據非選": ["先讀表格或圖形的變因與單位。", "比較資料時要說明趨勢與例外。", "結論必須回扣題目要求。"],
  "有機反應": ["反應條件決定官能基轉換方向。", "產物判斷須追蹤斷鍵與成鍵位置。", "結構式比文字敘述更能避免混淆。"],
  "環境化學": ["水質與污染物題常結合氧化還原與平衡。", "濃度標準需注意單位與稀釋倍率。", "情境題要把化學證據轉成判斷。"],
  "實驗非選": ["萃取、分液與洗滌取決於溶解度與密度。", "操作順序會影響分離效果。", "需說明每一步保留或除去的物質。"],
  "整合非選": ["模型解釋題重視概念與資料一致。", "圖表資訊應轉換成化學語言。", "回答要避免只描述現象而不解釋原因。"],
  "有機結構推論": ["銀鏡反應檢測醛基。", "取代基推論要同時符合反應證據與分子片段。", "結構式可用 -CHO 表示甲醛基。"],
  "有機產物判斷": ["酯或醯基衍生物水解可生成羧酸。", "苯甲酸及其鹽類常見於防腐劑情境。", "產物判斷須追蹤芳香環與羧基是否保留。"]
};

const QUESTIONS = seeds.map(([number, topic, concept, pdfPage, page, simulation]) => {
  const id = `q${number}`;
  return {
    id,
    number,
    topic,
    concept,
    pdfPage,
    page,
    simulation,
    points: page === "written" ? 6 : number <= 7 ? 4 : 5,
    officialAnswer: answerMap[id],
    prompt: `請閱讀原試題第 ${number} 題，說明你如何使用「${concept}」完成判斷。`,
    concepts: conceptBank[topic] || conceptBank["整合非選"],
    explanation: explanationFor(number, topic, concept),
    steps: stepsFor(number, topic, concept),
    rubric: rubricFor(page, number, topic),
    samples: samplesFor(page, number, topic),
    checks: checksFor(page, topic, concept)
  };
});

const state = {
  route: "home",
  activeQuestionByPage: {
    single: "q1",
    multiple: "q8",
    written: "q20"
  },
  progress: readJson(LOCAL_STORAGE_KEY, {}),
  paused: false
};

const views = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheViews();
  bindNavigation();
  renderAll();
}

function cacheViews() {
  ["home", "single", "multiple", "written"].forEach((route) => {
    views[route] = document.getElementById(`${route}View`);
  });
}

function bindNavigation() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.route));
  });
}

function renderAll() {
  renderHome();
  renderLearningPage("single");
  renderLearningPage("multiple");
  renderLearningPage("written");
  showRoute(state.route);
}

function renderHome() {
  const done = QUESTIONS.filter((question) => state.progress[question.id]?.done).length;
  views.home.innerHTML = `
    <div class="home-grid">
      <section class="intro-panel">
        <p class="eyebrow">Chemistry Learning Studio</p>
        <h2>像走進一座森林一樣，逐題辨認化學線索</h2>
        <p>這個版本依照 114 年網頁的架構重整：首頁、題型分頁、題號小卡、原試題閱讀區、解析區、模擬動畫與最後檢核都由同一套學習工作區呈現。</p>
        <div class="feature-list">
          <div><strong>試題定位</strong><span>每題內嵌 113 年化學分科測驗 PDF，並以頁碼定位到該題所在頁面。</span></div>
          <div><strong>題號小卡</strong><span>題卡除了題號，也列出核心概念，方便學生先用概念辨識題型。</span></div>
          <div><strong>完整解析</strong><span>每題依序呈現答案、核心概念、解題步驟、評量規準、等第示例，最後才是檢核。</span></div>
        </div>
      </section>
      <section class="login-panel">
        <p class="eyebrow">Nature Mode</p>
        <h2>大自然風格版</h2>
        <p class="helper">目前完成檢核：${done} / ${QUESTIONS.length} 題。色彩以森林、苔蘚、溪流與土壤為主，讓頁面看起來更沉靜、適合長時間學習。</p>
        <div class="nature-list">
          <div><strong>單一選題</strong><span>第 1 至 7 題，重點在快速辨識單一核心概念。</span></div>
          <div><strong>多重選擇題</strong><span>第 8 至 19、22、23 題，重點在逐項排除與多概念整合。</span></div>
          <div><strong>非選擇題</strong><span>第 20、21、24 至 27 題，重點在步驟、單位、證據與文字表達。</span></div>
        </div>
        <div class="button-row">
          <button class="primary-button" type="button" data-jump="single">進入單一選題</button>
          <button class="secondary-button" type="button" data-jump="multiple">進入多重選擇題</button>
          <button class="secondary-button" type="button" data-jump="written">進入非選擇題</button>
        </div>
      </section>
    </div>
  `;
  views.home.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.jump));
  });
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
      <h4>答案、核心概念與詳細解題步驟</h4>
      <div class="answer-layout">
        <div class="answer-main">
          <div class="answer-box">
            <strong>解答</strong>
            <p>${escapeHtml(answerText(question))}</p>
          </div>
          <div class="concept-box">
            <strong>測驗到的核心概念內容</strong>
            <ul>${question.concepts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
          <div class="answer-box">
            <strong>詳細解題步驟</strong>
            <ol>${question.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
          </div>
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

    <section class="content-section">
      <h4>評量規準</h4>
      <div class="rubric-list">${question.rubric.map(([level, text]) => `<div class="rubric-item"><strong>${escapeHtml(level)}</strong>${escapeHtml(text)}</div>`).join("")}</div>
    </section>

    <section class="content-section">
      <h4>各等第參考答案示例</h4>
      <div class="sample-grid">${question.samples.map(([level, text]) => `<div class="sample-item"><strong>${escapeHtml(level)}</strong>${escapeHtml(text)}</div>`).join("")}</div>
    </section>

    ${question.simulation ? simulationHtml(question) : ""}

    <section class="content-section">
      <h4>最後檢核</h4>
      <div class="check-grid">
        <article class="check-card">
          <h3>核心概念小測驗</h3>
          <p>${escapeHtml(question.checks.concept.prompt)}</p>
          <div class="option-list" data-check="concept">${optionButtons(question.checks.concept)}</div>
          <p class="feedback" data-feedback="concept">${progress.concept ? "核心概念檢核已通過。" : ""}</p>
        </article>
        <article class="check-card">
          <h3>原試題類題檢核</h3>
          <p>${escapeHtml(question.checks.transfer.prompt)}</p>
          <div class="option-list" data-check="transfer">${optionButtons(question.checks.transfer)}</div>
          <p class="feedback" data-feedback="transfer">${progress.transfer ? "類題檢核已通過。" : ""}</p>
        </article>
      </div>
    </section>
  `;
}

function pdfViewerHtml(question) {
  const url = pdfSrc(question.pdfPage);
  return `
    <div class="question-pdf-viewer">
      <div class="question-pdf-toolbar">
        <span>113 年化學分科測驗試題 PDF｜定位至第 ${question.pdfPage} 頁</span>
        <div class="question-pdf-actions">
          <a class="mini-button" href="${url}" target="_blank" rel="noreferrer">另開 PDF</a>
          <a class="mini-button" href="./assets/113-chemistry-exam.pdf" target="_blank" rel="noreferrer">完整試卷</a>
        </div>
      </div>
      <div class="question-pdf-scroll">
        <iframe src="${url}" title="113 年化學分科測驗第 ${question.number} 題"></iframe>
      </div>
    </div>
  `;
}

function simulationHtml(question) {
  return `
    <section class="content-section">
      <h4>模擬動畫</h4>
      <div class="sim-shell">
        <p class="sim-intro">${escapeHtml(simulationIntro(question.simulation))}</p>
        <div class="button-row">
          <button class="secondary-button" type="button" data-toggle-sim>${state.paused ? "播放" : "暫停"}</button>
        </div>
        <div class="inline-sim-host">
          <div class="simulation-stage ${state.paused ? "paused" : ""}">${animationMarkup(question.simulation)}</div>
        </div>
      </div>
    </section>
  `;
}

function bindQuestionWorkspace(root, question) {
  const note = root.querySelector("#studentNote");
  root.querySelector("[data-save-note]")?.addEventListener("click", () => {
    state.progress[question.id] = {
      ...(state.progress[question.id] || {}),
      note: note?.value || "",
      selected: selectedChoices(root)
    };
    writeJson(LOCAL_STORAGE_KEY, state.progress);
    root.querySelector("#saveMessage").textContent = "已儲存作答紀錄。";
  });

  root.querySelector("[data-toggle-sim]")?.addEventListener("click", () => {
    state.paused = !state.paused;
    renderLearningPage(question.page);
  });

  root.querySelectorAll("[data-check]").forEach((group) => {
    const key = group.dataset.check;
    const quiz = question.checks[key];
    group.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const correct = Number(button.dataset.option) === quiz.answer;
        button.classList.add(correct ? "correct" : "wrong");
        root.querySelector(`[data-feedback="${key}"]`).textContent = correct ? `答對。${quiz.feedback}` : `再修正一下。${quiz.feedback}`;
        state.progress[question.id] = {
          ...(state.progress[question.id] || {}),
          [key]: correct
        };
        if (state.progress[question.id].concept && state.progress[question.id].transfer) {
          state.progress[question.id].done = true;
        }
        writeJson(LOCAL_STORAGE_KEY, state.progress);
        renderHome();
        renderLearningPage(question.page);
      });
    });
  });
}

function choiceInputs(question, progress) {
  if (question.page === "written") {
    return `<span class="helper">非選擇題請用文字紀錄你的作答重點。</span>`;
  }
  const choices = ["A", "B", "C", "D", "E"];
  const selected = new Set(progress.selected || []);
  return choices.map((choice) => `
    <label>
      <input type="${question.page === "single" ? "radio" : "checkbox"}" name="choice-${question.id}" value="${choice}" ${selected.has(choice) ? "checked" : ""} />
      ${choice}
    </label>
  `).join("");
}

function selectedChoices(root) {
  return [...root.querySelectorAll(".choice-options input:checked")].map((input) => input.value);
}

function optionButtons(quiz) {
  return quiz.options.map((option, index) => `<button class="option" type="button" data-option="${index}">${String.fromCharCode(65 + index)}. ${escapeHtml(option)}</button>`).join("");
}

function answerText(question) {
  if (question.page === "written") {
    return `本題參考答案重點：${question.officialAnswer}。非選題應呈現推論依據、化學表徵、必要計算與完整結論。`;
  }
  return `官方選擇題參考答案為 ${question.officialAnswer}。建議先自己判斷，再用下方步驟核對每個條件。`;
}

function pdfSrc(page) {
  return `${QUESTION_PDF}#page=${page}&zoom=page-width&toolbar=1&navpanes=0`;
}

function goTo(route) {
  state.route = route;
  showRoute(route);
}

function showRoute(route) {
  Object.entries(views).forEach(([name, view]) => {
    view.classList.toggle("hidden", name !== route);
  });
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === route);
  });
}

function getQuestion(id) {
  return QUESTIONS.find((question) => question.id === id) || QUESTIONS[0];
}

function explanationFor(number, topic, concept) {
  if (number === 26) return "本題需由反應證據判斷未知取代基。銀鏡反應支持醛基存在，因此 R 可表示為 -CHO。";
  if (number === 27) return "本題需追蹤有機反應後的酸性產物。若芳香環與羧基保留，產物可判斷為苯甲酸。";
  return `第 ${number} 題主要測驗「${topic}」中的「${concept}」。作答時先圈出題幹條件，再把資訊轉成化學模型或公式，最後逐一核對選項或作答要求。`;
}

function stepsFor(number, topic, concept) {
  if (number === 26) {
    return ["從題目反應證據判斷未知片段含有可被銀鏡試劑氧化的醛基。", "將未知取代基 R 與母體結構比對，找出可提供醛基反應性的片段。", "以 -CHO 表示 R，並檢查連接位置是否清楚。", "確認答案同時符合分子式、反應現象與官能基性質。"];
  }
  if (number === 27) {
    return ["辨認題目中的反應屬於有機水解或官能基轉換。", "追蹤芳香環與羧基片段，判斷水解後形成的酸性產物。", "將產物與防腐劑情境連結，確認丁為苯甲酸。", "答案需寫出名稱；若用結構式作答，需清楚呈現苯環連接羧基。"];
  }
  return [
    `回到原試題第 ${number} 題，圈出已知量、限制條件與要求目標。`,
    `辨認本題落在「${topic}」中的「${concept}」，避免只憑關鍵字猜答。`,
    "把題目資訊轉換成反應式、粒子圖、平衡式、濃度關係、能量圖或官能基結構。",
    `依據核心概念逐一檢查選項或計算步驟，排除與「${concept}」矛盾的敘述。`,
    `用答案 ${answerMap[`q${number}`]} 回頭核對題幹條件，確認沒有忽略單位、係數、方向或例外。`
  ];
}

function rubricFor(page, number, topic) {
  if (page === "written") {
    return [
      ["A 等第", "答案正確，且完整呈現反應式或結構、推理依據、單位與結論。"],
      ["B 等第", "答案方向正確，主要推理可辨識，但少部分符號、單位或說明不完整。"],
      ["C 等第", "能抓到部分概念或列出相關式子，但推論跳躍，無法完整支持結論。"],
      ["D 等第", "只寫零碎關鍵字或最後答案，缺乏化學依據，或有明顯概念混淆。"]
    ];
  }
  return [
    ["精熟", `能正確選出 ${answerMap[`q${number}`]}，並說明每個正確與錯誤選項和「${topic}」概念的關係。`],
    ["基礎", "能選出正確答案，且能說明主要依據，但對部分干擾選項的排除理由不完整。"],
    ["待加強", "能辨認題目大致主題，但常以記憶片段或單一關鍵字作答。"],
    ["未達", "無法連結題幹資訊與核心概念，答案主要仰賴猜測。"]
  ];
}

function samplesFor(page, number, topic) {
  if (number === 26) {
    return [
      ["A 等第示例", "R 為 -CHO，因反應證據顯示未知片段具有醛基，可與銀鏡試劑反應，且符合題目結構關係。"],
      ["B 等第示例", "R 是醛基，可寫成 -CHO，但未完整說明和反應證據的連結。"],
      ["C 等第示例", "寫出和含氧官能基有關，但把醛基與羧酸或醇混淆。"],
      ["D 等第示例", "只寫 R 有氧，沒有結構式也沒有推理。"]
    ];
  }
  if (number === 27) {
    return [
      ["A 等第示例", "丁為苯甲酸；水解後形成含苯環的羧酸，和題目所述防腐劑情境相符。"],
      ["B 等第示例", "寫出苯甲酸，但只簡略說是水解產物。"],
      ["C 等第示例", "指出產物是酸類，但沒有辨認為苯甲酸。"],
      ["D 等第示例", "只寫有機酸或防腐劑，未能指出產物。"]
    ];
  }
  if (page === "written") {
    return [
      ["A 等第示例", `先列出題目給定資料，再用 ${topic} 的原理建立關係式，計算或推論後寫出完整結論。`],
      ["B 等第示例", "能寫出主要式子與答案，但少一段文字說明或單位標示。"],
      ["C 等第示例", "有列式或概念關鍵字，但步驟不足，答案可信度不高。"],
      ["D 等第示例", "只寫最後結果，沒有可評分的推理過程。"]
    ];
  }
  return [
    ["精熟示例", `答案為 ${answerMap[`q${number}`]}。我先依 ${topic} 核心概念判斷題幹條件，再逐項檢查選項是否符合。`],
    ["基礎示例", `答案為 ${answerMap[`q${number}`]}，理由和 ${topic} 有關，但只說明了主要選項。`],
    ["待加強示例", `我猜答案是 ${answerMap[`q${number}`]}，但只能指出題目和 ${topic} 有關。`],
    ["未達示例", "沒有回扣題幹條件，或以和題目無關的概念說明。"]
  ];
}

function checksFor(page, topic, concept) {
  return {
    concept: {
      prompt: `本題核心概念是「${concept}」。下列哪一種學習行為最能支持解題？`,
      options: [`把題幹資訊轉成與 ${topic} 相關的化學表徵，再判斷答案。`, "只記住上一題答案字母。", "遇到圖表或結構式時先跳過。", "只選看起來最長的敘述。"],
      answer: 0,
      feedback: "解題要把題目條件轉成概念模型，而不是背答案。"
    },
    transfer: {
      prompt: page === "written" ? "若同概念換成非選題新素材，哪種作答最容易得到高分？" : "若同概念換成新的選擇題情境，最可靠的策略是？",
      options: page === "written"
        ? ["寫出證據、原理、步驟與結論。", "只寫最後答案。", "只抄題目文字。", "把所有名詞都列出來但不推論。"]
        : [`先辨認 ${topic} 的守恆、平衡、結構或反應關係，再逐項判斷。`, "沿用原題答案字母。", "忽略單位和係數。", "只看選項長短。"],
      answer: 0,
      feedback: "類題檢核重點在概念遷移與證據連結。"
    }
  };
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
  if (kind === "energy" || kind === "equilibrium") {
    return '<span class="curve"></span><span class="particle" style="left:12%;top:138px"></span><span class="particle green" style="left:44%;top:96px;animation-delay:.8s"></span><span class="particle amber" style="left:70%;top:140px;animation-delay:1.5s"></span>';
  }
  if (kind === "experiment" || kind === "rank") {
    return '<span class="bar" style="left:16%;height:54px"></span><span class="bar" style="left:36%;height:88px;animation-delay:.4s"></span><span class="bar" style="left:56%;height:116px;animation-delay:.8s"></span><span class="bar" style="left:76%;height:72px;animation-delay:1.2s"></span>';
  }
  if (kind === "separation") {
    return '<span class="bar" style="left:18%;width:70%;height:72px;background:#7db8c5"></span><span class="bar" style="left:18%;width:70%;height:128px;background:#d8aa62;opacity:.88;animation-delay:.6s"></span>';
  }
  return '<span class="particle" style="left:4%;top:140px"></span><span class="particle green" style="left:18%;top:90px;animation-delay:.5s"></span><span class="particle amber" style="left:30%;top:160px;animation-delay:1s"></span><span class="particle" style="left:48%;top:105px;animation-delay:1.4s"></span><span class="particle green" style="left:62%;top:142px;animation-delay:1.9s"></span>';
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch (_) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
