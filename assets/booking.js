/* ==========================================================================
   Sanad — booking wizard
   Multi-step enquiry form: validation, live estimate, draft, confirmation.
   ========================================================================== */
import { i18n } from './main.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const KEY = 'sanad-draft';
const BOOKINGS = 'sanad-bookings';

const money = (n) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.max(Math.round(n), 0));

const todayISO = () => new Date().toISOString().slice(0, 10);

/* --------------------------------------------------------------------------
   Copy
   -------------------------------------------------------------------------- */
const COPY = {
  en: {
    'bk.eyebrow': 'Booking form · 4 minutes · no obligation',
    'bk.title': 'Book Sanad',
    'bk.lede': 'Six short steps. The cost range on the right updates as you type, so you leave with a working number even before we reply. Nothing is confirmed until a producer signs the production sheet.',
    'bk.f1': 'Working day reply',
    'bk.f2': 'Written quote',
    'bk.f3': 'Working days to concept',
    'bk.f4': 'Obligation to book',
    'bk.s1': 'Basics',
    'bk.s2': 'Date &amp; venue',
    'bk.s3': 'Services',
    'bk.s4': 'Contact',
    'bk.s5': 'Review',
    'bk.draft': 'Draft restored from this device.',
    'bk.p1.t': 'The basics',
    'bk.p1.h': 'What are we producing, and how big is it?',
    'bk.p2.t': 'Date &amp; venue',
    'bk.p2.h': 'Peak dates go months ahead. Inside 21 days we still try, but the duty producer has to confirm.',
    'bk.p3.t': 'Services &amp; supplies',
    'bk.p3.h': 'Tick what you know you want. Leave the rest blank and we will propose it.',
    'bk.p4.t': 'Who are we talking to?',
    'bk.p4.h': 'One producer answers you directly. No call centre, no auto-reply chain.',
    'bk.p5.t': 'Check and send',
    'bk.p5.h': 'One last read. Use the edit links if anything moved.',
    'bk.f.type': 'Event type',
    'bk.t.wedding': 'Wedding',
    'bk.t.engagement': 'Engagement / qatran',
    'bk.t.corporate': 'Corporate',
    'bk.t.exhibition': 'Exhibition / booth',
    'bk.t.social': 'Social / family',
    'bk.t.conference': 'Conference',
    'bk.f.title': 'Occasion or company name',
    'bk.f.titleh': 'Whatever you would like printed on the production sheet.',
    'bk.f.package': 'Package',
    'bk.f.guests': 'Expected guests',
    'bk.f.brief': 'What is the occasion about?',
    'bk.f.chars': 'Characters',
    'bk.f.date': 'Event date',
    'bk.f.flex': 'Date flexibility',
    'bk.f.f1': 'Fixed date',
    'bk.f.f2': '± 3 days',
    'bk.f.f3': 'Any weekend that month',
    'bk.f.f4': 'Just the month',
    'bk.f.start': 'Guest arrival',
    'bk.f.end': 'Wrap-up',
    'bk.f.city': 'City',
    'bk.f.other': 'Other',
    'bk.f.venue': 'Venue',
    'bk.f.vtype': 'Venue type',
    'bk.f.v1': 'Hotel ballroom',
    'bk.f.v2': 'Villa / compound',
    'bk.f.v3': 'Open field / beach',
    'bk.f.v4': 'Warehouse / industrial',
    'bk.f.v5': 'Expo or conference centre',
    'bk.f.v6': 'Restaurant / lounge',
    'bk.f.v7': 'Still deciding',
    'bk.f.setting': 'Setting',
    'bk.f.s1': 'Indoor',
    'bk.f.s2': 'Outdoor',
    'bk.f.s3': 'Both / covered',
    'bk.f.budget': 'Budget band for production',
    'bk.f.b1': 'Under SAR 25,000',
    'bk.f.b2': 'SAR 25,000 – 60,000',
    'bk.f.b3': 'SAR 60,000 – 120,000',
    'bk.f.b4': 'SAR 120,000 – 300,000',
    'bk.f.b5': 'SAR 300,000+',
    'bk.f.b6': 'Not sure yet',
    'bk.f.budgeth': 'A range is fine. We tell you honestly whether the idea fits inside it.',
    'bk.f.services': 'Core services',
    'bk.svc.planning': 'Full planning &amp; production',
    'bk.svc.planningm': 'Concept to strike',
    'bk.svc.decor': 'Décor, floral &amp; styling',
    'bk.svc.decorm': 'Backdrops, tables, lounge',
    'bk.svc.av': 'Stage, sound &amp; lighting',
    'bk.svc.avm': 'Show control, PA, truss',
    'bk.svc.marquee': 'Marquee &amp; climate',
    'bk.svc.marqueem': 'Clear-span, cooling, power',
    'bk.svc.furniture': 'Furniture &amp; tableware supply',
    'bk.svc.furniturem': 'Chairs, linen, glassware',
    'bk.svc.catering': 'Catering coordination',
    'bk.svc.cateringm': 'Timings, cold chain, service',
    'bk.svc.staffing': 'Staffing &amp; hospitality',
    'bk.svc.staffingm': 'SAR 12 per guest',
    'bk.svc.exhibition': 'Exhibition or booth build',
    'bk.svc.exhibitionm': 'Design, build, crate, install',
    'bk.f.qty': 'Quantities you already know',
    'bk.f.chairs': 'Chairs',
    'bk.f.tables': 'Tables',
    'bk.f.marquee': 'Marquee m²',
    'bk.f.extras': 'Optional extras',
    'bk.x.photo': 'Photography coordination',
    'bk.x.valet': 'Valet &amp; parking',
    'bk.x.security': 'Security liaison',
    'bk.x.transport': 'Guest transport',
    'bk.x.stream': 'Livestream &amp; hybrid AV',
    'bk.x.translate': 'Translation &amp; hosting',
    'bk.f.notes': 'Anything else we should know?',
    'bk.f.name': 'Full name',
    'bk.f.role': 'Role',
    'bk.f.company': 'Company or family name',
    'bk.f.email': 'Email',
    'bk.f.phone': 'Mobile (Saudi)',
    'bk.f.pref': 'Preferred contact',
    'bk.f.call': 'Phone call',
    'bk.f.source': 'How did you hear about us?',
    'bk.f.s1': 'Google / search',
    'bk.f.s2': 'Instagram',
    'bk.f.s3': 'LinkedIn',
    'bk.f.s4': 'Referral by a client',
    'bk.f.s5': 'Venue recommendation',
    'bk.f.s6': 'Other',
    'bk.f.consent': 'I agree that Sanad may contact me about this enquiry, and that my details are stored only to answer it.',
    'bk.f.confirm': 'Everything above is correct. I understand this is an enquiry, not a confirmed booking.',
    'bk.notice.t': 'What happens after you send',
    'bk.notice1': 'A producer calls or messages you within one working day.',
    'bk.notice2': 'We check the date, the venue access window and the crew calendar.',
    'bk.notice3': 'You get a written proposal with a supplier-by-supplier budget.',
    'bk.notice4': '25% of the total books the date once you approve it.',
    'bk.step': 'Step',
    'bk.back': 'Back',
    'bk.clear': 'Clear form',
    'bk.clear-confirm': 'Clear all your answers? The draft on this device will be lost.',
    'bk.next': 'Continue',
    'bk.send': 'Send enquiry',
    'done.t': 'Enquiry received',
    'done.ref': 'Reference',
    'done.home': 'Back to the site',
    'done.again': 'Book another date',
    'sum.t': 'Your enquiry',
    'sum.live': 'live',
    'sum.range': 'Working range',
    'sum.note': 'Indicative only, excludes VAT and third-party fees. Your written proposal is the binding number.',
    'sum.urg': 'Need it faster?',
    'sum.bot': 'Chat the booking assistant',
    'sum.urgd': 'Dates inside 21 days are usually possible — call the duty producer instead of waiting for the form.',
    'sum.qt': 'Rawan A. · wedding, 620 guests',
    'sum.l.event': 'Event',
    'sum.l.date': 'Date',
    'sum.l.guests': 'Guests',
    'sum.l.package': 'Package',
    'sum.l.services': 'Services',
    'sum.l.extras': 'Extras',
    'sum.l.venue': 'Venue',
    'sum.l.contact': 'Contact',
    'sum.none': 'Nothing yet',
    'v.none': '—',
    'v.yes': 'Yes',
    'v.signature': 'Signature',
    'v.royal': 'Royal',
    'v.bespoke': 'Bespoke',
    'v.supply': 'Supply only',
    'v.type.wedding': 'Wedding',
    'v.type.engagement': 'Engagement / qatran',
    'v.type.corporate': 'Corporate',
    'v.type.exhibition': 'Exhibition / booth',
    'v.type.social': 'Social / family',
    'v.type.conference': 'Conference',
    'v.city.jeddah': 'Jeddah',
    'v.city.makkah': 'Makkah',
    'v.city.dammam': 'Dammam',
    'v.city.riyadh': 'Riyadh',
    'v.city.other': 'Elsewhere in the KSA',
    'v.venue.hotel': 'Hotel ballroom',
    'v.venue.villa': 'Villa / compound',
    'v.venue.outdoor': 'Open field / beach',
    'v.venue.industrial': 'Warehouse / industrial',
    'v.venue.expo': 'Expo or conference centre',
    'v.venue.restaurant': 'Restaurant / lounge',
    'v.venue.undecided': 'Still deciding',
    'v.setting.indoor': 'Indoor',
    'v.setting.outdoor': 'Outdoor',
    'v.setting.mixed': 'Both / covered',
    'v.flex.fixed': 'Fixed date',
    'v.flex.plusminus': '± 3 days',
    'v.flex.week': 'Any weekend that month',
    'v.flex.month': 'Just the month',
    'v.budget.under25': 'Under SAR 25,000',
    'v.budget.25-60': 'SAR 25,000 – 60,000',
    'v.budget.60-120': 'SAR 60,000 – 120,000',
    'v.budget.120-300': 'SAR 120,000 – 300,000',
    'v.budget.300plus': 'SAR 300,000+',
    'v.budget.unsure': 'Not sure yet',
    'v.source.search': 'Google / search',
    'v.source.instagram': 'Instagram',
    'v.source.linkedin': 'LinkedIn',
    'v.source.referral': 'Referral by a client',
    'v.source.venue': 'Venue recommendation',
    'v.source.other': 'Other',
    'v.pref.whatsapp': 'WhatsApp',
    'v.pref.email': 'Email',
    'v.pref.call': 'Phone call',
    'v.svc.planning': 'Full planning &amp; production',
    'v.svc.decor': 'Décor, floral &amp; styling',
    'v.svc.av': 'Stage, sound &amp; lighting',
    'v.svc.marquee': 'Marquee &amp; climate',
    'v.svc.furniture': 'Furniture &amp; tableware supply',
    'v.svc.catering': 'Catering coordination',
    'v.svc.staffing': 'Staffing &amp; hospitality',
    'v.svc.exhibition': 'Exhibition or booth build',
    'v.x.photography': 'Photography coordination',
    'v.x.valet': 'Valet &amp; parking',
    'v.x.security': 'Security liaison',
    'v.x.transport': 'Guest transport',
    'v.x.livestream': 'Livestream &amp; hybrid AV',
    'v.x.translation': 'Translation &amp; hosting',
    'r.brief': 'Brief',
    'r.notes': 'Notes',
    'r.qty': 'Quantities',
    'r.budget': 'Budget band',
    'r.flex': 'Flexibility',
    'r.tight': 'Tight timeline — our duty producer will confirm feasibility.',
    'err.required': 'This one is needed to move forward.',
    'err.email': 'Check the email address — it looks incomplete.',
    'err.phone': 'Use a Saudi mobile: 05XXXXXXXX or +9665XXXXXXXX.',
    'err.past': 'That date has already passed.',
    'err.end': 'Wrap-up has to be after guest arrival.',
    'err.guests': 'Between 10 and 4,000 guests, please.',
    'err.services': 'Choose at least one service.',
    'err.consent': 'We need your consent before we can reply.',
    'err.confirm': 'Please confirm the details are correct.',
    'err.title': 'Give the occasion a name.'
  },

  ar: {
    'bk.eyebrow': 'نموذج الحجز · ٤ دقائق · بلا التزام',
    'bk.title': 'احجز سند',
    'bk.lede': 'ست خطوات قصيرة. مدى التكلفة على اليمين يتحدث معك أثناء الكتابة، فتخرج برقم أولي قبل أن نرد. ولا شيء يُعتبر مؤكدًا قبل أن يوقّع المنتج ورقة الإنتاج.',
    'bk.f1': 'رد خلال يوم عمل',
    'bk.f2': 'عرض سعر مكتوب',
    'bk.f3': 'أيام عمل للفكرة',
    'bk.f4': 'التزام بالحجز',
    'bk.s1': 'الأساسيات',
    'bk.s2': 'التاريخ والموقع',
    'bk.s3': 'الخدمات',
    'bk.s4': 'بياناتك',
    'bk.s5': 'المراجعة',
    'bk.draft': 'استعدنا مسودة محفوظة على هذا الجهاز.',
    'bk.p1.t': 'الأساسيات',
    'bk.p1.h': 'ماذا ننتج، وكم حجم المناسبة؟',
    'bk.p2.t': 'التاريخ والموقع',
    'bk.p2.h': 'تواريخ الذروة تُحجز قبل أشهر. وقبل ٢١ يومًا نحاول، لكن على منتج المناوبة أن يؤكد.',
    'bk.p3.t': 'الخدمات والتجهيزات',
    'bk.p3.h': ' ضع علامة على ما تعرف أنك تريده، واترك الباقي لنا نقترحه.',
    'bk.p4.t': 'مع من نتحدث؟',
    'bk.p4.h': 'منتج واحد يرد عليك مباشرة. بلا مركز اتصال ولا سلسلة ردود آلية.',
    'bk.p5.t': 'راجع وأرسل',
    'bk.p5.h': 'قراءة أخيرة. استعمل روابط التعديل إن تغيّر شيء.',
    'bk.f.type': 'نوع المناسبة',
    'bk.t.wedding': 'زفاف',
    'bk.t.engagement': 'خطوبة / قترة',
    'bk.t.corporate': 'مناسبة شركات',
    'bk.t.exhibition': 'معرض / جناح',
    'bk.t.social': 'مناسبة عائلية',
    'bk.t.conference': 'مؤتمر',
    'bk.f.title': 'اسم المناسبة أو الشركة',
    'bk.f.titleh': 'الاسم الذي تريده على ورقة الإنتاج.',
    'bk.f.package': 'الباقة',
    'bk.f.guests': 'عدد الضيوف المتوقع',
    'bk.f.brief': 'عمّ المناسبة باختصار؟',
    'bk.f.chars': 'الأحرف',
    'bk.f.date': 'تاريخ المناسبة',
    'bk.f.flex': 'مرونة التاريخ',
    'bk.f.f1': 'تاريخ محدد',
    'bk.f.f2': '± ٣ أيام',
    'bk.f.f3': 'أي عطلة نهاية أسبوع في الشهر',
    'bk.f.f4': 'الشهر فقط',
    'bk.f.start': 'وصول الضيوف',
    'bk.f.end': 'نهاية الجلسة',
    'bk.f.city': 'المدينة',
    'bk.f.other': 'مدينة أخرى',
    'bk.f.venue': 'الموقع',
    'bk.f.vtype': 'نوع الموقع',
    'bk.f.v1': 'قاعة فندق',
    'bk.f.v2': 'فيلا أوcompound مجمع',
    'bk.f.v3': 'مفتوح أو شاطئ',
    'bk.f.v4': 'مستودع أو مبنى صناعي',
    'bk.f.v5': 'مركز معارض أو مؤتمرات',
    'bk.f.v6': 'مطعم أو صالة',
    'bk.f.v7': 'لم يُحسم بعد',
    'bk.f.setting': 'الطبيعة',
    'bk.f.s1': 'داخلي',
    'bk.f.s2': 'خارجي',
    'bk.f.s3': 'مكسوّ أو الاثنان',
    'bk.f.budget': 'شريحة ميزانية الإنتاج',
    'bk.f.b1': 'أقل من ٢٥٠٠٠ ريال',
    'bk.f.b2': '٢٥٠٠٠ – ٦٠٠٠٠ ريال',
    'bk.f.b3': '٦٠٠٠٠ – ١٢٠٠٠٠ ريال',
    'bk.f.b4': '١٢٠٠٠٠ – ٣٠٠٠٠٠ ريال',
    'bk.f.b5': 'أكثر من ٣٠٠٠٠٠ ريال',
    'bk.f.b6': 'غير متأكد بعد',
    'bk.f.budgeth': 'اكتب مجالًا. ونخبرك بصراحة إن كانت الفكرة Within حدوده.',
    'bk.f.services': 'الخدمات الأساسية',
    'bk.svc.planning': 'تخطيط وإنتاج كاملان',
    'bk.svc.planningm': 'من الفكرة حتى الفك',
    'bk.svc.decor': 'ديكور وزهور وتنسيق',
    'bk.svc.decorm': 'خلفيات وطاولات وجلسات',
    'bk.svc.av': 'منصة وصوت وإضاءة',
    'bk.svc.avm': 'تحكم بالعرض وتراص وصوت',
    'bk.svc.marquee': 'خيام وتكييف',
    'bk.svc.marqueem': 'بلا أعمدة وتبريد وكهرباء',
    'bk.svc.furniture': 'تجهيز أثاث ومأداة',
    'bk.svc.furniturem': 'كراسي وأقمشة وكؤوس',
    'bk.svc.catering': 'تنسيق الضيافة',
    'bk.svc.cateringm': 'توقيت وسلسلة تبريد وخدمة',
    'bk.svc.staffing': 'طاقم وضيافة',
    'bk.svc.staffingm': '١٢ ريالًا للضيف',
    'bk.svc.exhibition': 'بناء معرض أو جناح',
    'bk.svc.exhibitionm': 'تصميم وبناء وشحن وتركيب',
    'bk.f.qty': 'الكميات التي تعرفها',
    'bk.f.chairs': 'كراسي',
    'bk.f.tables': 'طاولات',
    'bk.f.marquee': 'م² خيمة',
    'bk.f.extras': 'إضافات اختيارية',
    'bk.x.photo': 'تنسيق التصوير',
    'bk.x.valet': 'خدمة مواقف',
    'bk.x.security': 'منسق أمني',
    'bk.x.transport': 'نقل الضيوف',
    'bk.x.stream': 'بث مباشر وتقنية هجينة',
    'bk.x.translate': 'ترجمة واستضافة',
    'bk.f.notes': 'أي شيء آخر يجب أن نعرفه؟',
    'bk.f.name': 'الاسم الكامل',
    'bk.f.role': 'الصفة',
    'bk.f.company': 'اسم الشركة أو العائلة',
    'bk.f.email': 'البريد الإلكتروني',
    'bk.f.phone': 'الجوال (سعودي)',
    'bk.f.pref': 'طريقة التواصل المفضلة',
    'bk.f.call': 'مكالمة هاتفية',
    'bk.f.source': 'كيف وصلت إلينا؟',
    'bk.f.s1': 'بحث جوجل',
    'bk.f.s2': 'إنستقرام',
    'bk.f.s3': 'لينكدإن',
    'bk.f.s4': 'ترشيح من عميل',
    'bk.f.s5': 'ترشيح من الموقع',
    'bk.f.s6': 'أخرى',
    'bk.f.consent': 'أوافق على تواصل سند معي بخصوص هذا الطلب، وأن تُحفظ بياناتي للرد عليه فقط.',
    'bk.f.confirm': 'كل ما سبق صحيح. وأفهم أن هذا طلب استفسار وليس حجزًا مؤكدًا.',
    'bk.notice.t': 'ماذا يحدث بعد الإرسال',
    'bk.notice1': 'يتواصل معك منتج خلال يوم عمل واحد.',
    'bk.notice2': 'نتحقق من التاريخ ونافذة الدخول في الموقع وجدول الطاقم.',
    'bk.notice3': 'تصلك مقترحة مكتوبة بميزانية تفصيلية.',
    'bk.notice4': '٢٥٪ من الإجمالي تثبّت التاريخ بعد موافقتك.',
    'bk.step': 'الخطوة',
    'bk.back': 'رجوع',
    'bk.clear': 'مسح النموذج',
    'bk.clear-confirm': 'هل تمسح جميع إجاباتك؟ ستُفقد المسودة المحفوظة على هذا الجهاز.',
    'bk.next': 'متابعة',
    'bk.send': 'أرسل الطلب',
    'done.t': 'وصلنا طلبك',
    'done.ref': 'رقم الطلب',
    'done.home': 'العودة إلى الموقع',
    'done.again': 'احجز تاريخًا آخر',
    'sum.t': 'طلبك',
    'sum.live': 'مباشر',
    'sum.range': 'المدى التقديري',
    'sum.note': 'تقدير إرشادي فقط، ولا يشمل ضريبة القيمة المضافة ولا رسوم الجهات الأخرى. العرض المكتوب هو الرقم المعتمد.',
    'sum.urg': 'تحتاجه أسرع؟',
    'sum.bot': 'تحدّث مع مساعد الحجز',
    'sum.urgd': 'التواريخ قبل ٢١ يومًا ممكنة عادة — اتصل بمنتج المناوبة بدل انتظار النموذج.',
    'sum.qt': 'روان أ. · زفاف، ٦٢٠ ضيفًا',
    'sum.l.event': 'المناسبة',
    'sum.l.date': 'التاريخ',
    'sum.l.guests': 'الضيوف',
    'sum.l.package': 'الباقة',
    'sum.l.services': 'الخدمات',
    'sum.l.extras': 'الإضافات',
    'sum.l.venue': 'الموقع',
    'sum.l.contact': 'التواصل',
    'sum.none': 'لا شيء بعد',
    'v.none': '—',
    'v.yes': 'نعم',
    'v.signature': 'سيغناتشر',
    'v.royal': 'رويال',
    'v.bespoke': 'بيسبيوك',
    'v.supply': 'تجهيز فقط',
    'v.type.wedding': 'زفاف',
    'v.type.engagement': 'خطوبة / قترة',
    'v.type.corporate': 'مناسبة شركات',
    'v.type.exhibition': 'معرض / جناح',
    'v.type.social': 'مناسبة عائلية',
    'v.type.conference': 'مؤتمر',
    'v.city.jeddah': 'جدة',
    'v.city.makkah': 'مكة',
    'v.city.dammam': 'الدمام',
    'v.city.riyadh': 'الرياض',
    'v.city.other': 'مدينة أخرى في المملكة',
    'v.venue.hotel': 'قاعة فندق',
    'v.venue.villa': 'فيلا أو مجمع',
    'v.venue.outdoor': 'مفتوح أو شاطئ',
    'v.venue.industrial': 'مستودع أو مبنى صناعي',
    'v.venue.expo': 'مركز معارض أو مؤتمرات',
    'v.venue.restaurant': 'مطعم أو صالة',
    'v.venue.undecided': 'لم يُحسم بعد',
    'v.setting.indoor': 'داخلي',
    'v.setting.outdoor': 'خارجي',
    'v.setting.mixed': 'مكسوّ أو الاثنان',
    'v.flex.fixed': 'تاريخ محدد',
    'v.flex.plusminus': '± ٣ أيام',
    'v.flex.week': 'أي عطلة نهاية أسبوع في الشهر',
    'v.flex.month': 'الشهر فقط',
    'v.budget.under25': 'أقل من ٢٥٠٠٠ ريال',
    'v.budget.25-60': '٢٥٠٠٠ – ٦٠٠٠٠ ريال',
    'v.budget.60-120': '٦٠٠٠٠ – ١٢٠٠٠٠ ريال',
    'v.budget.120-300': '١٢٠٠٠٠ – ٣٠٠٠٠٠ ريال',
    'v.budget.300plus': 'أكثر من ٣٠٠٠٠٠ ريال',
    'v.budget.unsure': 'غير متأكد بعد',
    'v.source.search': 'بحث جوجل',
    'v.source.instagram': 'إنستقرام',
    'v.source.linkedin': 'لينكدإن',
    'v.source.referral': 'ترشيح من عميل',
    'v.source.venue': 'ترشيح من الموقع',
    'v.source.other': 'أخرى',
    'v.pref.whatsapp': 'واتساب',
    'v.pref.email': 'بريد إلكتروني',
    'v.pref.call': 'مكالمة هاتفية',
    'v.svc.planning': 'تخطيط وإنتاج كاملان',
    'v.svc.decor': 'ديكور وزهور وتنسيق',
    'v.svc.av': 'منصة وصوت وإضاءة',
    'v.svc.marquee': 'خيام وتكييف',
    'v.svc.furniture': 'تجهيز أثاث ومأداة',
    'v.svc.catering': 'تنسيق الضيافة',
    'v.svc.staffing': 'طاقم وضيافة',
    'v.svc.exhibition': 'بناء معرض أو جناح',
    'v.x.photography': 'تنسيق التصوير',
    'v.x.valet': 'خدمة مواقف',
    'v.x.security': 'منسق أمني',
    'v.x.transport': 'نقل الضيوف',
    'v.x.livestream': 'بث مباشر وتقنية هجينة',
    'v.x.translation': 'ترجمة واستضافة',
    'r.brief': 'نبذة',
    'r.notes': 'ملاحظات',
    'r.qty': 'الكميات',
    'r.budget': 'شريحة الميزانية',
    'r.flex': 'المرونة',
    'r.tight': 'الوقت ضيق — على منتج المناوبة تأكيد الإمكان.',
    'err.required': 'هذا الحقل ضروري للمتابعة.',
    'err.email': 'راجع البريد الإلكتروني — يبدو ناقصًا.',
    'err.phone': 'استخدم جوال سعودي: ٠٥XXXXXXXX أو ‎+٩٦٦٥XXXXXXXX.',
    'err.past': 'هذا التاريخ مضى.',
    'err.end': 'نهاية الجلسة يجب أن تكون بعد وصول الضيوف.',
    'err.guests': 'بين ١٠ و٤٠٠٠ ضيف من فضلك.',
    'err.services': 'اختر خدمة واحدة على الأقل.',
    'err.consent': 'نحتاج موافقتك قبل أن نرد عليك.',
    'err.confirm': 'يرجى تأكيد صحة البيانات.',
    'err.title': 'اكتب اسم المناسبة.'
  }
};

