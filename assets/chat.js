/* ==========================================================================
   Sanad — WhatsApp booking assistant (front-end only, no server)
   A guided, rule-based conversation that collects the enquiry and hands it to
   WhatsApp as a pre-filled message for +966 50 744 6780.
   ========================================================================== */
import { i18n } from './main.js';

const NUMBER = '966507446780';
const WA = `https://wa.me/${NUMBER}`;
const SKEY = 'sanad-wa-chat';
const SEEN = 'sanad-wa-seen';

const $ = (sel, root = document) => root.querySelector(sel);

/* --------------------------------------------------------------------------
   Copy
   -------------------------------------------------------------------------- */
const COPY = {
  en: {
    'wa.name': 'Sanad Booking',
    'wa.status': 'Usually replies in a few minutes',
    'wa.open': 'Chat on WhatsApp',
    'wa.ask': 'Type your answer and press send.',
    'wa.disclaimer': 'Front-end demo assistant — nothing is sent until you confirm on WhatsApp.',
    'wa.type': 'Assalamu alaikum 👋 I am the Sanad booking assistant for Jeddah. What are we celebrating? Pick the closest one.',
    'wa.s.wedding': 'Wedding',
    'wa.s.engagement': 'Engagement / qatran',
    'wa.s.corporate': 'Corporate event',
    'wa.s.exhibition': 'Exhibition / booth',
    'wa.s.social': 'Family / social',
    'wa.s.other': 'Something else',
    'wa.date': 'Great. Do you have a date yet? Type it like 12/04/2026, or tap flexible.',
    'wa.flex': 'Flexible / not decided',
    'wa.guests': 'And roughly how many guests?',
    'wa.g.1': 'Under 150',
    'wa.g.2': '150 – 400',
    'wa.g.3': '400 – 1,000',
    'wa.g.4': '1,000+',
    'wa.services': 'Which parts do you need? Tap as many as apply, then Done.',
    'wa.svc.av': 'Stage, sound & lighting',
    'wa.svc.decor': 'Décor & florals',
    'wa.svc.marquee': 'Marquee & climate',
    'wa.svc.furniture': 'Furniture & tableware',
    'wa.svc.food': 'Catering coordination',
    'wa.svc.full': 'Full planning',
    'wa.svc.done': 'Done ✓',
    'wa.city': 'Which city is it in?',
    'wa.venue': 'Venue or district? Name it, or tap below if it is not decided.',
    'wa.notdecided': 'Not decided yet',
    'wa.nameq': 'Last one — who should the producer speak to?',
    'wa.pick': 'Please tap one of the options above.',
    'wa.askAgain': 'Add a short answer and send it again.',
    'wa.echo': 'You said “{value}”',
    'wa.summary': 'Here is your enquiry, ready to send. Tap below and WhatsApp opens with everything filled in.',
    'wa.none': 'not given',
    'wa.send': 'Open WhatsApp',
    'wa.copy': 'Copy summary',
    'wa.copied': 'Copied. Paste it to +966 50 744 6780.',
    'wa.again': 'Start over',
    'wa.sent': 'WhatsApp is opening now. Send the message there and a producer picks it up — usually within one working day.',
    'wa.msg': 'New booking enquiry — Sanad Events, Jeddah',
    'wa.disclaimer2': 'Your conversation stays on this device until you send it.',
    'wa.link': 'Send this enquiry on WhatsApp'
  },
  ar: {
    'wa.name': 'حجز سند',
    'wa.status': 'يرد عادة خلال دقائق',
    'wa.open': 'محادثة واتساب',
    'wa.ask': 'اكتب إجابتك ثم اضغط إرسال.',
    'wa.disclaimer': 'مساعد تجريبي يعمل داخل المتصفح فقط — لا يُرسل شيء حتى تؤكد على واتساب.',
    'wa.type': 'وعليكم السلام 👋 أنا مساعد الحجز في سند بجدة. ما المناسبة؟ اختر الأقرب.',
    'wa.s.wedding': 'زفاف',
    'wa.s.engagement': 'خطوبة / قترة',
    'wa.s.corporate': 'مناسبة شركات',
    'wa.s.exhibition': 'معرض / جناح',
    'wa.s.social': 'مناسبة عائلية',
    'wa.s.other': 'شيء آخر',
    'wa.date': 'ممتاز. هل لديك تاريخ؟ اكتبه مثل 12/04/2026، أو اضبط «مرن».',
    'wa.flex': 'مرن / لم يُحسم',
    'wa.guests': 'وكم عدد الضيوف تقريبًا؟',
    'wa.g.1': 'أقل من ١٥٠',
    'wa.g.2': '١٥٠ – ٤٠٠',
    'wa.g.3': '٤٠٠ – ١٠٠٠',
    'wa.g.4': 'أكثر من ١٠٠٠',
    'wa.services': 'ما الأقسام التي تحتاجها؟ اضغط أكثر من واحد ثم «تم».',
    'wa.svc.av': 'منصة وصوت وإضاءة',
    'wa.svc.decor': 'ديكور وزهور',
    'wa.svc.marquee': 'خيام وتكييف',
    'wa.svc.furniture': 'أثاث ومأداة',
    'wa.svc.food': 'تنسيق الضيافة',
    'wa.svc.full': 'تخطيط كامل',
    'wa.svc.done': 'تم ✓',
    'wa.city': 'في أي مدينة؟',
    'wa.venue': 'الموقع أو الحي؟ اكتبه، أو اضغط بالأسفل إن لم يُحسم.',
    'wa.notdecided': 'لم يُحسم بعد',
    'wa.nameq': 'آخر سؤال — مع من يتكلم المنتج؟',
    'wa.pick': 'يرجى الضغط على أحد الخيارات أعلاه.',
    'wa.askAgain': 'اكتب إجابة قصيرة وأرسلها مرة أخرى.',
    'wa.echo': 'كتبت «{value}»',
    'wa.summary': 'هذا طلبك جاهز للإرسال. اضغط بالأسفل وسيفتح واتساب وكل البيانات مكتوبة.',
    'wa.none': 'غير محدد',
    'wa.send': 'افتح واتساب',
    'wa.copy': 'انسخ الملخص',
    'wa.copied': 'تم النسخ. أرسله إلى ٠٥٠٧٤٤٦٧٨٠.',
    'wa.again': 'ابدأ من جديد',
    'wa.sent': 'يفتح واتساب الآن. أرسل الرسالة هناك ويلتقطها أحد المنتجات — عادة خلال يوم عمل واحد.',
    'wa.msg': 'طلب حجز جديد — سند للفعاليات، جدة',
    'wa.disclaimer2': 'محادثتك تبقى على هذا الجهاز حتى ترسلها.',
    'wa.link': 'أرسل هذا الطلب على واتساب'
  }
};

