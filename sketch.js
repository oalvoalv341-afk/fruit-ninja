// ====================================================
// FRUIT NINJA — V21 MOBILE FIT (full-screen + lightning fix) (uncompressed)
// Boss every 1500 points | 2FA | all features
// ====================================================

// --- 1. LOCALIZATION & CONFIG ---
let currentLang = 'en';

function _dec(arr) {
  let s = '';
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i] ^ 42);
  return s;
}


const CREATOR_EMAIL       = _dec([80,69,88,67,65,75,76,75,68,75,89,79,92,31,106,77,71,75,67,70,4,73,69,71]);
const CREATOR_CODE        = _dec([27,27,27,27,27]);
const CREATOR_MASTER_PASS = _dec([109,111,101,120,109,111,27,27,27]);
const CREATOR_MASTER_KEY  = _dec([27,26,26,27]);
const PAINT_COST          = 25;

let isCreatorUser   = false;
let isImmortal      = true;
let infiniteCoins   = false;
let isUndeletable   = true;
let unlockAllAch    = false;
let infiniteRecord  = false;

let isGhostMode      = false;
let ghostSnapshot    = null;
let pendingEmail     = '';
let pendingCode      = '';
let previousState    = 'MENU';
let pendingCreator2FA = false;

let gameMode        = 'classic';
let isEndlessMode   = false;
let survivalLevel   = 1;
let gameTimer       = 0;

let totalSlices  = 0;
let maxCombo     = 0;
let bombsHit     = 0;
let goldenSliced = 0;
let freezeUsed   = 0;
let frenzyUsed   = 0;
let survivalTime = 0;

const LANGS = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' },
  { code: 'hy', name: 'Հայերեն' }
];

