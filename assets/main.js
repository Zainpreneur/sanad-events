/* ==========================================================================
   Sanad — behaviour layer
   Vanilla ES modules. No dependencies. Bilingual EN/AR with RTL support.
   ========================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
const getJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const setJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the page still works, it just forgets */
  }
};

/* ==========================================================================
   1. Bilingual content
   ========================================================================== */
const DICT = {
  en: {
    'lost.eyebrow': 'Lost between the marquee and the main stage',
    'lost.title': 'This page is not on the floor plan',
    'lost.lede': 'The link is broken or the page was moved. Everything else is exactly where you left it.',
    'lost.cta1': 'Back to the site',
    'nav.capacity': 'Capacity',
    'show.eyebrow': 'Capacity',
    'show.title': 'Whatever the number, we have already done it',
    'show.lede': 'Guest count is the first question we ask and the last one that surprises us. These are the formats we run most often — and the yard stock behind each.',
    'show.r1l': 'Intimate',
    'show.r2l': 'Ballroom',
    'show.r3l': 'Hall &amp; conference',
    'show.r4l': 'Festival scale',
    'show.cta': 'Check your date',
    'show.cap': 'Main hall, 1,200 delegates',
    'show.capd': 'Seated plenary with plenary AV, translation booths and a full registration crew.',
    'show.img': 'Plenary hall set for 1,200 delegates at a technology summit in Jeddah',
    'about.img1': 'Racks of chairs, linen and crates inside the Sanad supply warehouse in Jeddah',
    'about.img2': 'The Sanad production yard in Jeddah with stored structures and trucks',
    'wrk1.a': 'Khaldi night at Asir Suite in Jeddah, lit in warm gold',
    'wrk2.a': 'Leadership summit main stage with truss, LED wall and lighting',
    'wrk3.a': 'Rooftop wedding dinner in Al Balad with string lights and the city skyline',
    'wrk4.a': 'Healthcare exhibition booth built and installed by the Sanad crew',
    'wrk5.a': 'Graduation garden party set up with lanterns and palms',
    'wrk6.a': 'Winter garden gala inside a heated marquee',
    'wrk7.a': 'Product launch with light beams over a plinth',
    'wrk8.a': 'Plenary hall at a technology summit, seated for 1,200',
    'wrk9.a': 'Family majlis arranged for a 90th birthday celebration',
    'wa.close': 'Close chat',
    'a11y.skip': 'Skip to content',
    'nav.tagline': 'Event Planning &amp; Supply',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.supply': 'Supply',
    'nav.work': 'Portfolio',
    'nav.packages': 'Packages',
    'nav.faq': 'FAQ',
    'nav.book': 'Book a date',

    'hero.eyebrow': 'Jeddah, Kingdom of Saudi Arabia, Since 2014',
    'hero.title': 'We build the day they will still talk about in ten years',
    'hero.lede': 'Sanad is a planning house and an event supply warehouse under one roof. Concept, drawings, décor, staging, sound, lighting, marquees, furniture, hospitality staff — sourced, installed and struck by a single accountable team.',
    'hero.cta1': 'Start your booking',
    'hero.cta2': 'See the portfolio',
    'hero.s1': 'Events delivered',
    'hero.s2': 'Corporate clients',
    'hero.s3': 'Warehouse &amp; yard',
    'hero.s4': 'Average rating',
    'hero.scroll': 'Scroll',

    'about.badge': 'Est. 2014',
    'about.frame2': 'Night of 1,200 guests',
    'about.eyebrow': 'The name',
    'about.title': 'Sanad means the pillar you lean on',
    'about.p1': 'In Arabic, <em>sanad</em> is a chain of trust — the thing that holds weight without complaining. We started in a 200&nbsp;m² store in Al Rawdah with four folding chairs and a borrowed generator. Twelve years later we run a 3,500&nbsp;m² warehouse and a production yard in Jeddah, a 42-person planning office, and a 120-strong setup crew who can dress a 2,000-guest ballroom in a single night.',
    'about.p2': 'Everything sits under one roof on purpose. Your planner, your décor lead, your sound engineer and your supply foreman speak in the same morning stand-up, walk the same venue survey together, and sign the same production sheet. Nobody passes a problem down the line.',
    'about.pillar1t': 'One accountable team',
    'about.pillar1d': 'A single producer owns your event from the first call to the final strike. No handovers, no re-explaining, no blame.',
    'about.pillar2t': 'Owned inventory, not rented hope',
    'about.pillar2d': '3,500&nbsp;m² of our own stock, serviced weekly. If it is on the proposal it is physically in our yard the morning you ask.',
    'about.pillar3t': 'Climate-true Jeddah dates',
    'about.pillar3d': 'Every outdoor date is modelled for heat, wind and dust load — shading, airflow, cold-chain and power redundancy included.',
    'about.c1': 'Years in Jeddah',
    'about.c2': 'Events delivered',
    'about.c3': 'Crew on peak days',
    'about.c4': 'Reviews, 4.9 average',

    'svc.eyebrow': 'What we do',
    'svc.title': 'Planning and supply, sold together',
    'svc.lede': 'Most houses sell you a service and rent you the rest. We sell you the finished evening — and the chairs, glassware, lighting truss and generator that hold it together are ours.',
    'svc1.t': 'Wedding planning',
    'svc1.d': 'Engagement, khaldi, wedding night and farewell — concept boards, floorplans, seating maps, guest protocol and a full crew on site.',
    'svc1.tag': 'Fully managed',
    'svc2.t': 'Corporate events',
    'svc2.d': 'Conferences, summits, launches and annual dinners. Branded staging, plenary AV, registration desks, host and protocol teams.',
    'svc2.tag': 'B2B team',
    'svc3.t': 'Exhibitions &amp; booths',
    'svc3.d': 'Modular booth builds, backwalls, stands, counters and lead generation staff — built in our yard, crated and installed on site.',
    'svc3.tag': 'Build &amp; install',
    'svc4.t': 'Stage, sound &amp; lighting',
    'svc4.d': 'Truss and stage design, line arrays, wireless comms, show control, wash and effect programming run by our own engineers.',
    'svc4.tag': 'In-house AV',
    'svc5.t': 'Marquees &amp; climate',
    'svc5.d': 'Clear-span and sailcloth structures up to 1,200&nbsp;m², sidewalls, flooring, fans, evaporative cooling and standby power.',
    'svc5.tag': 'Outdoor ready',
    'svc6.t': 'Furniture &amp; tableware',
    'svc6.d': '2,500 chairs, 180 tables, 1,400 pieces of glassware, premium linen and china — dry-cleaned, inspected and stacked by our own team.',
    'svc6.tag': 'Owned stock',
    'svc7.t': 'Catering coordination',
    'svc7.d': 'Menu tasting, buffet and live stations, service timing, cold chain and dishwash logistics — with your caterer or ours.',
    'svc7.tag': 'Hospitality',
    'svc8.t': 'Staffing &amp; protocol',
    'svc8.d': 'Hosts, ushers, servers, queue managers, drivers and security liaison — uniformed, briefed and on shift before doors open.',
    'svc8.tag': '120 crew',

    'inv.eyebrow': 'Supply house',
    'inv.title': 'What we hold in the yard today',
    'inv.lede': 'Counts are live and change weekly, so treat them as a floor rather than a ceiling. Anything outside this list we source, inspect and deliver under one purchase order.',
    'inv1.t': 'Seating &amp; tables',
    'inv1.a': 'Chiavari chairs', 'inv1.b': 'Banquet rounds', 'inv1.c': 'Cowhide benches',
    'inv1.d': 'Long tables', 'inv1.e': 'Bar stools', 'inv1.f': 'VIP lounge seating',
    'inv2.t': 'Tableware &amp; linen',
    'inv2.a': 'Gold &amp; ivory china', 'inv2.b': 'Crystal glassware', 'inv2.c': 'Premium linen',
    'inv2.d': 'Chargers &amp; runners', 'inv2.e': 'Cutlery sets', 'inv2.f': 'Children settings',
    'inv3.t': 'Structures',
    'inv3.a': 'Clear-span marquees', 'inv3.b': 'Sailcloth tents', 'inv3.c': 'Sidewalls &amp; flooring',
    'inv3.d': 'Arch &amp; gantry builds', 'inv3.e': 'Podium stages', 'inv3.f': 'Exhibition shells',
    'inv4.t': 'Light &amp; sound',
    'inv4.a': 'Moving heads', 'inv4.b': 'Uplights &amp; blinders', 'inv4.c': 'Truss &amp; rigging',
    'inv4.d': 'Line array PA', 'inv4.e': 'Wireless mics &amp; comms', 'inv4.f': 'LED walls &amp; projectors',
    'inv5.t': 'Power &amp; climate',
    'inv5.a': 'Silent generators', 'inv5.b': 'Distribution boards', 'inv5.c': 'UPS &amp; redundancy',
    'inv5.d': 'Evaporative coolers', 'inv5.e': 'Cold rooms', 'inv5.f': 'Cabling &amp; ramps',
    'inv6.t': 'Décor &amp; florals',
    'inv6.a': 'Fresh flower stock', 'inv6.b': 'Backdrop frames', 'inv6.c': 'Neon &amp; LED signage',
    'inv6.d': 'Linen draping', 'inv6.e': 'Lanterns &amp; candles', 'inv6.f': 'Custom builds',
    'inv.note': 'Need something that is not on this list? Send the specification — we answer within one working day.',
    'inv.cta': 'Request a supply list',

    'prc.eyebrow': 'How it runs',
    'prc.title': 'Five steps, one production sheet',
    'prc1.t': 'Discovery call',
    'prc1.d': '30 minutes on call or at the office. Date, guest count, venue, mood, budget band, the one thing you refuse to compromise on.',
    'prc2.t': 'Concept &amp; proposal',
    'prc2.d': 'Moodboards, floorplans, a supplier-by-supplier budget and three package options — inside 5 working days.',
    'prc3.t': 'Design &amp; sourcing',
    'prc3.d': 'Technical drawings, custom builds in our yard, fabric and floral tests, venue permits, power and rigging sign-off.',
    'prc4.t': 'Production day',
    'prc4.d': 'Load-out at your access window, a technical rehearsal, a show call at T−3&nbsp;hours, then we hold the floor until the last guest leaves.',
    'prc5.t': 'Strike &amp; aftercare',
    'prc5.d': 'Night strike, inventory check, waste out, venue handover signed, itemised rental statement and a 7-day follow-up call.',

    'wrk.eyebrow': 'Selected work',
    'wrk.title': 'Nights we are still proud of',
    'wrk.lede': 'A cross-section of the last four seasons. Names are published with the client’s permission; guest photography is not.',
    'wrk.f.all': 'All',
    'wrk.f.weddings': 'Weddings',
    'wrk.f.corporate': 'Corporate',
    'wrk.f.exhibitions': 'Exhibitions',
    'wrk.f.social': 'Social',
    'wrk1.t': 'Khaldi night, Asir Suite', 'wrk1.m': '420 guests · 6 zones',
    'wrk2.t': 'Leadership summit, Jeddah Front', 'wrk2.m': '900 pax · 3-day build',
    'wrk3.t': 'Rooftop dinner, Al Balad', 'wrk3.m': '180 guests · clear-span',
    'wrk4.t': 'Healthcare expo booth', 'wrk4.m': '72 m² · custom build',
    'wrk5.t': 'Graduation garden party', 'wrk5.m': '350 guests · daytime',
    'wrk6.t': 'Winter garden gala', 'wrk6.m': '600 guests · heated',
    'wrk7.t': 'Product launch, KAFT Lounge', 'wrk7.m': '250 guests · press call',
    'wrk8.t': 'Plenary hall, tech summit', 'wrk8.m': '1,200 seats · 4 languages',
    'wrk9.t': 'Family majlis, 90th birthday', 'wrk9.m': '220 guests · two nights',

    'pkg.eyebrow': 'Packages',
    'pkg.title': 'Three starting points',
    'pkg.lede': 'Every price below is a floor, per event, before 15% government VAT. What moves the number is guest count, structure, staffing hours and how bespoke the build is.',
    'pkg.cta': 'Book this package',
    'pkg1.t': 'Signature',
    'pkg1.f': 'Intimate celebrations, up to 150 guests',
    'pkg1.from': 'From',
    'pkg1.i1': 'Dedicated planner &amp; concept board',
    'pkg1.i2': 'Décor palette, 2 feature moments',
    'pkg1.i3': 'Stage, dance floor, basic wash lighting',
    'pkg1.i4': 'PA system with two wireless mics',
    'pkg1.i5': 'Chairs, tables, linen, tableware',
    'pkg1.i6': '6 crew, load-in and strike',
    'pkg2.t': 'Royal',
    'pkg2.b': 'Most chosen',
    'pkg2.f': 'Weddings and corporate nights, up to 400 guests',
    'pkg2.from': 'From',
    'pkg2.i1': 'Everything in Signature',
    'pkg2.i2': 'Full technical &amp; lighting design',
    'pkg2.i3': 'Clear-span marquee with climate plan',
    'pkg2.i4': 'Custom stage build &amp; LED backdrop',
    'pkg2.i5': 'Floral installations &amp; lounge sets',
    'pkg2.i6': 'On-site producer for the full night',
    'pkg2.i7': '18 crew + protocol team',
    'pkg3.t': 'Bespoke',
    'pkg3.f': '400+ guests, multi-zone, exhibitions, destination dates',
    'pkg3.from': 'From',
    'pkg3.i1': 'Creative direction &amp; bespoke builds',
    'pkg3.i2': 'Multiple zones, live and silent formats',
    'pkg3.i3': 'Full hospitality suite &amp; guest protocol',
    'pkg3.i4': 'Engineered rigging, redundant power',
    'pkg3.i5': 'Content capture, streaming, hybrid AV',
    'pkg3.i6': 'Travel crew outside Jeddah',
    'pkg3.i7': 'Full 120-strong crew ceiling',
    'pkg.note': 'Prefer to keep your own caterer or planner? We take on supply-only engagements from SAR 6,000 — the same inventory, crew and delivery schedule, without the planning fee.',

    'tst.eyebrow': 'In their words',
    'tst.title': 'Judged by the people who stood on the floor',
    'tst1.q': 'They redrew the floorplan twice because I changed the guest list twice, and never once looked annoyed. The wedding ran to the minute. Eighteen months later people still talk about the lighting moment during the entrance.',
    'tst1.n': 'Rawan A.',
    'tst1.r': 'Wedding, 620 guests, Al Rawdah',
    'tst2.q': 'We run conferences where a single failed microphone is a crisis. Sanad’s engineers rehearsed with us a week out, kept a spare channel hot, and handed over every cable labelled. That is rarer than it should be.',
    'tst2.n': 'Fahad Al-Zahrani',
    'tst2.r': 'Head of Events, healthcare group',
    'tst3.q': 'We needed 72 square metres of booth in four days, crated for three cities. Their yard built it, their crew installed it, and the stand looked better than our main stage. We have booked again twice.',
    'tst3.n': 'Layla S.',
    'tst3.r': 'Marketing lead, industrial expo',

    'faq.eyebrow': 'Before you ask',
    'faq.title': 'Questions we get every week',
    'faq1.q': 'How far in advance should we book?',
    'faq1.a': 'Fridays and Saturdays between October and April are usually reserved 6 to 9 months out, so start at 9 months if your date is fixed. Midweek and summer dates open up 8 to 10 weeks out. Expo season in February and March needs 4 months for custom booth builds.',
    'faq2.q': 'What are the payment terms?',
    'faq2.a': '25% books your date, 40% is due once the design and production sheet are signed, and the balance is settled 5 days before the event. Cards, bank transfer and approved instalments of up to 4 are all accepted. Every payment is documented on a ZATCA-compliant invoice.',
    'faq3.q': 'Can we use our own caterer or suppliers?',
    'faq3.a': 'Yes. Bring your caterer, photographer or entertainment and we will integrate them into the schedule, the power plan and the crew briefing. One condition: every external supplier needs an insurance certificate and Jeddah-approved vendor registration, and they work under our floor manager on the night.',
    'faq4.q': 'Do you deliver outside Jeddah?',
    'faq4.a': 'We deliver across the Kingdom. Jeddah, Makkah and Dammam are standard; other cities carry a crew-travel and freight line on the proposal, quoted in advance so there are no surprises on the invoice. Very large builds outside Jeddah are quoted case by case.',
    'faq5.q': 'What happens if we need to move the date?',
    'faq5.a': 'Move it more than 45 days out and your deposit transfers to the new date once. Inside 45 days we will try, but that date may be gone — in that case the deposit becomes credit valid for twelve months. Cancellations inside 14 days are non-refundable because crew, freight and custom builds are already committed.',

    'cta.eyebrow': 'Dates for 2026 are open',
    'cta.title': 'Tell us the date. We will tell you what it takes.',
    'cta.lede': 'The booking form takes about four minutes and gives you a working cost range immediately — before anyone from our team has to reply.',
    'cta.cta1': 'Open the booking form',
    'cta.cta2': 'Call +966 55 123 4567',

    'footer.blurb': 'Event planning and event supply from Jeddah. Wedding, corporate, exhibition and social production — under one production sheet.',
    'footer.c1t': 'Services',
    'footer.c2t': 'Explore',
    'footer.c3t': 'Studio &amp; yard',
    'footer.addr': 'Prince Sultan Street, Al Rawdah<br>Jeddah, Saudi Arabia',
    'footer.hours': 'Sun–Thu 09:00–20:00<br>Friday by appointment',
    'footer.cr': '© 2026 Sanad Events Co. Jeddah. All rights reserved.',
    'footer.vat': 'CR 4030512877 · VAT 300152187700003',
    'footer.quote': 'Get a written quote in 24h'
  },

  ar: {
    'lost.eyebrow': 'ضاع بين الخيمة والمنصة',
    'lost.title': 'هذه الصفحة ليست على المخطط',
    'lost.lede': 'الرابط مكسور أو نُقلت الصفحة. وكل ما عدا ذلك في مكانه تماماً.',
    'lost.cta1': 'العودة إلى الموقع',
    'nav.capacity': 'السعة',
    'show.eyebrow': 'السعة',
    'show.title': 'أي عدد ضيوف، سبق أن نفّذناه',
    'show.lede': 'عدد الضيوف أول ما نسأل عنه وآخر ما يفاجئنا. هذه أكثر الصيغ التي ننفذها — وما في ساحتنا خلف كل واحدة منها.',
    'show.r1l': 'مناسبات حميمة',
    'show.r2l': 'قاعات المناسبات',
    'show.r3l': 'قاعات ومؤتمرات',
    'show.r4l': 'مهرجانات',
    'show.cta': 'تحقق من تاريخك',
    'show.cap': 'الالقاعة الرئيسية، ١٢٠٠ مشارك',
    'show.capd': 'مؤتمر جالس بتقنية صالات وترجمة وفريق تسجيل كامل.',
    'show.img': 'قاعة utama مهيأة لمؤتمر تقني في جدة لـ ١٢٠٠ مشارك',
    'about.img1': 'رفوف الكراسي والأقمشة والصناديق داخل مستودع سند في جدة',
    'about.img2': 'ساحة إنتاج سند في جدة بالهياكل المخزنة والشاحنات',
    'wrk1.a': 'ليلة خليجة في قاعة عسير بجدة بإضاءة ذهبية دافئة',
    'wrk2.a': 'منصة ملتقى القيادة بالتراص والشاشة والإضاءة',
    'wrk3.a': 'عشاء زفاف على سطح البلد بأنوار معلقة وأفق المدينة',
    'wrk4.a': 'جناح معرض صحي بناه فريق سند وركّبه في الموقع',
    'wrk5.a': 'حفل تخرج في الحديقة بالفوانيس والنخيل',
    'wrk6.a': 'حفل الشتاء داخل خيمة مدفأة',
    'wrk7.a': 'إطلاق منتج بأشعة ضوئية فوق منصّة العرض',
    'wrk8.a': 'الالقاعة الرئيسية في مؤتمر تقني لـ ١٢٠٠ مقعد',
    'wrk9.a': 'مجلس عائلي مرتّب احتفالًا بعيد ميلاد التاسع والثمانين',
    'wa.close': 'إغلاق المحادثة',
    'a11y.skip': 'تخطَّ إلى المحتوى',
    'nav.tagline': 'تخطيط وتجهيز المناسبات',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.supply': 'المخزون',
    'nav.work': 'أعمالنا',
    'nav.packages': 'الباقات',
    'nav.faq': 'أسئلة شائعة',
    'nav.book': 'احجز موعدك',

    'hero.eyebrow': 'جدة, المملكة العربية السعودية, منذ ٢٠١٤',
    'hero.title': 'نصنع ليلة لا تنتهي ذكراها بعد عشر سنوات',
    'hero.lede': 'سند مكتب تخطيط ومنزل تجهيزات للمناسبات تحت سقف واحد. الفكرة والرسومات والديكور والمنصة والصوت والإضاءة والخيام والأثاث وطاقم الضيافة — نشتريها ونركّبها ونفكّها بفريق واحد مسؤول.',
    'hero.cta1': 'ابدأ الحجز',
    'hero.cta2': 'شاهد أعمالنا',
    'hero.s1': 'مناسبة نُفّذت',
    'hero.s2': 'عميل شركات',
    'hero.s3': 'مستودع وساحة',
    'hero.s4': 'متوسط التقييم',
    'hero.scroll': 'مرّر',

    'about.badge': 'تأسست ٢٠١٤',
    'about.frame2': 'ليلة ١٢٠٠ ضيف',
    'about.eyebrow': 'الاسم',
    'about.title': 'سند هو العمود الذي تستند إليه',
    'about.p1': 'في العربية، «سند» سلسلة ثقة تحتمل الوزن دون أن تشتكي. بدأنا في محل بمساحة ٢٠٠ م² في الروضة بأربع كراسٍ قابلة للطي ومولد مستعار. بعد اثني عشر عامًا ندير مستودعًا وساحة إنتاج بمساحة ٣٥٠٠ م² في جدة، ومكتب تخطيط فيه ٤٢ موظفًا، وفريق تركيب من ١٢٠ فردًا يسند ليلةً لألفَي ضيف.',
    'about.p2': 'كل شيء تحت سقف واحد عن قصد. مخططك، ومهندس الديكور، ومهندس الصوت، ومشرف التجهيز يجلسون في اجتماع الصباح نفسه، ومعاونة الموقع واحدة، ويمضيان على ورقة الإنتاج نفسها. لا أحد يمرّر المشكلة إلى غيره.',
    'about.pillar1t': 'فريق واحد مسؤول',
    'about.pillar1d': 'منتج واحد يملك مناسبتك من أول مكالمة حتى آخر فكّ للتركيب. بلا تسليمات، ولا إعادة شرح، ولا لوم.',
    'about.pillar2t': 'مخزونٌ مملوك لا وعود',
    'about.pillar2d': '٣٥٠٠ م² من مخزوننا الخاص، يُصانة أسبوعيًا. ما يذكر في العرض موجود في ساحتنا صباح طلبك.',
    'about.pillar3t': 'تواريخ مواكبة لمناخ جدة',
    'about.pillar3d': 'كل تاريخ في الخارج يُحاكى مع الحرارة والرياح والغبار — التظليل والتهوية وسلسلة التبريد واحتياطي الكهرباء ضمنًا.',
    'about.c1': 'عامًا في جدة',
    'about.c2': 'مناسبة نُفّذت',
    'about.c3': 'فردًا في الطاقم',
    'about.c4': 'تقييمًا بمتوسط ٤٫٩',

    'svc.eyebrow': 'ما نقدمه',
    'svc.title': 'تخطيط وتجهيز يُباعان معًا',
    'svc.lede': 'أغلب البيوت تبيعك خدمة وتؤجّر لك الباقي. نحن نبيعك الأمسية مكتملة — والكراسي والكوابل والأكواب والإضاءة والمولد التي تسندها كلها لنا.',
    'svc1.t': 'تخطيط الأعراس',
    'svc1.d': 'خطوبة وخليجة وليلة الزفاف ووداع — لوحات فكرة ومخططات أرضيات وخرائط جلوس وبروتوكول ضيوف وفريق كامل في الموقع.',
    'svc1.tag': 'إدارة كاملة',
    'svc2.t': 'مناسبات الشركات',
    'svc2.d': 'مؤتمرات ولقاءات وإطلاقات وحفلات سنوية. منصات بهوية العلامة وتقنية صالات واستقبال ومضيفون وبروتوكول.',
    'svc2.tag': 'فريق شركات',
    'svc3.t': 'المعارض والأجنحة',
    'svc3.d': 'أجنحة معيارية وخلفيات وكاونترات وطاقم استقطاب زوار — تُبنى في ساحتنا وتُشحن وتُركّب في الموقع.',
    'svc3.tag': 'بناء وتركيب',
    'svc4.t': 'منصة وصوت وإضاءة',
    'svc4.d': 'تصميم تراص ومنصة، الصوت، لاسلكي، تحكم بالعرض، وبرمجة الإضاءة — ينفّذها مهندسونا.',
    'svc4.tag': 'تقنية داخلية',
    'svc5.t': 'خيام وتكييف',
    'svc5.d': 'هياكل بلا أعمدة وقماش Sailcloth حتى ١٢٠٠ م²، وجدران وأرضيات ومراوح وتبريد تبخيري وكهرباء احتياطية.',
    'svc5.tag': 'جاهز للخارج',
    'svc6.t': 'أثاث ومأداة',
    'svc6.d': '٢٥٠٠ كرسي و١٨٠ طاولة و١٤٠٠ قطعة كؤوس وأقمشة وأوانٍ فاخرة — تُغسل وتُفحص وتُكدّس بفريقنا.',
    'svc6.tag': 'مخزون مملوك',
    'svc7.t': 'تنسيق الضيافة',
    'svc7.d': 'تجربة قائمة وبوفيه ومحطات حية وتوقيت الخدمة وسلسلة التبريد ولوجستيات الغسيل — مع مقدمك أو معنا.',
    'svc7.tag': 'ضيافة',
    'svc8.t': 'طاقم وبروتوكول',
    'svc8.d': 'مضيفون ومنسّقون ونادلون ومسؤولو طابور وسائقون ومنسق أمني — بالزي الرسمي وبعد الإحاطة قبل فتح الأبواب.',
    'svc8.tag': '١٢٠ فردًا',

    'inv.eyebrow': 'بيت التجهيز',
    'inv.title': 'ما في ساحتنا اليوم',
    'inv.lede': 'الأعداد تتغير أسبوعيًا، فاقرأها كحد أدنى لا كسقف. وما ليس في القائمة نشتريه ونفحصه ونوصله بأمر شراء واحد.',
    'inv1.t': 'كراسي وطاولات',
    'inv1.a': 'كراسي تشيفاري', 'inv1.b': 'طاولات مستديرة', 'inv1.c': 'مقاعد جلود',
    'inv1.d': 'طاولات طويلة', 'inv1.e': 'كراسي بار', 'inv1.f': 'جلسات VIP',
    'inv2.t': 'مأداة وأقمشة',
    'inv2.a': 'صُحون عاجية وذهبية', 'inv2.b': 'كؤوس كريستال', 'inv2.c': 'أقمشة فاخرة',
    'inv2.d': 'شوك وسكاكين', 'inv2.e': 'أطقم طعام', 'inv2.f': 'أطقم أطفال',
    'inv3.t': 'الهياكل',
    'inv3.a': 'خيام بلا أعمدة', 'inv3.b': 'خيام قماشية', 'inv3.c': 'جدران وأرضيات',
    'inv3.d': 'أقواس وبوابات', 'inv3.e': 'منصات', 'inv3.f': 'هياكل معارض',
    'inv4.t': 'ضوء وصوت',
    'inv4.a': 'رؤوس متحركة', 'inv4.b': 'كشافات', 'inv4.c': 'تراص وتعليق',
    'inv4.d': 'أنظمة صوت Line array', 'inv4.e': 'ميكروفونات ولاسلكي', 'inv4.f': 'شاشات LED',
    'inv5.t': 'كهرباء ومناخ',
    'inv5.a': 'مولدات هادئة', 'inv5.b': 'لوحات توزيع', 'inv5.c': 'UPS واحتياطي',
    'inv5.d': 'مبردات تبخيرية', 'inv5.e': 'غرف تبريد', 'inv5.f': 'كابلات ومعابر',
    'inv6.t': 'ديكور وزهور',
    'inv6.a': 'زهور طازجة', 'inv6.b': 'هياكل خلفيات', 'inv6.c': 'لافتات نيون وLED',
    'inv6.d': 'طيّات قماشية', 'inv6.e': 'فوانيس وشموع', 'inv6.f': 'تصاميم خاصة',
    'inv.note': 'تحتاج شيئًا غير مدرج؟ أرسل المواصفة — نرد خلال يوم عمل واحد.',
    'inv.cta': 'اطلب قائمة تجهيز',

    'prc.eyebrow': 'كيف نعمل',
    'prc.title': 'خمس خطوات وورقة إنتاج واحدة',
    'prc1.t': 'مكالمة الاستكشاف',
    'prc1.d': '٣٠ دقيقة مكالمة أو في المكتب. التاريخ وعدد الضيوف والموقع والأجواء وشريحة الميزانية، والشيء الوحيد الذي لا تقبل التنازل عنه.',
    'prc2.t': 'الفكرة والعرض',
    'prc2.d': 'لوحات أجواء ومخططات وميزانية تفصيلية وثلاثة خيارات باقات — خلال ٥ أيام عمل.',
    'prc3.t': 'التصميم والتوريد',
    'prc3.d': 'رسومات فنية، تصاميم خاصة في ساحتنا، تجارب أقمشة وزهور، تصاريح الموقع، واعتماد الكهرباء والتعليق.',
    'prc4.t': 'يوم التنفيذ',
    'prc4.d': 'التحميل في وقتك المسموح، ثم بروفة فنية، ثم نداء العرض قبل ٣ ساعات، ونبقى على الأرض حتى خروج آخر ضيف.',
    'prc5.t': 'الفك والمتابعة',
    'prc5.d': 'فك ليلي، جرد المخزون، إخراج النفايات، تسليم الموقع بتوقيع، كشف حساب مفصّل، ومكالمة متابعة بعد ٧ أيام.',

    'wrk.eyebrow': 'أعمال مختارة',
    'wrk.title': 'ليالٍ ما زلنا فخورين بها',
    'wrk.lede': 'نموذج من آخر أربعة مواسم. الأسماء منشورة بإذن العملاء، أما تصوير الضيوف فلا.',
    'wrk.f.all': 'الكل',
    'wrk.f.weddings': 'أعراس',
    'wrk.f.corporate': 'شركات',
    'wrk.f.exhibitions': 'معارض',
    'wrk.f.social': 'مناسبات خاصة',
    'wrk1.t': 'ليلة خليجة — قاعة عسير', 'wrk1.m': '٤٢٠ ضيفًا · ٦ مناطق',
    'wrk2.t': 'ملتقى القيادة — Jeddah Front', 'wrk2.m': '٩٠٠ مشارك · ٣ أيام',
    'wrk3.t': 'عشاء سطح — البلد', 'wrk3.m': '١٨٠ ضيفًا · خيمة بلا أعمدة',
    'wrk4.t': 'جناح معرض صحي', 'wrk4.m': '٧٢ م² · تصميم خاص',
    'wrk5.t': 'حفل تخرج في الحديقة', 'wrk5.m': '٣٥٠ ضيفًا · نهاري',
    'wrk6.t': 'حفل الشتاء', 'wrk6.m': '٦٠٠ ضيف · تدفئة',
    'wrk7.t': 'إطلاق منتج — KAFT', 'wrk7.m': '٢٥٠ ضيفًا · مؤتمر صحفي',
    'wrk8.t': 'الالقاعة الرئيسية — مؤتمر تقني', 'wrk8.m': '١٢٠٠ مقعد · ٤ لغات',
    'wrk9.t': 'مجلس عائلي — عيد ميلاد ٩٠', 'wrk9.m': '٢٢٠ ضيفًا · ليلتان',

    'pkg.eyebrow': 'الباقات',
    'pkg.title': 'ثلاث نقاط بداية',
    'pkg.lede': 'كل سعر أدناه حد أدنى للمناسبة الواحدة قبل ضريبة القيمة المضافة ١٥٪. ما يرفع الرقم: عدد الضيوف والحجم وساعات الطاقم ودرجة خصوصية التصميم.',
    'pkg.cta': 'احجز هذه الباقة',
    'pkg1.t': 'Signature',
    'pkg1.f': 'مناسبات حميمة حتى ١٥٠ ضيفًا',
    'pkg1.from': 'ابتداءً من',
    'pkg1.i1': 'مخطط مخصص ولوحة فكرة',
    'pkg1.i2': 'لوحة ألوان ديكور ولحظتان مميزتان',
    'pkg1.i3': 'منصة ورقص وإضاءة أساسية',
    'pkg1.i4': 'نظام صوت مع ميكروفونين لاسلكيين',
    'pkg1.i5': 'كراسي وطاولات وأقمشة ومأداة',
    'pkg1.i6': '٦ أفراد للتركيب والفك',
    'pkg2.t': 'Royal',
    'pkg2.b': 'الأكثر طلبًا',
    'pkg2.f': 'أعراس وليالٍ شركات حتى ٤٠٠ ضيف',
    'pkg2.from': 'ابتداءً من',
    'pkg2.i1': 'كل ما في Signature',
    'pkg2.i2': 'تصميم فني وإضاءة كامل',
    'pkg2.i3': 'خيمة بلا أعمدة مع خطة تكييف',
    'pkg2.i4': 'منصة خاصة وخلفية LED',
    'pkg2.i5': 'تنسيقات زهر وجلسات راحة',
    'pkg2.i6': 'منتج في الموقع طوال الليلة',
    'pkg2.i7': '١٨ فردًا + فريق بروتوكول',
    'pkg3.t': 'Bespoke',
    'pkg3.f': 'أكثر من ٤٠٠ ضيف، تعدد مناطق، معارض، مدن أخرى',
    'pkg3.from': 'ابتداءً من',
    'pkg3.i1': 'إخراج إبداعي وتصاميم خاصة',
    'pkg3.i2': 'مناطق متعددة وبرامج حية وصامتة',
    'pkg3.i3': 'جناح ضيافة كامل وبروتوكول ضيوف',
    'pkg3.i4': 'تعليق هندسي وكهرباء مكررة',
    'pkg3.i5': 'توثيق وبث وتقنية هجينة',
    'pkg3.i6': 'طاقم مسافر خارج جدة',
    'pkg3.i7': 'سقف طاقمنا ١٢٠ فردًا',
    'pkg.note': 'تفضل الاحتفاظ بمقدمك أو مخططك؟ نأخذ مهام التجهيز فقط ابتداءً من ٦٠٠٠ ريال — نفس المخزون والطاقم وجدول التسليم، بلا رسوم تخطيط.',

    'tst.eyebrow': 'بأفواحهم',
    'tst.title': 'يُحكمون بمن وقف على الأرض',
    'tst1.q': 'أعادوا رسم المخطط مرتين لأنني غيّرت قائمة الضيوف مرتين، ولم يظهر عليهم شيء. الزفاف مشى دقيقة بدقيقة. وبعد ثمانية عشر شهرًا ما زال الناس يتحدثون عن لحظة الإضاءة أثناء الدخول.',
    'tst1.n': 'روان أ.',
    'tst1.r': 'زفاف · ٦٢٠ ضيفًا · الروضة',
    'tst2.q': 'نُدير مؤتمرات يُعدّ فشل ميكروفون واحد فيها أزمة. بروفة مهندسو سند معنا قبل أسبوع، وقناة احتياطية ساخنة، وكل سلك سلّموه موصوفًا. هذا أندر مما ينبغي.',
    'tst2.n': 'فهد الزهراني',
    'tst2.r': 'رئيس الفعاليات · مجموعة صحية',
    'tst3.q': 'احتجنا ٧٢ مترًا مربعًا من الجناح في أربعة أيام، مشحونًا لثلاث مدن. بنته ساحتهم، وركّبته فرقتهم، وكان الجناح أجمل من منصتنا الرئيسية. وحجزنا معهم مرتين بعدها.',
    'tst3.n': 'ليلى س.',
    'tst3.r': 'مسؤولة تسويق · معرض صناعي',

    'faq.eyebrow': 'قبل أن تسأل',
    'faq.title': 'أسئلة تصلنا كل أسبوع',
    'faq1.q': 'كم أحتاج وقتًا للحجز؟',
    'faq1.a': 'الجمعة والسبت من أكتوبر إلى أبريل تُحجز عادة قبل ٦ إلى ٩ أشهر، فابدأ قبل ٩ أشهر إذا كان تاريخك ثابتًا. أما أيام الأسبوع والصيف فتُتاح قبل ٨ إلى ١٠ أسابيع. وموسم المعارض في فبراير ومارس يحتاج ٤ أشهر للتصاميم الخاصة.',
    'faq2.q': 'ما شروط الدفع؟',
    'faq2.a': '٢٥٪ لتثبيت التاريخ، و٤٠٪ عند اعتماد التصميم وورقة الإنتاج، والرصيد قبل ٥ أيام من المناسبة. نقبل البطاقات والتحويل البنكي وتقسيطًا حتى ٤ دفعات معتمدًا. كل دفعة موثقة بفاتورة متوافقة مع هيئة الزكاة والضريبة.',
    'faq3.q': 'هل يمكنني استخدام مقدمي الخاص؟',
    'faq3.a': 'نعم. أحضر مقدم الطعام أو المصور أو مقدم الفقرات، وسندمجهم في الجدول وخطة الكهرباء وإحاطة الطاقم. شرط واحد: كل مورد خارجي يحتاج شهادة تأمين وتسجيل مورد معتمد في جدة، ويعمل تحت إشراف مدير الأرض في الليلة.',
    'faq4.q': 'هل توصّلون خارج جدة؟',
    'faq4.a': 'نوصّل في جميع أنحاء المملكة. جدة ومكة والدمام هياسية؛ أما باقي المدن فتُضاف لها بند سفر الطاقم وشحن في العرض، تُحسب مسبقًا فلا مفاجآت في الفاتورة. التصاميم الكبيرة خارج جدة تُسعّر حالة بحالة.',
    'faq5.q': 'ماذا لو احتجنا تغيير التاريخ؟',
    'faq5.a': 'قبل ٤٥ يومًا تنتقل عربونك للتاريخ الجديد مرة واحدة. داخل ٤٥ يومًا سنحاول، لكن التاريخ قد يكون محجوزًا — وعندها يتحول العربون إلى رصيد صالح اثني عشر شهرًا. الإلغاء داخل ١٤ يومًا غير قابل للاسترداد لأن الطاقم والشحن والتصاميم ملتزَمة بالفعل.',

    'cta.eyebrow': 'تواريخ ٢٠٢٦ متاحة',
    'cta.title': 'أعطنا التاريخ. ونخبرك بما يتطلبه.',
    'cta.lede': 'نموذج الحجز يستغرق أربع دقائق تقريبًا ويمنحك مدى تكلفة أولي فورًا — قبل أن يرد أحد من فريقنا.',
    'cta.cta1': 'افتح نموذج الحجز',
    'cta.cta2': 'اتصل ٠٥٥١٢٣٤٥٦٧',

    'footer.blurb': 'تخطيط وتجهيز مناسبات من جدة. أعراس وشركات ومعارض ومناسبات خاصة — تحت ورقة إنتاج واحدة.',
    'footer.c1t': 'الخدمات',
    'footer.c2t': 'تصفّح',
    'footer.c3t': 'المكتب والساحة',
    'footer.addr': 'شارع الأمير سلطان، حي الروضة<br>جدة، المملكة العربية السعودية',
    'footer.hours': 'الأحد–الخميس ٠٩:٠٠–٢٠:٠٠<br>الجمعة بموعد مسبق',
    'footer.cr': '© ٢٠٢٦ شركة سند للفعاليات، جدة. جميع الحقوق محفوظة.',
    'footer.vat': 'س.ت ٤٠٣٠٥١٢٨٧٧ · الرقم الضريبي ٣٠٠١٥٢١٨٧٧٠٠٠٠٣',
    'footer.quote': 'احصل على عرض سعر مكتوب خلال ٢٤ ساعة'
  }
};