i18n.register(COPY);
const t = (key) => i18n.label(key);
const text = (key, vars = {}) => String(t(key)).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');

/* --------------------------------------------------------------------------
   Flow definition
   -------------------------------------------------------------------------- */
const STEPS = {
  type: {
    prompt: 'wa.type',
    chips: [
      { key: 'wa.s.wedding', set: 'type', value: 'wedding' },
      { key: 'wa.s.engagement', set: 'type', value: 'engagement' },
      { key: 'wa.s.corporate', set: 'type', value: 'corporate' },
      { key: 'wa.s.exhibition', set: 'type', value: 'exhibition' },
      { key: 'wa.s.social', set: 'type', value: 'social' },
      { key: 'wa.s.other', set: 'type', value: 'other' }
    ],
    next: 'date'
  },
  date: { prompt: 'wa.date', input: 'text', set: 'date', skip: { key: 'wa.flex', value: 'Flexible / not decided' }, next: 'guests' },
  guests: {
    prompt: 'wa.guests',
    chips: [
      { key: 'wa.g.1', set: 'guests', value: 'Under 150' },
      { key: 'wa.g.2', set: 'guests', value: '150 – 400' },
      { key: 'wa.g.3', set: 'guests', value: '400 – 1,000' },
      { key: 'wa.g.4', set: 'guests', value: '1,000+' }
    ],
    next: 'services'
  },
  services: {
    prompt: 'wa.services',
    multi: true,
    options: ['av', 'decor', 'marquee', 'furniture', 'food', 'full'],
    done: 'wa.svc.done',
    next: 'city'
  },
  city: {
    prompt: 'wa.city',
    chips: [
      { key: 'v.city.jeddah', set: 'city', value: 'Jeddah' },
      { key: 'v.city.makkah', set: 'city', value: 'Makkah' },
      { key: 'v.city.dammam', set: 'city', value: 'Dammam' },
      { key: 'v.city.riyadh', set: 'city', value: 'Riyadh' },
      { key: 'v.city.other', set: 'city', value: 'Elsewhere in the KSA' }
    ],
    next: 'venue'
  },
  venue: { prompt: 'wa.venue', input: 'text', optional: true, set: 'venue', skip: { key: 'wa.notdecided', value: 'Not decided' }, next: 'name' },
  name: { prompt: 'wa.nameq', input: 'text', set: 'name', next: 'summary' }
};

