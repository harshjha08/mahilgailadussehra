(() => {
  "use strict";

  const config = window.MGD_BACKEND_CONFIG || {};
  const labels = {
    notices: "Notice & ticker",
    poster: "Opening poster",
    highlights: "Daily highlights",
    videos: "YouTube cards",
    live: "Live telecast",
    event: "Upcoming event",
    scripts: "Navratri scripts",
    resources: "Pavitra granth",
    shorts: "YouTube Shorts",
    contacts: "Contacts & social",
    cast: "Cast & homepage stats",
  };
  const icons = {
    notices: "fa-bell",
    poster: "fa-image",
    highlights: "fa-images",
    videos: "fa-circle-play",
    live: "fa-tower-broadcast",
    event: "fa-calendar-days",
    scripts: "fa-file-pdf",
    resources: "fa-book-open",
    shorts: "fa-film",
    contacts: "fa-address-card",
    cast: "fa-masks-theater",
  };
  const fieldLabels = {
    enabled: "Enable on website",
    titleHi: "Title (Hindi)",
    titleEn: "Title (English)",
    tickerText: "Scrolling notice text",
    bodyHi: "Notice message (Hindi)",
    bodyEn: "Notice message (English)",
    complaintUrl: "Complaint / details link",
    complaintLabel: "Link label",
    image: "Poster image",
    eyebrow: "Section label",
    title: "Heading",
    allPhotosLabel: "Gallery link label",
    slides: "Current highlight photos",
    src: "Image",
    alt: "Image description",
    caption: "Caption",
    type: "Category",
    year: "Year",
    thumb: "Thumbnail",
    url: "Link / PDF",
    id: "YouTube video ID",
    heading: "Heading",
    subtitle: "Subtitle",
    viewAllUrl: "View all link",
    viewAllLabel: "View all label",
    thumbnail: "Thumbnail",
    dates: "Event dates",
    badge: "Event badge",
    countdownDate: "Countdown date and time",
    note: "Event note",
    day: "Fixed Navratri day",
    parts: "PDF parts",
    label: "PDF part name",
    author: "Author",
    description: "Description",
    items: "Video entries",
    location: "Location",
    character: "Character",
    role: "Role",
    category: "Category",
    name: "Name",
    email: "Email",
    phone: "Mobile",
    address: "Address",
    youtube: "YouTube channel",
    instagram: "Instagram profile",
    facebook: "Facebook page",
    contactUrl: "Contact form link",
    featured: "Show on homepage",
    people: "Cast members",
    stats: "Homepage statistics",
    value: "Value",
    since: "Role since",
    imageUrl: "Profile image",
  };
  const sectionHelp = {
    notices: "Popup aur moving ticker ke Hindi/English text ko manage karein. Off karne par opening popup aur ticker dono hide honge.",
    poster: "Notice ke baad khulne wala opening poster. Off karne par poster nahi dikhega.",
    highlights: "Ye current-day highlight set hai, archive nahi. Naya din publish karne par yahin ki photos replace karein; purane highlights save nahi hote.",
    videos: "YouTube broadcast cards add, edit aur delete karein. Thumbnail upload ya image URL dono use kar sakte hain.",
    live: "Live telecast section ko on/off karein aur stream link/thumbnail update karein.",
    event: "Upcoming event, schedule aur countdown date. Website ke section layout ko yahan se change nahi kiya ja sakta.",
    scripts: "Navratri 1–9 ke cards fixed hain. Day card add/delete nahi ho sakta; har din ke andar PDF parts add/remove karein. Ek PDF hone par single-view button dikhega.",
    resources: "Pavitra granth cards aur unke PDF links manage karein.",
    shorts: "Homepage Shorts carousel ke videos aur section text manage karein.",
    contacts: "Contact details aur footer social links ek jagah update karein.",
    cast: "Maujooda cast mein se homepage par dikhne wale log chunen; homepage statistics bhi yahan update honge.",
  };
  const fixedScriptDays = [1, 2, 3, 4, 5, 6, 8, 9];
  const navItems = [
    ["overview", "Overview", "fa-chart-pie"],
    ...Object.entries(labels).map(([key, label]) => [key, label, icons[key]]),
  ];
  const loginPanel = document.getElementById("loginPanel");
  const dashboard = document.getElementById("dashboard");
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const setupNote = document.getElementById("setupNote");
  const sectionNav = document.getElementById("sectionNav");
  const editor = document.getElementById("editor");
  const saveButton = document.getElementById("saveButton");
  const saveState = document.getElementById("saveState");
  const overview = document.getElementById("overview");
  const contentNotice = document.getElementById("contentNotice");
  const configAlert = document.getElementById("configAlert");
  const seedFrame = document.getElementById("siteSeedFrame");
  let supabaseClient = null;
  let content = null;
  let publishedContent = null;
  let currentSection = "overview";
  let hasSavedContent = false;
  let saving = false;

  function showMessage(element, message, isError = false) {
    element.textContent = message;
    element.classList.toggle("error", isError);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeScriptDays(days) {
    if (!Array.isArray(days)) return [];
    const byDay = new Map(days.map((item, index) => [
      Number.isInteger(Number(item?.day)) ? Number(item.day) : index + 1,
      item,
    ]));
    return fixedScriptDays.map(day => byDay.get(day)).filter(Boolean);
  }

  function normalizeContent(value) {
    if (value && Array.isArray(value.scripts)) {
      value.scripts = normalizeScriptDays(value.scripts);
    }
    return value;
  }

  function pathValue(root, path) {
    return path.reduce((value, part) => value[part], root);
  }

  function setPath(root, path, value) {
    const parent = pathValue(root, path.slice(0, -1));
    parent[path[path.length - 1]] = value;
  }

  function arrayTemplate(path, existing) {
    if (existing.length) return clone(existing[0]);
    const key = path.join(".");
    const templates = {
      notices: { enabled: true, titleHi: "सूचना", titleEn: "Notice", tickerText: "", bodyHi: "", bodyEn: "", complaintUrl: "", complaintLabel: "" },
      "highlights.slides": { src: "", alt: "", caption: "" },
      videos: { type: "dussehra", year: new Date().getFullYear(), title: "", thumb: "", url: "" },
      "event.dates": { name: "", date: "" },
      "scripts.0.parts": { label: "भाग 1", url: "" },
      "scripts.1.parts": { label: "भाग 1", url: "" },
      "scripts.2.parts": { label: "भाग 1", url: "" },
      "scripts.3.parts": { label: "भाग 1", url: "" },
      "scripts.4.parts": { label: "भाग 1", url: "" },
      "scripts.5.parts": { label: "भाग 1", url: "" },
      "scripts.6.parts": { label: "भाग 1", url: "" },
      "scripts.7.parts": { label: "भाग 1", url: "" },
      "scripts.8.parts": { label: "भाग 1", url: "" },
      resources: { title: "", author: "", description: "", url: "" },
      "shorts.items": { id: "", title: "", year: "", category: "", description: "", location: "", thumbnail: "" },
      "cast.featured": "",
      "cast.people": { name: "", role: "", since: "", imageUrl: "", instagram: "" },
      "cast.stats": { value: "", label: "" },
    };
    return clone(templates[key] || "");
  }

  function sectionName(name) {
    return fieldLabels[name] || name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, char => char.toUpperCase());
  }

  function isLongText(name, value) {
    return typeof value === "string" && (
      value.length > 90 ||
      ["description", "caption", "tickerText", "bodyHi", "bodyEn", "note", "subtitle", "address"].includes(name)
    );
  }

  function acceptsFile(path, name) {
    if (["image", "imageUrl", "src", "thumb", "thumbnail"].includes(name)) return "image/jpeg,image/png,image/webp,image/avif";
    if (name === "url" && (/\.parts\.\d+\.url$/.test(path.join(".")) || path[0] === "resources")) return "application/pdf";
    return "";
  }

  function summaryFor(value, index) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const title = value.titleHi || value.title || value.name || value.label || value.day;
      if (title) return String(title);
      if (value.id) return `${value.id}${value.year ? ` · ${value.year}` : ""}`;
    }
    return `Item ${index + 1}`;
  }

  function renderField(name, value, path, options = {}) {
    const wrapper = document.createElement("div");
    wrapper.className = "field";
    if (options.full || isLongText(name, value)) wrapper.classList.add("full");

    if (Array.isArray(value)) {
      wrapper.classList.add("full");
      wrapper.appendChild(renderArray(name, value, path));
      return wrapper;
    }

    if (value !== null && typeof value === "object") {
      wrapper.classList.add("full");
      wrapper.appendChild(renderObject(name, value, path, options));
      return wrapper;
    }

    if (typeof value === "boolean") {
      const row = document.createElement("label");
      row.className = "checkbox-row";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = value;
      input.disabled = options.disabled === true;
      input.addEventListener("change", () => updateValue(path, input.checked));
      row.append(input, document.createTextNode(sectionName(name)));
      wrapper.appendChild(row);
      return wrapper;
    }

    const label = document.createElement("label");
    label.className = "field-label";
    label.textContent = sectionName(name);
    const input = isLongText(name, value) ? document.createElement("textarea") : document.createElement("input");
    input.className = "field-control";
    if (input instanceof HTMLInputElement) {
      input.type = typeof value === "number" ? "number" : "text";
      if (typeof value === "number") input.step = "any";
      if (name === "email") input.type = "email";
      if (name === "phone") input.type = "tel";
      if (name.toLowerCase().includes("url") || ["src", "thumb", "thumbnail", "image", "imageUrl", "instagram", "youtube", "facebook"].includes(name)) {
        input.type = "url";
      }
      if (name === "countdownDate") input.type = "datetime-local";
    }
    input.value = value == null ? "" : String(value);
    input.disabled = options.disabled === true;
    input.addEventListener("input", () => {
      if (typeof value === "number") {
        const parsed = Number(input.value);
        updateValue(path, input.value === "" ? "" : (Number.isFinite(parsed) ? parsed : value));
      } else {
        updateValue(path, input.value);
      }
    });
    label.appendChild(input);

    const accept = acceptsFile(path, name);
    if (accept) {
      const uploadLabel = document.createElement("span");
      uploadLabel.className = "small-hint";
      uploadLabel.textContent = accept === "application/pdf" ? "PDF upload (max 20 MB)" : "Image upload (max 20 MB)";
      const uploadInput = document.createElement("input");
      uploadInput.type = "file";
      uploadInput.accept = accept;
      uploadInput.addEventListener("change", () => uploadFile(uploadInput.files && uploadInput.files[0], path, uploadInput));
      const row = document.createElement("div");
      row.className = "upload-row";
      row.appendChild(uploadInput);
      wrapper.append(label, row, uploadLabel);
    } else {
      wrapper.appendChild(label);
    }
    return wrapper;
  }

  function renderObject(name, value, path, options = {}) {
    const card = document.createElement("div");
    card.className = options.nested ? "editor-card" : "editor-card";
    const heading = document.createElement("div");
    heading.className = "record-heading";
    const title = document.createElement("h3");
    title.textContent = sectionName(name);
    heading.appendChild(title);
    card.appendChild(heading);
    const fields = document.createElement("div");
    fields.className = "fields-grid";
    Object.entries(value).forEach(([key, child]) => {
      const isFixedDay = path[0] === "scripts" && key === "day";
      fields.appendChild(renderField(key, child, [...path, key], { disabled: isFixedDay }));
    });
    card.appendChild(fields);
    return card;
  }

  function renderArray(name, items, path) {
    const wrapper = document.createElement("div");
    wrapper.className = "nested-array";
    const heading = document.createElement("div");
    heading.className = "record-heading";
    const title = document.createElement("h3");
    title.textContent = `${sectionName(name)} (${items.length})`;
    heading.appendChild(title);
    const fixedDays = path.length === 1 && path[0] === "scripts";
    if (!fixedDays) {
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className = "add-button";
      addButton.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i> Add';
      addButton.addEventListener("click", () => {
        items.push(arrayTemplate(path, items));
        renderEditor();
      });
      heading.appendChild(addButton);
    }
    wrapper.appendChild(heading);
    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "empty-list";
      empty.textContent = "Abhi koi entry nahi hai. Add button se nayi entry banayein.";
      wrapper.appendChild(empty);
      return wrapper;
    }

    items.forEach((item, index) => {
      const summary = summaryFor(item, index);
      const details = document.createElement("details");
      details.className = "editor-card";
      const summaryNode = document.createElement("summary");
      summaryNode.className = "record-heading";
      const headingText = document.createElement("h3");
      headingText.textContent = summary;
      summaryNode.appendChild(headingText);
      if (!fixedDays) {
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "delete-button";
        remove.innerHTML = '<i class="fa-regular fa-trash-can" aria-hidden="true"></i> Delete';
        remove.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          if (!window.confirm(`"${summary}" ko delete karein?`)) return;
          items.splice(index, 1);
          renderEditor();
        });
        summaryNode.appendChild(remove);
      }
      details.appendChild(summaryNode);
      if (item !== null && typeof item === "object" && !Array.isArray(item)) {
        const fields = document.createElement("div");
        fields.className = "fields-grid";
        Object.entries(item).forEach(([key, child]) => {
          fields.appendChild(renderField(key, child, [...path, index, key], {
            disabled: fixedDays && key === "day",
          }));
        });
        details.appendChild(fields);
      } else {
        const field = renderField(name, item, [...path, index]);
        details.appendChild(field);
      }
      wrapper.appendChild(details);
    });
    return wrapper;
  }

  function updateValue(path, value) {
    setPath(content, path, value);
    saveState.textContent = "Unsaved changes";
    saveState.style.color = "#9a650f";
  }

  async function uploadFile(file, path, input) {
    if (!file) return;
    if (!supabaseClient || !supabaseClient.auth.getSession) {
      showMessage(saveState, "Backend configuration is missing.", true);
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      window.alert("File size 20 MB se kam honi chahiye.");
      input.value = "";
      return;
    }
    const allowed = file.type.startsWith("image/") || file.type === "application/pdf";
    if (!allowed) {
      window.alert("Sirf JPG, PNG, WebP, AVIF images ya PDF upload karein.");
      input.value = "";
      return;
    }
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !sessionData.session) {
      showMessage(saveState, "Session expired. Dobara sign in karein.", true);
      return;
    }
    const extension = file.name.split(".").pop().replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "bin";
    const filePath = `${sessionData.session.user.id}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error } = await supabaseClient.storage.from("site-media").upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });
    if (error) {
      showMessage(saveState, `Upload failed: ${error.message}`, true);
      input.value = "";
      return;
    }
    const { data } = supabaseClient.storage.from("site-media").getPublicUrl(filePath);
    updateValue(path, data.publicUrl);
    input.value = "";
    showMessage(saveState, "Uploaded. Publish changes to make it live.");
    renderEditor();
  }

  function renderNavigation() {
    sectionNav.replaceChildren();
    navItems.forEach(([key, title, icon]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `nav-item${currentSection === key ? " active" : ""}`;
      button.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${title}</span>`;
      button.addEventListener("click", () => {
        currentSection = key;
        renderNavigation();
        renderEditor();
      });
      sectionNav.appendChild(button);
    });
  }

  function renderOverview() {
    overview.replaceChildren();
    if (!content) return;
    const records = [
      ["Notice items", Array.isArray(content.notices) ? content.notices.length : 0],
      ["Highlight photos", content.highlights?.slides?.length || 0],
      ["YouTube cards", content.videos?.length || 0],
      ["Script days", content.scripts?.length || 0],
    ];
    records.forEach(([label, amount]) => {
      const card = document.createElement("div");
      card.className = "overview-card";
      const caption = document.createElement("span");
      caption.textContent = label;
      const value = document.createElement("strong");
      value.textContent = String(amount);
      card.append(caption, value);
      overview.appendChild(card);
    });
    overview.hidden = false;
  }

  function renderEditor() {
    renderOverview();
    editor.replaceChildren();
    if (currentSection === "overview") {
      const intro = document.createElement("div");
      intro.className = "section-intro";
      intro.innerHTML = '<div><h2>Welcome to your control room</h2><p>Content sections ko left menu se manage karein. Changes tabhi live honge jab aap Publish changes karein.</p></div>';
      editor.appendChild(intro);
      return;
    }
    const section = content && content[currentSection];
    if (section === undefined) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "Is section ka content load nahi hua. Reload karke dobara try karein.";
      editor.appendChild(empty);
      return;
    }
    const intro = document.createElement("div");
    intro.className = "section-intro";
    const text = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = labels[currentSection];
    const help = document.createElement("p");
    help.textContent = sectionHelp[currentSection];
    text.append(title, help);
    intro.appendChild(text);
    editor.appendChild(intro);

    if (Array.isArray(section)) {
      editor.appendChild(renderArray(currentSection, section, [currentSection]));
    } else if (section !== null && typeof section === "object") {
      editor.appendChild(renderObject(currentSection, section, [currentSection]));
    } else {
      editor.appendChild(renderField(currentSection, section, [currentSection], { full: true }));
    }
  }

  async function importCurrentSite() {
    contentNotice.hidden = false;
    contentNotice.textContent = "Pehli baar setup: current website se existing content load ho raha hai…";
    const exportReady = new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error("Website content import timed out.")), 20000);
      seedFrame.onload = () => {
        window.clearTimeout(timeout);
        try {
          const exporter = seedFrame.contentWindow.MGD_EXPORT_CURRENT_CONTENT;
          if (typeof exporter !== "function") throw new Error("Content import helper is unavailable.");
          resolve(exporter());
        } catch (error) {
          reject(error);
        }
      };
    });
    seedFrame.src = `../index.html?mgd-admin-export=1&v=${Date.now()}`;
    try {
      content = await exportReady;
      normalizeContent(content);
      hasSavedContent = false;
      contentNotice.textContent = "Existing website content load ho gaya. Publish changes dabane par ye Supabase mein save hoga.";
    } catch (error) {
      contentNotice.textContent = `Website content import nahi ho saka: ${error.message}`;
      contentNotice.classList.add("error");
      content = null;
    }
    renderEditor();
  }

  async function loadContent() {
    const { data, error } = await supabaseClient
      .from("site_content")
      .select("payload")
      .eq("id", "public")
      .maybeSingle();
    if (error) throw error;
    if (data && data.payload && typeof data.payload === "object") {
      content = normalizeContent(data.payload);
      publishedContent = clone(data.payload);
      hasSavedContent = true;
      contentNotice.hidden = true;
      renderEditor();
      return;
    }
    await importCurrentSite();
    publishedContent = null;
  }

  async function saveContent() {
    if (!content || saving) return;
    saving = true;
    saveButton.disabled = true;
    saveState.textContent = "Publishing…";
    saveState.style.color = "";
    const { data: authData, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !authData.user) {
      saveState.textContent = authError ? `Unable to verify admin: ${authError.message}` : "Please sign in again.";
      saveState.style.color = "#aa3931";
      saving = false;
      saveButton.disabled = false;
      return;
    }
    const previousContent = publishedContent ? clone(publishedContent) : null;
    const { error } = await supabaseClient.from("site_content").upsert({
      id: "public",
      payload: content,
      updated_at: new Date().toISOString(),
      updated_by: authData.user.id,
    });
    if (error) {
      saveState.textContent = `Publish failed: ${error.message}`;
      saveState.style.color = "#aa3931";
    } else {
      hasSavedContent = true;
      publishedContent = clone(content);
      contentNotice.hidden = true;
      saveState.textContent = `Published ${new Date().toLocaleTimeString()}`;
      saveState.style.color = "var(--admin-green)";
      renderOverview();
      const previousUrls = new Set();
      const currentUrls = new Set();
      collectStrings(previousContent, previousUrls);
      collectStrings(content, currentUrls);
      const removedPaths = [...previousUrls].flatMap(url => {
        const path = getOwnedStoragePath(url, authData.user.id);
        return path && !currentUrls.has(url) ? [path] : [];
      });
      if (removedPaths.length) {
        const { error: cleanupError } = await supabaseClient.storage.from("site-media").remove([...new Set(removedPaths)]);
        if (cleanupError) {
          saveState.textContent = `Published, but unused media cleanup failed: ${cleanupError.message}`;
          saveState.style.color = "#aa3931";
          console.error("Unable to delete media no longer used by published content:", cleanupError);
        }
      }
    }
    saving = false;
    saveButton.disabled = false;
  }

  function collectStrings(value, output) {
    if (typeof value === "string") {
      output.add(value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(item => collectStrings(item, output));
      return;
    }
    if (value && typeof value === "object") {
      Object.values(value).forEach(item => collectStrings(item, output));
    }
  }

  function getOwnedStoragePath(publicUrl, userId) {
    if (typeof publicUrl !== "string") return "";
    let url;
    try {
      url = new URL(publicUrl);
    } catch {
      return "";
    }
    const prefix = "/storage/v1/object/public/site-media/";
    if (!url.pathname.startsWith(prefix)) return "";
    try {
      const path = decodeURIComponent(url.pathname.slice(prefix.length));
      return path.startsWith(`${userId}/`) && !path.includes("..") ? path : "";
    } catch {
      return "";
    }
  }

  async function showDashboard() {
    try {
      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !userData.user) throw userError || new Error("Please sign in again.");
      const { data: adminRow, error: adminError } = await supabaseClient
        .from("site_admins")
        .select("user_id")
        .eq("user_id", userData.user.id)
        .maybeSingle();
      if (adminError) throw adminError;
      if (!adminRow) {
        const { error: signOutError } = await supabaseClient.auth.signOut();
        if (signOutError) console.error("Unable to clear non-admin session:", signOutError);
        showMessage(loginMessage, "Is account ko admin access nahi diya gaya hai.", true);
        return;
      }
      loginPanel.hidden = true;
      dashboard.hidden = false;
      renderNavigation();
      await loadContent();
    } catch (error) {
      loginPanel.hidden = false;
      dashboard.hidden = true;
      configAlert.hidden = false;
      configAlert.textContent = `Admin verification/content load nahi hua: ${error.message}. Supabase SQL setup aur admin allowlist check karein.`;
      showMessage(loginMessage, error.message, true);
      console.error("Unable to verify admin or load site content:", error);
    }
  }

  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase?.createClient) {
    setupNote.hidden = false;
    setupNote.textContent = "Portal activate karne ke liye scripts/backend-config.js mein Supabase project URL aur anon/publishable key set karein, phir supabase/setup.sql run karein.";
    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      showMessage(loginMessage, "Backend configuration missing hai. Pehle setup guide follow karein.", true);
    });
    return;
  }

  supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
  });

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const submit = loginForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    showMessage(loginMessage, "Signing in…");
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    submit.disabled = false;
    if (error) {
      showMessage(loginMessage, `Sign in failed: ${error.message}`, true);
      return;
    }
    showMessage(loginMessage, "");
    await showDashboard();
  });

  document.getElementById("logoutButton").addEventListener("click", async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      showMessage(saveState, `Sign out failed: ${error.message}`, true);
      return;
    }
    content = null;
    dashboard.hidden = true;
    loginPanel.hidden = false;
  });
  document.getElementById("reloadButton").addEventListener("click", async () => {
    if (!hasSavedContent || !window.confirm("Unsaved changes lose ho sakte hain. Server se reload karein?")) return;
    try {
      await loadContent();
      saveState.textContent = "Latest published content loaded.";
    } catch (error) {
      showMessage(saveState, `Reload failed: ${error.message}`, true);
    }
  });
  saveButton.addEventListener("click", saveContent);

  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
      showMessage(loginMessage, `Session check failed: ${error.message}`, true);
      return;
    }
    if (data.session) showDashboard();
  });
})();