const splitText = (el, html) => {
  const plain = html.replace(/<[^>]*>/g, '');
  const words = plain.split(/\s+/).filter(Boolean);
  el.innerHTML = '';
  words.forEach((word, i) => {
    const outer = document.createElement('span');
    outer.className = 'split__word';
    const inner = document.createElement('span');
    inner.className = 'split__inner';
    inner.style.setProperty('--d', `${Math.min(i * 55, 900)}ms`);
    inner.textContent = word;
    outer.append(inner);
    el.append(outer);
    if (i < words.length - 1) el.append(document.createTextNode(' '));
  });
};

const applyLang = (lang) => {
  const dict = DICT[lang] || DICT.en;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value == null) return;
    if (el.hasAttribute('data-split')) splitText(el, value);
    else el.innerHTML = value;
  });
  $$('[data-i18n-aria]').forEach((el) => {
    const value = dict[el.dataset.i18nAria];
    if (value != null) el.setAttribute('aria-label', value);
  });
  $$('[data-alt]').forEach((img) => {
    const value = dict[img.dataset.alt];
    if (value != null) img.alt = value;
  });
  $$('[data-lang]').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === lang));
  setJSON('sanad-lang', lang);
  document.dispatchEvent(new CustomEvent('sanad:lang', { detail: { lang } }));
};