i18n.register(COPY);
const t = (key) => i18n.label(key);

/* --------------------------------------------------------------------------
   Pricing model (indicative, mirrors the package floors on the home page)
   -------------------------------------------------------------------------- */
const PACKAGES = {
  signature: { base: 12000, perGuest: 95 },
  royal: { base: 28000, perGuest: 130 },
  bespoke: { base: 60000, perGuest: 175 },
  supply: { base: 6000, perGuest: 45 }
};

/* --------------------------------------------------------------------------
   State helpers
   -------------------------------------------------------------------------- */
const form = $('[data-form]');
const panels = $$('[data-panel]', form);
const stepButtons = $$('[data-goto]');
const wizardFill = $('[data-wizard-fill]');
const nextBtn = $('[data-next]');
const prevBtn = $('[data-prev]');
const submitBtn = $('[data-submit]');
const clearBtn = $('[data-clear]');
const doneSection = $('[data-done]');
const live = $('[data-live]');

const save = (obj) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {
    /* private mode — the form still works, it just will not remember */
  }
};
const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const drop = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
};

const field = (name) => form.elements[name] || null;
const radioValue = (name) => {
  const checked = form.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : '';
};
const checkboxValues = (name) =>
  $$(`input[name="${name}"]:checked`, form).map((el) => el.value);