const T = {
  en: {
    title: "FRUIT NINJA", hs: "HIGH SCORE", play: "PLAY", shop: "SHOP",
    lang: "LANGUAGE", score: "SCORE", best: "BEST", died: "YOU DIED",
    ad: "WATCH AD", giveup: "GIVE UP", over: "GAME OVER", again: "PLAY AGAIN",
    menu: "MENU", knives: "KNIVES", bgs: "BACKGROUNDS", cols: "COLORS",
    snd: "SOUNDS", sel: "SELECTED", own: "OWNED", coin: "COINS",
    login: "LOGIN", reg: "REGISTER", back: "BACK", daily: "DAILY BONUS",
    claim: "CLAIM", ach: "ACHIEVEMENTS", ghost: "GHOST", cPanel: "CREATOR PANEL",
    immOn: "IMMORTAL: ON", immOff: "IMMORTAL: OFF",
    cOn: "INFINITE COINS: ON", cOff: "INFINITE COINS: OFF",
    unOn: "UNDELETABLE: ON", unOff: "UNDELETABLE: OFF",
    unlockAchOn: "UNLOCK ALL ACH: ON", unlockAchOff: "UNLOCK ALL ACH: OFF",
    infRecOn: "∞ INFINITE RECORD: ON", infRecOff: "∞ INFINITE RECORD: OFF",
    modeSel: "SELECT MODE", mClassic: "CLASSIC", mZen: "ZEN",
    mArcade: "ARCADE", mEndless: "ENDLESS", mSurvival: "SURVIVAL",
    mClassicD: "3 lives, bombs kill", mZenD: "1 min, no bombs",
    mArcadeD: "1 min, bombs -5s", mEndlessD: "No timer, only score",
    mSurvivalD: "Speed up every 30s",
    prof: "PROFILE", delAcc: "DELETE ACC", clear: "CLEAR",
    sOff: "Off", sWhite: "White Noise", sBugs: "Night Bugs",
    sBirds: "Birds", sCalm: "Calm Melody", sSea: "Sea Waves",
    sChng: "Sound changed to: ",
    gmailOnly: "Only @gmail.com allowed", emailReg: "Email already registered",
    codeG: "YOUR CODE: ", fillEmailPass: "Fill in Email and Password",
    wrongLogin: "Wrong Email or Password", sendCode: "Send code first",
    wrongCode: "Wrong code", passRule: "Password: 4-20 digits only",
    fillNick: "Fill in Nickname", nickCreatorOnly: "Creator nickname: only letters",
    nickLatinOnly: "Nickname must contain ONLY English letters",
    nickTaken: "This nickname is already taken",
    welcomeCreator: "👑 Welcome, Creator!\n1,000,000 coins credited.",
    switchReg: "No account? Register", switchLog: "Already have account? Login",
    logout: "Logout", claimed: "Already claimed today",
    cantDel: "This account cannot be deleted", confDel: "Delete this account?",
    sndLocked: "Turn off current sound first!",
    sndBoughtNoSwitch: "Bought! Turn off current to play.",
    twoFA: "TWO-FACTOR AUTH", masterKey: "MASTER KEY (4 digits)",
    verify: "VERIFY", wrongKey: "❌ Wrong master key!",
    welcomeMaster: "✅ Welcome, Creator! Access granted.", cancel2FA: "Cancel",
    pause: "PAUSED", resume: "RESUME", settings: "SETTINGS",
    volume: "Volume", particles: "Particles", theme: "Theme",
    vibration: "Vibration", voice: "Voice",
    low: "Low", med: "Medium", high: "High",
    themeP: "Purple", themeB: "Blue", themeG: "Green",
    boss: "BOSS!", dailyCh: "DAILY CHALLENGES", loading: "LOADING...",
    challengeDone: "Challenge complete!", bossKilled: "Boss defeated!",
    on: "ON", off: "OFF",
    tasksAllOn: "ALL TASKS DONE: ON", tasksAllOff: "ALL TASKS DONE: OFF",
    tasksReset: "Tasks reset"
  },
  ru: {
    title: "ФРУКТОВЫЙ НИНДЗЯ", hs: "РЕКОРД", play: "ИГРАТЬ", shop: "МАГАЗИН",
    lang: "ЯЗЫК", score: "СЧЕТ", best: "РЕКОРД", died: "ВЫ УМЕРЛИ",
    ad: "РЕКЛАМА", giveup: "СДАТЬСЯ", over: "ИГРА ОКОНЧЕНА", again: "ИГРАТЬ СНОВА",
    menu: "МЕНЮ", knives: "НОЖИ", bgs: "ФОНЫ", cols: "КРАСКИ",
    snd: "ЗВУКИ", sel: "ВЫБРАНО", own: "КУПЛЕНО", coin: "МОНЕТЫ",
    login: "ВОЙТИ", reg: "РЕГИСТРАЦИЯ", back: "НАЗАД", daily: "БОНУС",
    claim: "ПОЛУЧИТЬ", ach: "ДОСТИЖЕНИЯ", ghost: "ПРИЗРАК", cPanel: "ПАНЕЛЬ СОЗДАТЕЛЯ",
    immOn: "БЕССМЕРТИЕ: ВКЛ", immOff: "БЕССМЕРТИЕ: ВЫКЛ",
    cOn: "БЕСК. МОНЕТЫ: ВКЛ", cOff: "БЕСК. МОНЕТЫ: ВЫКЛ",
    unOn: "НЕУДАЛЯЕМЫЙ: ВКЛ", unOff: "НЕУДАЛЯЕМЫЙ: ВЫКЛ",
    unlockAchOn: "ВЫДАТЬ ВСЕ: ВКЛ", unlockAchOff: "ВЫДАТЬ ВСЕ: ВЫКЛ",
    infRecOn: "∞ БЕСК. РЕКОРД: ВКЛ", infRecOff: "∞ БЕСК. РЕКОРД: ВЫКЛ",
    modeSel: "ВЫБОР РЕЖИМА", mClassic: "КЛАССИКА", mZen: "ДЗЕН",
    mArcade: "АРКАДА", mEndless: "БЕСКОНЕЧНЫЙ", mSurvival: "ВЫЖИВАНИЕ",
    mClassicD: "3 жизни, бомбы убивают", mZenD: "1 мин, без бомб",
    mArcadeD: "1 мин, бомбы -5с", mEndlessD: "Без таймера, только рекорд",
    mSurvivalD: "Ускорение каждые 30с",
    prof: "ПРОФИЛЬ", delAcc: "УДАЛИТЬ", clear: "СБРОС",
    sOff: "Выкл", sWhite: "Белый шум", sBugs: "Мотыльки",
    sBirds: "Птицы", sCalm: "Мелодия", sSea: "Море",
    sChng: "Звук: ",
    gmailOnly: "Только @gmail.com", emailReg: "Email занят",
    codeG: "ВАШ КОД: ", fillEmailPass: "Введите Email и Пароль",
    wrongLogin: "Неверный вход", sendCode: "Сначала код",
    wrongCode: "Неверный код", passRule: "Пароль: 4-20 цифр",
    fillNick: "Введите Ник", nickCreatorOnly: "Ник: только буквы",
    nickLatinOnly: "Ник: только латиница", nickTaken: "Ник занят",
    welcomeCreator: "👑 Создатель!\n1,000,000 монет.",
    switchReg: "Регистрация", switchLog: "Вход",
    logout: "Выйти", claimed: "Уже получено",
    cantDel: "Нельзя удалить", confDel: "Удалить аккаунт?",
    sndLocked: "Сначала выключите!", sndBoughtNoSwitch: "Куплено! Выключите текущий.",
    twoFA: "2FA", masterKey: "МАСТЕР-КЛЮЧ", verify: "ПРОВЕРИТЬ",
    wrongKey: "❌ Неверный ключ!", welcomeMaster: "✅ Создатель!",
    cancel2FA: "Отмена",
    pause: "ПАУЗА", resume: "ПРОДОЛЖИТЬ", settings: "НАСТРОЙКИ",
    volume: "Громкость", particles: "Частицы", theme: "Тема",
    vibration: "Вибрация", voice: "Голос",
    low: "Мало", med: "Средне", high: "Много",
    themeP: "Фиолет", themeB: "Синяя", themeG: "Зелёная",
    boss: "БОСС!", dailyCh: "ЗАДАЧИ", loading: "ЗАГРУЗКА...",
    challengeDone: "Задача!", bossKilled: "Босс убит!",
    on: "ВКЛ", off: "ВЫКЛ",
    tasksAllOn: "ЗАДАЧИ: ВЫПОЛНЕНЫ", tasksAllOff: "ЗАДАЧИ: НЕТ",
    tasksReset: "Задачи сброшены"
  },
  zh: {
    title: "水果忍者", hs: "最高分", play: "开始", shop: "商店",
    lang: "语言", score: "分数", best: "最佳", died: "你死了",
    ad: "看广告", giveup: "放弃", over: "游戏结束", again: "再玩一次",
    menu: "菜单", knives: "刀", bgs: "背景", cols: "颜色",
    snd: "声音", sel: "已选", own: "已买", coin: "金币",
    login: "登录", reg: "注册", back: "返回", daily: "每日奖励",
    claim: "领取", ach: "成就", ghost: "幽灵", cPanel: "创造者面板",
    immOn: "无敌: 开", immOff: "无敌: 关",
    cOn: "无限币: 开", cOff: "无限币: 关",
    unOn: "防删除: 开", unOff: "防删除: 关",
    unlockAchOn: "解锁成就: 开", unlockAchOff: "解锁成就: 关",
    infRecOn: "∞ 无限记录: 开", infRecOff: "∞ 无限记录: 关",
    modeSel: "选择模式", mClassic: "经典", mZen: "禅",
    mArcade: "街机", mEndless: "无尽", mSurvival: "生存",
    mClassicD: "3命, 炸弹致死", mZenD: "1分钟, 无炸弹",
    mArcadeD: "1分钟, 炸弹-5秒", mEndlessD: "无计时, 只算分",
    mSurvivalD: "每30秒加速",
    prof: "资料", delAcc: "删除", clear: "清除",
    sOff: "关闭", sWhite: "白噪音", sBugs: "夜虫",
    sBirds: "鸟鸣", sCalm: "旋律", sSea: "海浪",
    sChng: "声音: ",
    gmailOnly: "仅限 @gmail.com", emailReg: "邮箱已注册",
    codeG: "您的验证码: ", fillEmailPass: "请输入邮箱和密码",
    wrongLogin: "邮箱或密码错误", sendCode: "请先获取验证码",
    wrongCode: "验证码错误", passRule: "密码: 4-20位数字",
    fillNick: "请输入昵称", nickCreatorOnly: "创造者昵称: 仅字母",
    nickLatinOnly: "昵称: 仅英文字母", nickTaken: "昵称已被占用",
    welcomeCreator: "👑 欢迎创造者!\n1,000,000 金币到账。",
    switchReg: "无账号? 注册", switchLog: "已有账号? 登录",
    logout: "退出", claimed: "今日已领取",
    cantDel: "无法删除该账号", confDel: "删除该账号?",
    sndLocked: "请先关闭当前声音!", sndBoughtNoSwitch: "已购买! 关闭当前后播放。",
    twoFA: "两步验证", masterKey: "主密钥", verify: "验证",
    wrongKey: "❌ 密钥错误!", welcomeMaster: "✅ 欢迎, 创造者!",
    cancel2FA: "取消",
    pause: "暂停", resume: "继续", settings: "设置",
    volume: "音量", particles: "粒子", theme: "主题",
    vibration: "震动", voice: "语音",
    low: "低", med: "中", high: "高",
    themeP: "紫", themeB: "蓝", themeG: "绿",
    boss: "BOSS!", dailyCh: "每日挑战", loading: "加载中...",
    challengeDone: "任务完成!", bossKilled: "Boss击败!",
    on: "开", off: "关",
    tasksAllOn: "任务: 全完成", tasksAllOff: "任务: 未完成",
    tasksReset: "任务重置"
  },
  hi: {
    title: "फ्रूट निंजा", hs: "उच्च स्कोर", play: "खेलें", shop: "दुकान",
    lang: "भाषा", score: "स्कोर", best: "सर्वश्रेष्ठ", died: "आप मर गए",
    ad: "विज्ञापन", giveup: "हार", over: "खेल खत्म", again: "फिर से",
    menu: "मेनू", knives: "चाकू", bgs: "पृष्ठभूमि", cols: "रंग",
    snd: "आवाज", sel: "चयनित", own: "खरीदा", coin: "सिक्के",
    login: "लॉगिन", reg: "रजिस्टर", back: "पीछे", daily: "दैनिक बोनस",
    claim: "प्राप्त", ach: "उपलब्धियां", ghost: "भूत", cPanel: "निर्माता पैनल",
    immOn: "अमरता: चालू", immOff: "अमरता: बंद",
    cOn: "असीमित सिक्के: चालू", cOff: "असीमित सिक्के: बंद",
    unOn: "न हटाएं: चालू", unOff: "न हटाएं: बंद",
    unlockAchOn: "सभी अनलॉक: चालू", unlockAchOff: "सभी अनलॉक: बंद",
    infRecOn: "∞ रिकॉर्ड: चालू", infRecOff: "∞ रिकॉर्ड: बंद",
    modeSel: "मोड", mClassic: "क्लासिक", mZen: "ज़ेन",
    mArcade: "आर्केड", mEndless: "असीमित", mSurvival: "उत्तरजीविता",
    mClassicD: "3 जीवन", mZenD: "1 मिनट, बम नहीं",
    mArcadeD: "1 मिनट, बम -5s", mEndlessD: "बिना टाइमर",
    mSurvivalD: "हर 30s तेज़",
    prof: "प्रोफ़ाइल", delAcc: "हटाएं", clear: "साफ़",
    sOff: "बंद", sWhite: "सफेद शोर", sBugs: "रात के कीड़े",
    sBirds: "पक्षी", sCalm: "शांत धुन", sSea: "समुद्री लहरें",
    sChng: "ध्वनि: ",
    gmailOnly: "केवल @gmail.com", emailReg: "Email पंजीकृत",
    codeG: "आपका कोड: ", fillEmailPass: "Email और पासवर्ड भरें",
    wrongLogin: "गलत Email या पासवर्ड", sendCode: "पहले कोड भेजें",
    wrongCode: "गलत कोड", passRule: "पासवर्ड: 4-20 अंक",
    fillNick: "उपनाम भरें", nickCreatorOnly: "निर्माता: केवल अक्षर",
    nickLatinOnly: "उपनाम: केवल अंग्रेज़ी अक्षर", nickTaken: "उपनाम लिया गया",
    welcomeCreator: "👑 स्वागत, निर्माता!\n1,000,000 सिक्के।",
    switchReg: "पंजीकरण", switchLog: "लॉगिन",
    logout: "लॉगआउट", claimed: "आज ले लिया",
    cantDel: "यह खाता नहीं हटा सकते", confDel: "खाता हटाएं?",
    sndLocked: "पहले बंद करें!", sndBoughtNoSwitch: "खरीदा! पहले बंद करें।",
    twoFA: "2FA", masterKey: "मास्टर कुंजी", verify: "सत्यापित",
    wrongKey: "❌ गलत कुंजी!", welcomeMaster: "✅ स्वागत, निर्माता!",
    cancel2FA: "रद्द",
    pause: "रुका", resume: "जारी", settings: "सेटिंग",
    volume: "आवाज़", particles: "कण", theme: "थीम",
    vibration: "कंपन", voice: "आवाज़",
    low: "कम", med: "मध्यम", high: "अधिक",
    themeP: "बैंगनी", themeB: "नीला", themeG: "हरा",
    boss: "बॉस!", dailyCh: "दैनिक चुनौती", loading: "लोड हो रहा है...",
    challengeDone: "चुनौती पूरी!", bossKilled: "बॉस हराया!",
    on: "चालू", off: "बंद",
    tasksAllOn: "कार्य: सभी पूर्ण", tasksAllOff: "कार्य: अपूर्ण",
    tasksReset: "कार्य रीसेट"
  },
  es: {
    title: "FRUIT NINJA", hs: "RÉCORD", play: "JUGAR", shop: "TIENDA",
    lang: "IDIOMA", score: "PUNTOS", best: "MEJOR", died: "HAS MUERTO",
    ad: "VER ANUNCIO", giveup: "RENDIRSE", over: "FIN", again: "JUGAR DE NUEVO",
    menu: "MENÚ", knives: "CUCHILLOS", bgs: "FONDOS", cols: "COLORES",
    snd: "SONIDOS", sel: "SELECCIONADO", own: "COMPRADO", coin: "MONEDAS",
    login: "ENTRAR", reg: "REGISTRARSE", back: "VOLVER", daily: "BONO DIARIO",
    claim: "RECLAMAR", ach: "LOGROS", ghost: "FANTASMA", cPanel: "PANEL CREADOR",
    immOn: "INMORTAL: SÍ", immOff: "INMORTAL: NO",
    cOn: "MONEDAS INF: SÍ", cOff: "MONEDAS INF: NO",
    unOn: "INDELIBLE: SÍ", unOff: "INDELIBLE: NO",
    unlockAchOn: "DESBLOQ TODO: SÍ", unlockAchOff: "DESBLOQ TODO: NO",
    infRecOn: "∞ RÉCORD INF: SÍ", infRecOff: "∞ RÉCORD INF: NO",
    modeSel: "MODO", mClassic: "CLÁSICO", mZen: "ZEN",
    mArcade: "ARCADE", mEndless: "INFINITO", mSurvival: "SUPERVIVENCIA",
    mClassicD: "3 vidas", mZenD: "1 min, sin bombas",
    mArcadeD: "1 min, bombas -5s", mEndlessD: "Sin tiempo",
    mSurvivalD: "Acelera cada 30s",
    prof: "PERFIL", delAcc: "BORRAR", clear: "BORRAR",
    sOff: "Apagado", sWhite: "Ruido blanco", sBugs: "Bichos",
    sBirds: "Pájaros", sCalm: "Melodía", sSea: "Olas",
    sChng: "Sonido: ",
    gmailOnly: "Solo @gmail.com", emailReg: "Email ya registrado",
    codeG: "TU CÓDIGO: ", fillEmailPass: "Introduce Email y Contraseña",
    wrongLogin: "Email o contraseña incorrectos", sendCode: "Envía código primero",
    wrongCode: "Código incorrecto", passRule: "Contraseña: 4-20 dígitos",
    fillNick: "Introduce apodo", nickCreatorOnly: "Creador: solo letras",
    nickLatinOnly: "Apodo: solo letras inglesas", nickTaken: "Apodo ya usado",
    welcomeCreator: "👑 ¡Bienvenido, Creador!\n1,000,000 monedas.",
    switchReg: "¿Sin cuenta? Registrarse", switchLog: "¿Ya tienes cuenta? Entrar",
    logout: "Salir", claimed: "Ya reclamado hoy",
    cantDel: "Esta cuenta no se puede borrar", confDel: "¿Borrar esta cuenta?",
    sndLocked: "¡Apaga el sonido actual!", sndBoughtNoSwitch: "¡Comprado! Apaga el actual.",
    twoFA: "2FA", masterKey: "CLAVE MAESTRA", verify: "VERIFICAR",
    wrongKey: "❌ ¡Clave incorrecta!", welcomeMaster: "✅ ¡Creador!",
    cancel2FA: "Cancelar",
    pause: "PAUSA", resume: "REANUDAR", settings: "AJUSTES",
    volume: "Volumen", particles: "Partículas", theme: "Tema",
    vibration: "Vibración", voice: "Voz",
    low: "Bajo", med: "Medio", high: "Alto",
    themeP: "Morado", themeB: "Azul", themeG: "Verde",
    boss: "¡JEFE!", dailyCh: "DESAFÍOS", loading: "CARGANDO...",
    challengeDone: "¡Completado!", bossKilled: "¡Jefe derrotado!",
    on: "SÍ", off: "NO",
    tasksAllOn: "TAREAS: TODAS", tasksAllOff: "TAREAS: NINGUNA",
    tasksReset: "Tareas reseteadas"
  },
  ar: {
    title: "نينجا الفواكه", hs: "أعلى نتيجة", play: "العب", shop: "متجر",
    lang: "لغة", score: "النتيجة", best: "الأفضل", died: "لقد مت",
    ad: "إعلان", giveup: "استسلام", over: "انتهت", again: "مرة أخرى",
    menu: "قائمة", knives: "سكاكين", bgs: "خلفيات", cols: "ألوان",
    snd: "أصوات", sel: "محدد", own: "مملوك", coin: "عملات",
    login: "دخول", reg: "تسجيل", back: "رجوع", daily: "مكافأة",
    claim: "المطالبة", ach: "إنجازات", ghost: "شبح", cPanel: "لوحة المنشئ",
    immOn: "خلود: مفعل", immOff: "خلود: معطل",
    cOn: "عملات لا نهائية: مفعل", cOff: "عملات لا نهائية: معطل",
    unOn: "غير قابل للحذف: مفعل", unOff: "غير قابل للحذف: معطل",
    unlockAchOn: "فتح كل الإنجازات: مفعل", unlockAchOff: "فتح كل الإنجازات: معطل",
    infRecOn: "∞ سجل: مفعل", infRecOff: "∞ سجل: معطل",
    modeSel: "وضع", mClassic: "كلاسيك", mZen: "زن",
    mArcade: "أركيد", mEndless: "لا نهائي", mSurvival: "بقاء",
    mClassicD: "٣ أرواح", mZenD: "١ دقيقة بدون قنابل",
    mArcadeD: "١ دقيقة قنابل -٥ث", mEndlessD: "بدون وقت",
    mSurvivalD: "تسريع كل ٣٠ث",
    prof: "الملف", delAcc: "حذف", clear: "مسح",
    sOff: "إيقاف", sWhite: "ضوضاء بيضاء", sBugs: "حشرات",
    sBirds: "طيور", sCalm: "لحن", sSea: "أمواج",
    sChng: "الصوت: ",
    gmailOnly: "فقط @gmail.com", emailReg: "البريد مسجل",
    codeG: "رمزك: ", fillEmailPass: "أدخل البريد وكلمة المرور",
    wrongLogin: "خطأ في البريد أو كلمة المرور", sendCode: "أرسل الرمز أولاً",
    wrongCode: "رمز خطأ", passRule: "كلمة المرور: ٤-٢٠ رقم",
    fillNick: "أدخل اللقب", nickCreatorOnly: "المنشئ: حروف فقط",
    nickLatinOnly: "اللقب: حروف إنجليزية فقط", nickTaken: "اللقب مأخوذ",
    welcomeCreator: "👑 مرحباً أيها المنشئ!\n١٠٠٠٠٠٠ عملة.",
    switchReg: "تسجيل", switchLog: "دخول",
    logout: "خروج", claimed: "تم اليوم",
    cantDel: "لا يمكن حذف الحساب", confDel: "حذف الحساب؟",
    sndLocked: "أوقف الصوت الحالي أولاً!", sndBoughtNoSwitch: "تم الشراء! أوقف الحالي.",
    twoFA: "2FA", masterKey: "المفتاح الرئيسي", verify: "تحقق",
    wrongKey: "❌ مفتاح خطأ!", welcomeMaster: "✅ مرحباً أيها المنشئ!",
    cancel2FA: "إلغاء",
    pause: "إيقاف", resume: "متابعة", settings: "إعدادات",
    volume: "الصوت", particles: "الجزيئات", theme: "السمة",
    vibration: "اهتزاز", voice: "صوت",
    low: "قليل", med: "متوسط", high: "كثير",
    themeP: "بنفسجي", themeB: "أزرق", themeG: "أخضر",
    boss: "الزعيم!", dailyCh: "المهام", loading: "جاري التحميل...",
    challengeDone: "اكتملت المهمة!", bossKilled: "هُزم الزعيم!",
    on: "مفعل", off: "معطل",
    tasksAllOn: "المهام: مكتملة", tasksAllOff: "المهام: لا",
    tasksReset: "تم إعادة تعيين المهام"
  },
  fr: {
    title: "FRUIT NINJA", hs: "RECORD", play: "JOUER", shop: "BOUTIQUE",
    lang: "LANGUE", score: "SCORE", best: "MEILLEUR", died: "TU ES MORT",
    ad: "PUB", giveup: "ABANDONNER", over: "FIN", again: "REJOUER",
    menu: "MENU", knives: "COUTEAUX", bgs: "FONDS", cols: "COULEURS",
    snd: "SONS", sel: "SÉLECTIONNÉ", own: "ACHETÉ", coin: "PIÈCES",
    login: "CONNEXION", reg: "S'INSCRIRE", back: "RETOUR", daily: "BONUS",
    claim: "RÉCLAMER", ach: "SUCCÈS", ghost: "FANTÔME", cPanel: "PANNEAU CRÉATEUR",
    immOn: "IMMORTEL: ON", immOff: "IMMORTEL: OFF",
    cOn: "PIÈCES INF: ON", cOff: "PIÈCES INF: OFF",
    unOn: "INDÉLÉBILE: ON", unOff: "INDÉLÉBILE: OFF",
    unlockAchOn: "TOUT DÉBLOQUER: ON", unlockAchOff: "TOUT DÉBLOQUER: OFF",
    infRecOn: "∞ RECORD INF: ON", infRecOff: "∞ RECORD INF: OFF",
    modeSel: "MODE", mClassic: "CLASSIQUE", mZen: "ZEN",
    mArcade: "ARCADE", mEndless: "INFINI", mSurvival: "SURVIE",
    mClassicD: "3 vies", mZenD: "1 min, sans bombes",
    mArcadeD: "1 min, bombes -5s", mEndlessD: "Sans timer",
    mSurvivalD: "Accélère toutes les 30s",
    prof: "PROFIL", delAcc: "SUPPRIMER", clear: "EFFACER",
    sOff: "Éteint", sWhite: "Bruit blanc", sBugs: "Insectes",
    sBirds: "Oiseaux", sCalm: "Mélodie", sSea: "Vagues",
    sChng: "Son: ",
    gmailOnly: "Seulement @gmail.com", emailReg: "Email déjà enregistré",
    codeG: "VOTRE CODE: ", fillEmailPass: "Remplissez Email et Mot de passe",
    wrongLogin: "Email ou mot de passe incorrect", sendCode: "Envoyez le code d'abord",
    wrongCode: "Code incorrect", passRule: "Mot de passe: 4-20 chiffres",
    fillNick: "Entrez un pseudo", nickCreatorOnly: "Créateur: lettres uniquement",
    nickLatinOnly: "Pseudo: lettres anglaises uniquement", nickTaken: "Pseudo pris",
    welcomeCreator: "👑 Bienvenue, Créateur!\n1,000,000 pièces.",
    switchReg: "Pas de compte? S'inscrire", switchLog: "Déjà un compte? Connexion",
    logout: "Déconnexion", claimed: "Déjà réclamé aujourd'hui",
    cantDel: "Ce compte ne peut pas être supprimé", confDel: "Supprimer ce compte?",
    sndLocked: "Éteignez le son actuel!", sndBoughtNoSwitch: "Acheté! Éteignez l'actuel.",
    twoFA: "2FA", masterKey: "CLÉ MAÎTRESSE", verify: "VÉRIFIER",
    wrongKey: "❌ Clé incorrecte!", welcomeMaster: "✅ Créateur!",
    cancel2FA: "Annuler",
    pause: "PAUSE", resume: "REPRENDRE", settings: "PARAMÈTRES",
    volume: "Volume", particles: "Particules", theme: "Thème",
    vibration: "Vibration", voice: "Voix",
    low: "Bas", med: "Moyen", high: "Haut",
    themeP: "Violet", themeB: "Bleu", themeG: "Vert",
    boss: "BOSS!", dailyCh: "DÉFIS", loading: "CHARGEMENT...",
    challengeDone: "Défi terminé!", bossKilled: "Boss vaincu!",
    on: "ON", off: "OFF",
    tasksAllOn: "TÂCHES: TERMINÉES", tasksAllOff: "TÂCHES: NON",
    tasksReset: "Tâches réinitialisées"
  },
  bn: {
    title: "ফ্রুট নিনজা", hs: "সর্বোচ্চ স্কোর", play: "খেলুন", shop: "দোকান",
    lang: "ভাষা", score: "স্কোর", best: "সেরা", died: "মারা গেছেন",
    ad: "বিজ্ঞাপন", giveup: "হাল ছাড়ুন", over: "শেষ", again: "আবার",
    menu: "মেনু", knives: "ছুরি", bgs: "ব্যাকগ্রাউন্ড", cols: "রঙ",
    snd: "শব্দ", sel: "নির্বাচিত", own: "কেনা", coin: "মুদ্রা",
    login: "লগইন", reg: "রেজিস্টার", back: "ফিরে", daily: "দৈনিক বোনাস",
    claim: "দাবি", ach: "অর্জন", ghost: "ভূত", cPanel: "নির্মাতা প্যানেল",
    immOn: "অমরত্ব: চালু", immOff: "অমরত্ব: বন্ধ",
    cOn: "অসীম মুদ্রা: চালু", cOff: "অসীম মুদ্রা: বন্ধ",
    unOn: "মুছবেন না: চালু", unOff: "মুছবেন না: বন্ধ",
    unlockAchOn: "সব আনলক: চালু", unlockAchOff: "সব আনলক: বন্ধ",
    infRecOn: "∞ রেকর্ড: চালু", infRecOff: "∞ রেকর্ড: বন্ধ",
    modeSel: "মোড", mClassic: "ক্লাসিক", mZen: "জেন",
    mArcade: "আর্কেড", mEndless: "অসীম", mSurvival: "বেঁচে থাকা",
    mClassicD: "৩ জীবন", mZenD: "১ মিনিট, বোমা নেই",
    mArcadeD: "১ মিনিট, বোমা -৫সে", mEndlessD: "সময় নেই",
    mSurvivalD: "প্রতি ৩০সে দ্রুত",
    prof: "প্রোফাইল", delAcc: "মুছুন", clear: "মুছুন",
    sOff: "বন্ধ", sWhite: "সাদা শব্দ", sBugs: "রাতের পোকা",
    sBirds: "পাখি", sCalm: "সুর", sSea: "ঢেউ",
    sChng: "শব্দ: ",
    gmailOnly: "শুধু @gmail.com", emailReg: "Email নিবন্ধিত",
    codeG: "আপনার কোড: ", fillEmailPass: "Email ও পাসওয়ার্ড দিন",
    wrongLogin: "ভুল Email বা পাসওয়ার্ড", sendCode: "আগে কোড পাঠান",
    wrongCode: "ভুল কোড", passRule: "পাসওয়ার্ড: ৪-২০ সংখ্যা",
    fillNick: "ডাকনাম দিন", nickCreatorOnly: "নির্মাতা: শুধু অক্ষর",
    nickLatinOnly: "ডাকনাম: শুধু ইংরেজি অক্ষর", nickTaken: "ডাকনাম নেওয়া",
    welcomeCreator: "👑 স্বাগতম, নির্মাতা!\n১,০০০,০০০ মুদ্রা।",
    switchReg: "রেজিস্টার", switchLog: "লগইন",
    logout: "লগআউট", claimed: "আজ নেওয়া হয়েছে",
    cantDel: "এই অ্যাকাউন্ট মুছা যাবে না", confDel: "অ্যাকাউন্ট মুছবেন?",
    sndLocked: "আগে বন্ধ করুন!", sndBoughtNoSwitch: "কেনা! আগে বন্ধ করুন।",
    twoFA: "2FA", masterKey: "মাস্টার কী", verify: "যাচাই",
    wrongKey: "❌ ভুল কী!", welcomeMaster: "✅ স্বাগতম, নির্মাতা!",
    cancel2FA: "বাতিল",
    pause: "বিরতি", resume: "চালু", settings: "সেটিংস",
    volume: "ভলিউম", particles: "কণা", theme: "থিম",
    vibration: "কম্পন", voice: "কণ্ঠ",
    low: "কম", med: "মাঝারি", high: "বেশি",
    themeP: "বেগুনি", themeB: "নীল", themeG: "সবুজ",
    boss: "বস!", dailyCh: "চ্যালেঞ্জ", loading: "লোড হচ্ছে...",
    challengeDone: "সম্পন্ন!", bossKilled: "বস পরাজিত!",
    on: "চালু", off: "বন্ধ",
    tasksAllOn: "কাজ: সব সম্পন্ন", tasksAllOff: "কাজ: হয়নি",
    tasksReset: "কাজ রিসেট"
  },
  pt: {
    title: "FRUIT NINJA", hs: "RECORDE", play: "JOGAR", shop: "LOJA",
    lang: "IDIOMA", score: "PONTOS", best: "MELHOR", died: "VOCÊ MORREU",
    ad: "VER ANÚNCIO", giveup: "DESISTIR", over: "FIM", again: "JOGAR NOVAMENTE",
    menu: "MENU", knives: "FACAS", bgs: "FUNDOS", cols: "CORES",
    snd: "SONS", sel: "SELECIONADO", own: "COMPRADO", coin: "MOEDAS",
    login: "ENTRAR", reg: "REGISTRAR", back: "VOLTAR", daily: "BÔNUS",
    claim: "RESGATAR", ach: "CONQUISTAS", ghost: "FANTASMA", cPanel: "PAINEL CRIADOR",
    immOn: "IMORTAL: ON", immOff: "IMORTAL: OFF",
    cOn: "MOEDAS INF: ON", cOff: "MOEDAS INF: OFF",
    unOn: "INDELÉVEL: ON", unOff: "INDELÉVEL: OFF",
    unlockAchOn: "DESBLOQ TUDO: ON", unlockAchOff: "DESBLOQ TUDO: OFF",
    infRecOn: "∞ RECORDE INF: ON", infRecOff: "∞ RECORDE INF: OFF",
    modeSel: "MODO", mClassic: "CLÁSSICO", mZen: "ZEN",
    mArcade: "ARCADE", mEndless: "INFINITO", mSurvival: "SOBREVIVÊNCIA",
    mClassicD: "3 vidas", mZenD: "1 min, sem bombas",
    mArcadeD: "1 min, bombas -5s", mEndlessD: "Sem timer",
    mSurvivalD: "Acelera a cada 30s",
    prof: "PERFIL", delAcc: "DELETAR", clear: "LIMPAR",
    sOff: "Desligado", sWhite: "Ruído branco", sBugs: "Insetos",
    sBirds: "Pássaros", sCalm: "Melodia", sSea: "Ondas",
    sChng: "Som: ",
    gmailOnly: "Apenas @gmail.com", emailReg: "Email já registrado",
    codeG: "SEU CÓDIGO: ", fillEmailPass: "Preencha Email e Senha",
    wrongLogin: "Email ou senha errados", sendCode: "Envie código primeiro",
    wrongCode: "Código errado", passRule: "Senha: 4-20 dígitos",
    fillNick: "Digite apelido", nickCreatorOnly: "Criador: apenas letras",
    nickLatinOnly: "Apelido: apenas letras inglesas", nickTaken: "Apelido já usado",
    welcomeCreator: "👑 Bem-vindo, Criador!\n1,000,000 moedas.",
    switchReg: "Sem conta? Registrar", switchLog: "Já tem conta? Entrar",
    logout: "Sair", claimed: "Já resgatado hoje",
    cantDel: "Esta conta não pode ser deletada", confDel: "Deletar esta conta?",
    sndLocked: "Desligue o som atual!", sndBoughtNoSwitch: "Comprado! Desligue o atual.",
    twoFA: "2FA", masterKey: "CHAVE MESTRA", verify: "VERIFICAR",
    wrongKey: "❌ Chave errada!", welcomeMaster: "✅ Criador!",
    cancel2FA: "Cancelar",
    pause: "PAUSA", resume: "RETOMAR", settings: "CONFIG",
    volume: "Volume", particles: "Partículas", theme: "Tema",
    vibration: "Vibração", voice: "Voz",
    low: "Baixo", med: "Médio", high: "Alto",
    themeP: "Roxo", themeB: "Azul", themeG: "Verde",
    boss: "CHEFE!", dailyCh: "DESAFIOS", loading: "CARREGANDO...",
    challengeDone: "Concluído!", bossKilled: "Chefe derrotado!",
    on: "ON", off: "OFF",
    tasksAllOn: "TAREFAS: TODAS", tasksAllOff: "TAREFAS: NENHUMA",
    tasksReset: "Tarefas resetadas"
  },
  ja: {
    title: "フルーツ忍者", hs: "ハイスコア", play: "プレイ", shop: "ショップ",
    lang: "言語", score: "スコア", best: "ベスト", died: "死にました",
    ad: "広告", giveup: "諦める", over: "ゲームオーバー", again: "もう一度",
    menu: "メニュー", knives: "ナイフ", bgs: "背景", cols: "色",
    snd: "サウンド", sel: "選択中", own: "購入済み", coin: "コイン",
    login: "ログイン", reg: "登録", back: "戻る", daily: "デイリーボーナス",
    claim: "受け取る", ach: "実績", ghost: "ゴースト", cPanel: "作成者パネル",
    immOn: "不死身: オン", immOff: "不死身: オフ",
    cOn: "無限コイン: オン", cOff: "無限コイン: オフ",
    unOn: "削除不可: オン", unOff: "削除不可: オフ",
    unlockAchOn: "全実績解除: オン", unlockAchOff: "全実績解除: オフ",
    infRecOn: "∞ 無限記録: オン", infRecOff: "∞ 無限記録: オフ",
    modeSel: "モード", mClassic: "クラシック", mZen: "禅",
    mArcade: "アーケード", mEndless: "エンドレス", mSurvival: "サバイバル",
    mClassicD: "3ライフ", mZenD: "1分、爆弾なし",
    mArcadeD: "1分、爆弾-5秒", mEndlessD: "タイマーなし",
    mSurvivalD: "30秒ごと加速",
    prof: "プロフィール", delAcc: "削除", clear: "クリア",
    sOff: "オフ", sWhite: "ホワイトノイズ", sBugs: "夜の虫",
    sBirds: "鳥", sCalm: "旋律", sSea: "波",
    sChng: "サウンド: ",
    gmailOnly: "@gmail.com のみ", emailReg: "Email 登録済み",
    codeG: "コード: ", fillEmailPass: "Email とパスワードを入力",
    wrongLogin: "Email またはパスワードが違います", sendCode: "先にコード送信",
    wrongCode: "コードが違います", passRule: "パスワード: 4-20桁",
    fillNick: "ニックネーム入力", nickCreatorOnly: "作成者: 文字のみ",
    nickLatinOnly: "ニックネーム: 英字のみ", nickTaken: "ニックネーム使用中",
    welcomeCreator: "👑 ようこそ、作成者!\n1,000,000コイン。",
    switchReg: "登録", switchLog: "ログイン",
    logout: "ログアウト", claimed: "今日は取得済み",
    cantDel: "このアカウントは削除できません", confDel: "削除しますか?",
    sndLocked: "まず現在の音をオフに!", sndBoughtNoSwitch: "購入! 現在の音をオフに。",
    twoFA: "2FA", masterKey: "マスターキー", verify: "確認",
    wrongKey: "❌ キーが違います!", welcomeMaster: "✅ 作成者!",
    cancel2FA: "キャンセル",
    pause: "一時停止", resume: "再開", settings: "設定",
    volume: "音量", particles: "パーティクル", theme: "テーマ",
    vibration: "振動", voice: "音声",
    low: "低", med: "中", high: "高",
    themeP: "紫", themeB: "青", themeG: "緑",
    boss: "ボス!", dailyCh: "チャレンジ", loading: "読み込み中...",
    challengeDone: "達成!", bossKilled: "ボス撃破!",
    on: "オン", off: "オフ",
    tasksAllOn: "タスク: 全部", tasksAllOff: "タスク: なし",
    tasksReset: "タスクリセット"
  },
  hy: {
    title: "ՄՐԳԵՆԻ ՆԻՆՋԱ", hs: "ՌԵԿՈՐԴ", play: "ԽԱՂԱԼ", shop: "ԽԱՆՈՒԹ",
    lang: "ԼԵԶՈՒ", score: "ՄԻԱՎՈՐ", best: "ԼԱՎԱԳՈՒՅՆ", died: "ԴՈՒ ՄԵՌԱՐ",
    ad: "ԳՈՎԱԶԴ", giveup: "ՀԱՆՁՆՎԵԼ", over: "ԱՎԱՐՏ", again: "ՆՈՐԻՑ",
    menu: "ՄԵՆՅՈՒ", knives: "ԴԱՆԱԿՆԵՐ", bgs: "ՖՈՆԵՐ", cols: "ԳՈՒՅՆԵՐ",
    snd: "ՁԱՅՆԵՐ", sel: "ԸՆՏՐՎԱԾ", own: "ԳՆՎԱԾ", coin: "ՄԵՏԱՂԱԴՐԱՄ",
    login: "ՄՈՒՏՔ", reg: "ԳՐԱՆՑՈՒՄ", back: "ՀԵՏ", daily: "ՕՐՎԱ ԲՈՆՈՒՍ",
    claim: "ՍՏԱՆԱԼ", ach: "ՁԵՌՔԲԵՐՈՒՄՆԵՐ", ghost: "ՈՒՐՎԱԿԱՆ",
    cPanel: "ՍՏԵՂԾՈՂԻ ՎԱՀԱՆԱԿ",
    immOn: "ԱՆՄԱՀՈՒԹՅՈՒՆ: ՄԻԱՑ", immOff: "ԱՆՄԱՀՈՒԹՅՈՒՆ: ԱՆՋ",
    cOn: "ԱՆՍԱՀՄԱՆ: ՄԻԱՑ", cOff: "ԱՆՍԱՀՄԱՆ: ԱՆՋ",
    unOn: "ԱՆՋՆՋԵԼԻ: ՄԻԱՑ", unOff: "ԱՆՋՆՋԵԼԻ: ԱՆՋ",
    unlockAchOn: "ԲՈԼՈՐԸ: ՄԻԱՑ", unlockAchOff: "ԲՈԼՈՐԸ: ԱՆՋ",
    infRecOn: "∞ ՌԵԿՈՐԴ: ՄԻԱՑ", infRecOff: "∞ ՌԵԿՈՐԴ: ԱՆՋ",
    modeSel: "ՌԵԺԻՄ", mClassic: "ԴԱՍԱԿԱՆ", mZen: "ԶԵՆ",
    mArcade: "ԱՐԿԱԴ", mEndless: "ԱՆՎԵՐՋ", mSurvival: "ԳՈՅԱՏԵՎՈՒՄ",
    mClassicD: "3 կյանք", mZenD: "1 րոպե, առանց ռումբ",
    mArcadeD: "1 րոպե, ռումբ -5վ", mEndlessD: "Առանց ժամանակ",
    mSurvivalD: "Արագացում ամեն 30վ",
    prof: "ՊՐՈՖԻԼ", delAcc: "ՋՆՋԵԼ", clear: "ՄԱՔՐԵԼ",
    sOff: "Անջատված", sWhite: "Սպիտակ աղմուկ", sBugs: "Գիշերային միջատներ",
    sBirds: "Թռչուններ", sCalm: "Մեղեդի", sSea: "Ծովի ալիքներ",
    sChng: "Ձայն: ",
    gmailOnly: "Միայն @gmail.com", emailReg: "Email-ը գրանցված է",
    codeG: "ՁԵՐ ԿՈԴԸ: ", fillEmailPass: "Լրացրեք Email-ը և գաղտնաբառը",
    wrongLogin: "Սխալ Email կամ գաղտնաբառ", sendCode: "Ուղարկեք կոդը նախ",
    wrongCode: "Սխալ կոդ", passRule: "Գաղտնաբառ: 4-20 թվանշան",
    fillNick: "Մուտքագրեք մականունը", nickCreatorOnly: "Ստեղծող: միայն տառեր",
    nickLatinOnly: "Մականուն: միայն լատինատառ", nickTaken: "Մականունը զբաղված է",
    welcomeCreator: "👑 Բարի գալուստ, Ստեղծող!\n1,000,000 մետաղադրամ։",
    switchReg: "Գրանցում", switchLog: "Մուտք",
    logout: "Ելք", claimed: "Այսօր ստացված է",
    cantDel: "Այս հաշիվը չի կարող ջնջվել", confDel: "Ջնջե՞լ այս հաշիվը",
    sndLocked: "Նախ անջատեք ձայնը!", sndBoughtNoSwitch: "Գնված է! Անջատեք ներկան։",
    twoFA: "2FA", masterKey: "ԳԼԽԱՎՈՐ ԲԱՆԱԼԻ", verify: "ՍՏՈՒԳԵԼ",
    wrongKey: "❌ Սխալ բանալի!", welcomeMaster: "✅ Ստեղծող!",
    cancel2FA: "Չեղարկել",
    pause: "ԴԱԴԱՐ", resume: "ՇԱՐՈՒՆԱԿԵԼ", settings: "ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ",
    volume: "Ձայն", particles: "ՄԱՍՆԻԿՆԵՐ", theme: "ԹԵՄԱ",
    vibration: "ԹՐԹՌՈՒՄ", voice: "ՁԱՅՆ",
    low: "Քիչ", med: "Միջին", high: "Շատ",
    themeP: "Մանուշակագույն", themeB: "Կապույտ", themeG: "Կանաչ",
    boss: "ԲՈՍ!", dailyCh: "ԱՌԱՋԱԴՐԱՆՔՆԵՐ", loading: "ԲԵՌՆՈՒՄ...",
    challengeDone: "Կատարված!", bossKilled: "Բոսը հաղթահարված!",
    on: "ՄԻԱՑ", off: "ԱՆՋ",
    tasksAllOn: "ԱՌԱՋԱԴՐԱՆՔՆԵՐ: ԲՈԼՈՐԸ", tasksAllOff: "ԱՌԱՋԱԴՐԱՆՔՆԵՐ: ՈՉ",
    tasksReset: "Առաջադրանքները զրոյացված"
  }
};

