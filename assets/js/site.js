import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

// DOM Utilities
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Navbar & Sticky Scroll
const topbar = $('.topbar');
const menu = $('.menu');
const nav = $('.nav');

if (topbar) {
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

if (menu && nav) {
  menu.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Active Nav Links
$$('.nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (location.pathname.endsWith(href) || (location.pathname === '/' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Modals Setup (Snapcode modal)
const snapModal = $('#snap-modal');
$$('[data-snap]').forEach(b => b.addEventListener('click', () => snapModal?.classList.add('open')));
$('#snap-close')?.addEventListener('click', () => snapModal?.classList.remove('open'));
snapModal?.addEventListener('click', e => {
  if (e.target === snapModal) snapModal.classList.remove('open');
});

// Intersection Observer for Reveal animations
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
    }
  });
}, { threshold: 0.12 });

$$('.reveal').forEach(el => io.observe(el));

/* ==========================================================================
   PROPERTIES DATABASE & INTERACTIVE ENGINE
   ========================================================================== */
export const PROPERTIES_DATA = [
  {
    id: "HM-101",
    title: "فيلا رويال مودرن فاخرة - حي النقرة",
    category: "residential",
    type: "فيلا سكنية فاخرة",
    district: "حي النقرة",
    price: 2850000,
    priceFormatted: "2,850,000 ر.س",
    image: "assets/images/villa-1.jpg",
    area: "550 م²",
    rooms: "6 غرف نوم",
    baths: "7 دورات مياه",
    street: "شارع 20م شمالي",
    tag: "حصري • للبيع",
    badgeClass: "badge-gold",
    description: "فيلا مودرن بتصميم معماري استثنائي وتشطيبات فندقية راقية بحي النقرة الراقي في حائل. مساحات رحبة، أسقف دبل هايت، مسبح خارجي متدرج، مصعد بانورامي راكب، وتكييف مركزي مدمج مع ضمانات إنشائية شاملة.",
    amenities: ["مسبح خاص", "مصعد راكب", "تكييف مركزي VRV", "مجلس ضيافة واسع", "غرفة خادمة وسائق", "كراج سيارتين", "حديقة خاصة", "ضمان 10 سنوات"]
  },
  {
    id: "HM-102",
    title: "مركز أعمال وبرج إداري - طريق الملك فهد",
    category: "commercial",
    type: "عمارة تجارية إدارية",
    district: "طريق الملك فهد",
    price: 14200000,
    priceFormatted: "14,200,000 ر.س",
    image: "assets/images/commercial-1.jpg",
    area: "2,400 م²",
    rooms: "18 مكتب إداري",
    baths: "12 دورة مياه",
    street: "شارع 60م تجاري",
    tag: "فرصة استثمارية • عائد 9.5%",
    badgeClass: "badge-green",
    description: "مبنى تجاري إداري استثماري مؤجر بالكامل لشركات وهيئات مرموقة بعقود طويلة الأجل وموثقة عبر منصة إيجار. واجهات زجاجية عاكسة، بهو استقبال فخم، ونظام أمني ومواقف قبو تتسع لـ 40 سيارة.",
    amenities: ["مؤجر بالكامل", "عائد 9.5% سنوي", "مواقف قبو 40 سيارة", "3 مصاعد كورية", "نظام إطفاء متكامل", "كاميرات مراقبة ذكية"]
  },
  {
    id: "HM-103",
    title: "بنتهاوس الأفق الفاخر بإطلالة بانورامية",
    category: "residential",
    type: "شقة بنتهاوس تمليك",
    district: "حي أجا",
    price: 1650000,
    priceFormatted: "1,650,000 ر.س",
    image: "assets/images/interior-1.jpg",
    area: "320 م²",
    rooms: "4 أجنحة ملكية",
    baths: "5 دورات مياه",
    street: "إطلالة جبلية وبانورامية",
    tag: "تمليك فاخر • جديد",
    badgeClass: "badge-gold",
    description: "بنتهاوس فاخر بتشطيبات رخام طبيعي إيطالي، صالة دبل هايت مع إطلالة مفتوحة، تراس سماوي خاص مع جلسة شواء ومسبح جاكوزي، دخول ذكي بنظام Smart Home متكامل وموقفين خاصين بالقبو.",
    amenities: ["تراس سماوي خاص", "نظام منزل ذكي Smart Home", "أرضيات رخام إيطالي", "مطبخ ألماني مجهز", "موقفان خاصان", "مستودع خاص"]
  },
  {
    id: "HM-104",
    title: "قصر الأندلس المعاصر - حي المصيف",
    category: "residential",
    type: "قصر سكني فاخر",
    district: "حي المصيف",
    price: 4400000,
    priceFormatted: "4,400,000 ر.س",
    image: "assets/images/villa-2.jpg",
    area: "820 م²",
    rooms: "7 أجنحة ماستر",
    baths: "8 دورات مياه",
    street: "شارعين زاوية 25م",
    tag: "تصميم خاص • للبيع",
    badgeClass: "badge-gold",
    description: "قصر فاخر يجمع بين الفخامة المعاصرة والخصوصية التامة في أرقى مواقع حي المصيف. فناء فسيح مع شلال مائي ومسطحات خضراء، مجلسين ضيافة مستقلين، ملحق خارجي، وتشطيبات حجر طبيعي معزول حرارياً.",
    amenities: ["موقع زاوية على شارعين", "مسطحات خضراء واسعة", "ملحق ضيافة خارجي", "تكييف مخفي لكامل القصر", "بئر ماء وخزان أرضي ضخم", "غرفة أمن وحراسة"]
  },
  {
    id: "HM-105",
    title: "أرض تجارية استثمارية استراتيجية - طريق الملك سلمان",
    category: "land",
    type: "أرض تجارية استثمارية",
    district: "طريق الملك سلمان",
    price: 6900000,
    priceFormatted: "6,900,000 ر.س",
    image: "assets/images/land-1.jpg",
    area: "4,500 م²",
    rooms: "واجهة 60 متر",
    baths: "صك إلكتروني محدث",
    street: "شارع 40م تجاري رئيسي",
    tag: "مخطط معتمد • فرصة استثمارية",
    badgeClass: "badge-green",
    description: "أرض تجارية خام في موقع نمو حضري وتجاري عالي الحيوية على طريق الملك سلمان في حائل. مناسبة جداً لتطوير مجمع مطاعم ومقاهي (Drive-thru) أو مركز طبي لوجستي متعدد الاستخدامات.",
    amenities: ["صك إلكتروني موثق", "واجهة تجارية 60م", "موقع استراتيجي حيوي", "جاهزة للإفراغ الفوري", "تراخيص بناء متعددة الأدوار"]
  },
  {
    id: "HM-106",
    title: "مجمع بوليفارد التجاري - حي الياسمين",
    category: "investment",
    type: "مجمع تجاري مدر للدخل",
    district: "حي الياسمين",
    price: 9800000,
    priceFormatted: "9,800,000 ر.س",
    image: "assets/images/commercial-1.jpg",
    area: "1,800 م²",
    rooms: "12 معرضاً تجارياً",
    baths: "مكتمل الخدمات",
    street: "واجهة على 3 شوارع",
    tag: "عائد استثماري 9.2% • مؤجر",
    badgeClass: "badge-blue",
    description: "فرصة استثمارية نادرة: مجمع تجاري متكامل الخدمات يضم 12 معرضاً مؤجرة بنسبة 100% لعلامات تجارية معروفة بدخل سنوي يتجاوز 900 ألف ريال بعقود ملزمة وموثقة.",
    amenities: ["نسبة إشغال 100%", "دخل سنوي مؤكد 900,000 ر.س", "مواقف أمامية فسيحة", "إدارة أملاك وتشغيل مستقر", "عقود إيجار إلكترونية موثقة"]
  }
];