const readState = () => ({
  eventType: radioValue('eventType'),
  eventTitle: field('eventTitle')?.value.trim() || '',
  package: field('package')?.value || 'royal',
  guests: Number(field('guests')?.value || 0),
  brief: field('brief')?.value.trim() || '',
  eventDate: field('eventDate')?.value || '',
  flexible: field('flexible')?.value || 'fixed',
  startTime: field('startTime')?.value || '',
  endTime: field('endTime')?.value || '',
  city: radioValue('city'),
  venue: field('venue')?.value.trim() || '',
  venueType: field('venueType')?.value || 'hotel',
  setting: field('setting')?.value || 'indoor',
  budget: field('budget')?.value || '25-60',
  services: checkboxValues('services'),
  extras: checkboxValues('extras'),
  qtyChairs: field('qtyChairs')?.value || '',
  qtyTables: field('qtyTables')?.value || '',
  qtyMarquee: field('qtyMarquee')?.value || '',
  notes: field('notes')?.value.trim() || '',
  fullName: field('fullName')?.value.trim() || '',
  role: field('role')?.value.trim() || '',
  company: field('company')?.value.trim() || '',
  email: field('email')?.value.trim() || '',
  phone: field('phone')?.value.trim() || '',
  prefer: radioValue('prefer'),
  source: field('source')?.value || 'search'
});