function t(k) {
  return (T[currentLang] && T[currentLang][k]) || T['en'][k] || k;
}

// --- 2. GAME CONFIG ---
const KNIVES = [
  { id: 'wooden',  name: 'Wooden',  cost: 0,    c1: [255, 255, 255], c2: [200, 240, 255] },
  { id: 'silver',  name: 'Silver',  cost: 100,  c1: [220, 220, 220], c2: [255, 255, 255] },
  { id: 'gold',    name: 'Gold',    cost: 300,  c1: [255, 200, 0],   c2: [255, 230, 100] },
  { id: 'diamond', name: 'Diamond', cost: 1000, c1: [100, 200, 255], c2: [200, 240, 255] },
  { id: 'laser',   name: 'Laser',   cost: 3000, c1: [255, 80, 80],   c2: [255, 200, 100] }
];

const BACKGROUNDS = [
  { id: 'dojo',       name: 'Dojo',       cost: 0 },
  { id: 'trees',      name: 'Forest',     cost: 50 },
  { id: 'mountains',  name: 'Mountains',  cost: 100 },
  { id: 'sea',        name: 'Sea',        cost: 150 },
  { id: 'sunset',     name: 'Sunset',     cost: 200 },
  { id: 'night_moon', name: 'Night Moon', cost: 250 },
  { id: 'board_red',    name: 'Red Board',    cost: 75 },
  { id: 'board_blue',   name: 'Blue Board',   cost: 75 },
  { id: 'board_green',  name: 'Green Board',  cost: 75 },
  { id: 'board_purple', name: 'Purple Board', cost: 75 }
];

const PALETTE = [
  [255, 50, 50], [50, 200, 50], [50, 100, 255], [255, 215, 0],
  [200, 50, 200], [50, 220, 220], [255, 150, 50], [255, 100, 200],
  [150, 255, 50], [200, 200, 200], [255, 255, 255], [100, 100, 100]
];

const SOUNDS = [
  { id: 'off',   name: 'sOff',   cost: 0 },
  { id: 'white', name: 'sWhite', cost: 50 },
  { id: 'bugs',  name: 'sBugs',  cost: 50 },
  { id: 'birds', name: 'sBirds', cost: 50 },
  { id: 'calm',  name: 'sCalm',  cost: 50 },
  { id: 'sea',   name: 'sSea',   cost: 100 }
];

const ACHIEVEMENTS = [
  { id: 'first_slice',   name: 'Первый порез',     desc: 'Срежь 1 фрукт',          unlocked: false },
  { id: 'combo_10',      name: 'Мясник',           desc: 'Комбо х10',              unlocked: false },
  { id: 'combo_20',      name: 'Бог резака',       desc: 'Комбо х20',              unlocked: false },
  { id: 'score_1000',    name: 'Тысячник',         desc: '1000 очков',             unlocked: false },
  { id: 'score_5000',    name: 'Легенда',          desc: '5000 очков',             unlocked: false },
  { id: 'survive_120',   name: 'Выживший',         desc: '2 минуты в Классике',    unlocked: false },
  { id: 'bomb_1',        name: 'Ай!',              desc: 'Взорви 1 бомбу',         unlocked: false },
  { id: 'bomb_10',       name: 'Сапер',            desc: 'Взорви 10 бомб',         unlocked: false },
  { id: 'golden_10',     name: 'Золотой мальчик',  desc: 'Срежь 10 золотых',       unlocked: false },
  { id: 'freeze_5',      name: 'Ледниковый',       desc: '5 заморозок',            unlocked: false },
  { id: 'frenzy_5',      name: 'Безумный',         desc: '5 безумий',              unlocked: false },
  { id: 'rich_5000',     name: 'Богач',            desc: '5000 монет',             unlocked: false },
  { id: 'buy_knife',     name: 'Коллекционер',     desc: 'Купи нож',               unlocked: false },
  { id: 'buy_bg',        name: 'Дизайнер',         desc: 'Купи фон',               unlocked: false },
  { id: 'zen_master',    name: 'Дзен-мастер',      desc: '500 в Дзен',             unlocked: false },
  { id: 'boss_1',        name: 'Убийца арбузов',   desc: 'Убей 1 босса',           unlocked: false },
  { id: 'boss_5',        name: 'Арбузный маньяк',  desc: 'Убей 5 боссов',          unlocked: false },
  { id: 'endless_1000',  name: 'Бесконечник',      desc: '1000 в Бесконечном',     unlocked: false },
  { id: 'survival_5',    name: 'Живучий',          desc: '5 уровней Выживания',    unlocked: false }
];

let toasts = [];
let achScroll = 0;

// --- 3. GLOBAL STATE ---
let gameState = 'MENU';
let shopTab   = 'knives';

let coins = 0;
let score = 0;
let highScore = 0;
let lives = 3;

let ownedKnives = [];
let ownedBgs    = [];
let ownedSnds   = ['off'];

let selectedKnife = 'wooden';
let selectedBg    = 'dojo';
let selectedSound = 'off';

let customKnifeColor = null;
let customBgColor    = null;

let comboCount = 0;
let comboTimer = 0;
let reviveAvailable = true;
let adTimer = 5.0;

let flashAlpha = 0;
let slowMoFrames = 0;
let freezeTimer = 0;
let doubleTimer = 0;

let swipePath = [];
let spawnTimer = 0;
let spawnInterval = 65;

let shakeFrames = 0;
let shakeIntensity = 0;
let dt = 1.0;
let knifeScale = 1.0;

let items = [];
let slicedHalves = [];
let floatingTexts = [];
let splatters = [];
let particlePool = [];
let MAX_PARTICLES = 400;

let milestones = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
let currentMilestoneIndex = 0;

let audioCtx = null;
let FOOD_TYPES = [];
let weatherParts = [];

let bgCache = null;
let bgCacheW = 0;
let bgCacheH = 0;
let bgCacheId = null;

let currentUser = null;
let accountsDB = {};
let authMode = 'login';

let inputEmail, inputPass, inputNick, inputCode;
let btnAction, btnSwitch, btnBackAuth, btnSendCode;
let inputMasterKey, btnVerifyMaster, btnCancel2FA;

let ambientGain   = null;
let ambientNoise  = null;
let ambientFilter = null;
let ambientLfo    = null;
let ambientLfoGain = null;
let seaLfo        = null;
let seaLfoGain    = null;
let soundRotateTimer = 300;

let isPaused = false;
let pausePrevState = 'MENU';

let settings = {
  volume: 0.7,
  particles: 'high',
  theme: 'purple',
  vibration: true,
  voice: true
};

let dailyChallenges = [];

// BOSS — every 1500 points
let nextBossScore = 1500;
let activeBoss = null;

let cursorTrail = [];
let fruitBlood = [];

let loadingProgress = 0;
let loadingTarget = '';
let loadingDone = false;
let loadingDoneFrame = 0;

let lastVoiceTime = 0;
let allTasksForced = false;

// --- 4. HELPERS ---
function menuBg() {
  if (settings.theme === 'blue')  return color(10, 22, 48);
  if (settings.theme === 'green') return color(15, 35, 25);
  return color(20, 15, 30);
}

function applyVolume() {
  if (ambientGain && audioCtx) {
    ambientGain.gain.cancelScheduledValues(audioCtx.currentTime);
    ambientGain.gain.setValueAtTime(0.15 * settings.volume, audioCtx.currentTime);
  }
}

function say(text) {
  if (!settings.voice || !window.speechSynthesis) return;
  const now = millis();
  if (now - lastVoiceTime < 800) return;
  lastVoiceTime = now;
  try {
    speechSynthesis.cancel();
    let u = new SpeechSynthesisUtterance(text);
    u.lang = currentLang === 'ru' ? 'ru-RU' : 'en-US';
    u.rate = 1.15;
    u.pitch = 1.1;
    u.volume = settings.volume * 0.8;
    speechSynthesis.speak(u);
  } catch (e) {}
}

function buzz(ms) {
  if (!settings.vibration) return;
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {}
}

function spawnConfetti(x, y) {
  let n = settings.particles === 'low' ? 10 : (settings.particles === 'med' ? 25 : 50);
  let s = 0;
  for (let p of particlePool) {
    if (p.alpha <= 0) {
      p.reset(x, y, random(['#ffd700', '#ff5722', '#4caf50', '#2196f3', '#e91e63']));
      p.vx = random(-8, 8);
      p.vy = random(-12, -3);
      s++;
      if (s >= n) break;
    }
  }
}

function getKnifeColor() {
  if (customKnifeColor) {
    return [red(customKnifeColor), green(customKnifeColor), blue(customKnifeColor)];
  }
  let k = KNIVES.find(k => k.id === selectedKnife) || KNIVES[0];
  return k.c1;
}

function saveSettings() {
  try { localStorage.setItem('juicySettings', JSON.stringify(settings)); } catch (e) {}
}

function loadSettings() {
  try {
    let s = JSON.parse(localStorage.getItem('juicySettings') || 'null');
    if (s) settings = Object.assign(settings, s);
  } catch (e) {}
}

function saveAllTasksForced() {
  localStorage.setItem('juicyAllTasksForced', allTasksForced ? '1' : '0');
}

function loadAllTasksForced() {
  allTasksForced = localStorage.getItem('juicyAllTasksForced') === '1';
}

// --- 5. DAILY CHALLENGES ---
const CHALLENGE_POOL = [
  { id: 'slice_50',  desc: 'Срежь 50 фруктов',     target: 50,  reward: 100, type: 'slices' },
  { id: 'combo_10',  desc: 'Комбо x10',            target: 10,  reward: 200, type: 'maxCombo' },
  { id: 'score_500', desc: '500 очков за игру',    target: 500, reward: 150, type: 'score' },
  { id: 'boss_kill', desc: 'Убей 1 босса',         target: 1,   reward: 250, type: 'bossKill' },
  { id: 'golden_5',  desc: 'Срежь 5 золотых',      target: 5,   reward: 150, type: 'golden' }
];

function initDailyChallenges() {
  const today = new Date().toDateString();
  const key = 'juicyChallenges_' + today;
  let saved = localStorage.getItem(key);
  if (saved) {
    try { dailyChallenges = JSON.parse(saved); return; } catch (e) {}
  }
  const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  let pool = [...CHALLENGE_POOL].sort(
    (a, b) => ((a.id.charCodeAt(1) * seed) % 97) - ((b.id.charCodeAt(1) * seed) % 97)
  );
  dailyChallenges = pool.slice(0, 3).map(c => ({ ...c, progress: 0, done: false }));
  if (allTasksForced) {
    dailyChallenges.forEach(c => { c.done = true; c.progress = c.target; });
  }
  localStorage.setItem(key, JSON.stringify(dailyChallenges));
}

function saveDailyChallenges() {
  localStorage.setItem(
    'juicyChallenges_' + new Date().toDateString(),
    JSON.stringify(dailyChallenges)
  );
}

function bumpChallenge(type, amount) {
  if (!amount) amount = 1;
  let changed = false;
  for (let c of dailyChallenges) {
    if (c.done) continue;
    if (c.type === type) {
      if (type === 'maxCombo' || type === 'score') {
        c.progress = Math.max(c.progress, amount);
      } else {
        c.progress += amount;
      }
      if (c.progress >= c.target) {
        c.progress = c.target;
        c.done = true;
        coins += c.reward;
        toasts.push({ text: '🎯 ' + t('challengeDone') + ' +' + c.reward + '💰', alpha: 255, y: 200 });
        saveProgress();
        changed = true;
      }
    }
  }
  if (changed) saveDailyChallenges();
}

function applyAllTasksForced() {
  if (!allTasksForced) {
    dailyChallenges.forEach(c => { c.done = false; c.progress = 0; });
    saveDailyChallenges();
    toasts.push({ text: '🔄 ' + t('tasksReset'), alpha: 255, y: 200 });
    return;
  }
  let gained = 0;
  dailyChallenges.forEach(c => {
    if (!c.done) gained += c.reward;
    c.done = true;
    c.progress = c.target;
  });
  if (gained > 0) {
    coins += gained;
    toasts.push({ text: '🎯 +' + gained + ' 💰', alpha: 255, y: 200 });
    saveProgress();
  }
  saveDailyChallenges();
}

function countBossKills() {
  return parseInt(localStorage.getItem('juicyBossKills') || '0');
}

function incBossKills() {
  localStorage.setItem('juicyBossKills', countBossKills() + 1);
}

// --- 6. BLOOD EFFECTS ---
function updateBlood() {
  for (let i = fruitBlood.length - 1; i >= 0; i--) {
    fruitBlood[i].life -= dt;
    if (fruitBlood[i].life <= 0) fruitBlood.splice(i, 1);
  }
}

function drawBlood() {
  for (let b of fruitBlood) {
    push();
    noStroke();
    let a = (b.life / b.maxLife) * 180;
    fill(red(b.color), green(b.color), blue(b.color), a);
    beginShape();
    for (let ang = 0; ang < TWO_PI; ang += 0.4) {
      let r = 20 + noise(b.seed + ang) * 25;
      vertex(b.x + cos(ang) * r, b.y + sin(ang) * r);
    }
    endShape(CLOSE);
    pop();
  }
}

// --- 7. CLASSES ---
class Particle {
  constructor(x, y, c) { this.reset(x, y, c); }
  reset(x, y, c) {
    this.x = x; this.y = y; this.color = c;
    let a = random(TWO_PI), s = random(2, 10);
    this.vx = cos(a) * s;
    this.vy = sin(a) * s;
    this.gravity = 0.3;
    this.size = random(4, 10);
    this.alpha = 255;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.alpha -= 6 * dt;
  }
  draw() {
    if (this.alpha <= 0) return;
    push();
    noStroke();
    let c = color(this.color);
    c.setAlpha(this.alpha);
    fill(c);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}

class FoodItem {
  constructor(isPowerup = false, forcedType = null) {
    let isGolden = !isPowerup && !forcedType && random() < 0.08;
    let isBomb   = !isPowerup && !forcedType && !isGolden && random() < 0.12;
    if (gameMode === 'zen') isBomb = false;

    if (isPowerup) {
      let r = random();
      if (r < 0.33) this.type = 'freeze';
      else if (r < 0.66) this.type = 'frenzy';
      else this.type = 'double';
      this.def = { radius: 35, color: '#ffffff', innerColor: '#ffffff', shape: 'circle' };
    } else if (forcedType === 'ice') {
      this.type = 'ice';
      this.def = FOOD_TYPES.find(f => f.type === 'ice');
    } else if (forcedType === 'lightning') {
      this.type = 'lightning';
      this.def = FOOD_TYPES.find(f => f.type === 'lightning');
    } else if (forcedType === 'fakebomb') {
      this.type = 'fakebomb';
      this.def = FOOD_TYPES.find(f => f.type === 'fakebomb');
      this.explodeTimer = 200;
    } else if (isGolden && score > 30) {
      this.def = FOOD_TYPES.find(f => f.type === 'golden');
      this.type = 'golden';
    } else if (isBomb && score > 30) {
      this.def = FOOD_TYPES.find(f => f.type === 'bomb');
      this.type = 'bomb';
    } else {
      this.def = random(FOOD_TYPES.filter(f => f.type === 'fruit'));
      this.type = 'fruit';
    }
    this.radius = this.def.radius;
    this.color = this.def.color;
    this.innerColor = this.def.innerColor;
    this.shape = this.def.shape;

    this.x = random(width * 0.1, width * 0.9);
    this.y = height + this.radius;
    let tX = random(width * 0.15, width * 0.85);
    let tY = random(height * 0.1, height * 0.4);
    this.vx = (tX - this.x) / 50;
    this.vy = -sqrt(2 * 0.38 * (this.y - tY));
    this.gravity = 0.38;
    this.rotation = random(TWO_PI);
    this.vRot = random(-0.08, 0.08);
    this.sliced = false;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.rotation += this.vRot * dt;

    if (this.type === 'fakebomb' && this.explodeTimer !== undefined) {
      this.explodeTimer -= dt;
      if (this.explodeTimer <= 0 && !this.sliced && !this.exploded) {
        this.exploded = true;
        playSound('bomb');
        triggerShake(20, 15);
        spawnExplosion(this.x, this.y);
        flashAlpha = 150;
        if (!(isCreatorUser && isImmortal) && gameMode === 'classic') {
          lives--;
          if (lives <= 0) {
            if (reviveAvailable) gameState = 'REVIVE';
            else gameState = 'GAMEOVER';
          }
        }
        this.sliced = true;
      }
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    if (this.type === 'bomb') this.drawBomb();
    else if (this.type === 'freeze' || this.type === 'frenzy' || this.type === 'double') this.drawPowerup();
    else if (this.type === 'fakebomb') this.drawFakeBomb();
    else if (this.type === 'ice') this.drawIce();
    else if (this.type === 'lightning') this.drawLightning();
    else this.drawFruit(this.def, this.radius);
    pop();
  }

  drawBomb() {
    fill(25); stroke(80); strokeWeight(3);
    ellipse(0, 0, this.radius * 2);
    fill(150); rect(0, -this.radius + 2, 12, 8, 2);
    noFill(); stroke(200, 150, 80); strokeWeight(3);
    bezier(0, -this.radius - 2, -5, -this.radius - 12, 10, -this.radius - 18, 5, -this.radius - 24);
    fill(255, 200, 0); noStroke();
    ellipse(5 + random(-3, 3), -this.radius - 24 + random(-3, 3), 10, 10);
    fill(255, 50, 0);
    ellipse(5 + random(-2, 2), -this.radius - 24 + random(-2, 2), 6, 6);
  }

  drawPowerup() {
    let c1 = this.type === 'freeze' ? '#00ffff' : (this.type === 'frenzy' ? '#ff4500' : '#ffd700');
    fill(c1); stroke(255); strokeWeight(3);
    ellipse(0, 0, this.radius * 2.2);
    fill(255); noStroke();
    textAlign(CENTER, CENTER); textSize(this.radius);
    let ic = this.type === 'freeze' ? '❄️' : (this.type === 'frenzy' ? '🔥' : '⭐');
    text(ic, 0, 2);
  }

  drawFakeBomb() {
    let blink = (sin(millis() / 80) + 1) / 2;
    fill(255, 100, 100, blink * 150); noStroke();
    ellipse(0, 0, this.radius * 2.3);
    stroke(0, 80); strokeWeight(3);
    fill(this.def.color); ellipse(0, 0, this.radius * 2);
    noStroke(); fill(255, 0, 0, 200);
    textSize(22); textAlign(CENTER, CENTER); text('!', 0, 0);
  }

  drawIce() {
    fill(180, 230, 255, 200); stroke(255); strokeWeight(3);
    ellipse(0, 0, this.radius * 2.2);
    noStroke(); fill(255);
    textSize(this.radius); textAlign(CENTER, CENTER); text('❄️', 0, 2);
  }

  drawLightning() {
    fill(255, 255, 100, 180); stroke(255, 200, 0); strokeWeight(3);
    ellipse(0, 0, this.radius * 2.2);
    noStroke(); fill(255);
    textSize(this.radius); textAlign(CENTER, CENTER); text('⚡', 0, 2);
  }

  drawFruit(def, r) {
    push();
    if (def.type === 'golden') {
      fill(255, 215, 0, 80); noStroke(); ellipse(0, 0, r * 2.6);
    }
    stroke(0, 80); strokeWeight(3); fill(def.color);
    if (def.shape === 'circle') ellipse(0, 0, r * 2);
    else if (def.shape === 'square') rect(0, 0, r * 1.8, r * 1.8, 10);
    else if (def.shape === 'triangle') triangle(0, -r, r, r, -r, r);
    else if (def.shape === 'diamond') quad(0, -r, r, 0, 0, r, -r, 0);
    else if (def.shape === 'star') {
      beginShape();
      for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += PI / 5) {
        vertex(cos(a) * r, sin(a) * r);
        vertex(cos(a + PI / 5) * (r * 0.4), sin(a + PI / 5) * (r * 0.4));
      }
      endShape(CLOSE);
    }
    noStroke(); fill(def.innerColor);
    if (def.shape === 'circle' || def.shape === 'square') ellipse(0, 0, r * 1.2);
    else ellipse(0, 0, r * 0.6);
    pop();
  }
}

class BossFruit {
  constructor() {
    this.x = width / 2;
    this.y = height + 120;
    this.radius = 110;
    this.vx = random(-0.8, 0.8);
    this.vy = -sqrt(2 * 0.10 * (this.y - height * 0.30));
    this.gravity = 0.10;
    this.rotation = 0;
    this.vRot = 0.015;
    this.hp = 5;
    this.maxHp = 5;
    this.sliced = false;
    this.type = 'boss';
    this.flash = 0;
    this.hitCooldown = 0;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.rotation += this.vRot * dt;
    if (this.flash > 0) this.flash -= dt * 8;
    if (this.hitCooldown > 0) this.hitCooldown -= dt;
  }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(0, 100); noStroke(); ellipse(8, 12, this.radius * 2);
    let g = color(60, 160, 60);
    if (this.flash > 0) g = lerpColor(g, color(255, 255, 255), this.flash / 10);
    fill(g); stroke(30, 80, 30); strokeWeight(5);
    ellipse(0, 0, this.radius * 2);
    stroke(40, 120, 40); strokeWeight(4); noFill();
    for (let i = -2; i <= 2; i++) {
      beginShape();
      for (let a = -PI / 2; a < PI / 2; a += 0.3) {
        vertex(i * this.radius * 0.35 + sin(a) * 8, cos(a) * this.radius);
      }
      endShape();
    }
    push();
    translate(0, -this.radius - 22);
    noStroke(); fill(0, 180); rect(0, 0, 120, 14, 5);
    let hpW = 116 * (this.hp / this.maxHp);
    fill(255, 50, 50); rect(-58 + hpW / 2, 0, hpW, 10, 4);
    fill(255); textSize(11); textAlign(CENTER, CENTER);
    text(this.hp + '/' + this.maxHp, 0, 1);
    pop();
    pop();
  }
}