// WhatsApp Quick Contact Base
const WA_PHONE = "966500000000"; // Replaceable or links to official channel

function renderProperties(items) {
  const container = $('#properties-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px dashed rgba(255,255,255,0.1);">
        <p style="font-size: 18px; color: var(--silver-300); margin-bottom: 12px;">لم يتم العثور على عقارات مطابقة لمعايير البحث الحالية.</p>
        <button class="btn ghost sm" id="reset-filters-btn">إعادة تعيين خيارات البحث</button>
      </div>
    `;
    $('#reset-filters-btn')?.addEventListener('click', () => {
      $$('.filter-pill').forEach(p => p.classList.remove('active'));
      $('.filter-pill[data-filter="all"]')?.classList.add('active');
      renderProperties(PROPERTIES_DATA);
    });
    return;
  }

  container.innerHTML = items.map(p => `
    <article class="property-card" data-id="${p.id}" data-category="${p.category}">
      <div class="property-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="property-badges">
          <span class="badge ${p.badgeClass}">${p.tag}</span>
        </div>
        <div class="property-type-tag">${p.type}</div>
      </div>
      <div class="property-body">
        <div class="property-price">
          <strong>${p.priceFormatted}</strong>
        </div>
        <h3 class="property-title">${p.title}</h3>
        <div class="property-location">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${p.district}</span>
          <span style="margin: 0 4px; opacity: 0.4">•</span>
          <span style="font-size: 11px; color: var(--gold-light); font-family: Inter;">كود: ${p.id}</span>
        </div>
        <div class="property-features">
          <div class="feat-item" title="المساحة">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M9 3v18M3 9h18"/></svg>
            <span>${p.area}</span>
          </div>
          <div class="feat-item" title="المواصفات">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14"/></svg>
            <span>${p.rooms}</span>
          </div>
          <div class="feat-item" title="تفاصيل إضافية">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            <span>${p.baths}</span>
          </div>
        </div>
        <div class="property-actions">
          <button class="btn-prop-detail" data-open-id="${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            معاينة التفاصيل
          </button>
          <a class="btn-prop-wa" href="https://wa.me/966500000000?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن ' + p.title + ' (كود: ' + p.id + ') المعروضة في موقع الحماد للعقارات.')}" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a8 8 0 0 0-6.8 12.2L4 21l5.9-1.2A8 8 0 1 0 12 3m4.6 11.5c-.2.6-1 1.1-1.6 1.2-.5.1-1.2.2-3.6-.8-3-1.3-5-4.4-5.2-4.6-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.9-.4h.6c.2 0 .5-.1.7.5l.9 2.1c.1.2.1.5 0 .7l-.4.7-.6.6c-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.6 2.8 1.8.4.2.6.2.8-.1l1.1-1.3c.3-.4.5-.3.9-.2l2 .9c.4.2.7.3.8.5.1.1.1.7-.1 1.3"/></svg>
            واتساب
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Bind Quick View Modals
  $$('[data-open-id]', container).forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-open-id');
      const item = PROPERTIES_DATA.find(x => x.id === pid);
      if (item) openPropertyModal(item);
    });
  });
}