const initLang = () => {
  const saved = getJSON('sanad-lang', null);
  const browserIsArabic = (navigator.language || 'en').toLowerCase().startsWith('ar');
  applyLang(saved || (browserIsArabic ? 'ar' : 'en'));
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang]');
    if (btn) applyLang(btn.dataset.lang);
  });
};

/* ==========================================================================
   2. Scroll reveal + stagger
   ========================================================================== */
const initReveal = () => {
  // No per-section scroll reveal: sections are static (`.reveal` is instant).
  // The only orchestrated motion is the hero load reveal, handled in CSS via
  // `.reveal--load` keyframes (reduced-motion respected there).
  $$('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--rd', `${Math.min(i * 70, 560)}ms`);
    });
  });
};

/* ==========================================================================
   3. Counters
   ========================================================================== */
const initCounters = () => {
  // Latin digits everywhere: prices and dates read better that way in both languages
  const format = (value, decimals) =>
    decimals === undefined ? Math.round(value).toLocaleString('en-US') : value.toFixed(decimals);

  const run = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const decimals = el.dataset.decimals === undefined ? undefined : Number(el.dataset.decimals);
    if (REDUCED.matches) {
      el.textContent = format(target, decimals);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(target * eased, decimals);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = format(target, decimals);
    };
    requestAnimationFrame(tick);
  };

  const counters = $$('[data-counter]');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(run);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => io.observe(el));
};