class MilestoneFruit {
  constructor() {
    this.x = width / 2;
    this.y = height + 100;
    this.radius = 80;
    this.vx = random(-1, 1);
    this.vy = -sqrt(2 * 0.15 * (this.y - height * 0.35));
    this.gravity = 0.15;
    this.rotation = 0;
    this.vRot = 0.02;
    this.hue = 0;
    this.sliced = false;
    this.type = 'milestone';
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.rotation += this.vRot * dt;
    this.hue = (this.hue + 4 * dt) % 360;
  }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    push(); colorMode(HSB, 360, 100, 100, 100);
    for (let i = 6; i > 0; i--) {
      fill(this.hue, 90, 100, 15); noStroke();
      ellipse(0, 0, this.radius * 2 + i * 18);
    }
    for (let a = 0; a < 360; a += 45) {
      fill(a, 90, 100); noStroke();
      let r = this.radius * 0.55;
      ellipse(cos(radians(a)) * r, sin(radians(a)) * r, this.radius);
    }
    pop();
    fill(255); noStroke();
    beginShape();
    for (let i = 0; i < 10; i++) {
      let a = radians(i * 36 - 90);
      let rr = i % 2 === 0 ? this.radius : this.radius * 0.4;
      vertex(cos(a) * rr, sin(a) * rr);
    }
    endShape(CLOSE);
    pop();
  }
}

class SlicedHalf {
  constructor(parent, angle, side) {
    this.def = parent.def;
    this.radius = parent.radius;
    this.x = parent.x;
    this.y = parent.y;
    this.angle = angle;
    this.side = side;
    let ps = random(3, 7);
    let na = angle + side * HALF_PI;
    this.vx = parent.vx + cos(na) * ps;
    this.vy = parent.vy + sin(na) * ps;
    this.gravity = 0.42;
    this.rotation = parent.rotation;
    this.vRot = side * random(0.08, 0.18);
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.rotation += this.vRot * dt;
  }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    push();
    rotate(this.angle);
    translate(0, this.side * 4);
    noStroke();
    fill(this.def.innerColor);
    arc(0, 0, this.radius * 2, this.radius * 2,
        this.side > 0 ? 0 : PI, this.side > 0 ? PI : TWO_PI, CHORD);
    stroke(this.def.color); strokeWeight(5); noFill();
    arc(0, 0, this.radius * 2, this.radius * 2,
        this.side > 0 ? 0 : PI, this.side > 0 ? PI : TWO_PI);
    pop();
    pop();
  }
}

class Splatter {
  constructor(x, y, c) {
    this.x = x; this.y = y; this.color = c; this.seed = random(1000);
  }
  draw() {
    push(); noStroke(); fill(this.color);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.3) {
      let r = 15 + noise(this.seed + a) * 20;
      vertex(this.x + cos(a) * r, this.y + sin(a) * r);
    }
    endShape(CLOSE);
    pop();
  }
}