// Property Quick View Modal
const propModal = $('#property-modal');
const propModalContent = $('#property-modal-content');

function openPropertyModal(p) {
  if (!propModal || !propModalContent) return;

  const waMsg = encodeURIComponent(`السلام عليكم ورحمة الله، أود حجز موعد معاينة والاستفسار عن: ${p.title} (كود العقار: ${p.id}) عبر موقع الحماد للعقارات.`);

  propModalContent.innerHTML = `
    <div class="modal-prop-gallery">
      <img src="${p.image}" alt="${p.title}">
      <span class="badge ${p.badgeClass}" style="position:absolute; top:16px; right:16px;">${p.tag}</span>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:14px; flex-wrap:wrap; gap:10px;">
      <div>
        <span style="font-size:12px; color:var(--gold-light); font-weight:700; font-family:Inter;">كود المرجع: ${p.id} • ${p.type}</span>
        <h2 style="font-size:26px; font-weight:800; color:#fff; margin-top:4px;">${p.title}</h2>
        <p style="color:var(--silver-400); font-size:14px; margin-top:4px;">${p.district} • ${p.street}</p>
      </div>
      <div style="text-align:left;">
        <span style="font-size:12px; color:var(--silver-400); display:block;">السعر المطلوب</span>
        <strong style="font-size:28px; color:var(--gold-light);">${p.priceFormatted}</strong>
      </div>
    </div>
    
    <div class="modal-specs-table" style="margin-top:18px;">
      <div class="modal-spec-cell">
        <span>المساحة الإجمالية</span>
        <strong>${p.area}</strong>
      </div>
      <div class="modal-spec-cell">
        <span>الغرف والتقسيم</span>
        <strong>${p.rooms}</strong>
      </div>
      <div class="modal-spec-cell">
        <span>المرافق الصحية</span>
        <strong>${p.baths}</strong>
      </div>
      <div class="modal-spec-cell">
        <span>الشارع والواجهة</span>
        <strong>${p.street}</strong>
      </div>
    </div>

    <div style="margin-top:18px;">
      <h4 style="font-size:16px; font-weight:700; color:#ffffff; margin-bottom:8px;">نبذة عن العقار والموقع:</h4>
      <p style="font-size:15px; color:var(--silver-300); line-height:1.85;">${p.description}</p>
    </div>

    <div style="margin-top:18px;">
      <h4 style="font-size:16px; font-weight:700; color:#ffffff; margin-bottom:10px;">المميزات والتجهيزات:</h4>
      <div class="amenities-pills">
        ${p.amenities.map(a => `<span class="amenity-chip">✓ ${a}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex; gap:12px; margin-top:28px; flex-wrap:wrap;">
      <a class="btn" style="flex:1; justify-content:center;" href="https://wa.me/966500000000?text=${waMsg}" target="_blank" rel="noopener">
        طلب حجز موعد معاينة عبر واتساب
      </a>
      <button class="btn ghost" id="modal-calc-btn" style="padding:0 20px;">
        احسب التمويل لهذا العقار
      </button>
    </div>
  `;

  $('#modal-calc-btn')?.addEventListener('click', () => {
    propModal.classList.remove('open');
    const calcSection = $('#calculator-section');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
      const priceSlider = $('#calc-price');
      if (priceSlider) {
        priceSlider.value = p.price;
        updateMortgageCalculator();
      }
    }
  });

  propModal.classList.add('open');
}

$('#prop-modal-close')?.addEventListener('click', () => propModal?.classList.remove('open'));
propModal?.addEventListener('click', e => {
  if (e.target === propModal) propModal.classList.remove('open');
});

// Category Filter Pills
$$('.filter-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    $$('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const category = pill.getAttribute('data-filter');
    if (category === 'all') {
      renderProperties(PROPERTIES_DATA);
    } else {
      const filtered = PROPERTIES_DATA.filter(p => p.category === category);
      renderProperties(filtered);
    }
  });
});

// Initialize Properties Render on Index
renderProperties(PROPERTIES_DATA);

// Hero Search Dock Trigger
const heroSearchBtn = $('#hero-search-btn');
if (heroSearchBtn) {
  heroSearchBtn.addEventListener('click', () => {
    const selectedType = $('#search-prop-type')?.value;
    const selectedDistrict = $('#search-district')?.value;
    const selectedPrice = $('#search-price-range')?.value;

    let filtered = [...PROPERTIES_DATA];

    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(p => p.category === selectedType);
    }

    if (selectedDistrict && selectedDistrict !== 'all') {
      filtered = filtered.filter(p => p.district.includes(selectedDistrict));
    }

    if (selectedPrice && selectedPrice !== 'all') {
      if (selectedPrice === 'under-2m') filtered = filtered.filter(p => p.price <= 2000000);
      else if (selectedPrice === '2m-5m') filtered = filtered.filter(p => p.price > 2000000 && p.price <= 5000000);
      else if (selectedPrice === 'above-5m') filtered = filtered.filter(p => p.price > 5000000);
    }

    renderProperties(filtered);

    // Scroll to properties section
    $('#properties-section')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Hero Search Purpose Tabs
$$('.search-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.search-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ==========================================================================
   LIVE MORTGAGE CALCULATOR
   ========================================================================== */
function formatNumberSAR(num) {
  return new Intl.NumberFormat('ar-SA').format(Math.round(num)) + ' ر.س';
}

function updateMortgageCalculator() {
  const priceInput = $('#calc-price');
  const downInput = $('#calc-down');
  const yearsInput = $('#calc-years');
  const rateInput = $('#calc-rate');

  if (!priceInput || !downInput || !yearsInput || !rateInput) return;

  const price = parseFloat(priceInput.value) || 2000000;
  const downPercent = parseFloat(downInput.value) || 15;
  const years = parseFloat(yearsInput.value) || 20;
  const annualRatePercent = parseFloat(rateInput.value) || 3.5;

  // Update Displayed Sliders Text
  $('#val-calc-price').textContent = formatNumberSAR(price);
  $('#val-calc-down').textContent = downPercent + '% (' + formatNumberSAR(price * (downPercent / 100)) + ')';
  $('#val-calc-years').textContent = years + ' سنة';
  $('#val-calc-rate').textContent = annualRatePercent + '%';

  // Math Calculations (Islamic Murabaha / Reducing Balance approximation)
  const principal = price * (1 - downPercent / 100);
  const totalMonths = years * 12;
  const monthlyRate = (annualRatePercent / 100) / 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = principal / totalMonths;
  }

  const totalCost = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalCost - principal);

  $('#res-monthly-payment').textContent = formatNumberSAR(monthlyPayment);
  $('#res-loan-amount').textContent = formatNumberSAR(principal);
  $('#res-total-interest').textContent = formatNumberSAR(totalInterest);
  $('#res-total-payment').textContent = formatNumberSAR(totalCost + (price * (downPercent / 100)));
}

['calc-price', 'calc-down', 'calc-years', 'calc-rate'].forEach(id => {
  $(`#${id}`)?.addEventListener('input', updateMortgageCalculator);
});