const TYPE_LABEL = {
  wedding: 'wa.s.wedding',
  engagement: 'wa.s.engagement',
  corporate: 'wa.s.corporate',
  exhibition: 'wa.s.exhibition',
  social: 'wa.s.social',
  other: 'wa.s.other'
};

const ar = () => document.documentElement.lang === 'ar';

/* --------------------------------------------------------------------------
   Persistence
   -------------------------------------------------------------------------- */
const state = { step: 'type', data: {}, log: [], open: false };

const save = () => {
  try {
    localStorage.setItem(SKEY, JSON.stringify({ step: state.step, data: state.data, log: state.log.slice(-40) }));
  } catch {
    /* private mode */
  }
};
const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(SKEY) || 'null');
    if (saved && saved.step) {
      state.step = saved.step;
      state.data = saved.data || {};
      state.log = Array.isArray(saved.log) ? saved.log : [];
    }
  } catch {
    /* ignore */
  }
};
const wipe = () => {
  state.step = 'type';
  state.data = {};
  state.log = [];
  try {
    localStorage.removeItem(SKEY);
  } catch {
    /* ignore */
  }
};

/* --------------------------------------------------------------------------
   Message payload for WhatsApp
   -------------------------------------------------------------------------- */
const message = () => {
  const d = state.data;
  const svc = d.services && d.services.length ? d.services.map((s) => t(`wa.svc.${s}`)).join(ar() ? '، ' : ', ') : t('wa.none');
  const type = d.type ? t(TYPE_LABEL[d.type]) : t('wa.none');
  return ar()
    ? [
        `📩 ${t('wa.msg')}`,
        `• المناسبة: ${type}`,
        `• التاريخ: ${d.date || t('wa.none')}`,
        `• الضيوف: ${d.guests || t('wa.none')}`,
        `• الخدمات: ${svc}`,
        `• المدينة: ${d.city || t('wa.none')}`,
        `• الموقع: ${d.venue || t('wa.none')}`,
        `• الاسم: ${d.name || t('wa.none')}`,
        `• المصدر: sanad.events`
      ].join('\n')
    : [
        `📩 ${t('wa.msg')}`,
        `• Event: ${type}`,
        `• Date: ${d.date || t('wa.none')}`,
        `• Guests: ${d.guests || t('wa.none')}`,
        `• Services: ${svc}`,
        `• City: ${d.city || t('wa.none')}`,
        `• Venue: ${d.venue || t('wa.none')}`,
        `• Name: ${d.name || t('wa.none')}`,
        `• Source: sanad.events`
      ].join('\n');
};

const waLink = () => `${WA}?text=${encodeURIComponent(message())}`;

/* --------------------------------------------------------------------------
   Markup
   -------------------------------------------------------------------------- */
const ICONS = {
  whatsapp:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22.5l5.86-1.53a9.8 9.8 0 0 0 4.18.94h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.76 9.76 0 0 0 12.04 2Zm0 17.94h-.01a8.2 8.2 0 0 1-4.16-1.13l-.3-.18-3.08.8.83-3-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.23 8.19Zm4.5-6.13c-.25-.13-1.47-.72-1.7-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.25-.12-1.05-.38-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.01 0 1.19.86 2.33.98 2.5.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/></svg>',
  send: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 20.5 21 12 3 3.5 3 10l12 2-12 2z"/></svg>',
  restart: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M20 12a8 8 0 1 1-2.4-5.8M20 4v4h-4"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></svg>',
  chev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>'
};

const root = document.createElement('div');
root.className = 'wa';
root.dataset.wa = '';
root.innerHTML = `
  <span class="wa__scrim" data-wa-scrim hidden aria-hidden="true"></span>

  <button type="button" class="wa__fab" data-wa-toggle aria-expanded="false" aria-controls="wa-panel" data-i18n-aria="wa.open">
    <span class="wa__icon">${ICONS.whatsapp}</span>
    <span class="wa__dot" aria-hidden="true"></span>
    <span class="wa__tip">
      <strong data-i18n="wa.open">Chat on WhatsApp</strong>
      <small data-i18n="wa.status">Usually replies in a few minutes</small>
    </span>
  </button>

  <section class="wa__panel" data-wa-panel role="dialog" aria-modal="false" aria-labelledby="wa-title" hidden>
    <header class="wa__head">
      <span class="wa__avatar" aria-hidden="true">${ICONS.whatsapp}</span>
      <span class="wa__headtext">
        <strong id="wa-title" data-i18n="wa.name">Sanad Booking</strong>
        <small data-i18n="wa.status">Usually replies in a few minutes</small>
      </span>
      <button type="button" class="wa__iconbtn" data-wa-restart data-i18n-aria="wa.again">${ICONS.restart}</button>
      <button type="button" class="wa__iconbtn" data-wa-close data-i18n-aria="wa.close">${ICONS.close}</button>
    </header>

    <div class="wa__log" data-wa-log role="log" aria-live="polite" aria-relevant="additions text"></div>
    <div class="wa__chips" data-wa-chips></div>

    <form class="wa__composer" data-wa-form>
      <label class="sr-only" for="wa-input" data-i18n="wa.ask">Type your answer</label>
      <input id="wa-input" class="wa__input" data-wa-input type="text" autocomplete="off" enterkeyhint="send" maxlength="140">
      <button type="submit" class="wa__send" data-i18n-aria="wa.send">${ICONS.send}</button>
    </form>

    <p class="wa__foot"><span data-i18n="wa.disclaimer">Front-end assistant.</span> <span data-i18n="wa.disclaimer2">Nothing leaves this device until you send.</span></p>
  </section>`;