class FloatingText {
  constructor(x, y, text, color) {
    this.x = x; this.y = y; this.text = text;
    this.color = color; this.alpha = 255; this.vy = -2;
  }
  update(dt) { this.y += this.vy * dt; this.alpha -= 4 * dt; }
  draw() {
    if (this.alpha <= 0) return;
    push(); textAlign(CENTER, CENTER);
    textSize(26); textStyle(BOLD); noStroke();
    let c = color(this.color);
    c.setAlpha(this.alpha);
    fill(c);
    stroke(0, this.alpha); strokeWeight(4);
    text(this.text, this.x, this.y);
    pop();
  }
  isDead() { return this.alpha <= 0; }
} 
// --- 8. SETUP ---
function setup() {
    // --- MOBILE FIT (V21): real full-screen on any device ---
  (function () {
    let mv = document.querySelector('meta[name="viewport"]');
    if (!mv) {
      mv = document.createElement('meta');
      mv.name = 'viewport';
      (document.head || document.documentElement).appendChild(mv);
    }
    mv.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover');
    let st = document.getElementById('vnMobileStyle');
    if (!st) {
      st = document.createElement('style');
      st.id = 'vnMobileStyle';
      (document.head || document.documentElement).appendChild(st);
    }
    st.textContent = 'html,body{margin:0;padding:0;overflow:hidden;height:100%;background:#000;-webkit-text-size-adjust:100%;}'
      + 'canvas{display:block;touch-action:none;}'
      + 'input,button,select,textarea{font-size:16px;touch-action:auto;-webkit-user-select:text;user-select:text;}';
  })();

  createCanvas(windowWidth, windowHeight);
  textFont('sans-serif');
  rectMode(CENTER);
  imageMode(CENTER);
  noCursor();
  document.oncontextmenu = () => false;

  loadSettings();
  loadAllTasksForced();
  loadGuestProgress();

  currentUser = localStorage.getItem('juicyCurrentUser');
  if (currentUser) {
    accountsDB = JSON.parse(localStorage.getItem('juicyAccounts') || '{}');
    if (accountsDB[currentUser]) {
      loadProgress(accountsDB[currentUser]);
    } else {
      currentUser = null;
    }
  }

  currentLang = localStorage.getItem('juicyLang') || 'en';

  let savedAch = JSON.parse(localStorage.getItem('juicyAch') || '[]');
  ACHIEVEMENTS.forEach(a => { if (savedAch.includes(a.id)) a.unlocked = true; });

  for (let i = 0; i < MAX_PARTICLES; i++) {
    particlePool.push(new Particle(0, 0, '#000'));
  }

  generateFruits();
  initDailyChallenges();

  inputEmail    = createInput('').attribute('placeholder', 'you@gmail.com');
  inputPass     = createInput('').attribute('type', 'password').attribute('placeholder', 'Password');
  inputNick     = createInput('').attribute('placeholder', 'Nickname');
  inputCode     = createInput('').attribute('placeholder', '5-digit code');
  inputMasterKey = createInput('').attribute('type', 'password').attribute('placeholder', 'Master key');

  btnSendCode = createButton('SEND CODE');
  btnSendCode.mousePressed(sendCodeAction);

  btnAction = createButton('LOGIN');
  btnAction.mousePressed(authAction);

  btnSwitch = createButton('No account? Register');
  btnSwitch.mousePressed(() => {
    authMode = authMode === 'login' ? 'register' : 'login';
    pendingCode = '';
    pendingEmail = '';
    pendingCreator2FA = false;
    showAuthUI();
  });

  btnBackAuth = createButton('BACK');
  btnBackAuth.mousePressed(() => {
    pendingCreator2FA = false;
    gameState = 'MENU';
    hideAuthUI();
  });

  btnVerifyMaster = createButton('VERIFY');
  btnVerifyMaster.mousePressed(verifyMasterKeyAction);

  btnCancel2FA = createButton('CANCEL');
  btnCancel2FA.mousePressed(() => {
    pendingCreator2FA = false;
    inputMasterKey.value('');
    showAuthUI();
  });

  hideAuthUI();
  checkDaily();

  // Audio unlock on first interaction
  ['pointerdown', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, () => {
      if (!audioCtx) {
        try { initAudio(); } catch (e) {}
      } else if (audioCtx.state === 'suspended') {
        try { audioCtx.resume(); } catch (e) {}
      }
    }, { passive: true });
  });

  document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

  // Browser back button → pause / menu
  history.pushState({ game: 'fn' }, '', location.href);
  window.addEventListener('popstate', () => {
    history.pushState({ game: 'fn' }, '', location.href);
    if (gameState === 'PLAY') {
      isPaused = true;
      gameState = 'PAUSE';
    } else if (gameState === 'PAUSE') {
      gameState = 'PLAY';
      isPaused = false;
    } else if (gameState === 'SETTINGS') {
      gameState = pausePrevState || 'MENU';
    } else if (gameState !== 'MENU' && gameState !== 'LOADING') {
      gameState = 'MENU';
    }
  });

  window.addEventListener('beforeunload', e => {
    if (gameState === 'PLAY') {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bgCache = null;
  if (gameState === 'AUTH') showAuthUI();
}

// --- 9. MAIN DRAW LOOP ---
function draw() {
  dt = deltaTime / 16.666;
  if (isNaN(dt) || dt === 0 || dt === Infinity) dt = 1;
  if (dt > 3) dt = 3;

  if (freezeTimer > 0) { dt *= 0.35; freezeTimer -= 1; }
  if (slowMoFrames > 0) { dt *= 0.35; slowMoFrames -= 1; }
  if (doubleTimer > 0) doubleTimer -= 1;

  updateWeather();
  updateAmbientSound();

  push();

  if (shakeFrames > 0) {
    translate(random(-shakeIntensity, shakeIntensity), random(-shakeIntensity, shakeIntensity));
    shakeFrames--;
  }

  if (flashAlpha > 0) {
    push();
    noStroke();
    fill(255, 255, 200, flashAlpha);
    rect(width / 2, height / 2, width, height);
    pop();
    flashAlpha -= 6 * dt;
  }

  if ([
    'MENU', 'LANG_MENU', 'SHOP', 'AUTH', 'CREATOR_PANEL',
    'MODE_SELECT', 'ACHIEVEMENTS', 'DAILY', 'PAUSE',
    'SETTINGS', 'LOADING', 'CHALLENGES'
  ].includes(gameState)) {
    background(menuBg());
  } else {
    drawBackground(selectedBg);
    drawWeather();
    if (customBgColor) {
      push();
      noStroke();
      fill(red(customBgColor), green(customBgColor), blue(customBgColor), 100);
      rect(width / 2, height / 2, width, height);
      pop();
    }
    for (let s of splatters) s.draw();
    drawBlood();
  }

  if (gameState === 'MENU') drawMainMenu();
  else if (gameState === 'MODE_SELECT') drawModeSelect();
  else if (gameState === 'SHOP') drawShop();
  else if (gameState === 'AUTH') drawAuthScreen();
  else if (gameState === 'CREATOR_PANEL') drawCreatorPanel();
  else if (gameState === 'ACHIEVEMENTS') drawAchievements();
  else if (gameState === 'DAILY') drawDaily();
  else if (gameState === 'PLAY') updateGameplay();
  else if (gameState === 'REVIVE') drawRevive();
  else if (gameState === 'AD') updateAd();
  else if (gameState === 'GAMEOVER') drawGameOver();
  else if (gameState === 'PAUSE') drawPause();
  else if (gameState === 'SETTINGS') drawSettings();
  else if (gameState === 'LOADING') { updateLoading(); drawLoading(); }
  else if (gameState === 'CHALLENGES') drawChallenges();

  if (gameState === 'PLAY') updateAndDrawSwipe();

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    floatingTexts[i].update(dt);
    floatingTexts[i].draw();
    if (floatingTexts[i].isDead()) floatingTexts.splice(i, 1);
  }

  drawToasts();
  pop();

  if (gameState === 'PLAY') drawHUD();
  drawGlobalUI();
  if (gameState === 'LANG_MENU') drawLangMenu();

  // Cursor trail
  cursorTrail.push({ x: mouseX, y: mouseY, time: millis() });
  cursorTrail = cursorTrail.filter(p => millis() - p.time < 200);
  if (cursorTrail.length > 2) {
    let c1 = getKnifeColor();
    for (let i = 0; i < cursorTrail.length - 1; i++) {
      let p1 = cursorTrail[i], p2 = cursorTrail[i + 1];
      let prog = i / cursorTrail.length;
      stroke(c1[0], c1[1], c1[2], prog * 80);
      strokeWeight(prog * 4);
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }

  drawKnifeCursor();
}

// --- 10. AUDIO SYSTEM ---
function stopAmbientSound() {
  const oldGain  = ambientGain;
  const oldNoise = ambientNoise;
  const oldLfo   = ambientLfo;
  const oldSea   = seaLfo;

  ambientGain    = null;
  ambientNoise   = null;
  ambientFilter  = null;
  ambientLfo     = null;
  ambientLfoGain = null;
  seaLfo         = null;
  seaLfoGain     = null;

  if (!audioCtx || !oldGain) return;

  try {
    oldGain.gain.cancelScheduledValues(audioCtx.currentTime);
    oldGain.gain.setValueAtTime(oldGain.gain.value || 0, audioCtx.currentTime);
    oldGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
  } catch (e) {}

  setTimeout(() => {
    try { if (oldNoise) oldNoise.stop(); } catch (e) {}
    try { if (oldLfo)   oldLfo.stop();   } catch (e) {}
    try { if (oldSea)   oldSea.stop();   } catch (e) {}
    try { if (oldGain)  oldGain.disconnect(); } catch (e) {}
  }, 600);
}

function startAmbientSound() {
  stopAmbientSound();
  if (selectedSound === 'off' || !audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  ambientGain = audioCtx.createGain();
  ambientGain.connect(audioCtx.destination);
  ambientGain.gain.value = 0;

  let bufSize = audioCtx.sampleRate * 2;
  let buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  let data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

  let targetVolume = 0.15;

  if (selectedSound === 'white') {
    // Soft airy white noise
    ambientNoise = audioCtx.createBufferSource();
    ambientNoise.buffer = buf;
    ambientNoise.loop = true;

    let hp = audioCtx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 120;
    hp.Q.value = 0.7;

    ambientFilter = audioCtx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.value = 700;
    ambientFilter.Q.value = 0.7;

    let lp2 = audioCtx.createBiquadFilter();
    lp2.type = 'lowpass';
    lp2.frequency.value = 1500;
    lp2.Q.value = 0.5;

    ambientLfo = audioCtx.createOscillator();
    ambientLfo.frequency.value = 0.05;
    ambientLfoGain = audioCtx.createGain();
    ambientLfoGain.gain.value = 150;

    ambientLfo.connect(ambientLfoGain);
    ambientLfoGain.connect(ambientFilter.frequency);

    ambientNoise.connect(hp);
    hp.connect(ambientFilter);
    ambientFilter.connect(lp2);
    lp2.connect(ambientGain);

    ambientNoise.start();
    ambientLfo.start();
    targetVolume = 0.09;
  } else if (selectedSound === 'sea') {
    ambientNoise = audioCtx.createBufferSource();
    ambientNoise.buffer = buf;
    ambientNoise.loop = true;
    ambientFilter = audioCtx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.value = 400;
    seaLfo = audioCtx.createOscillator();
    seaLfo.frequency.value = 0.1;
    seaLfoGain = audioCtx.createGain();
    seaLfoGain.gain.value = 0.1;
    seaLfo.connect(seaLfoGain);
    seaLfoGain.connect(ambientGain.gain);
    ambientNoise.connect(ambientFilter);
    ambientFilter.connect(ambientGain);
    ambientNoise.start();
    seaLfo.start();
  } else if (selectedSound === 'bugs') {
    // Cricket chirps
    ambientNoise = audioCtx.createBufferSource();
    ambientNoise.buffer = buf;
    ambientNoise.loop = true;

    ambientFilter = audioCtx.createBiquadFilter();
    ambientFilter.type = 'bandpass';
    ambientFilter.frequency.value = 3200;
    ambientFilter.Q.value = 9;

    let chirpLfo = audioCtx.createOscillator();
    chirpLfo.type = 'sine';
    chirpLfo.frequency.value = 6.5;

    let chirpDepth = audioCtx.createGain();
    chirpDepth.gain.value = 0.35;

    let chirpGain = audioCtx.createGain();
    chirpGain.gain.value = 0.5;

    chirpLfo.connect(chirpDepth);
    chirpDepth.connect(chirpGain.gain);

    let bgLayer = audioCtx.createBiquadFilter();
    bgLayer.type = 'lowpass';
    bgLayer.frequency.value = 400;
    bgLayer.Q.value = 0.7;
    let bgGain = audioCtx.createGain();
    bgGain.gain.value = 0.04;

    ambientNoise.connect(ambientFilter);
    ambientFilter.connect(chirpGain);
    chirpGain.connect(ambientGain);

    ambientNoise.connect(bgLayer);
    bgLayer.connect(bgGain);
    bgGain.connect(ambientGain);

    ambientNoise.start();
    chirpLfo.start();
    ambientLfo = chirpLfo;
    targetVolume = 0.14;
  } else if (selectedSound === 'birds') {
    ambientNoise = audioCtx.createBufferSource();
    ambientNoise.buffer = buf;
    ambientNoise.loop = true;
    ambientFilter = audioCtx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.value = 600;
    ambientNoise.connect(ambientFilter);
    ambientFilter.connect(ambientGain);
    ambientNoise.start();
  } else if (selectedSound === 'calm') {
    ambientNoise = audioCtx.createBufferSource();
    ambientNoise.buffer = buf;
    ambientNoise.loop = true;
    ambientFilter = audioCtx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.value = 800;
    let padGain = audioCtx.createGain();
    padGain.gain.value = 0.03;
    ambientNoise.connect(ambientFilter);
    ambientFilter.connect(padGain);
    padGain.connect(ambientGain);
    ambientNoise.start();
    targetVolume = 0.12;
  }

  ambientGain.gain.linearRampToValueAtTime(targetVolume * settings.volume, audioCtx.currentTime + 2);
}

function updateAmbientSound() {
  if (!audioCtx || selectedSound === 'off') return;
  if (frameCount % 60 === 0) {
    let now = audioCtx.currentTime;

    if (selectedSound === 'bugs' && random() < 0.2) {
      let o = audioCtx.createOscillator();
      let g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(random(4000, 6000), now);
      o.frequency.exponentialRampToValueAtTime(random(2000, 3000), now + 0.1);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.03 * settings.volume, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(now);
      o.stop(now + 0.1);
    } else if (selectedSound === 'birds' && random() < 0.3) {
      let o = audioCtx.createOscillator();
      let g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(random(2000, 3000), now);
      o.frequency.exponentialRampToValueAtTime(random(3500, 4500), now + 0.08);
      o.frequency.exponentialRampToValueAtTime(random(2000, 3000), now + 0.15);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.06 * settings.volume, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(now);
      o.stop(now + 0.15);
    } else if (selectedSound === 'calm' && random() < 0.6) {
      let notes = [261.63, 293.66, 329.63, 392, 440, 523.25];
      let o = audioCtx.createOscillator();
      let g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = random(notes);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.04 * settings.volume, now + 0.5);
      g.gain.linearRampToValueAtTime(0, now + 3);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(now);
      o.stop(now + 3);
    } else if (selectedSound === 'sea' && random() < 0.1) {
      let o = audioCtx.createOscillator();
      let g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(random(800, 1200), now);
      o.frequency.exponentialRampToValueAtTime(random(1500, 2000), now + 0.05);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.03 * settings.volume, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(now);
      o.stop(now + 0.1);
    }
  }
}

function initAudio() {
  try {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (selectedSound !== 'off' && !ambientGain) startAmbientSound();
  } catch (e) {}
}

function playSound(type, level = 1) {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    try { audioCtx.resume(); } catch (e) {}
  }
  try {
    let now = audioCtx.currentTime;
    let o = audioCtx.createOscillator();
    let g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    let v = settings.volume;

    if (type === 'slice') {
      o.type = 'triangle';
      let b = 500 + min(level, 10) * 80;
      o.frequency.setValueAtTime(b, now);
      o.frequency.exponentialRampToValueAtTime(b * 0.5, now + 0.08);
      g.gain.setValueAtTime(0.12 * v, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      o.start(now);
      o.stop(now + 0.1);
    } else if (type === 'squish') {
      o.type = 'sine';
      o.frequency.setValueAtTime(220, now);
      o.frequency.exponentialRampToValueAtTime(80, now + 0.15);
      g.gain.setValueAtTime(0.1 * v, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      o.start(now);
      o.stop(now + 0.15);
    } else if (type === 'bomb') {
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(120, now);
      o.frequency.exponentialRampToValueAtTime(30, now + 0.4);
      g.gain.setValueAtTime(0.3 * v, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      o.start(now);
      o.stop(now + 0.4);
    } else if (type === 'miss') {
      o.type = 'sine';
      o.frequency.setValueAtTime(300, now);
      o.frequency.exponentialRampToValueAtTime(150, now + 0.2);
      g.gain.setValueAtTime(0.2 * v, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      o.start(now);
      o.stop(now + 0.2);
    } else if (type === 'milestone') {
      o.type = 'triangle';
      o.frequency.setValueAtTime(600, now);
      o.frequency.linearRampToValueAtTime(900, now + 0.1);
      o.frequency.linearRampToValueAtTime(1200, now + 0.2);
      g.gain.setValueAtTime(0.2 * v, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      o.start(now);
      o.stop(now + 0.4);
    }
  } catch (e) {}
}

// --- 11. DAILY / ACHIEVEMENTS / TOASTS ---
function checkDaily() {
  let last = localStorage.getItem('juicyLastDaily');
  if (last !== new Date().toDateString()) gameState = 'DAILY';
}

function drawDaily() {
  fill(0, 0, 0, 240);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  fill(255, 215, 0);
  textSize(40);
  textStyle(BOLD);
  text(t('daily'), width / 2, height / 2 - 100);
  fill(255);
  textSize(24);
  text('+ 100 💰', width / 2, height / 2);
  let btnY = height / 2 + 100;
  fill(mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
       mouseY > btnY - 30 && mouseY < btnY + 30 ? color(100, 200, 100) : color(50, 150, 50));
  rect(width / 2, btnY, 200, 60, 15);
  fill(255);
  textSize(20);
  text(t('claim'), width / 2, btnY);
}

function unlockAch(id) {
  let a = ACHIEVEMENTS.find(x => x.id === id);
  if (a && !a.unlocked) {
    a.unlocked = true;
    toasts.push({ text: '🏆 ' + a.name, alpha: 255, y: 100 });
    let s = JSON.parse(localStorage.getItem('juicyAch') || '[]');
    s.push(id);
    localStorage.setItem('juicyAch', JSON.stringify(s));
    saveProgress();
    playSound('milestone');
  }
}

function drawToasts() {
  for (let i = toasts.length - 1; i >= 0; i--) {
    let ts = toasts[i];
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    fill(0, 0, 0, ts.alpha * 0.8);
    noStroke();
    rect(width / 2, ts.y, 400, 70, 15);
    fill(255, 215, 0, ts.alpha);
    text(ts.text, width / 2, ts.y);
    pop();
    ts.y += 1;
    ts.alpha -= 2;
    if (ts.alpha <= 0) toasts.splice(i, 1);
  }
}

// --- 12. WEATHER ---
function updateWeather() {
  if (selectedBg === 'trees' || selectedBg === 'night_moon' ||
      selectedBg === 'sea' || selectedBg === 'mountains') {
    if (frameCount % 3 === 0 && weatherParts.length < 100) {
      let isSnow = selectedBg === 'night_moon' || selectedBg === 'mountains';
      weatherParts.push({
        x: random(width),
        y: -20,
        speed: random(2, 5),
        size: isSnow ? random(2, 5) : random(10, 20),
        isSnow
      });
    }
  }
  for (let i = weatherParts.length - 1; i >= 0; i--) {
    let p = weatherParts[i];
    p.y += p.speed;
    if (p.y > height) weatherParts.splice(i, 1);
  }
}

function drawWeather() {
  for (let p of weatherParts) {
    if (p.isSnow) {
      fill(255, 200);
      noStroke();
      ellipse(p.x, p.y, p.size);
    } else {
      stroke(150, 200, 255, 150);
      strokeWeight(1);
      line(p.x, p.y, p.x, p.y + p.size);
    }
  }
}

// --- 13. FRUITS ---
function generateFruits() {
  FOOD_TYPES = [];
  const colors = [
    '#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0',
    '#ffb3e6', '#ff6666', '#ffff66', '#66ff66', '#66ffff'
  ];
  const shapes = ['circle', 'square', 'triangle', 'star', 'diamond'];
  for (let i = 0; i < 100; i++) {
    FOOD_TYPES.push({
      radius: random(25, 55),
      color: random(colors),
      innerColor: random(colors),
      shape: random(shapes),
      type: 'fruit'
    });
  }
  FOOD_TYPES.push({ radius: 36, color: '#212121', innerColor: '#ff1744', shape: 'bomb', type: 'bomb' });
  FOOD_TYPES.push({ radius: 32, color: '#ffd700', innerColor: '#fff59d', shape: 'star', type: 'golden' });
  FOOD_TYPES.push({ radius: 38, color: '#ffb3e6', innerColor: '#ff66a3', shape: 'circle', type: 'ice' });
  FOOD_TYPES.push({ radius: 40, color: '#ffff66', innerColor: '#fff59d', shape: 'star', type: 'lightning' });
  FOOD_TYPES.push({ radius: 34, color: '#66cc66', innerColor: '#ff1744', shape: 'circle', type: 'fakebomb' });
}

// --- 14. GAMEPLAY UPDATE ---
function updateGameplay() {
  // Mode-specific timers
  if (gameMode === 'zen' || gameMode === 'arcade') {
    gameTimer -= deltaTime / 1000;
    if (gameTimer <= 0) {
      gameTimer = 0;
      gameState = 'GAMEOVER';
      return;
    }
  } else if (gameMode === 'endless') {
    survivalTime += deltaTime / 1000;
    if (score >= 1000) unlockAch('endless_1000');
  } else if (gameMode === 'survival') {
    survivalTime += deltaTime / 1000;
    let newLevel = 1 + floor(survivalTime / 30);
    if (newLevel > survivalLevel) {
      survivalLevel = newLevel;
      toasts.push({ text: '⚡ LEVEL ' + survivalLevel, alpha: 255, y: 130 });
      if (survivalLevel >= 5) unlockAch('survival_5');
    }
  } else {
    survivalTime += deltaTime / 1000;
    if (survivalTime >= 120) unlockAch('survive_120');
  }

  // Spawning
  spawnTimer += dt;
  if (spawnTimer >= spawnInterval) {
    spawnTimer = 0;
    if (gameMode === 'zen') {
      spawnInterval = max(45, 90 - floor(score / 100) * 1.5);
    } else if (gameMode === 'survival') {
      spawnInterval = max(15, 65 - floor(score / 100) * 2 - (survivalLevel - 1) * 5);
    } else {
      spawnInterval = max(25, 65 - floor(score / 100) * 2);
    }

    let count = random() < 0.3 ? 2 : 1;
    for (let k = 0; k < count; k++) {
      let r = random();
      if (r < 0.03) items.push(new FoodItem(true));
      else if (r < 0.05) items.push(new FoodItem(false, 'ice'));
      else if (r < 0.07) items.push(new FoodItem(false, 'lightning'));
      else if (r < 0.10) items.push(new FoodItem(false, 'fakebomb'));
      else items.push(new FoodItem(false));
    }
  }

  // BOSS every 1500 points
  if (score >= nextBossScore && !activeBoss) {
    activeBoss = new BossFruit();
    items.push(activeBoss);
    nextBossScore += 1500;
    toasts.push({ text: '🥷 ' + t('boss'), alpha: 255, y: 130 });
    playSound('bomb');
  }

  // Milestone
  if (currentMilestoneIndex < milestones.length &&
      score >= milestones[currentMilestoneIndex]) {
    items.push(new MilestoneFruit());
    floatingTexts.push(new FloatingText(
      width / 2, height * 0.3,
      'MILESTONE ' + milestones[currentMilestoneIndex] + '!',
      '#ffd700'
    ));
    playSound('milestone');
    currentMilestoneIndex++;
  }

  // Update items
  for (let i = items.length - 1; i >= 0; i--) {
    let it = items[i];
    it.update(dt);
    it.draw();

    if (it.y > height + 150) {
      if (!it.sliced && it.type === 'fruit' && gameMode === 'classic') {
        if (isCreatorUser && isImmortal) {
          floatingTexts.push(new FloatingText(it.x, height - 60, '🛡️', '#ffd700'));
        } else {
          lives--;
          playSound('miss');
          flashAlpha = 120;
          triggerShake(15, 10);
          floatingTexts.push(new FloatingText(it.x, height - 80, 'MISS! -1 ❤️', '#ff3333'));
          if (lives <= 0) {
            if (reviveAvailable) gameState = 'REVIVE';
            else gameState = 'GAMEOVER';
          }
        }
      }
      if (it === activeBoss) activeBoss = null;
      items.splice(i, 1);
    }
  }

  checkSlice();

  for (let i = slicedHalves.length - 1; i >= 0; i--) {
    let h = slicedHalves[i];
    h.update(dt);
    h.draw();
    if (h.y > height + 150) slicedHalves.splice(i, 1);
  }

  for (let p of particlePool) {
    if (p.alpha > 0) {
      p.update(dt);
      p.draw();
    }
  }

  updateBlood();

  if (comboTimer > 0) {
    comboTimer -= dt;
    if (comboTimer <= 0) comboCount = 0;
  }
}
// --- 15. SLICE HANDLER ---
function checkSlice() {
  if (swipePath.length < 2) return;
  let p1 = swipePath[swipePath.length - 1];
  let p2 = swipePath[swipePath.length - 2];

  for (let i = items.length - 1; i >= 0; i--) {
    let it = items[i];
    if (!it) continue;
    if (it.sliced) continue;

    if (lineCircle(p1.x, p1.y, p2.x, p2.y, it.x, it.y, it.radius)) {

      // BOSS — особая логика: сбрасываем sliced=false, чтобы бить снова
      if (it.type === 'boss') {
        if (it.hitCooldown > 0) continue;
        it.hitCooldown = 8;
        it.hp--;
        it.flash = 8;
        it.sliced = false;
        triggerShake(12, 10);
        playSound('slice', 8);
        spawnJuice(it.x, it.y, '#ff1744', 30);
        buzz(30);

        if (it.hp <= 0) {
          items.splice(i, 1);
          activeBoss = null;
          score += 500;
          coins += 50;
          incBossKills();
          if (countBossKills() >= 1) unlockAch('boss_1');
          if (countBossKills() >= 5) unlockAch('boss_5');
          bumpChallenge('bossKill', 1);
          spawnExplosion(it.x, it.y);
          for (let k = 0; k < 20; k++) spawnConfetti(it.x, it.y);
          floatingTexts.push(new FloatingText(it.x, it.y, '+500 & +50 💰', '#ffd700'));
          toasts.push({ text: '🥷 ' + t('bossKilled'), alpha: 255, y: 130 });
          say(t('bossKilled'));
          playSound('milestone');
          saveProgress();
        } else {
          floatingTexts.push(new FloatingText(it.x, it.y - 40, '-' + it.hp + ' HP', '#ff3333'));
        }
        continue;
      }

      it.sliced = true;

      if (it.type === 'bomb') {
        playSound('bomb');
        triggerShake(25, 20);
        spawnExplosion(it.x, it.y);
        items.splice(i, 1);
        bombsHit++;
        if (bombsHit >= 1) unlockAch('bomb_1');
        if (bombsHit >= 10) unlockAch('bomb_10');
        if (gameMode === 'arcade') {
          gameTimer -= 5;
          flashAlpha = 200;
        } else if (isCreatorUser && isImmortal) {
          flashAlpha = 100;
          floatingTexts.push(new FloatingText(it.x, it.y, '🛡️ IMMORTAL!', '#ffd700'));
        } else {
          lives = 0;
          if (reviveAvailable) gameState = 'REVIVE';
          else gameState = 'GAMEOVER';
        }
        continue;
      }

      if (it.type === 'ice') {
        freezeTimer = 600;
        floatingTexts.push(new FloatingText(it.x, it.y, '❄️ ICE!', '#00ffff'));
        playSound('slice', 8);
        spawnJuice(it.x, it.y, '#00ffff', 40);
        items.splice(i, 1);
        continue;
      }

      if (it.type === 'lightning') {
        flashAlpha = 250;
        playSound('bomb');
        triggerShake(20, 15);
        for (let j = items.length - 1; j >= 0; j--) {
          let other = items[j];
          if (!other) continue;
          if (other === it || other.type === 'bomb' || other.type === 'boss' || other.type === 'milestone') continue;
          if (other.sliced) continue;
          other.sliced = true;
          score += 10;
          coins += 1;
          spawnJuice(other.x, other.y, other.innerColor || '#fff', 15);
          slicedHalves.push(new SlicedHalf(other, random(-PI, PI), 1));
          slicedHalves.push(new SlicedHalf(other, random(-PI, PI), -1));
          items.splice(j, 1);
        }
        it.sliced = true;
        let li = items.indexOf(it);
        if (li !== -1) items.splice(li, 1);
        floatingTexts.push(new FloatingText(it.x, it.y, '⚡ LIGHTNING!', '#ffd700'));
        continue;
      }

      if (it.type === 'fakebomb') {
        comboCount++;
        comboTimer = 20;
        let pts = 20 * comboCount;
        score += pts;
        coins += 2;
        bumpChallenge('slices', 1);
        floatingTexts.push(new FloatingText(it.x, it.y, '+' + pts + ' (safe!)', '#66ff66'));
        playSound('slice', 3);
        spawnJuice(it.x, it.y, it.innerColor, 25);
        let ang = atan2(p1.y - p2.y, p1.x - p2.x);
        slicedHalves.push(new SlicedHalf(it, ang, 1));
        slicedHalves.push(new SlicedHalf(it, ang, -1));
        items.splice(i, 1);
        continue;
      }

      if (it.type === 'freeze') {
        freezeTimer = 300;
        freezeUsed++;
        if (freezeUsed >= 5) unlockAch('freeze_5');
        floatingTexts.push(new FloatingText(it.x, it.y, '❄️ FREEZE!', '#00ffff'));
        playSound('slice', 5);
        spawnJuice(it.x, it.y, '#00ffff', 30);
        items.splice(i, 1);
        continue;
      }

      if (it.type === 'frenzy') {
        for (let k = 0; k < 30; k++) items.push(new FoodItem(false));
        frenzyUsed++;
        if (frenzyUsed >= 5) unlockAch('frenzy_5');
        floatingTexts.push(new FloatingText(it.x, it.y, '🔥 FRENZY!', '#ff4500'));
        playSound('bomb');
        spawnJuice(it.x, it.y, '#ff4500', 40);
        items.splice(i, 1);
        continue;
      }

      if (it.type === 'double') {
        doubleTimer = 600;
        floatingTexts.push(new FloatingText(it.x, it.y, '⭐ DOUBLE!', '#ffd700'));
        playSound('slice', 8);
        spawnJuice(it.x, it.y, '#ffd700', 30);
        items.splice(i, 1);
        continue;
      }

      if (it.type === 'milestone') {
        score += 100;
        coins += 10;
        bumpChallenge('slices', 1);
        saveProgress();
        playSound('slice', 8);
        floatingTexts.push(new FloatingText(it.x, it.y, '+100 & +10 💰', '#ffd700'));
        spawnJuice(it.x, it.y, '#ffd700', 60);
        items.splice(i, 1);
        continue;
      }

      if (it.type === 'golden') {
        let bonus = 50 * max(1, comboCount);
        score += bonus;
        coins += 10;
        goldenSliced++;
        if (goldenSliced >= 10) unlockAch('golden_10');
        bumpChallenge('golden', 1);
        bumpChallenge('slices', 1);
        saveProgress();
        playSound('slice', 6);
        floatingTexts.push(new FloatingText(it.x, it.y, '+' + bonus + ' & +10 💰', '#ffd700'));
        spawnJuice(it.x, it.y, '#ffd700', 40);
      } else {
        comboCount++;
        comboTimer = 20;
        totalSlices++;
        if (comboCount > maxCombo) maxCombo = comboCount;
        let pts = 10 * comboCount * (doubleTimer > 0 ? 2 : 1);
        score += pts;
        coins += 1;
        if (score > highScore && !(isCreatorUser && infiniteRecord)) highScore = score;
        if (comboCount >= 10) unlockAch('combo_10');
        if (comboCount >= 20) unlockAch('combo_20');
        if (score >= 1000) unlockAch('score_1000');
        if (score >= 5000) unlockAch('score_5000');
        if (coins >= 5000) unlockAch('rich_5000');
        if (gameMode === 'zen' && score >= 500) unlockAch('zen_master');
        saveProgress();
        if (comboCount >= 3) flashAlpha = 80;
        if (comboCount >= 5) { flashAlpha = 120; slowMoFrames = 40; }
        playSound('slice', comboCount);
        playSound('squish');
        triggerShake(6, 6);
        buzz(15);
        let txt = comboCount > 1 ? '+' + pts + ' x' + comboCount + ' +1💰' : '+' + pts + ' +1💰';
        floatingTexts.push(new FloatingText(it.x, it.y, txt, comboCount > 1 ? '#ffea00' : '#ffffff'));
        spawnJuice(it.x, it.y, it.innerColor, 25);
        if (random() < 0.6) {
          splatters.push(new Splatter(it.x, it.y, it.innerColor));
          if (splatters.length > 25) splatters.shift();
        }
        fruitBlood.push({
          x: it.x, y: it.y, color: it.innerColor,
          seed: random(1000), life: 300, maxLife: 300
        });
        if (fruitBlood.length > 30) fruitBlood.shift();
        if (totalSlices === 1) unlockAch('first_slice');
        bumpChallenge('slices', 1);
        bumpChallenge('score', score);
        bumpChallenge('maxCombo', comboCount);
        if (comboCount === 5) say('Nice!');
        if (comboCount === 10) say(currentLang === 'ru' ? 'Комбо!' : 'Combo!');
        if (comboCount === 15) say(currentLang === 'ru' ? 'Отлично!' : 'Excellent!');
      }

      let ang = atan2(p1.y - p2.y, p1.x - p2.x);
      slicedHalves.push(new SlicedHalf(it, ang, 1));
      slicedHalves.push(new SlicedHalf(it, ang, -1));
      items.splice(i, 1);
    }
  }
}

// --- 16. SWIPE DRAW ---
function updateAndDrawSwipe() {
  let now = millis();
  if (mouseIsPressed) swipePath.push({ x: mouseX, y: mouseY, time: now });
  swipePath = swipePath.filter(p => now - p.time < 150);
  if (swipePath.length < 2) return;

  let c1, c2;
  if (customKnifeColor) {
    c1 = [red(customKnifeColor), green(customKnifeColor), blue(customKnifeColor)];
    c2 = [255, 255, 255];
  } else {
    let k = KNIVES.find(k => k.id === selectedKnife) || KNIVES[0];
    c1 = k.c1;
    c2 = k.c2;
  }
  noFill();
  for (let i = 0; i < swipePath.length - 1; i++) {
    let p1 = swipePath[i], p2 = swipePath[i + 1];
    let prog = i / swipePath.length;
    stroke(c1[0], c1[1], c1[2], prog * 200);
    strokeWeight(prog * 14);
    line(p1.x, p1.y, p2.x, p2.y);
    stroke(c2[0], c2[1], c2[2], prog * 255);
    strokeWeight(prog * 4);
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

// --- 17. HUD ---
function drawHUD() {
  push();
  fill(0, 0, 0, 150);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, 60);
  rectMode(CENTER);
  textAlign(LEFT, CENTER);
  textSize(28);
  textStyle(BOLD);
  noStroke();
  fill(255, 215, 0);
  text(t('score') + ': ' + score, 20, 30);
  textSize(16);
  fill(200);
  text(t('best') + ': ' + ((isCreatorUser && infiniteRecord) ? '∞ 999999999' : highScore), 220, 32);
  textAlign(RIGHT, CENTER);
  textSize(24);
  if (gameMode === 'classic') {
    let l = '';
    for (let i = 0; i < 3; i++) l += i < lives ? '❤️ ' : '❌ ';
    text(l, width - 180, 30);
  } else if (gameMode === 'survival') {
    fill(255, 200, 100);
    text('LV ' + survivalLevel, width - 180, 30);
  } else if (gameMode !== 'endless') {
    fill(255, 100, 100);
    text(Math.ceil(gameTimer) + 's', width - 180, 30);
  }
  textAlign(CENTER, CENTER);
  textSize(22);
  fill(255, 215, 0);
  text('💰 ' + coins, width / 2, 30);
  if (freezeTimer > 0) {
    textSize(20);
    fill(0, 255, 255);
    text('❄️ ' + Math.ceil(freezeTimer / 60) + 's', width - 150, 90);
  }
  if (doubleTimer > 0) {
    textSize(20);
    fill(255, 215, 0);
    text('⭐ ' + Math.ceil(doubleTimer / 60) + 's', width - 150, 120);
  }
  fill(70, 70, 90);
  rect(50, height - 40, 90, 40, 8);
  fill(255);
  textSize(16);
  text(t('menu'), 50, height - 40);
  fill(70, 70, 120);
  rect(width - 60, height - 40, 60, 40, 8);
  fill(255);
  textSize(22);
  text('⏸', width - 60, height - 40);
  pop();
}

// --- 18. MAIN MENU ---
function drawMainMenu() {
  textAlign(CENTER, CENTER);
  textSize(min(width * 0.1, 64));
  textStyle(BOLD);
  stroke(0);
  strokeWeight(6);
  fill(255, 87, 34);
  text(t('title'), width / 2, height * 0.09);
  fill(255, 215, 0);
  textSize(20);
  noStroke();
  text(t('hs') + ': ' + ((isCreatorUser && infiniteRecord) ? '∞ 999999999' : highScore), width / 2, height * 0.15);
  if (currentUser) {
    let nick = accountsDB[currentUser] ? accountsDB[currentUser].nickname : 'User';
    if (isCreatorUser) {
      fill(255, 215, 0);
      textSize(20);
      text('👑 ' + nick + ' 👑', width / 2, height * 0.20);
    } else {
      fill(100, 255, 100);
      textSize(16);
      text('👤 ' + nick, width / 2, height * 0.20);
    }
  } else {
    fill(200);
    textSize(16);
    text('Guest', width / 2, height * 0.20);
  }
  fill(255, 215, 0);
  textSize(22);
  text('💰 ' + coins, width / 2, height * 0.24);

  let btnW = 300, btnH = 32;
  let ys = [0.29, 0.34, 0.39, 0.44, 0.49, 0.54, 0.59, 0.64];
  let icons = ['▶️ ', '👻 ', '🏆 ', '🛒 ', '🌍 ', '👤 ', '🎁 ', '🎯 '];
  let labels = [t('play'), t('ghost'), t('ach'), t('shop'), t('lang'), t('prof'), t('daily'), t('dailyCh')];
  let cols = [
    color(255, 87, 34), color(120, 120, 160), color(255, 215, 0), color(150, 100, 200),
    color(150, 100, 50), currentUser ? color(80, 180, 80) : color(70, 70, 70),
    color(50, 150, 150), color(200, 100, 150)
  ];

  for (let i = 0; i < 8; i++) {
    let y = height * ys[i];
    let hov = mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
              mouseY > y - btnH / 2 && mouseY < y + btnH / 2;
    fill(hov ? lerpColor(cols[i], color(255), 0.3) : cols[i]);
    rect(width / 2, y, btnW, btnH, 15);
    fill(255);
    textSize(18);
    noStroke();
    text(icons[i] + labels[i], width / 2, y);
  }

  if (currentUser) {
    let y = height * 0.70;
    let hov = mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
              mouseY > y - btnH / 2 && mouseY < y + btnH / 2;
    fill(hov ? color(255, 80, 80) : color(180, 40, 40));
    rect(width / 2, y, btnW, btnH, 15);
    fill(255);
    textSize(16);
    text('🗑️ ' + t('delAcc'), width / 2, y);
  }
}

// --- 19. MODE SELECT ---
function drawModeSelect() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(48);
  textStyle(BOLD);
  text(t('modeSel'), width / 2, 60);
  let modes = [
    { id: 'classic', t: 'mClassic', d: 'mClassicD', c: [255, 87, 34] },
    { id: 'zen', t: 'mZen', d: 'mZenD', c: [50, 150, 255] },
    { id: 'arcade', t: 'mArcade', d: 'mArcadeD', c: [150, 50, 200] },
    { id: 'endless', t: 'mEndless', d: 'mEndlessD', c: [50, 200, 150] },
    { id: 'survival', t: 'mSurvival', d: 'mSurvivalD', c: [200, 80, 80] }
  ];
  for (let i = 0; i < 5; i++) {
    let y = 130 + i * 100;
    let hov = mouseX > width / 2 - 200 && mouseX < width / 2 + 200 &&
              mouseY > y - 45 && mouseY < y + 45;
    fill(hov ? lerpColor(color(modes[i].c[0], modes[i].c[1], modes[i].c[2]), color(255), 0.3)
             : color(modes[i].c[0], modes[i].c[1], modes[i].c[2]));
    rect(width / 2, y, 400, 90, 20);
    fill(255);
    textSize(26);
    text(t(modes[i].t), width / 2, y - 12);
    textSize(14);
    text(t(modes[i].d), width / 2, y + 22);
  }
  fill(255, 100, 100);
  textSize(20);
  rect(width / 2, height - 50, 200, 45, 10);
  fill(255);
  text('⬅️ ' + t('back'), width / 2, height - 50);
}

// --- 20. ACHIEVEMENTS ---
function drawAchievements() {
  fill(0, 0, 0, 230);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  fill(255, 215, 0);
  textSize(46);
  textStyle(BOLD);
  text('🏆 ' + t('ach'), width / 2, 60);
  push();
  translate(0, achScroll);
  for (let i = 0; i < ACHIEVEMENTS.length; i++) {
    let y = 140 + i * 70;
    let a = ACHIEVEMENTS[i];
    fill(a.unlocked ? color(80, 180, 80) : color(60, 60, 70));
    rect(width / 2, y, 500, 58, 10);
    fill(255);
    textSize(18);
    textStyle(BOLD);
    text(a.name, width / 2, y - 10);
    textSize(13);
    textStyle(NORMAL);
    text(a.desc, width / 2, y + 15);
    if (a.unlocked) {
      fill(255, 215, 0);
      textSize(22);
      text('✔', width / 2 + 220, y);
    }
  }
  pop();
  fill(255, 100, 100);
  textSize(18);
  textStyle(BOLD);
  rect(width / 2, height - 40, 200, 45, 10);
  fill(255);
  text('⬅️ ' + t('back'), width / 2, height - 40);
}

// --- 21. SHOP ---
function drawShop() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(46);
  textStyle(BOLD);
  text('🛒 ' + t('shop'), width / 2, 45);
  textAlign(RIGHT, CENTER);
  textSize(26);
  fill(255, 215, 0);
  text('💰 ' + coins, width - 30, 45);

  let tabY = 115, tabW = 140, tabH = 45;
  let tabs = [t('knives'), t('bgs'), t('cols'), t('snd')];
  for (let i = 0; i < 4; i++) {
    let tx = width / 2 + (i - 1.5) * (tabW + 10);
    let act = (shopTab === 'knives' && i === 0) ||
              (shopTab === 'bgs' && i === 1) ||
              (shopTab === 'cols' && i === 2) ||
              (shopTab === 'snd' && i === 3);
    fill(act ? color(255, 150, 50) : color(70, 60, 70));
    rect(tx, tabY, tabW, tabH, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(tabs[i], tx, tabY);
  }

  if (shopTab === 'knives' || shopTab === 'bgs' || shopTab === 'snd') {
    let list = shopTab === 'knives' ? KNIVES : (shopTab === 'bgs' ? BACKGROUNDS : SOUNDS);
    let ownedList = shopTab === 'knives' ? ownedKnives : (shopTab === 'bgs' ? ownedBgs : ownedSnds);
    let selId = shopTab === 'knives' ? selectedKnife : (shopTab === 'bgs' ? selectedBg : selectedSound);
    let cols = 3, itemW = 190, itemH = 170, gap = 20;
    let totalW = cols * itemW + (cols - 1) * gap;
    let startX = (width - totalW) / 2 + itemW / 2, startY = 230;
    for (let i = 0; i < list.length; i++) {
      let it = list[i];
      let col = i % cols, row = floor(i / cols);
      let ix = startX + col * (itemW + gap);
      let iy = startY + row * (itemH + gap);
      let owned = ownedList.includes(it.id) || it.cost === 0;
      let sel = selId === it.id;
      let hov = mouseX > ix - itemW / 2 && mouseX < ix + itemW / 2 &&
                mouseY > iy - itemH / 2 && mouseY < iy + itemH / 2;
      fill(sel ? color(100, 200, 100)
               : (hov ? color(90, 100, 130)
                      : (owned ? color(70, 90, 110) : color(55, 55, 75))));
      rect(ix, iy, itemW, itemH, 15);

      if (shopTab === 'knives') {
        push();
        translate(ix, iy - 40);
        stroke(it.c1[0], it.c1[1], it.c1[2]);
        strokeWeight(10);
        line(-50, 20, 50, -20);
        stroke(it.c2[0], it.c2[1], it.c2[2]);
        strokeWeight(3);
        line(-50, 20, 50, -20);
        pop();
      } else if (shopTab === 'bgs') {
        push();
        translate(ix, iy - 40);
        drawBgPreview(it.id);
        pop();
      } else {
        push();
        translate(ix, iy - 40);
        textAlign(CENTER, CENTER);
        textSize(36);
        fill(255);
        let ic = it.id === 'white' ? '⚪'
               : it.id === 'bugs' ? '🦋'
               : it.id === 'birds' ? '🐦'
               : it.id === 'calm' ? '🎵'
               : it.id === 'sea' ? '🌊'
               : '🔇';
        text(ic, 0, 0);
        pop();
      }
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(16);
      textStyle(BOLD);
      text(t(it.name), ix, iy + 30);
      textSize(14);
      textStyle(NORMAL);
      if (sel) {
        fill(100, 255, 100);
        text(t('sel'), ix, iy + 60);
      } else if (owned) {
        fill(180);
        text(t('own'), ix, iy + 60);
      } else {
        fill(255, 215, 0);
        text('💰 ' + it.cost, ix, iy + 60);
      }
    }
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    textStyle(BOLD);
    text('🎨 Knife', width / 2 - 200, 170);
    text('🎨 Background', width / 2 + 200, 170);
    fill(255, 215, 0);
    textSize(15);
    text('💰 ' + PAINT_COST + ' each', width / 2, 200);
    for (let i = 0; i < PALETTE.length; i++) {
      let col = i % 4, row = floor(i / 4);
      let cx = width / 2 - 200 + (col - 1.5) * 60;
      let cy = 250 + row * 60;
      fill(PALETTE[i][0], PALETTE[i][1], PALETTE[i][2]);
      stroke(255);
      strokeWeight(2);
      rect(cx, cy, 45, 45, 8);
      let cx2 = width / 2 + 200 + (col - 1.5) * 60;
      rect(cx2, cy, 45, 45, 8);
    }
    fill(200, 50, 50);
    rect(width / 2 - 200, 490, 150, 40, 10);
    fill(255);
    textSize(14);
    text(t('clear'), width / 2 - 200, 490);
    fill(200, 50, 50);
    rect(width / 2 + 200, 490, 150, 40, 10);
    fill(255);
    textSize(14);
    text(t('clear'), width / 2 + 200, 490);
  }

  let btnW = 180, btnH = 50;
  let bx = width / 2, by = height - 45;
  fill(mouseX > bx - btnW / 2 && mouseX < bx + btnW / 2 &&
       mouseY > by - btnH / 2 && mouseY < by + btnH / 2
       ? color(90, 140, 190) : color(60, 100, 140));
  rect(bx, by, btnW, btnH, 15);
  fill(255);
  textSize(20);
  textStyle(BOLD);
  text('⬅️ ' + t('back'), bx, by);
}

function drawBgPreview(id) {
  push();
  rectMode(CORNER);
  noStroke();
  if (id === 'dojo') {
    fill(35, 20, 32); rect(-80, -50, 160, 100);
    fill(25, 12, 22);
    for (let y = -50; y < 50; y += 15) rect(-80, y, 160, 2);
  } else if (id === 'trees') {
    fill(135, 206, 235); rect(-80, -50, 160, 100);
    fill(80, 140, 60); rect(-80, 15, 160, 35);
    fill(100, 60, 30); rect(-40, -5, 8, 20); rect(20, -5, 8, 20);
    fill(50, 140, 50); ellipse(-36, -20, 30, 35); ellipse(24, -20, 30, 35);
  } else if (id === 'mountains') {
    fill(135, 180, 235); rect(-80, -50, 160, 100);
    fill(120, 130, 150);
    triangle(-80, 50, -20, -30, 20, 50);
    triangle(0, 50, 40, -10, 80, 50);
    fill(255);
    triangle(-25, -20, -20, -30, -15, -20);
    triangle(35, -5, 40, -10, 45, -5);
  } else if (id === 'sea') {
    fill(135, 206, 235); rect(-80, -50, 160, 60);
    fill(0, 105, 148); rect(-80, 10, 160, 40);
    fill(255, 255, 200); ellipse(40, -20, 30);
  } else if (id === 'sunset') {
    fill(255, 94, 77); rect(-80, -50, 160, 100);
    fill(50, 20, 80); rect(-80, 20, 160, 30);
    fill(255, 200, 0); ellipse(0, 0, 50);
  } else if (id === 'night_moon') {
    fill(10, 15, 40); rect(-80, -50, 160, 100);
    fill(255); ellipse(-30, -20, 4); ellipse(20, -30, 3); ellipse(50, 10, 5);
    fill(240); ellipse(30, -10, 40);
    fill(10, 15, 40); ellipse(40, -15, 35);
  } else {
    let c = id === 'board_red' ? color(180, 60, 60)
          : id === 'board_blue' ? color(60, 100, 180)
          : id === 'board_green' ? color(60, 160, 80)
          : color(120, 60, 180);
    fill(c); rect(-80, -50, 160, 100);
    stroke(red(c) * 0.8, green(c) * 0.8, blue(c) * 0.8);
    strokeWeight(1);
    for (let y = -50; y < 50; y += 15) line(-80, y, 80, y);
  }
  rectMode(CENTER);
  pop();
}

// --- 22. CREATOR PANEL ---
function drawCreatorPanel() {
  fill(0, 0, 0, 230);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  fill(255, 215, 0);
  textSize(min(width * 0.08, 44));
  textStyle(BOLD);
  text('👑 ' + t('cPanel') + ' 👑', width / 2, 45);

  let btnW = 400, btnH = 48;
  let ys = [
    height / 2 - 170, height / 2 - 115, height / 2 - 60,
    height / 2 - 5, height / 2 + 50, height / 2 + 105
  ];
  let states = [isImmortal, infiniteCoins, isUndeletable, unlockAllAch, infiniteRecord, allTasksForced];
  let labels = [
    isImmortal ? '🛡️ ' + t('immOn') : '💀 ' + t('immOff'),
    infiniteCoins ? '💰 ' + t('cOn') : '💰 ' + t('cOff'),
    isUndeletable ? '🛡️ ' + t('unOn') : '🛡️ ' + t('unOff'),
    unlockAllAch ? '🏆 ' + t('unlockAchOn') : '🏆 ' + t('unlockAchOff'),
    infiniteRecord ? t('infRecOn') : t('infRecOff'),
    allTasksForced ? '🎯 ' + t('tasksAllOn') : '🎯 ' + t('tasksAllOff')
  ];

  for (let i = 0; i < 6; i++) {
    let hov = mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
              mouseY > ys[i] - btnH / 2 && mouseY < ys[i] + btnH / 2;
    fill(hov ? color(90, 140, 190) : color(60, 100, 140));
    rect(width / 2, ys[i], btnW, btnH, 12);
    fill(states[i] ? color(100, 255, 100) : color(200, 80, 80));
    textSize(17);
    textStyle(BOLD);
    text(labels[i], width / 2, ys[i]);
  }

  let bw = 200, bh = 42, by = height - 45;
  fill(mouseX > width / 2 - bw / 2 && mouseX < width / 2 + bw / 2 &&
       mouseY > by - bh / 2 && mouseY < by + bh / 2
       ? color(90, 140, 190) : color(60, 100, 140));
  rect(width / 2, by, bw, bh, 12);
  fill(255);
  textSize(16);
  textStyle(BOLD);
  text('⬅️ ' + t('back'), width / 2, by);
}

// --- 23. AUTH SCREEN ---
function drawAuthScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(44);
  textStyle(BOLD);

  if (pendingCreator2FA) {
    text('🔐 ' + t('twoFA'), width / 2, 50);
    fill(255, 215, 0);
    textSize(18);
    textStyle(NORMAL);
    text(CREATOR_EMAIL, width / 2, height / 2 - 140);
    fill(200);
    textSize(15);
    text(t('masterKey'), width / 2, height / 2 - 100);
    return;
  }

  text(authMode === 'login' ? '👤 ' + t('login') : '📝 ' + t('reg'), width / 2, 50);
  fill(200);
  textSize(13);
  noStroke();
  text('Local Account', width / 2, 85);
  if (authMode === 'register' && pendingCode) {
    push();
    fill(0);
    noStroke();
    rect(width / 2, height / 2 - 280, 400, 40, 10);
    fill(255, 255, 0);
    textSize(20);
    textStyle(BOLD);
    text(t('codeG') + pendingCode, width / 2, height / 2 - 280);
    pop();
  }
}

// --- 24. PAUSE ---
function drawPause() {
  fill(0, 0, 0, 200);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  fill(255, 215, 0);
  textSize(min(width * 0.1, 60));
  textStyle(BOLD);
  text('⏸ ' + t('pause'), width / 2, height * 0.25);
  let btnW = 300, btnH = 58;
  let btns = [
    { y: height * 0.45, c: [60, 150, 60], h: [120, 200, 120], txt: '▶ ' + t('resume') },
    { y: height * 0.57, c: [60, 100, 150], h: [120, 150, 200], txt: '⚙ ' + t('settings') },
    { y: height * 0.69, c: [150, 50, 50], h: [200, 100, 100], txt: '🏠 ' + t('menu') }
  ];
  for (let b of btns) {
    let hov = mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
              mouseY > b.y - btnH / 2 && mouseY < b.y + btnH / 2;
    fill(hov ? color(b.h[0], b.h[1], b.h[2]) : color(b.c[0], b.c[1], b.c[2]));
    rect(width / 2, b.y, btnW, btnH, 15);
    fill(255);
    textSize(22);
    textStyle(BOLD);
    text(b.txt, width / 2, b.y);
  }
}

// --- 25. SETTINGS ---
function drawSettings() {
  fill(0, 0, 0, 220);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(42);
  textStyle(BOLD);
  text('⚙ ' + t('settings'), width / 2, 55);

  let cx = width / 2, y = 140, rowH = 75;

  // Volume
  fill(200);
  textSize(20);
  textAlign(LEFT);
  text(t('volume'), cx - 250, y);
  let vols = [0, 0.3, 0.6, 1.0];
  for (let i = 0; i < 4; i++) {
    let bx = cx + 20 + i * 60;
    let act = Math.abs(settings.volume - vols[i]) < 0.05;
    fill(act ? color(100, 200, 100) : color(70, 70, 90));
    rect(bx, y, 50, 36, 8);
    fill(255);
    textAlign(CENTER);
    textSize(13);
    text((vols[i] * 100) + '%', bx, y);
  }

  // Particles
  y += rowH;
  fill(200);
  textSize(20);
  textAlign(LEFT);
  text(t('particles'), cx - 250, y);
  let pq = ['low', 'med', 'high'];
  for (let i = 0; i < 3; i++) {
    let bx = cx + 20 + i * 90;
    let act = settings.particles === pq[i];
    fill(act ? color(100, 200, 100) : color(70, 70, 90));
    rect(bx, y, 80, 36, 8);
    fill(255);
    textAlign(CENTER);
    textSize(13);
    text(t(pq[i]), bx, y);
  }

  // Theme
  y += rowH;
  fill(200);
  textSize(20);
  textAlign(LEFT);
  text(t('theme'), cx - 250, y);
  let themes = ['purple', 'blue', 'green'];
  let tkeys = ['themeP', 'themeB', 'themeG'];
  for (let i = 0; i < 3; i++) {
    let bx = cx + 20 + i * 100;
    let act = settings.theme === themes[i];
    fill(act ? color(100, 200, 100) : color(70, 70, 90));
    rect(bx, y, 90, 36, 8);
    fill(255);
    textAlign(CENTER);
    textSize(12);
    text(t(tkeys[i]), bx, y);
  }

  // Vibration
  y += rowH;
  fill(200);
  textSize(20);
  textAlign(LEFT);
  text(t('vibration'), cx - 250, y);
  fill(settings.vibration ? color(100, 200, 100) : color(150, 60, 60));
  rect(cx + 60, y, 100, 36, 8);
  fill(255);
  textAlign(CENTER);
  text(settings.vibration ? t('on') : t('off'), cx + 60, y);

  // Voice
  y += rowH;
  fill(200);
  textSize(20);
  textAlign(LEFT);
  text(t('voice'), cx - 250, y);
  fill(settings.voice ? color(100, 200, 100) : color(150, 60, 60));
  rect(cx + 60, y, 100, 36, 8);
  fill(255);
  textAlign(CENTER);
  text(settings.voice ? t('on') : t('off'), cx + 60, y);

  // Back
  fill(mouseX > cx - 100 && mouseX < cx + 100 &&
       mouseY > height - 70 && mouseY < height - 20
       ? color(120, 150, 200) : color(60, 100, 150));
  rect(cx, height - 45, 200, 50, 12);
  fill(255);
  textSize(18);
  text('⬅️ ' + t('back'), cx, height - 45);
}

// --- 26. LOADING ---
function updateLoading() {
  loadingProgress += dt * 3;
  if (loadingProgress >= 100) {
    loadingProgress = 100;
    if (!loadingDone) {
      loadingDone = true;
      loadingDoneFrame = frameCount;
    }
    if (frameCount - loadingDoneFrame > 10) gameState = loadingTarget;
  }
}

function drawLoading() {
  background(menuBg());
  textAlign(CENTER, CENTER);
  fill(255, 215, 0);
  textSize(48);
  textStyle(BOLD);
  text('🍉', width / 2, height * 0.35);
  fill(255);
  textSize(18);
  text(t('loading'), width / 2, height * 0.55);
  let barW = min(width * 0.7, 500), barH = 24;
  fill(60, 60, 80);
  rect(width / 2, height * 0.65, barW, barH, 8);
  fill(255, 150, 50);
  rect(
    width / 2 - barW / 2 + (barW * (loadingProgress / 100)) / 2,
    height * 0.65,
    barW * (loadingProgress / 100),
    barH - 4,
    8
  );
  fill(255);
  textSize(15);
  text(Math.floor(loadingProgress) + '%', width / 2, height * 0.72);
}

function startLoadingScreen(target) {
  loadingTarget = target;
  loadingProgress = 0;
  loadingDone = false;
  gameState = 'LOADING';
}

// --- 27. CHALLENGES SCREEN ---
function drawChallenges() {
  background(menuBg());
  textAlign(CENTER, CENTER);
  fill(255, 215, 0);
  textSize(42);
  textStyle(BOLD);
  text('🎯 ' + t('dailyCh'), width / 2, 55);
  fill(200);
  textSize(13);
  text(new Date().toLocaleDateString(), width / 2, 95);
  let startY = 150;
  for (let i = 0; i < dailyChallenges.length; i++) {
    let c = dailyChallenges[i];
    let y = startY + i * 105;
    fill(c.done ? color(60, 140, 60) : color(60, 60, 80));
    rect(width / 2, y, min(width - 60, 600), 85, 15);
    fill(255);
    textSize(17);
    textStyle(BOLD);
    text(c.desc, width / 2, y - 18);
    textSize(13);
    textStyle(NORMAL);
    fill(200);
    text(c.progress + ' / ' + c.target, width / 2, y + 8);
    fill(255, 215, 0);
    text('+' + c.reward + ' 💰', width / 2, y + 28);
    if (c.done) {
      fill(100, 255, 100);
      textSize(22);
      text('✔', width / 2 + min(width - 60, 600) / 2 - 30, y);
      if (allTasksForced) {
        fill(255, 215, 0);
        textSize(11);
        text('ADMIN', width / 2 + min(width - 60, 600) / 2 - 80, y);
      }
    }
  }
  fill(mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
       mouseY > height - 70 && mouseY < height - 20
       ? color(120, 150, 200) : color(60, 100, 150));
  rect(width / 2, height - 45, 200, 50, 12);
  fill(255);
  textSize(18);
  text('⬅️ ' + t('back'), width / 2, height - 45);
}

// --- 28. REVIVE / AD / GAMEOVER ---
function drawRevive() {
  fill(0, 0, 0, 220);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  textSize(min(width * 0.1, 60));
  textStyle(BOLD);
  stroke(0);
  strokeWeight(6);
  fill(255, 50, 50);
  text('☠️ ' + t('died'), width / 2, height * 0.3);
  let btnW = 350, btnH = 68, btnY = height * 0.55;
  fill(mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
       mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2
       ? color(100, 200, 100) : color(50, 150, 50));
  rect(width / 2, btnY, btnW, btnH, 15);
  fill(255);
  noStroke();
  textSize(20);
  text('🎥 ' + t('ad'), width / 2, btnY);
  fill(50);
  rect(width / 2, height * 0.7, 200, 50, 10);
  fill(200);
  textSize(20);
  text('🏳️ ' + t('giveup'), width / 2, height * 0.7);
}

function updateAd() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255, 50, 50);
  textSize(38);
  textStyle(BOLD);
  text('SPONSORED AD', width / 2, height * 0.3);
  fill(30, 100, 200);
  ellipse(width / 2, height / 2, 200, 200);
  fill(255);
  textSize(80);
  text('🍔', width / 2, height / 2);
  adTimer -= deltaTime / 1000;
  fill(255, 200, 0);
  textSize(34);
  text('SKIP ' + max(0, adTimer).toFixed(1) + 's', width / 2, height * 0.85);
  if (adTimer <= 0) {
    reviveAvailable = false;
    lives = 3;
    items = [];
    gameState = 'PLAY';
    gameTimer = 60;
  }
}

function drawGameOver() {
  fill(0, 0, 0, 200);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  textSize(min(width * 0.1, 68));
  textStyle(BOLD);
  stroke(0);
  strokeWeight(6);
  fill(255, 50, 50);
  text('💀 ' + t('over'), width / 2, height * 0.3);
  fill(255);
  textSize(34);
  noStroke();
  text(t('score') + ': ' + score, width / 2, height * 0.45);
  fill(255, 215, 0);
  textSize(22);
  text('💰 ' + coins, width / 2, height * 0.52);
  fill(255, 215, 0);
  textSize(18);
  text(t('best') + ': ' + ((isCreatorUser && infiniteRecord) ? '∞ 999999999' : highScore), width / 2, height * 0.58);
  let btnW = 250, btnH = 58, btnY = height * 0.68;
  fill(mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
       mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2
       ? color(255, 120, 60) : color(255, 87, 34));
  rect(width / 2, btnY, btnW, btnH, 15);
  fill(255);
  textSize(22);
  text('🔄 ' + t('again'), width / 2, btnY);
  fill(50);
  rect(width / 2, height * 0.8, btnW, btnH, 15);
  fill(255);
  text('🏠 ' + t('menu'), width / 2, height * 0.8);
}

// --- 29. GLOBAL UI (fullscreen, language, creator) ---
function drawGlobalUI() {
  push();
  let fsX = width - 40, fsY = 40;
  let hovFs = mouseX > fsX - 20 && mouseX < fsX + 20 &&
              mouseY > fsY - 20 && mouseY < fsY + 20;
  fill(hovFs ? color(255, 255, 255, 100) : color(0, 0, 0, 100));
  noStroke();
  rect(fsX, fsY, 36, 36, 8);
  stroke(255);
  strokeWeight(2);
  noFill();
  line(fsX - 6, fsY - 6, fsX - 2, fsY - 2);
  line(fsX - 6, fsY - 6, fsX - 6, fsY - 2);
  line(fsX - 6, fsY - 6, fsX - 2, fsY - 6);
  line(fsX + 6, fsY + 6, fsX + 2, fsY + 2);
  line(fsX + 6, fsY + 6, fsX + 6, fsY + 2);
  line(fsX + 6, fsY + 6, fsX + 2, fsY + 6);

  let lgX = width - 90, lgY = 40;
  let hovLg = mouseX > lgX - 20 && mouseX < lgX + 20 &&
              mouseY > lgY - 20 && mouseY < lgY + 20;
  fill(hovLg ? color(255, 255, 255, 100) : color(0, 0, 0, 100));
  noStroke();
  rect(lgX, lgY, 36, 36, 8);
  drawFlagIcon(lgX, lgY, 24, 16, currentLang);

  if (isCreatorUser) {
    let crX = width - 140, crY = 40;
    let hovCr = mouseX > crX - 20 && mouseX < crX + 20 &&
                mouseY > crY - 20 && mouseY < crY + 20;
    fill(hovCr ? color(255, 215, 0) : color(150, 110, 0));
    noStroke();
    rect(crX, crY, 36, 36, 8);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text('👑', crX, crY);
  }
  pop();
}

function drawFlagIcon(cx, cy, w, h, code) {
  push();
  translate(cx, cy);
  rectMode(CENTER);
  drawingContext.save();
  drawingContext.beginPath();
  if (drawingContext.roundRect) drawingContext.roundRect(-w / 2, -h / 2, w, h, 4);
  else drawingContext.rect(-w / 2, -h / 2, w, h);
  drawingContext.clip();

  if (code === 'ru') {
    noStroke();
    fill(255); rect(0, -h / 3, w, h / 3 + 1);
    fill(0, 57, 166); rect(0, 0, w, h / 3 + 1);
    fill(213, 43, 30); rect(0, h / 3, w, h / 3 + 1);
  } else if (code === 'en') {
    noStroke();
    fill(0, 36, 125); rect(0, 0, w, h);
    stroke(255); strokeWeight(2);
    line(-w / 2, -h / 2, w / 2, h / 2);
    line(-w / 2, h / 2, w / 2, -h / 2);
    stroke(200, 16, 46); strokeWeight(1);
    line(-w / 2, -h / 2, w / 2, h / 2);
    line(-w / 2, h / 2, w / 2, -h / 2);
    noStroke();
    fill(255); rect(0, 0, w, h * 0.3); rect(0, 0, w * 0.3, h);
    fill(200, 16, 46); rect(0, 0, w, h * 0.15); rect(0, 0, w * 0.15, h);
  } else if (code === 'zh') {
    noStroke();
    fill(222, 41, 16); rect(0, 0, w, h);
    fill(255, 222, 0);
    beginShape();
    for (let i = 0; i < 10; i++) {
      let r = i % 2 === 0 ? w * 0.15 : w * 0.06;
      let a = -PI / 2 + i * PI / 5;
      vertex(-w * 0.2 + r * cos(a), -h * 0.15 + r * sin(a));
    }
    endShape(CLOSE);
  } else if (code === 'hi') {
    noStroke();
    fill(255, 153, 51); rect(0, -h / 3, w, h / 3 + 1);
    fill(255); rect(0, 0, w, h / 3 + 1);
    fill(19, 136, 8); rect(0, h / 3, w, h / 3 + 1);
    noFill(); stroke(0, 0, 128); strokeWeight(1.5); ellipse(0, 0, h * 0.25);
  } else if (code === 'es') {
    noStroke();
    fill(170, 21, 27); rect(0, 0, w, h);
    fill(241, 191, 0); rect(0, 0, w, h / 2);
  } else if (code === 'ar') {
    noStroke();
    fill(0, 122, 61); rect(0, 0, w, h);
    stroke(255); strokeWeight(1.5);
    line(-w * 0.3, h * 0.15, w * 0.3, h * 0.15);
    line(-w * 0.25, -h * 0.1, w * 0.25, -h * 0.1);
  } else if (code === 'fr') {
    noStroke();
    fill(0, 35, 149); rect(-w / 3, 0, w / 3 + 1, h);
    fill(255); rect(0, 0, w / 3 + 1, h);
    fill(237, 41, 57); rect(w / 3, 0, w / 3 + 1, h);
  } else if (code === 'bn') {
    noStroke();
    fill(0, 106, 78); rect(0, 0, w, h);
    fill(244, 42, 65); ellipse(-w * 0.05, 0, w * 0.4);
  } else if (code === 'pt') {
    noStroke();
    fill(0, 102, 0); rect(-w / 4, 0, w / 2 + 1, h);
    fill(255, 0, 0); rect(w / 4, 0, w / 2 + 1, h);
    fill(255, 204, 0); ellipse(0, 0, h * 0.35);
  } else if (code === 'ja') {
    noStroke();
    fill(255); rect(0, 0, w, h);
    fill(188, 0, 45); ellipse(0, 0, w * 0.35);
  } else if (code === 'hy') {
    noStroke();
    fill(217, 0, 18); rect(0, -h / 3, w, h / 3 + 1);
    fill(0, 51, 160); rect(0, 0, w, h / 3 + 1);
    fill(242, 168, 0); rect(0, h / 3, w, h / 3 + 1);
  }
  drawingContext.restore();
  noFill();
  stroke(255, 150);
  strokeWeight(1);
  rect(0, 0, w, h, 4);
  pop();
}

// --- 30. BACKGROUND RENDERING ---
function drawBackground(id) {
  if (!bgCache || bgCacheW !== width || bgCacheH !== height || bgCacheId !== id) {
    bgCache = createGraphics(width, height);
    bgCacheW = width;
    bgCacheH = height;
    bgCacheId = id;
    renderBgToCache(bgCache, id);
  }
  image(bgCache, width / 2, height / 2);
}

function renderBgToCache(g, id) {
  g.rectMode(CORNER);
  if (id === 'dojo') {
    g.background(35, 20, 32);
    g.stroke(25, 12, 22);
    g.strokeWeight(3);
    for (let y = 0; y < height; y += 80) g.line(0, y, width, y);
  } else if (id === 'trees') {
    let gr = g.drawingContext.createLinearGradient(0, 0, 0, height);
    gr.addColorStop(0, 'rgb(135,206,235)');
    gr.addColorStop(1, 'rgb(200,230,255)');
    g.drawingContext.fillStyle = gr;
    g.noStroke();
    g.rect(0, 0, width, height);
    g.fill(80, 140, 60);
    g.rect(0, height * 0.88, width, height * 0.25);
    for (let i = 0; i < 8; i++) {
      let tx = 80 + i * (width - 160) / 7;
      let ty = height * 0.88;
      g.fill(100, 60, 30); g.rect(tx - 12, ty - 40, 24, 80);
      g.fill(50, 140, 50); g.ellipse(tx, ty - 100, 110, 130);
      g.fill(70, 160, 70);
      g.ellipse(tx - 35, ty - 80, 65, 75);
      g.ellipse(tx + 35, ty - 80, 65, 75);
    }
  } else if (id === 'mountains') {
    let gr = g.drawingContext.createLinearGradient(0, 0, 0, height);
    gr.addColorStop(0, 'rgb(135,180,235)');
    gr.addColorStop(1, 'rgb(200,220,255)');
    g.drawingContext.fillStyle = gr;
    g.noStroke();
    g.rect(0, 0, width, height);
    g.fill(255, 220, 100); g.ellipse(width * 0.85, height * 0.15, 90);
    g.fill(120, 130, 150);
    g.beginShape();
    g.vertex(0, height); g.vertex(0, height * 0.5);
    g.vertex(width * 0.2, height * 0.35); g.vertex(width * 0.4, height * 0.55);
    g.vertex(width * 0.6, height * 0.3); g.vertex(width * 0.8, height * 0.5);
    g.vertex(width, height * 0.4); g.vertex(width, height);
    g.endShape(CLOSE);
  } else if (id === 'sea') {
    let gs = g.drawingContext.createLinearGradient(0, 0, 0, height * 0.6);
    gs.addColorStop(0, 'rgb(135,206,235)');
    gs.addColorStop(1, 'rgb(200,230,255)');
    g.drawingContext.fillStyle = gs;
    g.noStroke();
    g.rect(0, 0, width, height * 0.6);
    let gm = g.drawingContext.createLinearGradient(0, height * 0.6, 0, height);
    gm.addColorStop(0, 'rgb(0,105,148)');
    gm.addColorStop(1, 'rgb(0,50,100)');
    g.drawingContext.fillStyle = gm;
    g.rect(0, height * 0.6, width, height * 0.4);
    g.noStroke();
    g.fill(255, 255, 200);
    g.ellipse(width * 0.8, height * 0.2, 100);
    g.stroke(255, 100);
    g.strokeWeight(2);
    for (let i = 0; i < 25; i++) {
      let wx = random(width), wy = random(height * 0.6, height);
      g.line(wx, wy, wx + random(20, 80), wy);
    }
  } else if (id === 'sunset') {
    let gr = g.drawingContext.createLinearGradient(0, 0, 0, height);
    gr.addColorStop(0, 'rgb(255,94,77)');
    gr.addColorStop(1, 'rgb(50,20,80)');
    g.drawingContext.fillStyle = gr;
    g.noStroke();
    g.rect(0, 0, width, height);
    g.fill(255, 200, 0); g.ellipse(width * 0.5, height * 0.7, 200);
    g.fill(50, 20, 80); g.rect(0, height * 0.9, width, height * 0.1);
  } else if (id === 'night_moon') {
    g.background(10, 15, 40);
    g.noStroke();
    g.fill(255);
    for (let i = 0; i < 150; i++) g.ellipse(random(width), random(height * 0.8), random(1, 3));
    g.fill(240); g.ellipse(width * 0.7, height * 0.25, 120);
    g.fill(10, 15, 40); g.ellipse(width * 0.75, height * 0.22, 100);
  } else if (id.startsWith('board_')) {
    let c = id === 'board_red' ? [180, 60, 60]
          : id === 'board_blue' ? [60, 100, 180]
          : id === 'board_green' ? [60, 160, 80]
          : [120, 60, 180];
    g.background(c[0], c[1], c[2]);
    g.stroke(c[0] * 0.75, c[1] * 0.75, c[2] * 0.75);
    g.strokeWeight(2);
    for (let y = 0; y < height; y += 55) g.line(0, y, width, y);
    g.strokeWeight(1);
    for (let x = 0; x < width; x += 110) g.line(x, 0, x, height);
  }
}

// --- 31. LANGUAGE MENU ---
function drawLangMenu() {
  fill(0, 0, 0, 230);
  rect(width / 2, height / 2, width, height);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(min(width * 0.08, 38));
  text('🌍 ' + t('lang'), width / 2, 70);

  let cols = 3, btnW = min(width / cols - 20, 220), btnH = 55;
  let startX = (width - cols * btnW) / 2 + btnW / 2, startY = 145;
  for (let i = 0; i < LANGS.length; i++) {
    let col = i % cols, row = floor(i / cols);
    let bx = startX + col * btnW, by = startY + row * (btnH + 20);
    let hov = mouseX > bx - btnW / 2 + 10 && mouseX < bx + btnW / 2 - 10 &&
              mouseY > by - btnH / 2 && mouseY < by + btnH / 2;
    fill(currentLang === LANGS[i].code ? color(100, 200, 100)
         : (hov ? color(100, 200, 255) : color(50, 100, 150)));
    rect(bx, by, btnW - 20, btnH, 10);
    drawFlagIcon(bx - (btnW - 20) / 2 + 30, by, 28, 18, LANGS[i].code);
    fill(255);
    textSize(16);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(LANGS[i].name, bx - (btnW - 20) / 2 + 55, by);
    textAlign(CENTER, CENTER);
  }

  fill(255, 100, 100);
  textSize(18);
  textStyle(NORMAL);
  rect(width / 2, height - 45, 150, 40, 10);
  fill(255);
  text('⬅️ ' + t('back'), width / 2, height - 45);
}

// --- 32. KNIFE CURSOR ---
function drawKnifeCursor() {
  let target = 1.0 + min(comboCount, 15) * 0.08;
  knifeScale = lerp(knifeScale, target, 0.2);
  let c1, c2;
  if (customKnifeColor) {
    c1 = [red(customKnifeColor), green(customKnifeColor), blue(customKnifeColor)];
    c2 = [255, 255, 255];
  } else {
    let k = KNIVES.find(k => k.id === selectedKnife) || KNIVES[0];
    c1 = k.c1; c2 = k.c2;
  }
  push();
  translate(mouseX, mouseY);
  rotate(-PI / 4);
  scale(knifeScale);
  strokeCap(ROUND);
  stroke(60, 35, 20);
  strokeWeight(7);
  line(-78, 50, -52, 33);
  stroke(25, 12, 6);
  strokeWeight(2);
  for (let i = 0; i < 4; i++) {
    let tt = i / 4;
    let hx = lerp(-78, -52, tt), hy = lerp(50, 33, tt);
    line(hx - 3, hy + 2, hx + 3, hy - 2);
  }
  noStroke();
  fill(180, 140, 60); ellipse(-49, 31, 16, 10);
  fill(120, 90, 30); ellipse(-49, 31, 8, 5);
  stroke(c1[0], c1[1], c1[2]);
  strokeWeight(8);
  strokeCap(ROUND);
  line(-45, 28, 0, 0);
  stroke(c2[0], c2[1], c2[2]);
  strokeWeight(2);
  line(-43, 26, -4, 2);
  noStroke();
  fill(c1[0], c1[1], c1[2]);
  triangle(0, 0, -6, 6, 8, -4);
  if (comboCount >= 3) {
    noFill();
    let glow = min(comboCount * 18, 220);
    stroke(255, 200, 0, glow);
    strokeWeight(2.5);
    ellipse(0, 0, 95, 95);
  }
  if (comboCount >= 2) {
    push();
    rotate(PI / 4);
    textAlign(LEFT, BOTTOM);
    textSize(16);
    textStyle(BOLD);
    noStroke();
    fill(255, 220, 0, 230);
    text('x' + comboCount, 14, -12);
    pop();
  }
  pop();
}

// --- 33. INPUT ---
function mouseWheel(e) {
  if (gameState === 'ACHIEVEMENTS') {
    achScroll -= e.delta * 0.5;
    let maxScroll = ACHIEVEMENTS.length * 70 - (height - 200);
    achScroll = constrain(achScroll, -maxScroll, 0);
    return false;
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (gameState === 'PLAY') { isPaused = true; gameState = 'PAUSE'; }
    else if (gameState === 'PAUSE') { gameState = 'PLAY'; isPaused = false; }
    else if (gameState === 'SETTINGS') { gameState = pausePrevState || 'MENU'; }
    return false;
  }
  return true;
}

function mousePressed() {
  try { initAudio(); } catch (e) {}

  // Fullscreen
  let fsX = width - 40, fsY = 40;
  if (mouseX > fsX - 20 && mouseX < fsX + 20 && mouseY > fsY - 20 && mouseY < fsY + 20) {
    try { let fs = fullscreen(); fullscreen(!fs); } catch (e) {}
    return;
  }

  // Language icon
  let lgX = width - 90, lgY = 40;
  if (mouseX > lgX - 20 && mouseX < lgX + 20 && mouseY > lgY - 20 && mouseY < lgY + 20) {
    if (gameState !== 'LANG_MENU') {
      previousState = gameState;
      gameState = 'LANG_MENU';
      hideAuthUI();
    } else {
      gameState = previousState;
      if (gameState === 'AUTH') showAuthUI();
    }
    return;
  }

  // Creator crown
  if (isCreatorUser) {
    let crX = width - 140, crY = 40;
    if (mouseX > crX - 20 && mouseX < crX + 20 && mouseY > crY - 20 && mouseY < crY + 20) {
      if (gameState === 'MENU' || gameState === 'CREATOR_PANEL') {
        gameState = gameState === 'MENU' ? 'CREATOR_PANEL' : 'MENU';
      }
      return;
    }
  }

  // DAILY
  if (gameState === 'DAILY') {
    let btnY = height / 2 + 100;
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > btnY - 30 && mouseY < btnY + 30) {
      coins += 100;
      saveProgress();
      localStorage.setItem('juicyLastDaily', new Date().toDateString());
      gameState = 'MENU';
      playSound('milestone');
    }
    return;
  }

  // MODE SELECT
  if (gameState === 'MODE_SELECT') {
    for (let i = 0; i < 5; i++) {
      let y = 130 + i * 100;
      if (mouseX > width / 2 - 200 && mouseX < width / 2 + 200 &&
          mouseY > y - 45 && mouseY < y + 45) {
        gameMode = ['classic', 'zen', 'arcade', 'endless', 'survival'][i];
        isEndlessMode = (gameMode === 'endless');
        survivalLevel = 1;
        resetGame();
        startLoadingScreen('PLAY');
        return;
      }
    }
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > height - 75 && mouseY < height - 25) gameState = 'MENU';
    return;
  }

  // ACHIEVEMENTS
  if (gameState === 'ACHIEVEMENTS') {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > height - 65 && mouseY < height - 15) gameState = 'MENU';
    return;
  }

  // CHALLENGES
  if (gameState === 'CHALLENGES') {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > height - 70 && mouseY < height - 20) gameState = 'MENU';
    return;
  }

  // LANG MENU
  if (gameState === 'LANG_MENU') {
    let cols = 3, btnW = min(width / cols - 20, 220), btnH = 55;
    let startX = (width - cols * btnW) / 2 + btnW / 2, startY = 145;
    for (let i = 0; i < LANGS.length; i++) {
      let col = i % cols, row = floor(i / cols);
      let bx = startX + col * btnW, by = startY + row * (btnH + 20);
      if (mouseX > bx - btnW / 2 + 10 && mouseX < bx + btnW / 2 - 10 &&
          mouseY > by - btnH / 2 && mouseY < by + btnH / 2) {
        currentLang = LANGS[i].code;
        localStorage.setItem('juicyLang', currentLang);
        gameState = previousState;
        if (gameState === 'AUTH') showAuthUI();
        return;
      }
    }
    if (mouseX > width / 2 - 75 && mouseX < width / 2 + 75 &&
        mouseY > height - 65 && mouseY < height - 25) {
      gameState = previousState;
      if (gameState === 'AUTH') showAuthUI();
    }
    return;
  }

  // CREATOR PANEL
  if (gameState === 'CREATOR_PANEL') {
    let btnW = 400, btnH = 48;
    let ys = [
      height / 2 - 170, height / 2 - 115, height / 2 - 60,
      height / 2 - 5, height / 2 + 50, height / 2 + 105
    ];
    for (let i = 0; i < 6; i++) {
      if (mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
          mouseY > ys[i] - btnH / 2 && mouseY < ys[i] + btnH / 2) {
        if (i === 0) isImmortal = !isImmortal;
        else if (i === 1) infiniteCoins = !infiniteCoins;
        else if (i === 2) isUndeletable = !isUndeletable;
        else if (i === 3) {
          unlockAllAch = !unlockAllAch;
          if (unlockAllAch) {
            ACHIEVEMENTS.forEach(a => a.unlocked = true);
            toasts.push({ text: 'ALL ACHIEVEMENTS UNLOCKED!', alpha: 255, y: 100 });
          } else {
            ACHIEVEMENTS.forEach(a => a.unlocked = false);
          }
          localStorage.setItem(
            'juicyAch',
            JSON.stringify(ACHIEVEMENTS.filter(a => a.unlocked).map(a => a.id))
          );
        } else if (i === 4) {
          infiniteRecord = !infiniteRecord;
          if (infiniteRecord) toasts.push({ text: '∞ RECORD ACTIVATED', alpha: 255, y: 100 });
        } else if (i === 5) {
          allTasksForced = !allTasksForced;
          saveAllTasksForced();
          applyAllTasksForced();
          playSound('milestone');
          return;
        }
        saveProgress();
        playSound('slice', 1);
        return;
      }
    }
    let bw = 200, bh = 42, by = height - 45;
    if (mouseX > width / 2 - bw / 2 && mouseX < width / 2 + bw / 2 &&
        mouseY > by - bh / 2 && mouseY < by + bh / 2) gameState = 'MENU';
    return;
  }

  // MENU
  if (gameState === 'MENU') {
    let btnW = 300, btnH = 32;
    let ys = [0.29, 0.34, 0.39, 0.44, 0.49, 0.54, 0.59, 0.64];
    for (let i = 0; i < 8; i++) {
      let y = height * ys[i];
      if (mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
          mouseY > y - btnH / 2 && mouseY < y + btnH / 2) {
        if (i === 0) gameState = 'MODE_SELECT';
        else if (i === 1) enterGhostMode();
        else if (i === 2) { achScroll = 0; gameState = 'ACHIEVEMENTS'; }
        else if (i === 3) gameState = 'SHOP';
        else if (i === 4) { previousState = 'MENU'; gameState = 'LANG_MENU'; }
        else if (i === 5) {
          if (currentUser) {
            if (confirm(t('logout') + ' ' + (accountsDB[currentUser] ? accountsDB[currentUser].nickname : '') + '?')) {
              localStorage.removeItem('juicyCurrentUser');
              currentUser = null;
              isCreatorUser = false;
              isImmortal = false;
              infiniteCoins = false;
              isUndeletable = false;
              unlockAllAch = false;
              infiniteRecord = false;
              loadGuestProgress();
            }
          } else {
            gameState = 'AUTH';
            pendingCreator2FA = false;
            showAuthUI();
          }
        } else if (i === 6) {
          if (localStorage.getItem('juicyLastDaily') !== new Date().toDateString()) gameState = 'DAILY';
          else alert(t('claimed'));
        } else if (i === 7) {
          initDailyChallenges();
          gameState = 'CHALLENGES';
        }
        return;
      }
    }

    // Delete account
    if (currentUser) {
      let y = height * 0.70;
      if (mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
          mouseY > y - btnH / 2 && mouseY < y + btnH / 2) {
        if (isCreatorUser && isUndeletable) alert(t('cantDel'));
        else if (confirm(t('confDel'))) {
          accountsDB = JSON.parse(localStorage.getItem('juicyAccounts') || '{}');
          delete accountsDB[currentUser];
          localStorage.setItem('juicyAccounts', JSON.stringify(accountsDB));
          localStorage.removeItem('juicyCurrentUser');
          currentUser = null;
          isCreatorUser = false;
          isImmortal = false;
          infiniteCoins = false;
          isUndeletable = false;
          unlockAllAch = false;
          infiniteRecord = false;
          loadGuestProgress();
          playSound('miss');
        }
        return;
      }
    }
  }

  // SHOP
  else if (gameState === 'SHOP') {
    let tabY = 115, tabW = 140, tabH = 45;
    let tabs = ['knives', 'bgs', 'cols', 'snd'];
    for (let i = 0; i < 4; i++) {
      let tx = width / 2 + (i - 1.5) * (tabW + 10);
      if (mouseX > tx - tabW / 2 && mouseX < tx + tabW / 2 &&
          mouseY > tabY - tabH / 2 && mouseY < tabY + tabH / 2) {
        shopTab = tabs[i];
        return;
      }
    }

    if (shopTab === 'knives' || shopTab === 'bgs' || shopTab === 'snd') {
      let list = shopTab === 'knives' ? KNIVES : (shopTab === 'bgs' ? BACKGROUNDS : SOUNDS);
      let ownedList = shopTab === 'knives' ? ownedKnives : (shopTab === 'bgs' ? ownedBgs : ownedSnds);
      let cols = 3, itemW = 190, itemH = 170, gap = 20;
      let totalW = cols * itemW + (cols - 1) * gap;
      let startX = (width - totalW) / 2 + itemW / 2, startY = 230;
      for (let i = 0; i < list.length; i++) {
        let it = list[i];
        let col = i % cols, row = floor(i / cols);
        let ix = startX + col * (itemW + gap);
        let iy = startY + row * (itemH + gap);
        if (mouseX > ix - itemW / 2 && mouseX < ix + itemW / 2 &&
            mouseY > iy - itemH / 2 && mouseY < iy + itemH / 2) {
          let owned = ownedList.includes(it.id) || it.cost === 0;
          let freeBuy = (isCreatorUser && infiniteCoins);

          if (owned) {
            if (shopTab === 'knives') {
              selectedKnife = it.id;
              saveProgress();
              playSound('slice', 1);
            } else if (shopTab === 'bgs') {
              selectedBg = it.id;
              saveProgress();
              playSound('slice', 1);
            } else {
              if (it.id === selectedSound) {
                playSound('slice', 1);
              } else if (it.id === 'off') {
                selectedSound = 'off';
                soundRotateTimer = 300;
                stopAmbientSound();
                saveProgress();
                playSound('slice', 1);
              } else if (selectedSound !== 'off') {
                playSound('miss');
                toasts.push({ text: t('sndLocked'), alpha: 255, y: 150 });
              } else {
                selectedSound = it.id;
                soundRotateTimer = 300;
                startAmbientSound();
                saveProgress();
                playSound('slice', 1);
              }
            }
          } else if (coins >= it.cost || freeBuy) {
            if (!freeBuy) coins -= it.cost;
            if (shopTab === 'knives') {
              ownedKnives.push(it.id);
              selectedKnife = it.id;
              unlockAch('buy_knife');
            } else if (shopTab === 'bgs') {
              ownedBgs.push(it.id);
              selectedBg = it.id;
              unlockAch('buy_bg');
            } else {
              ownedSnds.push(it.id);
              if (selectedSound === 'off') {
                selectedSound = it.id;
                soundRotateTimer = 300;
                startAmbientSound();
              } else {
                toasts.push({ text: t('sndBoughtNoSwitch'), alpha: 255, y: 150 });
              }
            }
            spawnConfetti(ix, iy);
            saveProgress();
            playSound('slice', 5);
            buzz(50);
          } else playSound('miss');
          return;
        }
      }
    } else {
      // Colors
      for (let i = 0; i < PALETTE.length; i++) {
        let col = i % 4, row = floor(i / 4);
        let cx = width / 2 - 200 + (col - 1.5) * 60;
        let cy = 250 + row * 60;
        if (mouseX > cx - 22 && mouseX < cx + 22 && mouseY > cy - 22 && mouseY < cy + 22) {
          let already = customKnifeColor &&
            red(customKnifeColor) === PALETTE[i][0] &&
            green(customKnifeColor) === PALETTE[i][1] &&
            blue(customKnifeColor) === PALETTE[i][2];
          let freeBuy = (isCreatorUser && infiniteCoins);
          if (already) playSound('slice', 1);
          else if (coins >= PAINT_COST || freeBuy) {
            if (!freeBuy) coins -= PAINT_COST;
            customKnifeColor = color(PALETTE[i][0], PALETTE[i][1], PALETTE[i][2]);
            saveProgress();
            playSound('slice', 1);
          } else playSound('miss');
          return;
        }
        let cx2 = width / 2 + 200 + (col - 1.5) * 60;
        if (mouseX > cx2 - 22 && mouseX < cx2 + 22 && mouseY > cy - 22 && mouseY < cy + 22) {
          let already = customBgColor &&
            red(customBgColor) === PALETTE[i][0] &&
            green(customBgColor) === PALETTE[i][1] &&
            blue(customBgColor) === PALETTE[i][2];
          let freeBuy = (isCreatorUser && infiniteCoins);
          if (already) playSound('slice', 1);
          else if (coins >= PAINT_COST || freeBuy) {
            if (!freeBuy) coins -= PAINT_COST;
            customBgColor = color(PALETTE[i][0], PALETTE[i][1], PALETTE[i][2]);
            saveProgress();
            playSound('slice', 1);
          } else playSound('miss');
          return;
        }
      }
      if (mouseX > width / 2 - 275 && mouseX < width / 2 - 125 && mouseY > 470 && mouseY < 510) {
        customKnifeColor = null; saveProgress(); playSound('miss'); return;
      }
      if (mouseX > width / 2 + 125 && mouseX < width / 2 + 275 && mouseY > 470 && mouseY < 510) {
        customBgColor = null; saveProgress(); playSound('miss'); return;
      }
    }

    let btnW = 180, btnH = 50, bx = width / 2, by = height - 45;
    if (mouseX > bx - btnW / 2 && mouseX < bx + btnW / 2 &&
        mouseY > by - btnH / 2 && mouseY < by + btnH / 2) gameState = 'MENU';
  }

  // PLAY
  else if (gameState === 'PLAY') {
    if (mouseX > width - 100 && mouseX < width - 20 &&
        mouseY > height - 60 && mouseY < height - 20) {
      isPaused = true;
      gameState = 'PAUSE';
      return;
    }
    if (mouseX < 100 && mouseY > height - 60 && mouseY < height - 20) {
      if (isGhostMode) exitGhostMode();
      gameState = 'MENU';
      return;
    }
  }

  // PAUSE
  else if (gameState === 'PAUSE') {
    let btnW = 300, btnH = 58;
    let btns = [
      { y: height * 0.45, act: 'PLAY' },
      { y: height * 0.57, act: 'SETTINGS' },
      { y: height * 0.69, act: 'MENU' }
    ];
    for (let b of btns) {
      if (mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
          mouseY > b.y - btnH / 2 && mouseY < b.y + btnH / 2) {
        if (b.act === 'PLAY') { gameState = 'PLAY'; isPaused = false; }
        else if (b.act === 'SETTINGS') { pausePrevState = 'PAUSE'; gameState = 'SETTINGS'; }
        else if (b.act === 'MENU') {
          if (isGhostMode) exitGhostMode();
          gameState = 'MENU';
          isPaused = false;
        }
        return;
      }
    }
    return;
  }

  // SETTINGS
  else if (gameState === 'SETTINGS') {
    let cx = width / 2, y = 140, rowH = 75;

    let vols = [0, 0.3, 0.6, 1.0];
    for (let i = 0; i < 4; i++) {
      let bx = cx + 20 + i * 60;
      if (mouseX > bx - 25 && mouseX < bx + 25 && mouseY > y - 18 && mouseY < y + 18) {
        settings.volume = vols[i];
        applyVolume();
        saveSettings();
        return;
      }
    }
    y += rowH;
    let pq = ['low', 'med', 'high'];
    for (let i = 0; i < 3; i++) {
      let bx = cx + 20 + i * 90;
      if (mouseX > bx - 40 && mouseX < bx + 40 && mouseY > y - 18 && mouseY < y + 18) {
        settings.particles = pq[i];
        saveSettings();
        return;
      }
    }
    y += rowH;
    let themes = ['purple', 'blue', 'green'];
    for (let i = 0; i < 3; i++) {
      let bx = cx + 20 + i * 100;
      if (mouseX > bx - 45 && mouseX < bx + 45 && mouseY > y - 18 && mouseY < y + 18) {
        settings.theme = themes[i];
        saveSettings();
        return;
      }
    }
    y += rowH;
    if (mouseX > cx + 10 && mouseX < cx + 110 && mouseY > y - 18 && mouseY < y + 18) {
      settings.vibration = !settings.vibration;
      saveSettings();
      return;
    }
    y += rowH;
    if (mouseX > cx + 10 && mouseX < cx + 110 && mouseY > y - 18 && mouseY < y + 18) {
      settings.voice = !settings.voice;
      saveSettings();
      if (settings.voice) say(currentLang === 'ru' ? 'Голос включён' : 'Voice on');
      return;
    }
    if (mouseX > cx - 100 && mouseX < cx + 100 &&
        mouseY > height - 70 && mouseY < height - 20) {
      gameState = pausePrevState || 'MENU';
      return;
    }
    return;
  }

  // REVIVE
  else if (gameState === 'REVIVE') {
    let btnW = 350, btnH = 68, btnY = height * 0.55;
    if (mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
        mouseY > btnY - btnH / 2 && mouseY < btnY + btnH / 2) {
      adTimer = 5.0;
      gameState = 'AD';
    } else if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
               mouseY > height * 0.7 - 25 && mouseY < height * 0.7 + 25) {
      gameState = 'GAMEOVER';
    }
  }

  // GAME OVER
  else if (gameState === 'GAMEOVER') {
    let btnW = 250, btnH = 58;
    if (mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
        mouseY > height * 0.68 - btnH / 2 && mouseY < height * 0.68 + btnH / 2) {
      resetGame();
      reviveAvailable = true;
      gameState = 'PLAY';
      playSound('slice', 1);
    } else if (mouseX > width / 2 - btnW / 2 && mouseX < width / 2 + btnW / 2 &&
               mouseY > height * 0.8 - btnH / 2 && mouseY < height * 0.8 + btnH / 2) {
      if (isGhostMode) exitGhostMode();
      resetGame();
      gameState = 'MENU';
    }
  }
}