// Run once on load
updateMortgageCalculator();

/* ==========================================================================
   PROPERTY SUBMISSION FORM (اعرض عقارك)
   ========================================================================== */
const submissionForm = $('#prop-submission-form');
if (submissionForm) {
  submissionForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#owner-name')?.value || 'مالك العقار';
    const phone = $('#owner-phone')?.value || '';
    const propType = $('#owner-prop-type')?.value || 'عقار';
    const location = $('#owner-district')?.value || 'حائل';
    const price = $('#owner-price')?.value || 'غير محدد';
    const notes = $('#owner-notes')?.value || '';

    const text = `*طلب عرض عقار جديد - الحماد للعقارات*\n` +
      `• اسم المالك: ${name}\n` +
      `• رقم الجوال: ${phone}\n` +
      `• نوع العقار: ${propType}\n` +
      `• الموقع / الحي: ${location}\n` +
      `• السعر التقديري: ${price}\n` +
      (notes ? `• تفاصيل إضافية: ${notes}\n` : '');

    window.open(`https://wa.me/966500000000?text=${encodeURIComponent(text)}`, '_blank');
    alert('شكراً لك! تم توجيه طلبك مباشرة إلى فريق الوساطة والتسويق في الحماد للعقارات.');
    submissionForm.reset();
  });
}

