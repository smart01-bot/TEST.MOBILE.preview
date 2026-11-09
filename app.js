(() => {
  "use strict";

  const root = document.getElementById("root");
  if (!root) return;

  const icons = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',
    wallet: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M16 15h2"/><path d="M7 5V3h12"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
    building: '<path d="M3 21h18M5 21V5l7-3 7 3v16M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.7 1.1c-.7 1.1-2.3 1.4-2.3 3M12 17h.01"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'
  };

  const icon = (name, size = 20) =>
    '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (icons[name] || icons.info) + '</svg>';

  const offers = [
    {
      id: "OF-101", institution: "Kijani Finance", initials: "KF",
      product: "Personal Flex Loan", category: "personal",
      description: "A sample unsecured loan option for planned personal expenses.",
      amount: "TZS 100,000 – 5,000,000", rate: "16% – 22% p.a.",
      term: "6 – 24 months", fee: "Illustrative fee: 2%",
      deadline: "Open demo listing", purpose: "Personal needs"
    },
    {
      id: "OF-102", institution: "Umoja Credit Co.", initials: "UC",
      product: "Salary Advance", category: "personal",
      description: "A fictional short-term product concept for salaried customers.",
      amount: "TZS 50,000 – 2,000,000", rate: "2% monthly",
      term: "1 – 12 months", fee: "Illustrative fee: 1.5%",
      deadline: "Open demo listing", purpose: "Short-term needs"
    },
    {
      id: "OF-103", institution: "Pamoja Capital", initials: "PC",
      product: "SME Growth Loan", category: "business",
      description: "A fictional financing example for small-business growth plans.",
      amount: "TZS 500,000 – 15,000,000", rate: "18% – 24% p.a.",
      term: "6 – 36 months", fee: "Illustrative fee: 2.5%",
      deadline: "Open demo listing", purpose: "Business growth"
    },
    {
      id: "OF-104", institution: "Bahari Microfinance", initials: "BM",
      product: "Working Capital", category: "business",
      description: "A sample revolving working-capital product for demonstration.",
      amount: "TZS 300,000 – 8,000,000", rate: "1.8% monthly",
      term: "3 – 18 months", fee: "Illustrative fee: 2%",
      deadline: "Open demo listing", purpose: "Working capital"
    }
  ];

  const state = {
    screen: "welcome",
    selectedOffer: "OF-101",
    offerFilter: "all",
    appFilter: "all",
    employment: "employed",
    applications: [
      { id: "LN-24081", type: "Loan", name: "Personal Flex Loan", amount: 1200000, status: "Under review", date: "08 Nov 2026" },
      { id: "CR-33017", type: "Credit", name: "SME Growth Loan", amount: 3500000, status: "Pending", date: "02 Nov 2026" }
    ],
    user: { name: "Alex Mrema", email: "alex.mrema@example.test", phone: "+255 700 000 000" },
    drawerOpen: false,
    toast: "",
    activeFaq: -1,
    toastTimer: null
  };

  const money = (value) => "TZS " + Number(value || 0).toLocaleString("en-TZ");
  const initials = (name) => name.split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase();
  const currentOffer = () => offers.find(item => item.id === state.selectedOffer) || offers[0];
  const statusClass = (value) => {
    const normalized = String(value).toLowerCase();
    if (normalized.includes("approved")) return "approved";
    if (normalized.includes("review")) return "review";
    if (normalized.includes("reject")) return "rejected";
    return "pending";
  };

  function toast(message, isError = false) {
    state.toast = message;
    render();
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => {
      state.toast = "";
      render();
    }, 2600);
  }

  function demoNotice() {
    return '<div class="demo-strip">' + icon("info", 15) +
      '<span>INTERACTIVE DEMO — sample data only. No real account, lender, transaction or backend is connected.</span></div>';
  }

  function statusBar() {
    return '<div class="statusbar"><span>9:41</span><span class="status-icons">' +
      '<span>●</span><span>◖</span>' +
      '<svg viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 5c4-4 12-4 16 0M4 8c3-3 7-3 10 0M7 11c1-1 3-1 4 0"/><path d="M9 13h.01"/></svg>' +
      '</span></div>';
  }

  function brand() {
    return '<div class="brand-mark"><div><span class="brand-word">TEST</span><span class="brand-caption">FINANCE MARKETPLACE</span></div></div>';
  }

  function bottomNav(active) {
    const items = [
      ["home", "Home", "home"],
      ["offers", "Offers", "grid"],
      ["applications", "Applications", "file"],
      ["profile", "Profile", "user"]
    ];
    return '<nav class="bottom-nav" aria-label="Main navigation">' + items.map(([screen, label, glyph]) =>
      '<button class="nav-item ' + (active === screen ? "active" : "") + '" data-action="navigate" data-screen="' + screen + '">' +
      icon(glyph, 20) + '<span>' + label + '</span></button>'
    ).join("") + '</nav>';
  }

  function drawer() {
    if (!state.drawerOpen) return "";
    const links = [
      ["home", "Home", "home"],
      ["offers", "Bank Credit Offers", "wallet"],
      ["applications", "Loan Applications", "file"],
      ["help", "How to Apply", "help"],
      ["profile", "Profile", "user"]
    ];
    return '<div class="drawer-backdrop" data-action="close-drawer">' +
      '<aside class="drawer" aria-label="Navigation menu" data-stop-propagation>' +
      '<div class="drawer-head">' + brand() +
      '<button class="icon-btn" style="color:var(--p);border-color:var(--b);background:#f7faff" data-action="close-drawer" aria-label="Close menu">' + icon("close") + '</button></div>' +
      '<div class="drawer-user"><div class="avatar">' + initials(state.user.name) + '</div><div><strong>' + state.user.name + '</strong><small>Personal demo account</small></div></div>' +
      '<div class="drawer-label">Workspace</div>' +
      links.map(([screen, label, glyph]) => '<button class="drawer-link ' + (state.screen === screen ? "active" : "") + '" data-action="navigate" data-screen="' + screen + '">' + icon(glyph, 17) + label + '</button>').join("") +
      '<div class="drawer-label">Preview</div>' +
      '<button class="drawer-link" data-action="show-about">' + icon("info", 17) + 'About this demo</button>' +
      '<button class="drawer-link" data-action="restart">' + icon("refresh", 17) + 'Restart preview</button>' +
      '</aside></div>';
  }

  function toastMarkup() {
    if (!state.toast) return "";
    return '<div class="toast" role="status">' + state.toast + '</div>';
  }

  function shell(title, body, active, options = {}) {
    const homeHeader = options.home;
    const header = homeHeader
      ? '<header class="appbar"><button class="icon-btn" data-action="open-drawer" aria-label="Open menu">' + icon("menu") + '</button><div class="appbar-title">' + brand() + '</div><button class="icon-btn" data-action="navigate" data-screen="notifications" aria-label="Notifications">' + icon("bell") + '</button></header>'
      : '<header class="appbar"><button class="icon-btn" data-action="back" aria-label="Go back">' + icon("back") + '</button><div class="appbar-title"><strong>' + title + '</strong><small>TEST Mobile preview</small></div><button class="icon-btn" data-action="open-drawer" aria-label="Open menu">' + icon("menu") + '</button></header>';

    return '<main class="device">' + statusBar() + header +
      '<section class="app-content">' + demoNotice() + body + '</section>' +
      bottomNav(active) + drawer() + toastMarkup() + '</main>';
  }

  function welcomeScreen() {
    return '<main class="device">' + statusBar() +
      '<section class="welcome-screen">' +
      '<div class="welcome-top">' + brand() + '<span class="preview-pill">Live preview</span></div>' +
      '<div class="welcome-main"><div class="welcome-kicker">A clearer way to explore finance</div>' +
      '<h1>Your financial options, in one place.</h1>' +
      '<p>Explore a sample lending marketplace, review fictional credit offers and follow an application journey in this interactive TEST preview.</p>' +
      '<div class="welcome-visual"><div class="welcome-orbit"></div><div class="welcome-mini-card"><small>Marketplace preview</small><strong>Explore your options</strong><span>DEMO ENVIRONMENT</span></div></div></div>' +
      '<div class="welcome-actions"><button class="btn btn-amber" data-action="start-demo">Explore the app ' + icon("arrow", 17) + '</button>' +
      '<button class="btn btn-ghost" data-action="go-login">View demo sign in</button>' +
      '<p class="welcome-note">No sign-up or password is required. All information is fictional and stays in this browser session.</p></div>' +
      '</section></main>';
  }

  function loginScreen() {
    return '<main class="device">' + statusBar() +
      '<header class="appbar"><button class="icon-btn" data-action="navigate" data-screen="welcome" aria-label="Back">' + icon("back") + '</button><div class="appbar-title">' + brand() + '</div></header>' +
      '<section class="app-content login-wrap"><div class="login-intro"><h1>Welcome back</h1><p>Sign in screen preview. This form does not authenticate or send any information.</p></div>' +
      '<div class="demo-login-note">Demo access is available below. Use any sample details or skip sign-in completely.</div>' +
      '<form class="form-card" id="login-form"><div class="field"><label for="login-email">Email address</label><input id="login-email" type="email" placeholder="name@example.com" value="alex.mrema@example.test" /></div>' +
      '<div class="field"><label for="login-password">Password</label><input id="login-password" type="password" placeholder="Enter any text" value="preview-only" /></div>' +
      '<button class="btn btn-primary" type="submit">Continue in preview ' + icon("arrow", 16) + '</button>' +
      '<button class="btn btn-outline" type="button" style="margin-top:9px" data-action="start-demo">Skip sign in — explore demo</button></form>' +
      '<p class="muted-note">The preview has no real login, account creation, password reset or identity verification.</p></section></main>';
  }

  function homeScreen() {
    const body = '<div style="margin-bottom:14px"><p class="view-subtitle">Good morning,</p><h1 class="view-heading">' + state.user.name.split(" ")[0] + ' 👋</h1><p class="view-subtitle">Here is a snapshot of your demo account.</p></div>' +
      '<div class="hero-card"><div class="hero-eyebrow">Find your next opportunity</div><h2>Explore finance options that fit your plans.</h2><p>Compare illustrative listings from fictional institutions in one simple marketplace.</p><button class="btn btn-amber btn-small" data-action="navigate" data-screen="offers">Explore credit offers ' + icon("arrow", 14) + '</button></div>' +
      '<div class="stats-grid"><div class="stat-card"><small><span class="stat-dot"></span>Credit offers</small><strong>04</strong></div><div class="stat-card"><small><span class="stat-dot"></span>Applications</small><strong>' + String(state.applications.length).padStart(2, "0") + '</strong></div><div class="stat-card"><small><span class="stat-dot"></span>In progress</small><strong>' + state.applications.filter(a => a.status !== "Approved" && a.status !== "Rejected").length.toString().padStart(2, "0") + '</strong></div></div>' +
      '<div class="section-heading"><h2>Quick access</h2><button data-action="open-drawer">View all</button></div>' +
      '<div class="shortcut-grid">' +
      '<button class="shortcut" data-action="navigate" data-screen="offers"><span class="shortcut-icon">' + icon("wallet", 17) + '</span><span><strong>Credit offers</strong><small>Browse the marketplace</small></span></button>' +
      '<button class="shortcut" data-action="navigate" data-screen="loanFlow"><span class="shortcut-icon">' + icon("plus", 17) + '</span><span><strong>Apply for a loan</strong><small>Start a demo request</small></span></button>' +
      '<button class="shortcut" data-action="navigate" data-screen="applications"><span class="shortcut-icon">' + icon("file", 17) + '</span><span><strong>My applications</strong><small>Track sample progress</small></span></button>' +
      '<button class="shortcut" data-action="navigate" data-screen="help"><span class="shortcut-icon">' + icon("help", 17) + '</span><span><strong>How to apply</strong><small>Understand the steps</small></span></button></div>' +
      '<div class="section-heading"><h2>Featured offers</h2><button data-action="navigate" data-screen="offers">See all</button></div>' +
      '<div class="offer-list">' + offers.slice(0, 2).map(offerCard).join("") + '</div>' +
      '<div class="section-heading"><h2>Recent activity</h2><button data-action="navigate" data-screen="applications">View all</button></div>' +
      applicationList(state.applications.slice(0, 2));
    return shell("Home", body, "home", { home: true });
  }

  function offerCard(item) {
    return '<article class="offer-card"><div class="offer-top"><div class="institution"><div class="institution-mark">' + item.initials + '</div><div class="institution-name"><strong>' + item.institution + '</strong><small>Illustrative institution</small></div></div><span class="demo-tag">DEMO LISTING</span></div>' +
      '<h3>' + item.product + '</h3><p>' + item.description + '</p>' +
      '<div class="offer-metrics"><div class="metric"><small>Amount</small><strong>' + item.amount.replace(" – ", "–") + '</strong></div><div class="metric"><small>Rate</small><strong>' + item.rate + '</strong></div><div class="metric"><small>Term</small><strong>' + item.term + '</strong></div></div>' +
      '<div class="offer-footer"><small>' + (item.category === "business" ? "Business finance" : "Personal finance") + '</small><button class="btn btn-outline btn-small" data-action="open-offer" data-id="' + item.id + '">View details ' + icon("chevron", 13) + '</button></div></article>';
  }

  function offersScreen() {
    const filtered = offers.filter(item => state.offerFilter === "all" || item.category === state.offerFilter);
    const body = '<div><h1 class="view-heading">Credit marketplace</h1><p class="view-subtitle">Browse fictional offers created for this preview.</p></div>' +
      '<div class="section-heading"><h2>Explore offers</h2><span class="demo-tag">4 SAMPLE LISTINGS</span></div>' +
      '<div class="filter-row">' +
      '<button class="filter-chip ' + (state.offerFilter === "all" ? "active" : "") + '" data-action="offer-filter" data-filter="all">All offers</button>' +
      '<button class="filter-chip ' + (state.offerFilter === "personal" ? "active" : "") + '" data-action="offer-filter" data-filter="personal">Personal</button>' +
      '<button class="filter-chip ' + (state.offerFilter === "business" ? "active" : "") + '" data-action="offer-filter" data-filter="business">Business</button>' +
      '</div><div class="offer-list">' + (filtered.length ? filtered.map(offerCard).join("") : emptyState("No offers in this category", "Choose another filter to see the sample listings.")) + '</div>' +
      '<p class="muted-note">Offer names, rates, amounts and terms are invented for interface testing. They are not available financial products.</p>';
    return shell("Credit Offers", body, "offers");
  }

  function offerDetailScreen() {
    const item = currentOffer();
    const body = '<div class="detail-hero"><small>' + item.institution + ' · fictional institution</small><h2>' + item.product + '</h2><p>' + item.description + '</p><div style="margin-top:13px"><span class="demo-tag">ILLUSTRATIVE DEMO OFFER</span></div></div>' +
      '<div class="section-heading"><h2>Offer overview</h2></div><div class="detail-grid">' +
      '<div class="detail-cell"><small>Indicative amount</small><strong>' + item.amount + '</strong></div>' +
      '<div class="detail-cell"><small>Illustrative rate</small><strong>' + item.rate + '</strong></div>' +
      '<div class="detail-cell"><small>Sample repayment term</small><strong>' + item.term + '</strong></div>' +
      '<div class="detail-cell"><small>Sample fee</small><strong>' + item.fee + '</strong></div></div>' +
      '<div class="section-heading"><h2>Before you continue</h2></div><div class="panel" style="padding:14px"><p class="view-subtitle">This screen is only a product-detail prototype. No lender has supplied or approved this offer. Applying below creates a local sample entry and does not send a request.</p></div>' +
      '<div style="margin-top:15px"><button class="btn btn-primary" data-action="apply-credit">Try demo application ' + icon("arrow", 16) + '</button></div>' +
      '<button class="btn btn-outline" style="margin-top:8px" data-action="back-to-offers">Back to marketplace</button>';
    return shell("Offer Details", body, "offers");
  }

  function creditApplyScreen() {
    const item = currentOffer();
    const body = '<h1 class="view-heading">Credit application</h1><p class="view-subtitle">Try the sample form for ' + item.product + '.</p>' +
      '<div class="inline-note">This is a local-only demonstration. Submitting adds a fictional application to the preview; nothing is transmitted.</div>' +
      '<form class="form-card" id="credit-form"><div class="field"><label for="credit-name">Applicant name</label><input id="credit-name" name="name" value="' + state.user.name + '" required /></div>' +
      '<div class="field"><label for="credit-amount">Requested amount (TZS)</label><input id="credit-amount" name="amount" type="number" min="50000" step="50000" value="500000" required /></div>' +
      '<div class="field"><label for="credit-purpose">Purpose</label><select id="credit-purpose" name="purpose"><option>Personal expenses</option><option>Education</option><option>Business growth</option><option>Working capital</option></select></div>' +
      '<button class="btn btn-primary" type="submit">Submit demo application</button><button class="btn btn-outline" type="button" style="margin-top:8px" data-action="back-to-detail">Cancel</button></form>';
    return shell("Apply for Credit", body, "offers");
  }

  function applicationList(items) {
    if (!items.length) return emptyState("No applications yet", "Start a demo loan or credit application to see it appear here.");
    return '<div>' + items.map(item =>
      '<article class="application-card"><div class="application-head"><div><strong>' + item.name + '</strong><small>' + item.id + ' · ' + item.type + ' application</small></div><span class="status ' + statusClass(item.status) + '">' + item.status + '</span></div>' +
      '<div class="application-meta"><small>' + item.date + '</small><strong>' + money(item.amount) + '</strong></div></article>'
    ).join("") + '</div>';
  }

  function applicationsScreen() {
    const filtered = state.applications.filter(item => state.appFilter === "all" || item.type.toLowerCase() === state.appFilter);
    const body = '<h1 class="view-heading">My applications</h1><p class="view-subtitle">Track the sample requests in your demo account.</p>' +
      '<div class="section-heading"><h2>Application history</h2><span class="demo-tag">' + state.applications.length + ' RECORDS</span></div>' +
      '<div class="tab-row">' +
      '<button class="tab-chip ' + (state.appFilter === "all" ? "active" : "") + '" data-action="app-filter" data-filter="all">All</button>' +
      '<button class="tab-chip ' + (state.appFilter === "loan" ? "active" : "") + '" data-action="app-filter" data-filter="loan">Loans</button>' +
      '<button class="tab-chip ' + (state.appFilter === "credit" ? "active" : "") + '" data-action="app-filter" data-filter="credit">Credit</button>' +
      '</div>' + applicationList(filtered) +
      '<div style="margin-top:14px"><button class="btn btn-primary" data-action="navigate" data-screen="loanFlow">Start a loan application ' + icon("arrow", 16) + '</button></div>' +
      '<p class="muted-note">Application statuses and reference numbers are sample values only.</p>';
    return shell("Loan Applications", body, "applications");
  }

  function loanFlowScreen() {
    const body = '<h1 class="view-heading">Apply for a loan</h1><p class="view-subtitle">A guided sample application journey.</p>' +
      '<div class="progress-row"><span class="progress-segment active"></span><span class="progress-segment active"></span><span class="progress-segment"></span></div>' +
      '<div class="section-heading"><h2>1. Employment type</h2></div>' +
      '<div class="choice-grid">' +
      '<button class="choice ' + (state.employment === "employed" ? "active" : "") + '" data-action="employment" data-value="employed">' + icon("briefcase", 22) + '<strong>Employed</strong><small>Earn a regular salary or wage</small></button>' +
      '<button class="choice ' + (state.employment === "self-employed" ? "active" : "") + '" data-action="employment" data-value="self-employed">' + icon("building", 22) + '<strong>Self-employed</strong><small>Run a business or work independently</small></button>' +
      '</div>' +
      '<div class="section-heading"><h2>2. Request details</h2></div>' +
      '<form class="form-card" id="loan-form"><input type="hidden" name="employment" value="' + state.employment + '" />' +
      '<div class="field"><label for="loan-amount">Requested amount (TZS)</label><input id="loan-amount" name="amount" type="number" min="50000" step="50000" value="1000000" required /><span class="field-hint">Enter a sample amount between TZS 50,000 and TZS 20,000,000.</span></div>' +
      '<div class="field"><label for="loan-purpose">Purpose of the loan</label><select id="loan-purpose" name="purpose"><option>Personal expenses</option><option>Education</option><option>Medical expenses</option><option>Business investment</option><option>Home improvement</option></select></div>' +
      (state.employment === "employed" ? '<div class="field"><label for="employer">Employer name (sample)</label><input id="employer" name="employer" placeholder="Enter a fictional employer" required /></div>' : '<div class="field"><label for="business">Business or activity (sample)</label><input id="business" name="employer" placeholder="Enter a fictional business" required /></div>') +
      '<div class="field"><label for="loan-notes">Additional notes <span style="font-weight:500;color:var(--m)">(optional)</span></label><textarea id="loan-notes" name="notes" placeholder="Add a short note"></textarea></div>' +
      '<button class="btn btn-primary" type="submit">Review and submit demo request ' + icon("arrow", 16) + '</button>' +
      '<button class="btn btn-outline" type="button" style="margin-top:8px" data-action="navigate" data-screen="home">Cancel</button></form>';
    return shell("Apply for a Loan", body, "applications");
  }

  function profileScreen() {
    const body = '<h1 class="view-heading">My profile</h1><p class="view-subtitle">Your sample account information.</p>' +
      '<div class="profile-card" style="margin-top:16px"><div class="avatar">' + initials(state.user.name) + '</div><h2>' + state.user.name + '</h2><p>' + state.user.email + '</p><div style="margin-top:14px"><span class="demo-tag">PERSONAL DEMO ACCOUNT</span></div></div>' +
      '<div class="section-heading"><h2>Account settings</h2></div><div class="profile-menu">' +
      '<button data-action="navigate" data-screen="editProfile"><span>' + icon("edit") + 'Edit personal details</span>' + icon("chevron", 16) + '</button>' +
      '<button data-action="toast" data-message="Password management is not active in this preview.">' + '<span>' + icon("shield") + 'Security settings</span>' + icon("chevron", 16) + '</button>' +
      '<button data-action="navigate" data-screen="help"><span>' + icon("help") + 'Help and guidance</span>' + icon("chevron", 16) + '</button>' +
      '<button data-action="show-about"><span>' + icon("info") + 'About this preview</span>' + icon("chevron", 16) + '</button>' +
      '</div><button class="btn btn-outline" style="margin-top:14px" data-action="restart">' + icon("logout", 16) + ' Exit demo and restart</button>';
    return shell("Profile", body, "profile");
  }

  function editProfileScreen() {
    const body = '<h1 class="view-heading">Edit profile</h1><p class="view-subtitle">Changes are saved only in this page session.</p>' +
      '<form id="profile-form" class="form-card" style="margin-top:16px"><div class="field"><label for="profile-name">Full name</label><input id="profile-name" name="name" value="' + state.user.name + '" required /></div>' +
      '<div class="field"><label for="profile-email">Email address</label><input id="profile-email" name="email" type="email" value="' + state.user.email + '" required /></div>' +
      '<div class="field"><label for="profile-phone">Phone number</label><input id="profile-phone" name="phone" value="' + state.user.phone + '" required /></div>' +
      '<button class="btn btn-primary" type="submit">Save demo profile</button><button class="btn btn-outline" type="button" style="margin-top:8px" data-action="navigate" data-screen="profile">Cancel</button></form>';
    return shell("Edit Profile", body, "profile");
  }

  function helpScreen() {
    const questions = [
      ["Is this a real loan marketplace?", "No. This is a front-end preview using fictional institutions, products, rates and sample application statuses."],
      ["Does submitting an application contact a lender?", "No. Submissions only add a sample record to the current browser session. Nothing is sent to a server."],
      ["Do I need an account or password?", "No. Choose Explore the app on the welcome screen or use the demo sign-in button."],
      ["Are the rates and amounts accurate?", "No. All financial figures are invented placeholders used to demonstrate the interface."]
    ];
    const body = '<h1 class="view-heading">How to apply</h1><p class="view-subtitle">A simple guide to the sample journey.</p>' +
      '<div class="section-heading"><h2>Application steps</h2></div><div class="steps">' +
      '<div class="step-card"><strong>Explore the marketplace</strong><p>Browse sample credit and lending products from fictional institutions.</p></div>' +
      '<div class="step-card"><strong>Review an offer</strong><p>Open a listing to see its illustrative amount, rate, term and sample fees.</p></div>' +
      '<div class="step-card"><strong>Complete the demo form</strong><p>Select an employment type and enter fictional request details.</p></div>' +
      '<div class="step-card"><strong>Track your application</strong><p>See the sample request appear in My Applications with a demo status.</p></div></div>' +
      '<div class="section-heading"><h2>Frequently asked questions</h2></div>' +
      questions.map((q, i) => '<div class="faq-item ' + (state.activeFaq === i ? "open" : "") + '"><button class="faq-question" data-action="faq" data-index="' + i + '">' + q[0] + icon("chevron", 15) + '</button><div class="faq-answer">' + q[1] + '</div></div>').join("") +
      '<div class="inline-note" style="margin-top:14px">This preview is not a lender, financial adviser or application service. Do not enter personal or sensitive information.</div>';
    return shell("How to Apply", body, "home");
  }

  function notificationsScreen() {
    const body = '<h1 class="view-heading">Notifications</h1><p class="view-subtitle">Sample updates for your demo account.</p>' +
      '<div class="application-card" style="margin-top:16px"><div class="institution"><div class="institution-mark">' + icon("file", 17) + '</div><div class="institution-name"><strong>Application received</strong><small>Today · Demo notification</small></div></div><p class="view-subtitle" style="margin-top:10px">Your sample loan application has been added to the preview.</p></div>' +
      '<div class="application-card" style="margin-top:10px"><div class="institution"><div class="institution-mark">' + icon("wallet", 17) + '</div><div class="institution-name"><strong>New offers available</strong><small>Yesterday · Demo notification</small></div></div><p class="view-subtitle" style="margin-top:10px">There are four fictional marketplace listings to explore.</p></div>' +
      '<p class="muted-note">Push notifications are not enabled in this website preview.</p>';
    return shell("Notifications", body, "home");
  }

  function emptyState(title, message) {
    return '<div class="empty-state">' + icon("file", 26) + '<strong>' + title + '</strong><p>' + message + '</p></div>';
  }

  function render() {
    switch (state.screen) {
      case "welcome": root.innerHTML = welcomeScreen(); break;
      case "login": root.innerHTML = loginScreen(); break;
      case "home": root.innerHTML = homeScreen(); break;
      case "offers": root.innerHTML = offersScreen(); break;
      case "offerDetail": root.innerHTML = offerDetailScreen(); break;
      case "creditApply": root.innerHTML = creditApplyScreen(); break;
      case "applications": root.innerHTML = applicationsScreen(); break;
      case "loanFlow": root.innerHTML = loanFlowScreen(); break;
      case "profile": root.innerHTML = profileScreen(); break;
      case "editProfile": root.innerHTML = editProfileScreen(); break;
      case "help": root.innerHTML = helpScreen(); break;
      case "notifications": root.innerHTML = notificationsScreen(); break;
      default: state.screen = "welcome"; root.innerHTML = welcomeScreen();
    }
  }

  function navigate(screen) {
    state.drawerOpen = false;
    state.screen = screen;
    render();
    const content = root.querySelector(".app-content");
    if (content) content.scrollTop = 0;
  }

  root.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    if (target.closest("[data-stop-propagation]") && target.dataset.action === "close-drawer") {
      state.drawerOpen = false;
      render();
      return;
    }

    const action = target.dataset.action;
    switch (action) {
      case "start-demo": navigate("home"); break;
      case "go-login": navigate("login"); break;
      case "navigate": navigate(target.dataset.screen); break;
      case "open-drawer": state.drawerOpen = true; render(); break;
      case "close-drawer":
        if (target.classList.contains("drawer-backdrop")) { state.drawerOpen = false; render(); }
        break;
      case "back":
        if (state.screen === "offerDetail") navigate("offers");
        else if (state.screen === "creditApply") navigate("offerDetail");
        else if (state.screen === "editProfile") navigate("profile");
        else navigate("home");
        break;
      case "open-offer":
        state.selectedOffer = target.dataset.id;
        navigate("offerDetail");
        break;
      case "offer-filter":
        state.offerFilter = target.dataset.filter;
        render();
        break;
      case "app-filter":
        state.appFilter = target.dataset.filter;
        render();
        break;
      case "employment":
        state.employment = target.dataset.value;
        render();
        break;
      case "apply-credit": navigate("creditApply"); break;
      case "back-to-offers": navigate("offers"); break;
      case "back-to-detail": navigate("offerDetail"); break;
      case "faq":
        state.activeFaq = state.activeFaq === Number(target.dataset.index) ? -1 : Number(target.dataset.index);
        render();
        break;
      case "show-about":
        state.drawerOpen = false;
        state.toast = "TEST Mobile preview — fictional content, local interactions only.";
        render();
        window.clearTimeout(state.toastTimer);
        state.toastTimer = window.setTimeout(() => { state.toast = ""; render(); }, 3000);
        break;
      case "restart":
        state.applications = [
          { id: "LN-24081", type: "Loan", name: "Personal Flex Loan", amount: 1200000, status: "Under review", date: "08 Nov 2026" },
          { id: "CR-33017", type: "Credit", name: "SME Growth Loan", amount: 3500000, status: "Pending", date: "02 Nov 2026" }
        ];
        state.user = { name: "Alex Mrema", email: "alex.mrema@example.test", phone: "+255 700 000 000" };
        state.offerFilter = "all";
        state.appFilter = "all";
        state.activeFaq = -1;
        navigate("welcome");
        break;
      case "toast": toast(target.dataset.message || "This feature is not active in the preview."); break;
    }
  });

  root.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.id === "login-form") {
      const email = form.querySelector("#login-email").value.trim();
      const password = form.querySelector("#login-password").value;
      if (!email || !password) {
        toast("Enter sample details or choose Skip sign in.", true);
        return;
      }
      navigate("home");
      toast("Demo session started. No authentication was performed.");
      return;
    }

    if (form.id === "loan-form") {
      const formData = new FormData(form);
      const amount = Number(formData.get("amount"));
      const employer = String(formData.get("employer") || "").trim();
      if (!Number.isFinite(amount) || amount < 50000 || amount > 20000000) {
        toast("Enter a sample amount between TZS 50,000 and TZS 20,000,000.", true);
        return;
      }
      if (!employer) {
        toast("Add a fictional employer or business name to continue.", true);
        return;
      }
      const id = "LN-" + String(Date.now()).slice(-6);
      state.applications.unshift({
        id,
        type: "Loan",
        name: String(formData.get("purpose") || "Loan application"),
        amount,
        status: "Pending",
        date: "09 Nov 2026"
      });
      navigate("applications");
      toast("Demo request added locally as " + id + ".");
      return;
    }

    if (form.id === "credit-form") {
      const formData = new FormData(form);
      const amount = Number(formData.get("amount"));
      if (!Number.isFinite(amount) || amount < 50000) {
        toast("Enter a valid sample amount.", true);
        return;
      }
      const id = "CR-" + String(Date.now()).slice(-6);
      state.applications.unshift({
        id,
        type: "Credit",
        name: currentOffer().product,
        amount,
        status: "Pending",
        date: "09 Nov 2026"
      });
      navigate("applications");
      toast("Demo credit request added locally as " + id + ".");
      return;
    }

    if (form.id === "profile-form") {
      const formData = new FormData(form);
      state.user = {
        name: String(formData.get("name") || state.user.name).trim(),
        email: String(formData.get("email") || state.user.email).trim(),
        phone: String(formData.get("phone") || state.user.phone).trim()
      };
      navigate("profile");
      toast("Demo profile updated in this session.");
    }
  });

  render();
})();