/* ==========================================================================
   4. Scroll chrome: progress bar, sticky nav, back to top
   ========================================================================== */
const initScrollChrome = () => {
  const bar = $('[data-progress]');
  const nav = $('[data-nav]');
  const toTop = $('[data-totop]');
  const timeline = $('[data-timeline]');
  const fill = $('[data-timeline-fill]');
  const parallaxEls = $$('[data-parallax]');
  let pointerX = 0;
  let pointerY = 0;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.inlineSize = `${max > 0 ? Math.min(y / max, 1) * 100 : 0}%`;
    nav?.classList.toggle('is-stuck', y > 24);
    toTop?.classList.toggle('is-visible', y > window.innerHeight * 0.8);

    if (timeline && fill) {
      const rect = timeline.getBoundingClientRect();
      const line = $('.timeline__line', timeline).getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.62;
      let progress = (viewportAnchor - rect.top) / Math.max(rect.height - line.height, 1);
      progress = Math.min(Math.max(progress, 0), 1);
      timeline.style.setProperty('--tp', progress.toFixed(4));
      $$('.step', timeline).forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        step.classList.toggle('is-active', stepRect.top + stepRect.height / 2 < viewportAnchor);
      });
    }

    if (parallaxEls.length && !REDUCED.matches) {
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * Number(el.dataset.parallax);
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    }
  };

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );

  window.addEventListener('pointermove', (e) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    const glow = $('[data-cursor]');
    if (glow) glow.style.translate = `${e.clientX}px ${e.clientY}px`;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    const glow = $('[data-cursor]');
    if (glow) glow.style.opacity = '0';
  });

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: REDUCED.matches ? 'auto' : 'smooth' });
  });

  onScroll();
  return { getPointer: () => [pointerX, pointerY] };
};