// Contact Page Inquiry Form
const contactForm = $('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#contact-name')?.value || 'عميل كريم';
    const phone = $('#contact-phone')?.value || '';
    const topic = $('#contact-topic')?.value || 'استفسار عام';
    const msg = $('#contact-message')?.value || '';

    const text = `*استفسار جديد عبر موقع الحماد للعقارات*\n` +
      `• الاسم: ${name}\n` +
      `• الجوال: ${phone}\n` +
      `• موضوع الاستفسار: ${topic}\n` +
      `• التفاصيل: ${msg}`;

    window.open(`https://wa.me/966500000000?text=${encodeURIComponent(text)}`, '_blank');
    alert('شكراً لك! تم توجيه رسالتك إلى فريق الحماد للعقارات.');
    contactForm.reset();
  });
}

/* ==========================================================================
   THREE.JS 3D SCULPTURE & HERO BACKGROUND
   ========================================================================== */
const makeRenderer = canvas => {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(devicePixelRatio, 1.8));
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.15;
  r.setClearColor(0x000000, 0);
  return r;
};

const titaniumMat = () => new THREE.MeshPhysicalMaterial({
  color: 0x9fa5aa,
  metalness: 0.85,
  roughness: 0.22,
  clearcoat: 0.65,
  clearcoatRoughness: 0.15
});

const darkGraphiteMat = () => new THREE.MeshStandardMaterial({
  color: 0x22262c,
  metalness: 0.75,
  roughness: 0.25
});

const glassCurtainMat = () => new THREE.MeshPhysicalMaterial({
  color: 0x6e7882,
  metalness: 0.35,
  roughness: 0.08,
  transparent: true,
  opacity: 0.72,
  transmission: 0.12,
  clearcoat: 0.9
});