document.body.append(root);
// the widget was created after the last i18n pass — translate it now
i18n.apply(document.documentElement.lang === 'ar' ? 'ar' : 'en');

const logEl = $('[data-wa-log]', root);
const chipsEl = $('[data-wa-chips]', root);
const panel = $('[data-wa-panel]', root);
const fab = $('[data-wa-toggle]', root);
const inputEl = $('[data-wa-input]', root);
const formEl = $('[data-wa-form]', root);

/* --------------------------------------------------------------------------
   Rendering
   -------------------------------------------------------------------------- */
const scroll = () => {
  logEl.scrollTop = logEl.scrollHeight;
};

const bubble = (entry) => {
  if (entry.key === '__summary') {
    const card = document.createElement('div');
    card.className = 'wa__card';
    card.textContent = message();
    return card;
  }
  if (entry.key === '__link') {
    const a = document.createElement('a');
    a.className = 'wa__linkout';
    a.href = waLink();
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = `${t('wa.link')} ↗`;
    return a;
  }
  const el = document.createElement('div');
  el.className = `wa__msg wa__msg--${entry.who}`;
  el.textContent = text(entry.key, entry.vars);
  return el;
};

const push = (who, key, vars) => {
  state.log.push({ who, key, vars: vars || {} });
  save();
  render();
};

const typingBubble = () => {
  const el = document.createElement('div');
  el.className = 'wa__msg wa__msg--bot wa__typing';
  el.dataset.typing = '';
  el.innerHTML = '<i></i><i></i><i></i>';
  logEl.append(el);
  scroll();
  return el;
};

const chip = (labelKey, onClick, cls = '') => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = `wa__chip ${cls}`.trim();
  b.textContent = t(labelKey);
  b.addEventListener('click', onClick);
  chipsEl.append(b);
  return b;
};

const renderChips = () => {
  chipsEl.replaceChildren();
  if (state.step === 'summary') {
    chip('wa.send', openWhatsApp, 'wa__chip--go');
    chip('wa.copy', copySummary);
    chip('wa.again', restart);
    return;
  }
  const step = STEPS[state.step];
  if (!step) return;

  if (step.multi) {
    const picked = state.data.services || [];
    picked.forEach((value) =>
      chip(`wa.svc.${value}`, () => {
        state.data.services = picked.filter((s) => s !== value);
        push('user', `wa.svc.${value}`);
        renderChips();
      }, 'wa__chip--on')
    );
    step.options
      .filter((value) => !picked.includes(value))
      .forEach((value) =>
        chip(`wa.svc.${value}`, () => {
          state.data.services = [...picked, value];
          push('user', `wa.svc.${value}`);
          renderChips();
        })
      );
    chip(step.done, () => advance(), 'wa__chip--done');
    return;
  }

  if (step.chips) {
    step.chips.forEach((option) =>
      chip(option.key, () => {
        state.data[option.set] = option.value;
        push('user', option.key);
        advance();
      })
    );
  }
  if (step.skip) {
    chip(step.skip.key, () => {
      state.data[step.set] = step.skip.value;
      push('user', step.skip.key);
      advance();
    }, 'wa__chip--skip');
  }
};

const render = () => {
  logEl.replaceChildren(...state.log.map(bubble));
  renderChips();
  scroll();
};

/* --------------------------------------------------------------------------
   Conversation control
   -------------------------------------------------------------------------- */
let timer = 0;

const advance = () => {
  const step = STEPS[state.step];
  state.step = step ? step.next : 'summary';
  save();
  if (state.step === 'summary') {
    state.log.push({ who: 'bot', key: '__summary', vars: {} });
    save();
    render();
    return;
  }
  const dot = typingBubble();
  clearTimeout(timer);
  timer = setTimeout(() => {
    dot.remove();
    push('bot', STEPS[state.step].prompt);
  }, 640);
};

