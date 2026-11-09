(() => {
  "use strict";
  const root = document.getElementById("root");
  if (!root) return;

  const svg = {
    bars: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.7 1.1c-.7 1.1-2.3 1.4-2.3 3M12 17h.01"/>',
    money: '<path d="M3 6h18v13H3z"/><path d="M3 10h18M7 15h3"/><circle cx="16" cy="14" r="2"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    shop: '<path d="M3 10h18l-2-6H5zM5 10v10h14V10M9 20v-6h6v6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    tag: '<path d="M20 13 11 22l-9-9V3h10z"/><circle cx="7" cy="7" r="1"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    bank: '<path d="m3 9 9-6 9 6M4 10h16M5 10v9M9 10v9M15 10v9M19 10v9M3 20h18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    caret: '<path d="m7 10 5 5 5-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  const ic = (name, size = 20) => '<svg class="icon" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (svg[name] || svg.info) + '</svg>';

  const creditOffers = [
    {id:"CO-001",limit:"5,000,000",currency:"TZS",deadline:"30 Nov 2026",code:"KFLEX25",interest:"16% p.a.",type:"Personal Credit",bank:"Kijani Finance",payback:"6–24 months"},
    {id:"CO-002",limit:"15,000,000",currency:"TZS",deadline:"15 Dec 2026",code:"SMEGROW",interest:"18% p.a.",type:"Business Credit",bank:"Pamoja Capital",payback:"6–36 months"},
    {id:"CO-003",limit:"2,000,000",currency:"TZS",deadline:"20 Dec 2026",code:"SALARY2",interest:"2% monthly",type:"Salary Advance",bank:"Umoja Credit Co.",payback:"1–12 months"}
  ];
  const state = {
    screen:"onboarding", mode:"personal",
    user:{name:"Demo User",id:"TEST-000124",email:"demo@example.test",phone:"+255 700 000 000"},
    drawer:false, expanded:{}, banner:0, selectedCredit:"CO-001",
    creditFilter:"all", toast:"", toastTimer:0,
    loanApplications:[
      {code:"LN-24081",amount:"1,200,000",currency:"TZS",type:"Personal Loan",status:"Under Review",date:"08 Nov 2026",elapsed:"1 day ago"},
      {code:"LN-24032",amount:"850,000",currency:"TZS",type:"Education Loan",status:"Pending",date:"04 Nov 2026",elapsed:"5 days ago"}
    ],
    creditApplications:[
      {code:"CR-33017",amount:"3,500,000",currency:"TZS",type:"Business Credit",status:"Pending",date:"02 Nov 2026",elapsed:"7 days ago"}
    ]
  };

  function toast(message) {
    state.toast = message; render();
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => { state.toast = ""; render(); }, 2600);
  }
  function statusBar() {
    return '<div class="system-status"><span>9:41</span><span class="system-status-right"><span>●</span><span>◖</span><span>▰</span><span>▮</span></span></div>';
  }
  function pageTopbar(title, back = true) {
    return '<div class="main-topbar">' +
      (back ? '<button class="topbar-icon" aria-label="Back" data-action="back">' + ic("back",19) + '</button>' : '<span class="topbar-spacer"></span>') +
      '<div class="topbar-title">' + title + '</div>' +
      '<button class="topbar-icon" aria-label="Notifications" data-action="go" data-screen="notifications">' + ic("bell",19) + '</button>' +
      '<button class="topbar-icon" aria-label="Open menu" data-action="open-drawer">' + ic("bars",20) + '</button></div>';
  }
  function notice() {
    return '<div class="standalone-notice">STANDALONE DEMO — Card Informatics backend and Firebase are disconnected.</div>';
  }
  function drawer() {
    if (!state.drawer) return "";
    if (state.mode === "business") {
      const bnav = (label, screen, glyph) => '<button class="drawer-row" data-action="go" data-screen="' + screen + '"><span class="drawer-glyph">' + ic(glyph,16) + '</span><span>' + label + '</span></button>';
      const bgroup = (key, label, glyph, items) => '<div class="drawer-group ' + (state.expanded[key] ? "opened" : "") + '">' +
        '<button class="drawer-row drawer-parent" data-action="expand" data-key="' + key + '"><span class="drawer-glyph">' + ic(glyph,16) + '</span><span>' + label + '</span>' + ic("caret",13) + '</button>' +
        (state.expanded[key] ? '<div class="drawer-children">' + items.map(x => '<button class="drawer-child" data-action="go" data-screen="' + x[1] + '">' + x[0] + '</button>').join("") + '</div>' : '') + '</div>';
      return '<div class="drawer-shade" data-action="close-drawer"><aside class="app-drawer" data-drawer-panel>' +
        '<div class="drawer-brand"><b>TEST</b><small>STANDALONE PREVIEW</small></div><div class="drawer-scroll">' +
        bnav("Home","business-dashboard","home") +
        bgroup("profile","Profile","user",[["View Profile","profile"],["Change Password","settings"]]) +
        bgroup("financing","Financing Solutions","info",[["Request Credit Limit","business-financing"],["Credit Line Applications","business-financing-apps"],["Utilization Request","business-utilization"],["References","business-references"]]) +
        bgroup("businessLoan","Business Loan","file",[["Apply for a Loan","business-loan"],["My Applications","business-loan-apps"]]) +
        bgroup("policy","Terms and Policy","shield",[["Terms and Conditions","business-terms"],["Privacy Policy","business-privacy"]]) +
        bnav("Log Out","onboarding","logout") +
        '</div></aside><button class="drawer-dismiss" data-action="close-drawer" aria-label="Close menu"></button></div>';
    }
    const nav = (label, screen, glyph) => '<button class="drawer-row" data-action="go" data-screen="' + screen + '"><span class="drawer-glyph">' + ic(glyph,16) + '</span><span>' + label + '</span></button>';
    const group = (key, label, glyph, items) => '<div class="drawer-group ' + (state.expanded[key] ? "opened" : "") + '">' +
      '<button class="drawer-row drawer-parent" data-action="expand" data-key="' + key + '"><span class="drawer-glyph">' + ic(glyph,16) + '</span><span>' + label + '</span>' + ic("caret",13) + '</button>' +
      (state.expanded[key] ? '<div class="drawer-children">' + items.map(x => '<button class="drawer-child" data-action="go" data-screen="' + x[1] + '">' + x[0] + '</button>').join("") + '</div>' : '') + '</div>';
    return '<div class="drawer-shade" data-action="close-drawer"><aside class="app-drawer" data-drawer-panel>' +
      '<div class="drawer-brand"><b>TEST</b><small>STANDALONE PREVIEW</small></div><div class="drawer-scroll">' +
      nav("Home","dashboard","home") +
      group("profile","Profile","user",[["View Profile","profile"],["Change Password","settings"],["Change Security","settings"],["Change Birthdate","settings"]]) +
      nav("How to Apply","how-to-apply","question") +
      group("credit","Bank Credit Offers","money",[["Marketplace Credit Offers","credit-marketplace"],["My Applications","my-credit-applications"],["Replied Credit Offers","my-credit-applications"],["Approved Credit Offers","my-credit-applications"]]) +
      group("loans","Loan Applications","file",[["Marketplace Applications","marketplace-applications"],["Apply for a Loan/Credit","select-employment"],["My Applications","my-loan-applications"]]) +
      nav("Help Center","help-center","question") +
      nav("Log Out","onboarding","logout") +
      '</div></aside><button class="drawer-dismiss" data-action="close-drawer" aria-label="Close menu"></button></div>';
  }
  function mainShell(title, body, back = true) {
    return '<main class="device">' + statusBar() + pageTopbar(title,back) + '<section class="flutter-scroll">' + body + '</section>' + drawer() +
      (state.toast ? '<div class="snackbar">' + state.toast + '</div>' : '') + '</main>';
  }

  function onboarding() {
    return '<main class="device">' + statusBar() + '<section class="auth-scroll"><div class="onboarding-content">' +
      '<div class="test-logo-large">TEST</div><div class="onboarding-copy"><h1>Welcome to the<br>TEST App</h1>' +
      '<p>Create an account to apply for loans, track application progress, and receive updates from financial institutions — all in one place.</p>' +
      '<p>Our platform makes managing your loan journey fast and easy.</p></div>' +
      '<div class="auth-actions"><button class="flutter-button secondary" data-action="go" data-screen="login">↗ <span>Continue to Account</span></button>' +
      '<button class="flutter-button primary" data-action="go" data-screen="account-chooser">♙ <span>New Here? Join Us</span></button></div>' +
      '<div class="auth-footer">TEST MOBILE · STANDALONE DEMO</div></div></section></main>';
  }
  function accountChooser() {
    return '<main class="device">' + statusBar() + '<section class="auth-scroll"><div class="account-chooser">' +
      '<div class="test-logo-large">TEST</div><h2>Choose Account Type</h2><div class="account-types">' +
      '<button class="account-type" data-action="account-type" data-mode="personal"><span class="account-illustration">' + ic("user",44) + '</span><span>Personal</span></button>' +
      '<button class="account-type" data-action="account-type" data-mode="business"><span class="account-illustration">' + ic("shop",44) + '</span><span>Asset Financing</span></button>' +
      '</div><div class="auth-footer">TEST MOBILE · STANDALONE DEMO</div></div></section></main>';
  }
  function field(label, sw, placeholder, id, type = "text") {
    return '<label class="flutter-field" for="' + id + '"><span class="field-label"><b>' + label + ' /</b> ' + sw + '</span><input id="' + id + '" name="' + id + '" type="' + type + '" placeholder="' + placeholder + '"></label>';
  }
  function login() {
    const account = state.mode === "business" ? "Asset Financing" : "Personal Account";
    return '<main class="device">' + statusBar() + '<section class="auth-scroll login-scroll"><div class="login-page">' +
      '<div class="test-logo-login">TEST</div><form class="login-card" id="login-form">' +
      '<div class="login-card-heading"><b>Login</b><span>' + account + '</span></div>' +
      field("Username","Jina la Mtumiaji","Email or Phone: (+255..)","login-user") +
      field("Password","Neno la Siri","Enter password","login-password","password") +
      '<div class="login-forgot"><button type="button" class="link-button" data-action="info-toast">Reset Password</button></div>' +
      '<div class="login-register">Don&#39;t have an account? <button type="button" class="link-button" data-action="go" data-screen="register">Register</button></div>' +
      '<div class="login-card-footer"><button type="button" class="link-button choose-type" data-action="go" data-screen="account-chooser">← Choose Account Type</button><button class="login-submit" type="submit">Login</button></div>' +
      '</form><div class="auth-footer">TEST MOBILE · STANDALONE DEMO</div><div class="login-demo-caption">Preview only — any username and password will open the sample app. Nothing is sent to a server.</div></div></section></main>';
  }
  function register() {
    return '<main class="device">' + statusBar() + '<section class="auth-scroll"><div class="register-page"><div class="test-logo-login">TEST</div><div class="login-card"><div class="login-card-heading"><b>Create Account</b><span>Personal Account</span></div><p class="register-hint">Registration screens are represented as a visual preview. No personal information is submitted.</p><button class="flutter-button secondary" data-action="go" data-screen="login">Return to Login</button></div></div></section></main>';
  }

  function dashboard() {
    const stats = [
      ["02","Loan Applications","file","my-loan-applications"],
      ["01","Credit Applications","money","my-credit-applications"],
      ["03","Credit Offers","money","credit-marketplace"],
      ["04","Fee Tables","file","fee-tables"]
    ];
    const banner = state.banner === 0
      ? ["Get loans easily from various institutions","Apply for a Loan","select-employment"]
      : ["Elevate your business with our Credit Offers","View Credit Offers","credit-marketplace"];
    return mainShell("Home", notice() +
      '<div class="dashboard-user"><div class="user-placeholder">' + ic("user",24) + '</div><div class="dashboard-user-copy"><strong>' + state.user.name + '</strong><div><span>ID: </span><b>' + state.user.id + '</b></div></div></div>' +
      '<section class="home-carousel"><div class="carousel-message">' + banner[0] + '</div><button class="carousel-button" data-action="go" data-screen="' + banner[2] + '">' + banner[1] + '</button><div class="carousel-dots"><button class="' + (state.banner === 0 ? "selected" : "") + '" data-action="banner" data-index="0"></button><button class="' + (state.banner === 1 ? "selected" : "") + '" data-action="banner" data-index="1"></button></div></section>' +
      '<section class="privacy-card"><span class="privacy-icon">' + ic("shield",29) + '</span><p>TEST preview hii hutumia taarifa za mfano pekee. Usiweke taarifa zako binafsi au taarifa za kifedha katika mazingira haya ya majaribio.</p></section>' +
      '<h2 class="stats-heading">My Stats</h2><div class="stats-grid">' + stats.map(item =>
        '<button class="stat-tile" data-action="go" data-screen="' + item[3] + '"><div class="stat-top"><strong>' + item[0] + '</strong><span>' + ic(item[2],16) + '</span></div><div class="stat-label">' + item[1] + '</div></button>'
      ).join("") + '</div>', false);
  }

  function businessDashboard() {
    const banners = [
      ["Get access to LPO financing and execute contracts without financial strain","Request LPO/Contract Financing","business-financing"],
      ["Secure instant cash flow with Invoice Discounting to support your business operations","Request Invoice Discounting","business-financing"],
      ["Get quick and structured financing through our Smart Loan product","Apply For Business Loan","business-loan"]
    ];
    const banner = banners[state.banner % banners.length];
    const stats = [
      ["00","Registered Users","user"],
      ["00","Financial Institutions","bank"],
      ["03","Credit Offers","money"],
      ["00","Loans Requested","file"]
    ];
    return mainShell("Home",
      '<section class="business-info-card"><strong>' + state.user.name + '</strong>' +
      '<div><b>Mobile Number: </b>' + state.user.phone + '</div>' +
      '<div><b>Email: </b>' + state.user.email + '</div>' +
      '<div><b>Role: </b>TEST Client</div></section>' +
      '<section class="business-carousel"><div>' + banner[0] + '</div><button data-action="go" data-screen="' + banner[2] + '">' + banner[1] + '</button></section>' +
      '<div class="business-dots"><span class="' + (state.banner % 3 === 0 ? "active" : "") + '"></span><span class="' + (state.banner % 3 === 1 ? "active" : "") + '"></span><span class="' + (state.banner % 3 === 2 ? "active" : "") + '"></span></div>' +
      '<div class="business-stat-grid">' + stats.map(item =>
        '<button class="business-stat" data-action="info-toast"><div><strong>' + item[0] + '</strong>' + ic(item[2],16) + '</div><span>' + item[1] + '</span></button>'
      ).join("") + '</div>'
    , false);
  }

  function creditCard(item) {
    return '<button class="credit-offer-card" data-action="credit-detail" data-id="' + item.id + '">' +
      '<div class="credit-card-top"><div class="credit-limit"><strong>' + item.limit + '</strong><span>' + item.currency + '</span></div><div class="credit-deadline">' + ic("clock",12) + '<b>' + item.deadline + '</b></div></div>' +
      '<div class="credit-data-row"><span>' + ic("tag",12) + item.code + '</span><span>' + ic("percent",12) + item.interest + '</span></div>' +
      '<div class="credit-data-row"><span>' + ic("file",12) + item.type + '</span><span>' + ic("bank",12) + item.bank + '</span></div></button>';
  }
  function marketplace() {
    return mainShell("Marketplace Credit Offers",'<div class="page-count">Page 1 of 1</div><div class="credit-list">' + creditOffers.map(creditCard).join("") + '</div><div class="page-footnote">Sample values are displayed for preview only.</div>');
  }
  function creditDetail() {
    const item = creditOffers.find(x => x.id === state.selectedCredit) || creditOffers[0];
    const rows = [
      ["Institution Code",item.bank],["Type of Financial Institution","Sample institution"],
      ["Number of Employees","—"],["Loans Disbursed in 3 yrs","—"],
      ["Credit Type",item.type],["Credit Product","Sample credit product"],
      ["Credit Line",item.limit + " " + item.currency],["Interest Charge",item.interest],
      ["Annual Fee","Sample / not applicable"],["Late Payment Fee","Sample / not applicable"],
      ["Other Fees","See sample offer conditions"],["Payback Period",item.payback],
      ["Application Deadline",item.deadline],["Product Promotional Content","Fictional product description for demonstration."]
    ];
    return mainShell("Credit Offer Details",'<div class="detail-record"><div class="detail-record-heading"><span>Credit limit</span><strong>' + item.limit + ' ' + item.currency + '</strong><small>' + item.bank + '</small></div>' +
      rows.map(row => '<div class="detail-row"><span>' + row[0] + '</span><b>' + row[1] + '</b></div>').join("") +
      '<button class="flutter-button secondary full-width" data-action="info-toast">Apply for this Credit Offer</button></div>');
  }
  function employmentSelection() {
    return mainShell("Apply for a Loan/Credit",'<div class="employment-options">' +
      '<button class="employment-option" data-action="go" data-screen="loan-employed"><span class="employment-icon">' + ic("briefcase",30) + '</span><span class="employment-copy"><b>Employed Applicants</b><i>Waombaji Walioajiriwa</i></span></button>' +
      '<button class="employment-option" data-action="go" data-screen="loan-self-employed"><span class="employment-icon">' + ic("shop",30) + '</span><span class="employment-copy"><b>Self-Employed Applicants</b><i>Waombaji Waliojiajiri</i></span></button></div>');
  }
  function loanForm(self) {
    const title = self ? "Self-Employed" : "Employed";
    return mainShell(title + " Loan Application",'<form class="application-form" id="loan-form"><h3 class="form-section-title">' + title + ' Applicant Details</h3>' +
      field("Full Name","Jina Kamili","Enter full name","applicant-name") +
      field("Phone Number","Namba ya Simu","+255...","applicant-phone","tel") +
      field(self ? "Business Name" : "Employer Name",self ? "Jina la Biashara" : "Jina la Mwajiri",self ? "Business name" : "Employer name","applicant-work") +
      '<label class="flutter-field"><span class="field-label"><b>Loan Amount /</b> Kiasi cha Mkopo</span><input name="loan-amount" type="number" min="50000" placeholder="e.g. 1000000" required></label>' +
      '<label class="flutter-field"><span class="field-label"><b>Loan Purpose /</b> Madhumuni ya Mkopo</span><select name="loan-purpose"><option>Personal needs</option><option>Education</option><option>Business</option><option>Home improvement</option></select></label>' +
      '<button class="login-submit" type="submit">Continue</button><div class="page-footnote">Demo form only. No application is transmitted.</div></form>');
  }
  function appCard(item) {
    const status = item.status.toLowerCase().includes("review") ? "review" : item.status.toLowerCase().includes("approved") ? "approved" : "pending";
    return '<button class="my-application-card" data-action="application-detail"><div class="my-app-top"><div><strong>' + item.amount + '</strong><span>' + item.currency + '</span></div><b class="application-status ' + status + '">' + item.status + '</b></div>' +
      '<div class="my-app-meta"><span>' + ic("tag",12) + item.code + '</span><span>' + ic("clock",12) + item.elapsed + '</span></div>' +
      '<div class="my-app-meta"><span>' + ic("file",12) + item.type + '</span><span>' + ic("calendar",12) + item.date + '</span></div></button>';
  }
  function myLoanApplications() {
    return mainShell("My Loan Applications",'<div class="page-count">Page 1 of 1</div>' +
      (state.loanApplications.length ? '<div class="my-application-list">' + state.loanApplications.map(appCard).join("") + '</div>' :
        '<div class="empty-apps">' + ic("info",30) + '<p>You currently have no loan applications</p><button class="flutter-button secondary" data-action="go" data-screen="select-employment">Apply for a Loan/Credit</button></div>'));
  }
  function myCreditApplications() {
    const rows = state.creditApplications.filter(x => state.creditFilter === "all" || (state.creditFilter === "approved" ? x.status === "Approved" : x.status !== "Pending"));
    return mainShell("Credit Offer Applications",'<div class="application-tabs"><button class="' + (state.creditFilter === "all" ? "active" : "") + '" data-action="credit-filter" data-filter="all">All</button><button class="' + (state.creditFilter === "approved" ? "active" : "") + '" data-action="credit-filter" data-filter="approved">Approved</button><button class="' + (state.creditFilter === "replied" ? "active" : "") + '" data-action="credit-filter" data-filter="replied">Replied</button></div>' +
      (rows.length ? '<div class="my-application-list">' + rows.map(appCard).join("") + '</div>' : '<div class="empty-apps">' + ic("info",30) + '<p>You currently have no credit offer applications</p></div>'));
  }
  function profile() {
    return mainShell("Profile",'<div class="profile-summary"><div class="profile-avatar">' + ic("user",27) + '</div><div><strong>' + state.user.name + '</strong><small>ID: ' + state.user.id + '</small></div></div>' +
      '<div class="profile-details"><div><span>Full Name</span><b>' + state.user.name + '</b></div><div><span>Email Address</span><b>' + state.user.email + '</b></div><div><span>Phone Number</span><b>' + state.user.phone + '</b></div></div>' +
      '<div class="profile-actions"><button data-action="info-toast">' + ic("user",17) + ' Edit Profile</button><button data-action="info-toast">' + ic("shield",17) + ' Change Password</button><button data-action="info-toast">' + ic("shield",17) + ' Change Security Question</button><button data-action="info-toast">' + ic("calendar",17) + ' Change Birthdate</button></div>');
  }
  function howTo() {
    const steps = [
      ["Choose your account type","Select Personal or Asset Financing."],
      ["Sign in or register","Continue using the appropriate account type."],
      ["Browse available offers","Review marketplace credit offers and their displayed details."],
      ["Apply for a loan or credit","Choose the relevant option and complete the application information."],
      ["Track your applications","Open My Applications to review your application status."]
    ];
    return mainShell("How to Apply",'<div class="howto-list">' + steps.map((item,i) => '<div class="howto-step"><span>' + (i+1) + '</span><div><b>' + item[0] + '</b><p>' + item[1] + '</p></div></div>').join("") + '</div>');
  }
  function helpCenter() {
    return mainShell("Help Center",'<div class="help-panel"><b>Help Center</b><p>This standalone preview does not connect to support channels or external services.</p></div><div class="help-panel"><b>About this preview</b><p>All account information, institutions, statuses and figures are fictional demo data.</p></div>');
  }
  function emptyPage(title, message, glyph = "info") {
    return mainShell(title,'<div class="empty-apps">' + ic(glyph,30) + '<p>' + message + '</p></div>');
  }

  function render() {
    const views = {
      onboarding, "account-chooser":accountChooser, login, register, dashboard, "business-dashboard":businessDashboard,
      "credit-marketplace":marketplace, "credit-detail":creditDetail,
      "select-employment":employmentSelection,
      "loan-employed":() => loanForm(false), "loan-self-employed":() => loanForm(true),
      "my-loan-applications":myLoanApplications, "my-credit-applications":myCreditApplications,
      profile, "how-to-apply":howTo, "help-center":helpCenter,
      "marketplace-applications":() => emptyPage("Marketplace Applications","There are no marketplace applications in this demo.","file"),
      "fee-tables":() => emptyPage("Fee Tables","Fee tables are not connected in this standalone preview.","file"),
      "business-financing":() => emptyPage("Request Credit Limit","The financing request screen is represented as a disconnected demo.","info"),
      "business-financing-apps":() => emptyPage("Credit Line Applications","No live credit-line application data is connected.","file"),
      "business-utilization":() => emptyPage("Utilization Request","Utilization requests are disabled in the preview.","file"),
      "business-references":() => emptyPage("References","Reference management is disabled in the preview.","file"),
      "business-loan":() => emptyPage("Apply For Business Loan","The business-loan form is not connected in this preview.","file"),
      "business-loan-apps":() => emptyPage("Business Loan Applications","No business-loan application data is connected.","file"),
      "business-terms":() => emptyPage("Terms and Conditions","The standalone preview does not link to external policy documents.","shield"),
      "business-privacy":() => emptyPage("Privacy Policy","The standalone preview does not link to external policy documents.","shield"),
      notifications:() => emptyPage("Notifications","You have no new notifications.","bell"),
      settings:() => emptyPage("Account Settings","Account security changes are disabled in the preview.","shield")
    };
    root.innerHTML = (views[state.screen] || onboarding)();
  }
  function go(screen) {
    state.drawer = false; state.screen = screen; render();
    const scroller = root.querySelector(".flutter-scroll,.auth-scroll");
    if (scroller) scroller.scrollTop = 0;
  }

  root.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.hasAttribute("data-drawer-panel")) return;
    const action = button.dataset.action;
    switch(action) {
      case "go": go(button.dataset.screen); break;
      case "open-drawer": state.drawer = true; render(); break;
      case "close-drawer":
        if (event.target === button || button.classList.contains("drawer-dismiss")) { state.drawer = false; render(); }
        break;
      case "expand": state.expanded[button.dataset.key] = !state.expanded[button.dataset.key]; render(); break;
      case "back":
        if (state.screen === "credit-detail") go("credit-marketplace");
        else if (state.screen === "loan-employed" || state.screen === "loan-self-employed") go("select-employment");
        else if (state.screen === "login" || state.screen === "register") go("account-chooser");
        else if (state.screen === "account-chooser") go("onboarding");
        else go("dashboard");
        break;
      case "account-type": state.mode = button.dataset.mode; go("login"); break;
      case "credit-detail": state.selectedCredit = button.dataset.id; go("credit-detail"); break;
      case "banner": state.banner = Number(button.dataset.index); render(); break;
      case "credit-filter": state.creditFilter = button.dataset.filter; render(); break;
      case "application-detail": toast("Application details are sample-only in this preview."); break;
      case "info-toast": toast("This feature is disconnected in the standalone preview."); break;
    }
  });

  root.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.target;
    if (form.id === "login-form") {
      const username = form.querySelector("#login-user").value.trim();
      const password = form.querySelector("#login-password").value;
      if (!username || !password) { toast("Enter any demo username and password to continue."); return; }
      go(state.mode === "business" ? "business-dashboard" : "dashboard"); toast("Demo session opened locally."); return;
    }
    if (form.id === "loan-form") {
      const data = new FormData(form);
      const amount = Number(data.get("loan-amount"));
      if (!String(data.get("applicant-name") || "").trim() || !Number.isFinite(amount) || amount < 50000) {
        toast("Complete the sample details to continue."); return;
      }
      state.loanApplications.unshift({
        code:"LN-" + String(Date.now()).slice(-5),
        amount:amount.toLocaleString("en-TZ"), currency:"TZS",
        type:String(data.get("loan-purpose") || "Personal Loan"),
        status:"Pending", date:"09 Nov 2026", elapsed:"Just now"
      });
      go("my-loan-applications"); toast("Demo application added locally.");
    }
  });

  render();
  window.setInterval(() => {
    if ((state.screen === "dashboard" || state.screen === "business-dashboard") && !state.drawer) {
      state.banner = (state.banner + 1) % (state.screen === "business-dashboard" ? 3 : 2);
      render();
    }
  }, 5000);
})();