/* ==========================================================================
   5. Nav behaviour
   ========================================================================== */
const initNav = () => {
  const nav = $('[data-nav]');
  const toggle = $('[data-navtoggle]');
  if (!nav || !toggle) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  $$('.nav__link, .nav__panel a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960) setOpen(false);
  });

  const links = $$('.nav__link');
  const sections = links
    .map((link) => {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
};

/* ==========================================================================
   6. Cursor glow
   ========================================================================== */
const initCursor = () => {
  const glow = $('[data-cursor]');
  if (!glow || REDUCED.matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.body.classList.add('has-pointer');
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  const loop = () => {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    glow.style.translate = `${x}px ${y}px`;
    requestAnimationFrame(loop);
  };
  window.addEventListener('pointermove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    glow.style.opacity = '';
  }, { passive: true });
  requestAnimationFrame(loop);
};

/* ==========================================================================
   7. Hero particles
   ========================================================================== */
const initParticles = (getPointer) => {
  const canvas = $('[data-particles]');
  if (!canvas || REDUCED.matches) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = 1;
  let w = 0;
  let h = 0;
  let dust = [];
  let raf = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(Math.round((w * h) / 16000), 110);
    dust = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.9 + 0.4,
      vy: -(Math.random() * 0.22 + 0.06),
      vx: (Math.random() - 0.5) * 0.14,
      a: Math.random() * 0.5 + 0.15,
      tw: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.7 ? '41, 111, 107' : '224, 198, 141'
    }));
  };

  const draw = () => {
    const [px, py] = getPointer();
    ctx.clearRect(0, 0, w, h);
    dust.forEach((p) => {
      p.x += p.vx + px * 0.22;
      p.y += p.vy;
      p.tw += 0.02;
      if (p.y < -12) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      if (p.x < -12) p.x = w + 10;
      if (p.x > w + 12) p.x = -10;
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      grad.addColorStop(0, `rgba(${p.hue},${alpha})`);
      grad.addColorStop(1, `rgba(${p.hue},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x + py * 4, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  };

  const start = () => {
    if (!raf) raf = requestAnimationFrame(draw);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  resize();
  start();
  window.addEventListener('resize', () => {
    resize();
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
};

/* ==========================================================================
   8. Card tilt + spotlight
   ========================================================================== */
const initTilt = () => {
  if (REDUCED.matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  $$('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
      el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 7}deg) rotateX(${(0.5 - y) * 7}deg) translateY(-4px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
};

/* ==========================================================================
   9. Marquee (duplicate the track for a seamless loop)
   ========================================================================== */
const initMarquee = () => {
  const track = $('[data-marquee]');
  if (!track) return;
  track.append(...Array.from(track.children).map((node) => node.cloneNode(true)));
};

/* ==========================================================================
   10. Gallery filter + lightbox
   ========================================================================== */
const initGallery = () => {
  const list = $('[data-gallery]');
  if (!list) return;
  const items = $$('.shot', list);
  const buttons = $$('[data-filter]');

  const visible = () => items.filter((item) => !item.classList.contains('is-hidden'));

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
      items.forEach((item) => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('is-hidden', !show);
        if (show) {
          item.style.setProperty('--rd', '0ms');
          requestAnimationFrame(() => item.classList.add('is-in'));
        }
      });
    });
  });

  const dialog = $('[data-lb]');
  if (!dialog) return;
  const stage = $('[data-lb-stage]', dialog);
  const titleEl = $('[data-lb-title]', dialog);
  const metaEl = $('[data-lb-meta]', dialog);
  const indexEl = $('[data-lb-index]', dialog);
  const totalEl = $('[data-lb-total]', dialog);
  let current = 0;
  let set = [];

  const paint = () => {
    const shot = set[current];
    if (!shot) return;
    const img = $('img', shot);
    if (img) {
      stage.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
      stage.style.backgroundSize = 'cover';
      stage.style.backgroundPosition = 'center';
    } else {
      const gradient = Array.from($('.shot__media', shot).classList).find((c) => /^g-[a-z]$/.test(c)) || 'g-a';
      stage.className = `lightbox__stage ${gradient}`;
    }
    // restart the stage animation
    stage.style.animation = 'none';
    void stage.offsetWidth;
    stage.style.animation = '';
    titleEl.textContent = $('.shot__title', shot).textContent;
    metaEl.textContent = $('.shot__meta', shot).textContent;
    indexEl.textContent = String(current + 1);
    totalEl.textContent = String(set.length);
  };

  const open = (shot) => {
    set = visible();
    current = Math.max(set.indexOf(shot), 0);
    paint();
    dialog.showModal();
  };

  items.forEach((item) => {
    const btn = $('.shot__btn', item);
    btn?.addEventListener('click', () => open(item));
  });

  $('[data-lb-close]', dialog)?.addEventListener('click', () => dialog.close());
  $('[data-lb-prev]', dialog)?.addEventListener('click', () => {
    current = (current - 1 + set.length) % set.length;
    paint();
  });
  $('[data-lb-next]', dialog)?.addEventListener('click', () => {
    current = (current + 1) % set.length;
    paint();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'Home') {
      current = 0;
      paint();
    }
    if (e.key === 'End') {
      current = set.length - 1;
      paint();
    }
    // arrows follow the reading direction
    if (e.key === 'ArrowRight') $('[data-lb-next]', dialog).click();
    if (e.key === 'ArrowLeft') $('[data-lb-prev]', dialog).click();
  });
};

/* ==========================================================================
   11. Testimonial slider
   ========================================================================== */
const initSlider = () => {
  const root = $('[data-slider]');
  if (!root) return;
  const track = $('[data-slider-track]', root);
  const slides = $$('.quote', track);
  const dotsWrap = $('[data-slider-dots]', root);
  const prev = $('[data-slider-prev]', root);
  const next = $('[data-slider-next]', root);
  if (!slides.length) return;
  let index = 0;
  let timer = 0;

  const paint = () => {
    const rtl = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${rtl ? index * 100 : -index * 100}%)`;
    $$('.dot', dotsWrap).forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  };

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `dot${i === 0 ? ' is-active' : ''}`;
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => {
      index = i;
      paint();
      restart();
    });
    dotsWrap.append(dot);
  });

  const go = (dir) => {
    index = (index + dir + slides.length) % slides.length;
    paint();
  };

  const restart = () => {
    clearInterval(timer);
    if (REDUCED.matches) return;
    timer = setInterval(() => go(1), 7000);
  };

  prev?.addEventListener('click', () => {
    const rtl = document.documentElement.dir === 'rtl';
    go(rtl ? 1 : -1);
    restart();
  });
  next?.addEventListener('click', () => {
    const rtl = document.documentElement.dir === 'rtl';
    go(rtl ? -1 : 1);
    restart();
  });
  root.addEventListener('pointerenter', () => clearInterval(timer));
  root.addEventListener('pointerleave', restart);
  root.addEventListener('focusin', () => clearInterval(timer));

  paint();
  restart();
};

/* ==========================================================================
   12. FAQ accordion — one open at a time
   ========================================================================== */
const initAccordion = () => {
  const wrap = $('[data-accordion]');
  if (!wrap) return;
  const items = $$('details', wrap);
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) items.forEach((other) => other !== item && (other.open = false));
    });
  });
};

/* ==========================================================================
   Public helpers (the booking page extends the dictionary)
   ========================================================================== */
export const i18n = {
  dict: DICT,
  register(keymap) {
    Object.entries(keymap).forEach(([lang, map]) => {
      DICT[lang] = { ...(DICT[lang] || {}), ...map };
    });
    i18n.apply(document.documentElement.lang === 'ar' ? 'ar' : 'en');
  },
  apply: applyLang,
  label: (key) => (DICT[document.documentElement.lang === 'ar' ? 'ar' : 'en'][key] ?? key)
};

/* ==========================================================================
   Boot
   ========================================================================== */
const scroll = initScrollChrome();
initLang();
initReveal();
initCounters();
initNav();
initCursor();
initParticles(scroll.getPointer);
initTilt();
initMarquee();
initGallery();
initSlider();
initAccordion();