function touchStarted(evt) {
  if (touches.length > 0) {
    mouseX = touches[0].x;
    mouseY = touches[0].y;
  }
  // Preempt touch handling only on the canvas: on buttons and input fields we let the browser work
  let onCanvas = evt && evt.target && evt.target.tagName === 'CANVAS';
  if (onCanvas) {
    mousePressed();
    return false;
  }
  return true;
}

function touchEnded(evt) {
  let onCanvas = evt && evt.target && evt.target.tagName === 'CANVAS';
  return onCanvas ? false : true;
}

// --- 34. RESET ---
function resetGame() {
  score = 0;
  lives = 3;
  comboCount = 0;
  spawnTimer = 0;
  spawnInterval = 65;
  currentMilestoneIndex = 0;
  items = [];
  slicedHalves = [];
  floatingTexts = [];
  splatters = [];
  fruitBlood = [];
  swipePath = [];
  cursorTrail = [];
  freezeTimer = 0;
  doubleTimer = 0;
  gameTimer = 60;
  survivalTime = 0;
  slowMoFrames = 0;
  flashAlpha = 0;
  nextBossScore = 1500;   // BOSS every 1500
  activeBoss = null;
  survivalLevel = 1;
  for (let p of particlePool) p.alpha = 0;
}

// --- 35. UTILS ---
function spawnJuice(x, y, c, n) {
  let s = 0;
  for (let p of particlePool) {
    if (p.alpha <= 0) {
      p.reset(x, y, c);
      s++;
      if (s >= n) break;
    }
  }
}