function addTower(parent, { x = 0, z = 0, height = 8, rx = 1.6, rz = 1.15, twist = 0, bands = 14 } = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 1, height, 96, 18, false), titaniumMat());
  body.scale.set(rx, 1, rz);
  body.position.y = height / 2;
  body.rotation.y = twist;
  g.add(body);

  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, height * 0.985, 96, 12, false), glassCurtainMat());
  core.scale.set(rx * 0.93, 1, rz * 0.93);
  core.position.y = height / 2;
  core.rotation.y = twist + 0.04;
  g.add(core);

  const bandMaterial = darkGraphiteMat();
  for (let i = 1; i < bands; i++) {
    const y = 0.45 + i * (height - 0.9) / bands;
    const t = i / bands, rad = 0.98 - (1 - 0.78) * t;
    const band = new THREE.Mesh(new THREE.CylinderGeometry(rad * 1.014, rad * 1.014, 0.055, 96, 1, false), bandMaterial);
    band.scale.set(rx, 1, rz);
    band.position.y = y;
    band.rotation.y = twist;
    g.add(band);
  }

  const ribMat = new THREE.MeshStandardMaterial({ color: 0xd3d6d8, metalness: 0.88, roughness: 0.18 });
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + twist;
    const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, height * 0.92, 8), ribMat);
    const mid = 0.89;
    rib.position.set(Math.cos(a) * rx * mid, height * 0.49, Math.sin(a) * rz * mid);
    g.add(rib);
  }

  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.14, 96), new THREE.MeshPhysicalMaterial({ color: 0xd8dad8, metalness: 0.85, roughness: 0.15, clearcoat: 0.6 }));
  crown.scale.set(rx, 1, rz);
  crown.position.y = height + 0.03;
  crown.rotation.y = twist;
  g.add(crown);

  g.position.set(x, 0, z);
  parent.add(g);
  return g;
}

function makeSculpture() {
  const g = new THREE.Group();
  const podiumMat = new THREE.MeshPhysicalMaterial({ color: 0x6e747a, metalness: 0.8, roughness: 0.25, clearcoat: 0.5 });
  [[4.8, 0.55, 2.15, 0.2], [4.15, 0.34, 1.85, 0.72], [3.45, 0.24, 1.55, 1.04]].forEach(([sx, h, sz, y]) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, h, 128), podiumMat);
    p.scale.set(sx, 1, sz);
    p.position.y = y;
    g.add(p);
  });

  const a = addTower(g, { x: -2.25, z: 0.15, height: 7.4, rx: 1.35, rz: 1.03, twist: -0.16, bands: 13 });
  const b = addTower(g, { x: 0.15, z: -0.15, height: 10.1, rx: 1.6, rz: 1.2, twist: 0.08, bands: 18 });
  const c = addTower(g, { x: 2.65, z: 0.35, height: 6.15, rx: 1.18, rz: 0.94, twist: 0.18, bands: 11 });

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-1.05, 4.75, 0.2),
    new THREE.Vector3(0.2, 5.7, -0.05),
    new THREE.Vector3(1.62, 4.4, 0.2)
  );
  const bridge = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.095, 10, false), new THREE.MeshPhysicalMaterial({ color: 0xc4c7c8, metalness: 0.88, roughness: 0.16, clearcoat: 0.7 }));
  g.add(bridge);

  g.userData.towers = [a, b, c];
  return g;
}

function addStudioLights(scene) {
  scene.add(new THREE.HemisphereLight(0xe9ebec, 0x111417, 2.2));
  const key = new THREE.DirectionalLight(0xf6f7f7, 5.8);
  key.position.set(7, 12, 10);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x8a9299, 2.8);
  fill.position.set(-9, 5, 4);
  scene.add(fill);

  const goldRim = new THREE.DirectionalLight(0xcfa85c, 2.5);
  goldRim.position.set(2, 8, -10);
  scene.add(goldRim);
}