const persist = () => {
  const s = readState();
  save({ ...s, step: String(current), maxStep: String(maxStep) });
};

/* --------------------------------------------------------------------------
   Estimate
   -------------------------------------------------------------------------- */
const estimate = (state) => {
  const pack = PACKAGES[state.package] || PACKAGES.royal;
  const guests = Math.min(Math.max(Number(state.guests) || 0, 0), 4000);
  let total = pack.base + guests * pack.perGuest;

  $$('input[name="services"]:checked', form).forEach((input) => {
    const price = Number(input.dataset.price || 0);
    total += input.dataset.perGuest ? price * guests : price;
  });
  $$('input[name="extras"]:checked', form).forEach((input) => {
    total += Number(input.dataset.price || 0);
  });

  const low = Math.round((total * 0.92) / 500) * 500;
  const high = Math.round((total * 1.18) / 500) * 500;
  return { low, high, total };
};

/* --------------------------------------------------------------------------
   Sidebar summary
   -------------------------------------------------------------------------- */
const summaryList = $('[data-summary-list]');
const summaryTotal = $('[data-summary-total]');

const prettyDate = (iso) => {
  if (!iso) return t('v.none');
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return t('v.none');
  try {
    return new Intl.DateTimeFormat(document.documentElement.lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return iso;
  }
};

const renderSummary = () => {
  const s = readState();
  const rows = [
    [t('sum.l.event'), s.eventType ? `${t(`v.type.${s.eventType}`)}${s.eventTitle ? ` · ${s.eventTitle}` : ''}` : t('sum.none')],
    [t('sum.l.date'), s.eventDate ? `${prettyDate(s.eventDate)}${s.startTime ? ` · ${s.startTime}` : ''}` : t('sum.none')],
    [t('sum.l.guests'), s.guests ? money(s.guests) : t('v.none')],
    [t('sum.l.package'), t(`v.${s.package}`)],
    [t('sum.l.venue'), s.city ? `${t(`v.city.${s.city}`)} · ${t(`v.venue.${s.venueType}`)}${s.venue ? ` · ${s.venue}` : ''}` : t('sum.none')],
    [t('sum.l.services'), s.services.length ? s.services.map((v) => t(`v.svc.${v}`)).join(', ') : t('sum.none')],
    [t('sum.l.extras'), s.extras.length ? s.extras.map((v) => t(`v.x.${v}`)).join(', ') : t('sum.none')],
    [t('sum.l.contact'), s.fullName ? `${s.fullName}${s.phone ? ` · ${s.phone}` : ''}` : t('sum.none')]
  ];

  summaryList.replaceChildren(
    ...rows.map(([label, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      return [dt, dd];
    })
  );

  const { low, high } = estimate(s);
  summaryTotal.textContent =
    document.documentElement.lang === 'ar'
      ? `${money(low)} – ${money(high)} ريال`
      : `SAR ${money(low)} – ${money(high)}`;
};

/* --------------------------------------------------------------------------
   Validation
   -------------------------------------------------------------------------- */
const errorFor = (name) => $(`[data-error-for="${name}"]`, form);
const PHONE_RE = /^(\+?966|0)?5\d{8}$/;

const setError = (name, message) => {
  const box = errorFor(name);
  if (box) {
    box.textContent = message || '';
    box.hidden = !message;
  }
  const targets = name === 'services' ? [] : $$(`[name="${name}"]`, form);
  targets.forEach((el) => {
    el.classList.toggle('is-invalid', Boolean(message));
    if (message) {
      el.setAttribute('aria-invalid', 'true');
      if (box) {
        box.id = box.id || `err-${name}`;
        el.setAttribute('aria-describedby', box.id);
      }
    } else {
      el.removeAttribute('aria-invalid');
    }
  });
  return !message;
};

const validateControl = (el) => {
  const name = el.name;
  if (el.type === 'radio' && el.name) {
    const groupOk = Boolean(form.querySelector(`input[name="${name}"]:checked`));
    if (!groupOk && ['eventType', 'city'].includes(name)) return setError(name, t('err.required'));
    return true;
  }
  if (el.type === 'checkbox') {
    if (el.required && !el.checked) {
      return setError(name, name === 'services' ? t('err.services') : name === 'confirm' ? t('err.confirm') : t('err.consent'));
    }
    return setError(name, '');
  }

  const value = el.value.trim();
  if (el.required && !value) {
    return setError(name, name === 'eventTitle' ? t('err.title') : t('err.required'));
  }
  if (el.name === 'phone' && value && !PHONE_RE.test(value.replace(/[\s-]/g, ''))) {
    return setError(name, t('err.phone'));
  }
  if (el.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) {
    return setError(name, t('err.email'));
  }
  if (el.name === 'guests' && value) {
    const n = Number(value);
    if (!Number.isFinite(n) || n < 10 || n > 4000) return setError(name, t('err.guests'));
  }
  if (el.name === 'eventDate' && value) {
    if (value < todayISO()) return setError(name, t('err.past'));
  }
  return setError(name, '');
};

const LEAD_DAYS = 21;

const renderAdvisory = () => {
  const box = field('eventDate')?.closest('.field')?.querySelector('[data-advisory]');
  if (!box) return;
  const value = field('eventDate')?.value;
  if (!value) {
    box.hidden = true;
    box.textContent = '';
    field('eventDate')?.removeAttribute('aria-describedby');
    return;
  }
  const days = Math.round((new Date(`${value}T00:00:00`) - new Date(todayISO() + 'T00:00:00')) / 86400000);
  if (days >= 0 && days < LEAD_DAYS) {
    box.textContent = t('r.tight');
    box.hidden = false;
  } else {
    box.textContent = '';
    box.hidden = true;
  }
};

const validateEndTime = () => {
  const start = field('startTime')?.value;
  const end = field('endTime')?.value;
  if (start && end && end <= start) return setError('endTime', t('err.end'));
  return setError('endTime', '');
};

const validatePanel = (index) => {
  const panel = panels[index];
  let ok = true;
  const seen = new Set();
  $$('input, select, textarea', panel).forEach((el) => {
    if (el.type === 'radio') {
      if (seen.has(el.name)) return;
      seen.add(el.name);
    }
    if (!validateControl(el)) ok = false;
  });
  if (index === 1) ok = validateEndTime() && ok;
  if (index === 2) {
    const picked = checkboxValues('services').length > 0;
    const box = errorFor('services');
    if (box) {
      box.textContent = picked ? '' : t('err.services');
      box.hidden = picked;
    }
    ok = picked && ok;
  }
  return ok;
};

const firstInvalid = (index) => {
  const panel = panels[index];
  return $('.is-invalid', panel) || $('input, select, textarea', panel);
};

/* --------------------------------------------------------------------------
   Wizard navigation
   -------------------------------------------------------------------------- */
let current = 0;
let maxStep = 0;

const paintWizard = () => {
  stepButtons.forEach((btn, i) => {
    btn.classList.toggle('is-active', i === current);
    btn.classList.toggle('is-done', i < maxStep);
    btn.setAttribute('aria-current', i === current ? 'step' : 'false');
    btn.disabled = i > maxStep;
  });
  wizardFill.style.inlineSize = `${(current / (panels.length - 1)) * 100}%`;

  prevBtn.hidden = current === 0;
  clearBtn.hidden = current === 0;
  nextBtn.hidden = current === panels.length - 1;
  submitBtn.hidden = current !== panels.length - 1;
};

const show = (index, { focus = true } = {}) => {
  current = Math.min(Math.max(index, 0), panels.length - 1);
  maxStep = Math.max(maxStep, current);
  panels.forEach((panel, i) => {
    const active = i === current;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
  paintWizard();
  persist();
  if (current === panels.length - 1) renderReview();
  if (live) live.textContent = `${t('bk.step')} ${current + 1} / ${panels.length}`;
  if (focus) {
    const heading = $('.panel__title', panels[current]);
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
  const top = $('[data-nav]')?.offsetHeight || 72;
  window.scrollTo({ top: Math.max(0, $('.bk-main').getBoundingClientRect().top + window.scrollY - top - 12), behavior: 'smooth' });
};

const goNext = () => {
  if (!validatePanel(current)) {
    const bad = firstInvalid(current);
    bad?.focus();
    bad?.closest('.input')?.animate?.(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
      { duration: 260 }
    );
    return;
  }
  show(current + 1);
};

const clearForm = () => {
  form.reset();
  field('guests').value = 250;
  field('guestsRange').value = 250;
  field('eventDate').min = todayISO();
  drop();
  maxStep = 0;
  // bring the wizard back if we were looking at the receipt
  form.hidden = false;
  const wizard = $('[data-wizard-steps]')?.parentElement;
  if (wizard) wizard.hidden = false;
  doneSection.hidden = true;
  doneSection.classList.remove('is-in');
  $$('[data-error-for]', form).forEach((box) => {
    box.textContent = '';
    box.hidden = true;
  });
  $$('.is-invalid', form).forEach((el) => {
    el.classList.remove('is-invalid');
    el.removeAttribute('aria-invalid');
  });
  show(0);
  renderSummary();
};

/* --------------------------------------------------------------------------
   Review
   -------------------------------------------------------------------------- */
const review = $('[data-review]');

const row = (label, value, step) => {
  const wrap = document.createElement('div');
  wrap.className = 'review__row';
  const dt = document.createElement('dt');
  dt.textContent = label;
  const dd = document.createElement('dd');
  dd.textContent = value;
  wrap.append(dt, dd);
  if (step !== undefined) {
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'review__edit';
    edit.textContent = editLabel();
    edit.addEventListener('click', () => show(step));
    wrap.append(edit);
  }
  return wrap;
};

const editLabel = () => (document.documentElement.lang === 'ar' ? 'تعديل' : 'Edit');

const renderReview = () => {
  const s = readState();
  const rows = [
    row(t('sum.l.event'), s.eventType ? `${t(`v.type.${s.eventType}`)}${s.eventTitle ? ` · ${s.eventTitle}` : ''}` : t('v.none'), 0),
    row(t('sum.l.guests'), s.guests ? money(s.guests) : t('v.none'), 0),
    row(t('sum.l.package'), t(`v.${s.package}`), 0),
    row(t('sum.l.date'), `${prettyDate(s.eventDate)} · ${s.startTime || ''}–${s.endTime || ''} (${t(`v.flex.${s.flexible}`)})`, 1),
    row(t('sum.l.venue'), `${t(`v.city.${s.city || 'jeddah'}`)} · ${t(`v.venue.${s.venueType}`)} · ${t(`v.setting.${s.setting}`)}${s.venue ? ` · ${s.venue}` : ''}`, 1),
    row(t('r.budget'), t(`v.budget.${s.budget}`), 1),
    row(t('sum.l.services'), s.services.length ? s.services.map((v) => t(`v.svc.${v}`)).join(', ') : t('v.none'), 2),
    row(t('sum.l.extras'), s.extras.length ? s.extras.map((v) => t(`v.x.${v}`)).join(', ') : t('v.none'), 2)
  ];

  const quantities = [
    s.qtyChairs ? `${t('bk.f.chairs')}: ${s.qtyChairs}` : '',
    s.qtyTables ? `${t('bk.f.tables')}: ${s.qtyTables}` : '',
    s.qtyMarquee ? `${t('bk.f.marquee')}: ${s.qtyMarquee}` : ''
  ].filter(Boolean);
  if (quantities.length) rows.push(row(t('r.qty'), quantities.join(' · '), 2));
  if (s.brief) rows.push(row(t('r.brief'), s.brief, 0));
  if (s.notes) rows.push(row(t('r.notes'), s.notes, 2));
  rows.push(
    row(
      t('sum.l.contact'),
      `${s.fullName || t('v.none')}${s.role ? ` · ${s.role}` : ''}${s.company ? ` · ${s.company}` : ''}\n${s.phone || ''} · ${s.email || ''} · ${t(`v.pref.${s.prefer || 'whatsapp'}`)}`,
      3
    )
  );

  const { low, high } = estimate(s);
  rows.push(
    row(
      t('sum.range'),
      document.documentElement.lang === 'ar' ? `${money(low)} – ${money(high)} ريال` : `SAR ${money(low)} – ${money(high)}`
    )
  );

  review.replaceChildren(...rows);
};

/* --------------------------------------------------------------------------
   Submit
   -------------------------------------------------------------------------- */
const reference = () => {
  const stamp = new Date();
  const y = stamp.getFullYear();
  const md = `${String(stamp.getMonth() + 1).padStart(2, '0')}${String(stamp.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SND-${y}${md}-${rand}`;
};

const finish = () => {
  const state = readState();
  const ref = reference();
  const stamp = new Date().toISOString();

  try {
    const all = JSON.parse(localStorage.getItem(BOOKINGS) || '[]');
    all.unshift({ ref, stamp, state });
    localStorage.setItem(BOOKINGS, JSON.stringify(all.slice(0, 20)));
  } catch {
    /* storage full or blocked — the on-screen receipt is what matters */
  }
  drop();

  const { low, high } = estimate(state);
  const range =
    document.documentElement.lang === 'ar' ? `${money(low)} – ${money(high)} ريال` : `SAR ${money(low)} – ${money(high)}`;

  $('[data-done-ref]').textContent = ref;
  $('[data-done-lede]').textContent =
    document.documentElement.lang === 'ar'
      ? `شكرًا ${state.fullName || ''}.Ranges ${range} قدّرنا طلبك وسيراجعه منتج خلال يوم عمل واحد. رقمك ${ref}.`
      : `Thank you ${state.fullName ? `, ${state.fullName.split(' ')[0]}` : ''}. We have your enquiry for ${prettyDate(state.eventDate)} at a working range of ${range}. A producer will reply within one working day, quoting ${ref} in the subject line.`;

  const rows = [
    row(t('sum.l.event'), state.eventType ? `${t(`v.type.${state.eventType}`)}${state.eventTitle ? ` · ${state.eventTitle}` : ''}` : t('v.none')),
    row(t('sum.l.date'), `${prettyDate(state.eventDate)} · ${state.startTime || ''}–${state.endTime || ''}`),
    row(t('sum.l.guests'), state.guests ? money(state.guests) : t('v.none')),
    row(t('sum.l.package'), t(`v.${state.package}`)),
    row(t('sum.l.services'), state.services.length ? state.services.map((v) => t(`v.svc.${v}`)).join(', ') : t('v.none')),
    row(t('sum.l.extras'), state.extras.length ? state.extras.map((v) => t(`v.x.${v}`)).join(', ') : t('v.none')),
    row(t('sum.l.venue'), `${t(`v.city.${state.city || 'jeddah'}`)} · ${t(`v.venue.${state.venueType}`)}`),
    row(t('sum.l.contact'), `${state.fullName || ''} · ${state.phone || ''} · ${state.email || ''}`),
    row(t('sum.range'), range)
  ];
  $('[data-done-summary]').replaceChildren(...rows);

  form.hidden = true;
  $('[data-wizard-steps]').parentElement.hidden = true;
  doneSection.hidden = false;
  doneSection.classList.add('is-in');
  doneSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* --------------------------------------------------------------------------
   Wiring
   -------------------------------------------------------------------------- */
document.addEventListener('sanad:lang', () => {
  renderSummary();
  if (current === panels.length - 1) renderReview();
});

const init = () => {
  const dateInput = field('eventDate');
  if (dateInput) {
    const soon = new Date();
    soon.setDate(soon.getDate() + 21);
    dateInput.min = todayISO();
    dateInput.title = soon.toISOString().slice(0, 10);
  }

  const guests = field('guests');
  const range = field('guestsRange');
  const syncRange = () => {
    if (!range || !guests) return;
    range.value = guests.value;
  };
  guests?.addEventListener('input', syncRange);
  range?.addEventListener('input', () => {
    guests.value = range.value;
    guests.dispatchEvent(new Event('input', { bubbles: true }));
  });

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', () => show(current - 1));
  clearBtn.addEventListener('click', () => {
    if (confirm(t('bk.clear-confirm'))) clearForm();
  });
  stepButtons.forEach((btn) => btn.addEventListener('click', () => show(Number(btn.dataset.goto))));
  $$('[data-restart]').forEach((btn) => btn.addEventListener('click', clearForm));

  form.addEventListener('input', () => {
    renderSummary();
    if (current === 4) renderReview();
    persist();
  });
  form.addEventListener('change', () => {
    renderSummary();
    renderAdvisory();
  });

  form.addEventListener(
    'focusout',
    (e) => {
      const el = e.target;
      if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) return;
      validateControl(el);
      if (el.name === 'startTime' || el.name === 'endTime') validateEndTime();
      if (el.name === 'eventDate') renderAdvisory();
    },
    true
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    for (let i = 0; i <= current; i += 1) {
      if (!validatePanel(i)) {
        show(i, { focus: false });
        firstInvalid(i)?.focus();
        return;
      }
    }
    finish();
  });

  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
    if (current === panels.length - 1) form.requestSubmit();
    else goNext();
  });

  $$('[data-counter-for]', form).forEach((area) => {
    const out = document.getElementById(area.dataset.counterFor);
    const max = Number(area.getAttribute('maxlength')) || 0;
    const paint = () => {
      if (!out) return;
      out.textContent = String(area.value.length);
      out.classList.toggle('is-near', max > 0 && area.value.length > max * 0.9);
    };
    area.addEventListener('input', paint);
    paint();
  });

  const draft = load();
  if (draft) {
    Object.entries(draft).forEach(([key, value]) => {
      if (key === 'step' || key === 'maxStep') return;
      const el = field(key);
      if (!el) return;
      if (Array.isArray(value)) {
        $$(`input[name="${key}"]`, form).forEach((input) => {
          input.checked = value.includes(input.value);
        });
        return;
      }
      if (el instanceof RadioNodeList) {
        Array.from(el).forEach((input) => (input.checked = input.value === value));
        return;
      }
      el.value = value;
    });
    maxStep = Math.min(Number(draft.maxStep || 0), panels.length - 1);
    current = Math.min(Number(draft.step || 0), panels.length - 1);
    const note = $('[data-draft-note]');
    if (note) {
      note.hidden = false;
      setTimeout(() => (note.hidden = true), 6000);
    }
  }

  i18n.register({ en: {}, ar: {} }); // re-apply copy after a draft restore
  renderSummary();
  renderAdvisory();

  const hash = window.location.hash.replace('#step-', '');
  const wanted = ['basics', 'when', 'services', 'contact', 'review'].indexOf(hash);
  show(wanted >= 0 ? wanted : current, { focus: false });
};

init();