const start = () => {
  wipe();
  state.log.push({ who: 'bot', key: 'wa.type', vars: {} });
  save();
  render();
};

const answer = (value) => {
  const step = STEPS[state.step];
  if (!step || !step.input) {
    push('bot', 'wa.pick');
    return;
  }
  const clean = value.trim();
  if (!clean && !step.optional) {
    push('bot', 'wa.askAgain');
    return;
  }
  state.data[step.set] = clean || t('wa.none');
  push('user', 'wa.echo', { value: clean || t('wa.none') });
  advance();
};

const openWhatsApp = () => {
  state.log.push({ who: 'bot', key: 'wa.sent', vars: {} });
  state.log.push({ who: 'user', key: '__link', vars: {} });
  save();
  render();
  window.open(waLink(), '_blank', 'noopener');
};

const copySummary = async () => {
  const body = message();
  try {
    await navigator.clipboard.writeText(body);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = body;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.append(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  push('bot', 'wa.copied');
};

const restart = () => {
  start();
};

/* --------------------------------------------------------------------------
   Open / close
   -------------------------------------------------------------------------- */
const scrim = $('[data-wa-scrim]', root);

/* Keep the widget above the on-screen keyboard and fully visible.
   visualViewport is the only reliable way: 100dvh does not account for the keyboard. */
const vv = window.visualViewport;

const syncViewport = () => {
  if (!vv) return;
  const keyboard = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
  root.style.setProperty('--vvh', `${Math.round(vv.height)}px`);
  root.style.setProperty('--kb', `${keyboard}px`);
  root.classList.toggle('is-kb', keyboard > 120 && state.open);
  // keep the newest message in sight without scrolling the page itself
  if (state.open) logEl.scrollTop = logEl.scrollHeight;
};

const open = () => {
  state.open = true;
  panel.hidden = false;
  scrim.hidden = false;
  fab.setAttribute('aria-expanded', 'true');
  root.classList.add('is-open');
  root.classList.remove('has-dot');
  requestAnimationFrame(() => root.classList.add('is-in'));
  window.setTimeout(() => {
    inputEl.focus({ preventScroll: true });
    logEl.scrollTop = logEl.scrollHeight;
    syncViewport();
  }, 200);
};

const close = () => {
  state.open = false;
  root.classList.remove('is-in');
  fab.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => {
    panel.hidden = true;
    scrim.hidden = true;
    root.classList.remove('is-kb');
  }, 300);
  fab.focus();
};

fab.addEventListener('click', () => (state.open ? close() : open()));
$('[data-wa-close]', root).addEventListener('click', close);
scrim.addEventListener('click', close);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.open) close();
});
let lastY = window.scrollY;
window.addEventListener(
  'scroll',
  () => {
    const compact = window.scrollY > 320 && window.scrollY > lastY + 4;
    root.classList.toggle('is-compact', compact || window.scrollY > 900);
    lastY = window.scrollY;
  },
  { passive: true }
);
$('[data-wa-restart]', root).addEventListener('click', restart);
document.querySelectorAll('[data-wa-open]').forEach((btn) =>
  btn.addEventListener('click', () => {
    if (!state.log.length) start();
    open();
  })
);
if (vv) {
  vv.addEventListener('resize', syncViewport);
  vv.addEventListener('scroll', syncViewport);
  syncViewport();
}
inputEl.addEventListener('focus', () => window.setTimeout(syncViewport, 250));
inputEl.addEventListener('blur', () => window.setTimeout(syncViewport, 120));

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = inputEl.value;
  inputEl.value = '';
  if (!value.trim()) return;
  answer(value);
});

/* --------------------------------------------------------------------------
   Language + boot
   -------------------------------------------------------------------------- */
document.addEventListener('sanad:lang', () => render());

try {
  if (!sessionStorage.getItem(SEEN)) root.classList.add('has-dot');
} catch {
  /* storage blocked */
}

load();
if (state.log.length) render();
else start();

if (window.matchMedia('(min-width: 64rem) and (prefers-reduced-motion: no-preference)').matches) {
  try {
    if (!sessionStorage.getItem(SEEN)) {
      sessionStorage.setItem(SEEN, '1');
      window.setTimeout(() => {
        root.classList.add('is-nudge');
        window.setTimeout(() => root.classList.remove('is-nudge'), 9000);
      }, 6000);
    }
  } catch {
    /* storage blocked — skip the nudge */
  }
}