// Initialize Hero 3D Scene
const heroCanvas = $('#hero-canvas');
if (heroCanvas) {
  const renderer = makeRenderer(heroCanvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(27, 1, 0.1, 100);
  addStudioLights(scene);

  const model = makeSculpture();
  model.position.set(0, -2.35, 0);
  model.rotation.y = -0.06;
  scene.add(model);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), new THREE.MeshPhysicalMaterial({ color: 0x1d2127, metalness: 0.75, roughness: 0.32, clearcoat: 0.3 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.82;
  scene.add(ground);

  const shadow = new THREE.Mesh(new THREE.CircleGeometry(5.3, 96), new THREE.MeshBasicMaterial({ color: 0x090a0d, transparent: true, opacity: 0.3, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.8;
  shadow.scale.set(1.55, 0.58, 1);
  scene.add(shadow);

  let mx = 0, my = 0;
  window.addEventListener('pointermove', e => {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  const resize = () => {
    const w = heroCanvas.clientWidth, h = heroCanvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const mobile = w < 768;
    camera.fov = mobile ? 34 : 27;
    camera.position.set(0, mobile ? 4.8 : 5.1, mobile ? 23 : 18.2);
    camera.updateProjectionMatrix();
    model.scale.setScalar(mobile ? 0.82 : 1.08);
  };
  new ResizeObserver(resize).observe(heroCanvas);
  resize();

  const clock = new THREE.Clock();
  (function loop() {
    const t = clock.getElapsedTime();
    model.rotation.y += ((-0.06 + mx * 0.12) - model.rotation.y) * 0.028;
    model.rotation.x += ((-my * 0.035) - model.rotation.x) * 0.02;
    model.position.y = -2.35 + Math.sin(t * 0.45) * 0.035;
    camera.lookAt(0, 3.35, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  })();
}

/* ==========================================================================
   JOURNEY 3D STAGES (Scroll Animation)
   ========================================================================== */
function makeResidential() {
  const g = new THREE.Group();
  addTower(g, { x: -2.2, height: 4.25, rx: 1.15, rz: 0.92, bands: 8 });
  addTower(g, { x: 0, height: 5.25, rx: 1.25, rz: 1, bands: 10 });
  addTower(g, { x: 2.1, height: 3.8, rx: 1.08, rz: 0.88, bands: 7 });
  return g;
}

function makeCommercial() {
  const g = new THREE.Group();
  addTower(g, { height: 10.6, rx: 1.9, rz: 1.35, twist: 0.12, bands: 20 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.07, 12, 120), new THREE.MeshStandardMaterial({ color: 0xb4b8ba, metalness: 0.82, roughness: 0.2 }));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.34;
  g.add(ring);
  return g;
}

function roundedLoop(points) {
  const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal');
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 140, 0.045, 8, true), new THREE.MeshStandardMaterial({ color: 0xb8bcbe, metalness: 0.8, roughness: 0.22 }));
}

function makeLand() {
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const w = 4.8 - i * 0.55, d = 3.3 - i * 0.38, oy = i * 0.12;
    const pts = [
      new THREE.Vector3(-w, oy, -d * 0.55),
      new THREE.Vector3(-w * 0.55, oy, -d),
      new THREE.Vector3(w * 0.45, oy, -d),
      new THREE.Vector3(w, oy, -d * 0.48),
      new THREE.Vector3(w, oy, d * 0.45),
      new THREE.Vector3(w * 0.5, oy, d),
      new THREE.Vector3(-w * 0.5, oy, d),
      new THREE.Vector3(-w, oy, d * 0.48)
    ];
    g.add(roundedLoop(pts));
  }
  g.rotation.x = 0.03;
  return g;
}

function makeInvestment() {
  const g = makeSculpture();
  g.scale.set(0.92, 0.92, 0.92);
  return g;
}

const journey = $('.journey');
const journeyCanvas = $('.journey-canvas');
if (journey && journeyCanvas) {
  const renderer = makeRenderer(journeyCanvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  addStudioLights(scene);

  const groups = [makeResidential(), makeCommercial(), makeLand(), makeInvestment()];
  groups.forEach((g, i) => {
    g.position.y = i === 2 ? -1.3 : -1.7;
    g.scale.setScalar(i === 1 ? 1.18 : i === 2 ? 1.14 : 1.05);
    g.visible = i === 0;
    scene.add(g);
  });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(38, 38), new THREE.MeshPhysicalMaterial({ color: 0x1b1f24, metalness: 0.65, roughness: 0.35 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.72;
  scene.add(floor);

  const labels = $$('.scene-label', journey);
  let stage = 0;

  const resize = () => {
    const w = journeyCanvas.clientWidth, h = journeyCanvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 768 ? 38 : 31;
    camera.position.set(0, w < 768 ? 5.2 : 5.6, w < 768 ? 23 : 18.5);
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(journeyCanvas);
  resize();

  const sync = () => {
    const rect = journey.getBoundingClientRect();
    const range = journey.offsetHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, -rect.top / range));
    const next = Math.min(3, Math.floor(p * 4));
    if (next !== stage) {
      stage = next;
      groups.forEach((g, i) => g.visible = i === stage);
    }
    labels.forEach((el, i) => el.classList.toggle('active', i === stage));
  };
  window.addEventListener('scroll', sync, { passive: true });
  sync();

  const clock = new THREE.Clock();
  (function loop() {
    const t = clock.getElapsedTime();
    groups.forEach((g, i) => {
      if (g.visible) {
        g.rotation.y = Math.sin(t * 0.18 + i) * 0.12;
        g.position.y += ((-1.7 + (i === 2 ? 0.4 : 0) + Math.sin(t * 0.45) * 0.02) - g.position.y) * 0.04;
      }
    });
    camera.lookAt(0, 3, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  })();
}
