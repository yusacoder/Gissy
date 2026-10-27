let siteData = null;
let currentLang = 'tr';
let currentTab = 'links';

document.addEventListener('DOMContentLoaded', () => {
  detectInitialLangAndRoute();
  fetchDataAndInit();

  window.addEventListener('popstate', () => {
    handleRouteChanged();
  });
});

function detectInitialLangAndRoute() {
  const path = window.location.pathname;
  if (path.startsWith('/en')) {
    currentLang = 'en';
  } else {
    currentLang = 'tr';
  }
}

async function fetchDataAndInit() {
  try {
    const res = await fetch('/data.json');
    siteData = await res.json();
    renderSite();
    handleRouteChanged();
  } catch (err) {
    console.error('Data yüklenirken hata oluştu:', err);
  }
}

function getHomeRoute() {
  return currentLang === 'en' ? '/en' : '/';
}

function getReportRoute() {
  return currentLang === 'en' ? '/en/report' : '/sikayet';
}

function navigateTo(event, path) {
  if (event) {
    event.preventDefault();
  }
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
  handleRouteChanged();
}

function handleRouteChanged() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path.startsWith('/en')) {
    currentLang = 'en';
  } else {
    currentLang = 'tr';
  }

  updateLanguageUI();

  const isReport = (path === '/sikayet' || path === '/en/report');

  const pageHome = document.getElementById('page-home');
  const pageReport = document.getElementById('page-report');
  const navHome = document.getElementById('nav-item-home');
  const navReport = document.getElementById('nav-item-report');

  if (isReport) {
    if (pageHome) pageHome.classList.add('hidden');
    if (pageReport) pageReport.classList.remove('hidden');
    if (navHome) navHome.classList.remove('active');
    if (navReport) navReport.classList.add('active');
    window.scrollTo(0, 0);
  } else {
    if (pageHome) pageHome.classList.remove('hidden');
    if (pageReport) pageReport.classList.add('hidden');
    if (navHome) navHome.classList.add('active');
    if (navReport) navReport.classList.remove('active');
  }

  if (siteData) {
    renderSite();
  }
}

function switchLanguage(lang) {
  if (currentLang === lang) return;

  const isReport = (window.location.pathname === '/sikayet' || window.location.pathname === '/en/report');
  currentLang = lang;

  let newPath = getHomeRoute();
  if (isReport) {
    newPath = getReportRoute();
  }

  window.history.pushState({}, '', newPath);
  handleRouteChanged();
}

function updateLanguageUI() {
  const btnTr = document.getElementById('lang-tr-btn');
  const btnEn = document.getElementById('lang-en-btn');

  if (btnTr && btnEn) {
    if (currentLang === 'tr') {
      btnTr.classList.add('active');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnTr.classList.remove('active');
    }
  }

  const navHome = document.getElementById('nav-item-home');
  const navReport = document.getElementById('nav-item-report');
  if (navHome) navHome.href = getHomeRoute();
  if (navReport) navReport.href = getReportRoute();

  const bottomLabelHome = document.getElementById('bottom-label-home');
  const bottomLabelReport = document.getElementById('bottom-label-report');

  if (bottomLabelHome) {
    bottomLabelHome.innerText = currentLang === 'en' ? 'Home' : 'Ana Menü';
  }
  if (bottomLabelReport) {
    bottomLabelReport.innerText = currentLang === 'en' ? 'Report' : 'Şikâyet';
  }
}