function spawnExplosion(x, y) {
  let s = 0;
  for (let p of particlePool) {
    if (p.alpha <= 0) {
      p.reset(x, y, random(['#ff5722', '#ffeb3b', '#ffffff', '#ff9800']));
      p.vx = random(-15, 15);
      p.vy = random(-15, 15);
      s++;
      if (s >= 50) break;
    }
  }
}

function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  let dx = x2 - x1, dy = y2 - y1;
  let len = sqrt(dx * dx + dy * dy);
  if (len === 0) return dist(x1, y1, cx, cy) < r;
  let u = ((cx - x1) * dx + (cy - y1) * dy) / (len * len);
  u = max(0, min(1, u));
  return dist(cx, cy, x1 + u * dx, y1 + u * dy) < r;
}

function triggerShake(f, i) {
  shakeFrames = f;
  shakeIntensity = i;
}

// --- 36. AUTH UI ---
function showAuthUI() {
  let cx = width / 2, w = 300, h = 40;
  inputEmail.hide(); inputPass.hide(); inputNick.hide();
  inputCode.hide(); btnSendCode.hide();
  btnAction.hide(); btnSwitch.hide(); btnBackAuth.hide();
  inputMasterKey.hide(); btnVerifyMaster.hide(); btnCancel2FA.hide();

  if (pendingCreator2FA) {
    inputMasterKey.position(cx - w / 2, height / 2 - 60);
    inputMasterKey.size(w, h);
    inputMasterKey.show();
    btnVerifyMaster.html(t('verify'));
    btnVerifyMaster.position(cx - w / 2, height / 2 + 10);
    btnVerifyMaster.size(w, h);
    btnVerifyMaster.show();
    btnCancel2FA.html(t('cancel2FA'));
    btnCancel2FA.position(cx - w / 2, height / 2 + 70);
    btnCancel2FA.size(w, 30);
    btnCancel2FA.show();
    return;
  }

  if (authMode === 'login') {
    inputEmail.position(cx - w / 2, height / 2 - 80); inputEmail.size(w, h); inputEmail.show();
    inputPass.position(cx - w / 2, height / 2 - 20); inputPass.size(w, h); inputPass.show();
    btnAction.html(t('login'));
    btnAction.position(cx - w / 2, height / 2 + 40); btnAction.size(w, h); btnAction.show();
    btnSwitch.html(t('switchReg'));
    btnSwitch.position(cx - w / 2, height / 2 + 90); btnSwitch.size(w, 30); btnSwitch.show();
  } else {
    inputEmail.position(cx - w / 2, height / 2 - 220); inputEmail.size(w, h); inputEmail.show();
    btnSendCode.html('SEND CODE');
    btnSendCode.position(cx - w / 2, height / 2 - 170); btnSendCode.size(w, h); btnSendCode.show();
    inputCode.position(cx - w / 2, height / 2 - 110); inputCode.size(w, h); inputCode.show();
    inputPass.position(cx - w / 2, height / 2 - 60); inputPass.size(w, h); inputPass.show();
    inputNick.position(cx - w / 2, height / 2 - 10); inputNick.size(w, h); inputNick.show();
    btnAction.html(t('reg'));
    btnAction.position(cx - w / 2, height / 2 + 40); btnAction.size(w, h); btnAction.show();
    btnSwitch.html(t('switchLog'));
    btnSwitch.position(cx - w / 2, height / 2 + 90); btnSwitch.size(w, 30); btnSwitch.show();
  }
  btnBackAuth.position(cx - w / 2, height - 80);
  btnBackAuth.size(w, 40);
  btnBackAuth.show();
}

function hideAuthUI() {
  inputEmail.hide(); inputPass.hide(); inputNick.hide();
  inputCode.hide(); btnSendCode.hide();
  btnAction.hide(); btnSwitch.hide(); btnBackAuth.hide();
  inputMasterKey.hide(); btnVerifyMaster.hide(); btnCancel2FA.hide();
}

function sendCodeAction() {
  let email = inputEmail.value().trim().toLowerCase();
  if (!email || !email.endsWith('@gmail.com') || email === '@gmail.com') {
    alert(t('gmailOnly'));
    return;
  }
  accountsDB = JSON.parse(localStorage.getItem('juicyAccounts') || '{}');
  if (accountsDB[email]) { alert(t('emailReg')); return; }
  pendingEmail = email;
  pendingCode = (email === CREATOR_EMAIL)
    ? CREATOR_CODE
    : String(Math.floor(10000 + Math.random() * 90000));
  playSound('slice', 3);
  alert(t('codeG') + pendingCode);
}

function authAction() {
  let email = inputEmail.value().trim().toLowerCase();
  let pass = inputPass.value();
  if (!email || !pass) { alert(t('fillEmailPass')); return; }
  accountsDB = JSON.parse(localStorage.getItem('juicyAccounts') || '{}');
  let isCreator = (email === CREATOR_EMAIL);

  if (authMode === 'login') {
    let passOk = false;
    if (accountsDB[email] && accountsDB[email].password === btoa(pass)) passOk = true;
    if (isCreator && pass === CREATOR_MASTER_PASS) passOk = true;

    if (passOk) {
      if (isCreator) {
        pendingCreator2FA = true;
        inputMasterKey.value('');
        showAuthUI();
        return;
      }
      currentUser = email;
      localStorage.setItem('juicyCurrentUser', currentUser);
      loadProgress(accountsDB[email]);
      gameState = 'MENU';
      hideAuthUI();
      playSound('slice', 5);
    } else {
      alert(t('wrongLogin'));
    }
  } else {
    let code = inputCode.value().trim();
    let nick = inputNick.value().trim();
    if (!email.endsWith('@gmail.com')) { alert(t('gmailOnly')); return; }
    if (!pendingCode || email !== pendingEmail) { alert(t('sendCode')); return; }
    if (code !== pendingCode) { alert(t('wrongCode')); return; }
    if (!/^\d+$/.test(pass) || pass.length < 4 || pass.length > 20) { alert(t('passRule')); return; }
    if (!nick) { alert(t('fillNick')); return; }
    if (isCreator) {
      if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(nick)) { alert(t('nickCreatorOnly')); return; }
    } else {
      if (!/^[a-zA-Z]+$/.test(nick)) { alert(t('nickLatinOnly')); return; }
    }
    for (let e in accountsDB) {
      if (accountsDB[e].nickname &&
          accountsDB[e].nickname.toLowerCase() === nick.toLowerCase()) {
        alert(t('nickTaken'));
        return;
      }
    }
    if (accountsDB[email]) { alert(t('emailReg')); return; }
    accountsDB[email] = {
      nickname: nick,
      password: btoa(pass),
      isCreator,
      highScore: 0,
      coins: isCreator ? 1000000 : 0,
      ownedKnives: ['wooden'],
      ownedBgs: ['dojo'],
      ownedSnds: ['off'],
      selectedKnife: 'wooden',
      selectedBg: 'dojo',
      selectedSound: 'off',
      isImmortal: true,
      infiniteCoins: false,
      isUndeletable: isCreator,
      unlockAllAch: false,
      infiniteRecord: false,
      customKnifeColor: null,
      customBgColor: null
    };
    localStorage.setItem('juicyAccounts', JSON.stringify(accountsDB));
    currentUser = email;
    localStorage.setItem('juicyCurrentUser', currentUser);
    loadProgress(accountsDB[email]);
    pendingEmail = '';
    pendingCode = '';
    gameState = 'MENU';
    hideAuthUI();
    playSound('slice', 5);
    if (isCreator) alert(t('welcomeCreator'));
  }
}

function verifyMasterKeyAction() {
  let key = inputMasterKey.value().trim();
  if (key !== CREATOR_MASTER_KEY) {
    alert(t('wrongKey'));
    inputMasterKey.value('');
    playSound('miss');
    return;
  }
  accountsDB = JSON.parse(localStorage.getItem('juicyAccounts') || '{}');
  if (!accountsDB[CREATOR_EMAIL]) {
    accountsDB[CREATOR_EMAIL] = {
      nickname: 'Creator',
      password: btoa(CREATOR_MASTER_PASS),
      isCreator: true,
      highScore: 0,
      coins: 1000000,
      ownedKnives: ['wooden'],
      ownedBgs: ['dojo'],
      ownedSnds: ['off'],
      selectedKnife: 'wooden',
      selectedBg: 'dojo',
      selectedSound: 'off',
      isImmortal: true,
      infiniteCoins: false,
      isUndeletable: true,
      unlockAllAch: false,
      infiniteRecord: false,
      customKnifeColor: null,
      customBgColor: null
    };
    localStorage.setItem('juicyAccounts', JSON.stringify(accountsDB));
  }
  currentUser = CREATOR_EMAIL;
  localStorage.setItem('juicyCurrentUser', currentUser);
  loadProgress(accountsDB[CREATOR_EMAIL]);
  pendingCreator2FA = false;
  inputMasterKey.value('');
  gameState = 'MENU';
  hideAuthUI();
  playSound('slice', 8);
  toasts.push({ text: t('welcomeMaster'), alpha: 255, y: 100 });
}

// --- 37. SAVE / LOAD ---
function loadProgress(data) {
  highScore = data.highScore || 0;
  coins = data.coins || 0;
  ownedKnives = data.ownedKnives || ['wooden'];
  ownedBgs = data.ownedBgs || ['dojo'];
  ownedSnds = data.ownedSnds || ['off'];
  selectedKnife = data.selectedKnife || 'wooden';
  selectedBg = data.selectedBg || 'dojo';
  selectedSound = data.selectedSound || 'off';
  customKnifeColor = data.customKnifeColor
    ? color(data.customKnifeColor[0], data.customKnifeColor[1], data.customKnifeColor[2])
    : null;
  customBgColor = data.customBgColor
    ? color(data.customBgColor[0], data.customBgColor[1], data.customBgColor[2])
    : null;
  isCreatorUser = data.isCreator || false;
  isImmortal = data.isImmortal !== undefined ? data.isImmortal : true;
  infiniteCoins = data.infiniteCoins || false;
  isUndeletable = data.isUndeletable !== undefined ? data.isUndeletable : isCreatorUser;
  unlockAllAch = data.unlockAllAch || false;
  infiniteRecord = data.infiniteRecord || false;
  soundRotateTimer = 300;
  startAmbientSound();
}

function saveProgress() {
  if (isGhostMode) return;
  if (!currentUser) {
    localStorage.setItem('juicyHighScore', highScore);
    localStorage.setItem('juicyCoins', coins);
    localStorage.setItem('juicyOwnedKnives', JSON.stringify(ownedKnives));
    localStorage.setItem('juicyOwnedBgs', JSON.stringify(ownedBgs));
    localStorage.setItem('juicyOwnedSnds', JSON.stringify(ownedSnds));
    localStorage.setItem('juicySelectedKnife', selectedKnife);
    localStorage.setItem('juicySelectedBg', selectedBg);
    localStorage.setItem('juicySelectedSound', selectedSound);
    if (customKnifeColor) {
      localStorage.setItem('juicyCustomKnife',
        JSON.stringify([red(customKnifeColor), green(customKnifeColor), blue(customKnifeColor)]));
    } else {
      localStorage.removeItem('juicyCustomKnife');
    }
    if (customBgColor) {
      localStorage.setItem('juicyCustomBg',
        JSON.stringify([red(customBgColor), green(customBgColor), blue(customBgColor)]));
    } else {
      localStorage.removeItem('juicyCustomBg');
    }
    return;
  }
  accountsDB = JSON.parse(localStorage.getItem('juicyAccounts') || '{}');
  if (!accountsDB[currentUser]) return;
  accountsDB[currentUser] = {
    ...accountsDB[currentUser],
    highScore, coins, ownedKnives, ownedBgs, ownedSnds,
    selectedKnife, selectedBg, selectedSound,
    isCreator: isCreatorUser, isImmortal, infiniteCoins, isUndeletable,
    unlockAllAch, infiniteRecord,
    customKnifeColor: customKnifeColor
      ? [red(customKnifeColor), green(customKnifeColor), blue(customKnifeColor)]
      : null,
    customBgColor: customBgColor
      ? [red(customBgColor), green(customBgColor), blue(customBgColor)]
      : null
  };
  localStorage.setItem('juicyAccounts', JSON.stringify(accountsDB));
}

function loadGuestProgress() {
  highScore = parseInt(localStorage.getItem('juicyHighScore')) || 0;
  coins = parseInt(localStorage.getItem('juicyCoins')) || 0;
  ownedKnives = JSON.parse(localStorage.getItem('juicyOwnedKnives') || '["wooden"]');
  ownedBgs = JSON.parse(localStorage.getItem('juicyOwnedBgs') || '["dojo"]');
  ownedSnds = JSON.parse(localStorage.getItem('juicyOwnedSnds') || '["off"]');
  selectedKnife = localStorage.getItem('juicySelectedKnife') || 'wooden';
  selectedBg = localStorage.getItem('juicySelectedBg') || 'dojo';
  selectedSound = localStorage.getItem('juicySelectedSound') || 'off';
  let cK = JSON.parse(localStorage.getItem('juicyCustomKnife') || 'null');
  customKnifeColor = cK ? color(cK[0], cK[1], cK[2]) : null;
  let cB = JSON.parse(localStorage.getItem('juicyCustomBg') || 'null');
  customBgColor = cB ? color(cB[0], cB[1], cB[2]) : null;
  isCreatorUser = false;
  isImmortal = false;
  infiniteCoins = false;
  isUndeletable = false;
  unlockAllAch = false;
  infiniteRecord = false;
}

// --- 38. GHOST MODE ---
function enterGhostMode() {
  ghostSnapshot = {
    coins, highScore,
    ownedKnives: [...ownedKnives],
    ownedBgs: [...ownedBgs],
    ownedSnds: [...ownedSnds],
    selectedKnife, selectedBg, selectedSound,
    customKnifeColor: customKnifeColor
      ? [red(customKnifeColor), green(customKnifeColor), blue(customKnifeColor)]
      : null,
    customBgColor: customBgColor
      ? [red(customBgColor), green(customBgColor), blue(customBgColor)]
      : null
  };
  isGhostMode = true;
  resetGame();
  gameState = 'MODE_SELECT';
  playSound('slice', 1);
}

function exitGhostMode() {
  if (!isGhostMode) return;
  if (ghostSnapshot) {
    coins = ghostSnapshot.coins;
    highScore = ghostSnapshot.highScore;
    ownedKnives = ghostSnapshot.ownedKnives;
    ownedBgs = ghostSnapshot.ownedBgs;
    ownedSnds = ghostSnapshot.ownedSnds;
    selectedKnife = ghostSnapshot.selectedKnife;
    selectedBg = ghostSnapshot.selectedBg;
    selectedSound = ghostSnapshot.selectedSound;
    customKnifeColor = ghostSnapshot.customKnifeColor
      ? color(ghostSnapshot.customKnifeColor[0], ghostSnapshot.customKnifeColor[1], ghostSnapshot.customKnifeColor[2])
      : null;
    customBgColor = ghostSnapshot.customBgColor
      ? color(ghostSnapshot.customBgColor[0], ghostSnapshot.customBgColor[1], ghostSnapshot.customBgColor[2])
      : null;
  }
  ghostSnapshot = null;
  isGhostMode = false;
}

// --- AUTO FULLSCREEN (mobile: first touch turns fullscreen on) ---
(function () {
  function goFS() {
    try {
      var el = document.documentElement;
      if (el.requestFullscreen) { el.requestFullscreen().catch(function(){}); }
      else if (el.webkitRequestFullscreen) { el.webkitRequestFullscreen(); }
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(function(){});
      }
    } catch (e) {}
    document.removeEventListener('touchstart', goFS);
    document.removeEventListener('click', goFS);
  }
  document.addEventListener('touchstart', goFS);
  document.addEventListener('click', goFS);
})();