function renderSite() {
  if (!siteData) return;

  const t = (siteData.translations && siteData.translations[currentLang]) ? siteData.translations[currentLang] : null;

  // Bakım Modu Kontrolü
  const maintenanceScreen = document.getElementById('maintenance-screen');
  const appContainer = document.getElementById('app-container');

  if (siteData.siteSettings && siteData.siteSettings.maintenanceMode) {
    if (maintenanceScreen) maintenanceScreen.classList.remove('hidden');
    if (appContainer) appContainer.classList.add('hidden');
    const msg = siteData.siteSettings.maintenanceMessage;
    const msgText = typeof msg === 'object' ? msg[currentLang] : msg;
    if (document.getElementById('maintenance-msg')) {
      document.getElementById('maintenance-msg').innerText = msgText || '';
    }
    if (document.getElementById('maintenance-title')) {
      document.getElementById('maintenance-title').innerText = currentLang === 'en' ? 'Under Maintenance' : 'Bakımdayız';
    }
    return;
  } else {
    if (maintenanceScreen) maintenanceScreen.classList.add('hidden');
    if (appContainer) appContainer.classList.remove('hidden');
  }

  // Profile
  const profile = siteData.profile || {};
  const avatarElem = document.getElementById('profile-avatar');
  if (avatarElem) avatarElem.src = profile.avatarUrl || 'gissy.jpg';

  const nameElem = document.getElementById('profile-name');
  if (nameElem) nameElem.innerText = profile.name || 'Miray K.';

  const handleElem = document.getElementById('profile-handle');
  if (handleElem) handleElem.innerText = profile.handle || '@kgissydub';

  const verifiedBadge = document.getElementById('verified-badge');
  if (verifiedBadge) {
    if (profile.showVerifiedBadge) {
      verifiedBadge.classList.remove('hidden');
    } else {
      verifiedBadge.classList.add('hidden');
    }
  }

  const bioContainer = document.getElementById('profile-bio');
  if (bioContainer && profile.bio) {
    const bioText = typeof profile.bio === 'object' ? profile.bio[currentLang] : profile.bio;
    let formattedBio = bioText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    bioContainer.innerHTML = formattedBio;
  }

  // Tab Labels
  if (t && t.tabs) {
    const labelLinks = document.getElementById('label-tab-links');
    const labelDubbings = document.getElementById('label-tab-dubbings');
    if (labelLinks) labelLinks.innerText = t.tabs.links;
    if (labelDubbings) labelDubbings.innerText = t.tabs.dubbings;
  }

  // Links & Dubbings
  renderLinks(siteData.links || []);
  renderDubbings(siteData.dubbingProjects || []);

  // Footer
  if (siteData.footer) {
    const copyrightText = typeof siteData.footer.copyright === 'object'
      ? siteData.footer.copyright[currentLang]
      : siteData.footer.copyright;

    const copyElem1 = document.getElementById('footer-copyright');
    const copyElem2 = document.getElementById('footer-copyright-report');
    if (copyElem1) copyElem1.innerText = copyrightText || '';
    if (copyElem2) copyElem2.innerText = copyrightText || '';
  }

  // Report Form Translations
  if (t && t.report) {
    const r = t.report;
    setElemText('report-title', r.title);
    setElemText('report-subtitle', r.subtitle);
    setElemText('label-fullName', r.fullName + ' *');
    setElemPlaceholder('fullName', r.fullNamePlaceholder);
    setElemText('label-countryCode', r.countryCode + ' *');
    setElemText('label-phoneNumber', r.phone + ' *');
    setElemPlaceholder('phoneNumber', r.phonePlaceholder);
    setElemText('label-reportedUser', r.reportedUser + ' *');
    setElemPlaceholder('reportedUser', r.reportedUserPlaceholder);
    setElemText('label-reason', r.reason + ' *');
    setElemText('opt-reasonSelect', r.reasonSelect);
    setElemText('opt-reasonHarassment', r.reasonHarassment);
    setElemText('opt-reasonSpam', r.reasonSpam);
    setElemText('opt-reasonInappropriate', r.reasonInappropriate);
    setElemText('opt-reasonImpersonation', r.reasonImpersonation);
    setElemText('opt-reasonOther', r.reasonOther);
    setElemText('label-description', r.description + ' *');
    setElemPlaceholder('complaintDescription', r.descriptionPlaceholder);
    setElemText('report-warning', r.warning);
    setElemText('label-confirmation', r.confirmation);
    setElemText('submit-btn-text', r.submit);
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function setElemText(id, text) {
  const elem = document.getElementById(id);
  if (elem && text) elem.innerText = text;
}

function setElemPlaceholder(id, placeholder) {
  const elem = document.getElementById(id);
  if (elem && placeholder) elem.placeholder = placeholder;
}

function renderLinks(links) {
  const container = document.getElementById('links-container');
  if (!container) return;
  container.innerHTML = '';

  links.forEach(link => {
    const card = document.createElement('a');
    card.className = 'link-card';
    card.href = link.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    let iconClass = 'fa-solid fa-link';
    if (link.icon === 'youtube') iconClass = 'fa-brands fa-youtube';
    else if (link.icon === 'instagram') iconClass = 'fa-brands fa-instagram';
    else if (link.icon === 'tiktok') iconClass = 'fa-brands fa-tiktok';
    else if (link.icon === 'discord') iconClass = 'fa-brands fa-discord';
    else if (link.icon === 'mic') iconClass = 'fa-solid fa-microphone-lines';

    const titleText = typeof link.title === 'object' ? link.title[currentLang] : link.title;
    const subtitleText = typeof link.subtitle === 'object' ? link.subtitle[currentLang] : link.subtitle;
    const badgeText = link.badge ? (typeof link.badge === 'object' ? link.badge[currentLang] : link.badge) : null;

    card.innerHTML = `
      <div class="link-left">
        <div class="link-icon-box" style="${link.color ? `color: ${link.color};` : ''}">
          <i class="${iconClass}"></i>
        </div>
        <div class="link-details">
          <span class="link-title">${titleText}</span>
          ${subtitleText ? `<span class="link-subtitle">${subtitleText}</span>` : ''}
        </div>
      </div>
      <div class="link-right">
        ${badgeText ? `<span class="link-badge">${badgeText}</span>` : ''}
        <i class="fa-solid fa-chevron-right link-arrow"></i>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderDubbings(dubbings) {
  const container = document.getElementById('dubbings-container');
  if (!container) return;
  container.innerHTML = '';

  dubbings.forEach(dub => {
    const card = document.createElement('div');
    card.className = 'dubbing-card';

    const tagsHtml = dub.tags ? dub.tags.map(t => `<span class="dubbing-tag">${t}</span>`).join('') : '';

    const categoryText = typeof dub.category === 'object' ? dub.category[currentLang] : (dub.category || 'Dublaj');
    const titleText = typeof dub.title === 'object' ? dub.title[currentLang] : dub.title;
    const descText = typeof dub.description === 'object' ? dub.description[currentLang] : dub.description;

    card.innerHTML = `
      <div class="dubbing-thumb-wrapper" onclick="openModal('${dub.videoUrl}', '${escapeQuotes(titleText)}', '${escapeQuotes(descText)}')">
        <img src="${dub.thumbnail}" alt="${titleText}" class="dubbing-thumb">
        <div class="play-overlay">
          <div class="play-btn">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
        <span class="dubbing-category-badge">${categoryText}</span>
      </div>
      <div class="dubbing-body">
        <span class="dubbing-role">${dub.role || ''}</span>
        <h3 class="dubbing-title">${titleText}</h3>
        <p class="dubbing-desc">${descText}</p>
        <div class="dubbing-tags">
          ${tagsHtml}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

/* Sekmeler Arası Geçiş */
function switchTab(tabName) {
  currentTab = tabName;
  const tabLinks = document.getElementById('tab-links');
  const tabDubbings = document.getElementById('tab-dubbings');
  const btnLinks = document.getElementById('tab-links-btn');
  const btnDubbings = document.getElementById('tab-dubbings-btn');

  if (tabName === 'links') {
    if (tabLinks) tabLinks.classList.remove('hidden');
    if (tabDubbings) tabDubbings.classList.add('hidden');
    if (btnLinks) btnLinks.classList.add('active');
    if (btnDubbings) btnDubbings.classList.remove('active');
  } else if (tabName === 'dubbings') {
    if (tabLinks) tabLinks.classList.add('hidden');
    if (tabDubbings) tabDubbings.classList.remove('hidden');
    if (btnLinks) btnLinks.classList.remove('active');
    if (btnDubbings) btnDubbings.classList.add('active');
  }
}

/* Modal İşlemleri */
function openModal(videoUrl, title, desc) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-iframe');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');

  if (iframe) iframe.src = videoUrl + "?autoplay=1";
  if (modalTitle) modalTitle.innerText = title;
  if (modalDesc) modalDesc.innerText = desc;

  if (modal) modal.classList.remove('hidden');
}

function closeModal(event) {
  if (event.target.id === 'video-modal') {
    closeModalDirect();
  }
}

function closeModalDirect() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('modal-iframe');
  if (iframe) iframe.src = '';
  if (modal) modal.classList.add('hidden');
}

/* Şikâyet Formu Gönderimi (AJAX FormSubmit) */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('complaint-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('submit-btn-text');
  const btnSpinner = document.getElementById('submit-btn-spinner');
  const formMsg = document.getElementById('form-message');

  const t = (siteData && siteData.translations && siteData.translations[currentLang]) ? siteData.translations[currentLang].report : {};

  formMsg.className = 'form-message hidden';
  formMsg.innerText = '';

  const fullName = document.getElementById('fullName').value.trim();
  const countryCode = document.getElementById('countryCode').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const reportedUser = document.getElementById('reportedUser').value.trim();
  const complaintReason = document.getElementById('complaintReason').value;
  const complaintDescription = document.getElementById('complaintDescription').value.trim();
  const accuracyConfirmation = document.getElementById('accuracyConfirmation').checked;

  if (!fullName || !countryCode || !phoneNumber || !reportedUser || !complaintReason || !complaintDescription || !accuracyConfirmation) {
    formMsg.innerText = currentLang === 'en'
      ? 'Please fill in all required fields and accept the confirmation.'
      : 'Lütfen tüm zorunlu alanları doldurunuz ve onay kutusunu işaretleyiniz.';
    formMsg.classList.add('error');
    formMsg.classList.remove('hidden');
    return;
  }

  // UI - Disabling submit button
  submitBtn.disabled = true;
  if (btnText) btnText.innerText = t.submitting || (currentLang === 'en' ? 'Submitting...' : 'Gönderiliyor...');
  if (btnSpinner) btnSpinner.classList.remove('hidden');

  const payload = {
    _subject: '[Eternal Production] Yeni Kullanıcı Şikâyeti – Gissy',
    _template: 'table',
    'Ad Soyad': fullName,
    'Ülke Kodu': countryCode,
    'Telefon Numarası': phoneNumber,
    'Şikâyet Edilen Kullanıcı': reportedUser,
    'Şikâyet Nedeni': complaintReason,
    'Şikâyet Açıklaması': complaintDescription,
    'Kullanılan Dil': currentLang.toUpperCase(),
    'Gönderim Tarihi': new Date().toLocaleString(currentLang === 'en' ? 'en-US' : 'tr-TR')
  };

  try {
    const response = await fetch('https://formsubmit.co/ajax/destek@eternalproduction.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && (result.success === "true" || result.success === true)) {
      formMsg.innerText = t.success || (currentLang === 'en' ? 'Your complaint has been submitted successfully.' : 'Şikâyetiniz başarıyla iletilmiştir.');
      formMsg.classList.add('success');
      formMsg.classList.remove('hidden');
      form.reset();
      document.getElementById('countryCode').value = '+90';
    } else {
      throw new Error(result.message || 'FormSubmit response error');
    }
  } catch (err) {
    console.error('Complaint submission error:', err);
    formMsg.innerText = t.error || (currentLang === 'en' ? 'An error occurred while submitting. Please try again.' : 'Şikâyet gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    formMsg.classList.add('error');
    formMsg.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    if (btnText) btnText.innerText = t.submit || (currentLang === 'en' ? 'Submit Complaint' : 'Şikâyeti Gönder');
    if (btnSpinner) btnSpinner.classList.add('hidden');
  }
}