(() => {
  "use strict";

  if (new URLSearchParams(location.search).has("mgd-admin-export")) return;

  const config = window.MGD_BACKEND_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase?.createClient) return;

  const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  function createElement(tag, className, value) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value) element.textContent = value;
    return element;
  }

  function renderScripts(days) {
    const grid = document.querySelector(".scripts-grid");
    if (!grid || !Array.isArray(days)) return;
    grid.replaceChildren();
    document.querySelectorAll('.overlay-backdrop[id^="modal-day"]').forEach(modal => modal.remove());

    const fixedDays = [1, 2, 3, 4, 5, 6, 8, 9];
    const daysByNumber = new Map(days.map((day, index) => [
      Number.isInteger(Number(day.day)) ? Number(day.day) : index + 1,
      day,
    ]));
    fixedDays.forEach((dayNumber, index) => {
      const day = daysByNumber.get(dayNumber);
      if (!day) return;
      const parts = Array.isArray(day.parts) ? day.parts : [];
      const card = createElement("article", "script-card");
      const image = createElement("div", "script-card-img");
      image.id = `script-card${dayNumber}`;
      const badge = createElement("span", "script-card-day-badge", day.dayLabel || `नवरात्रि ${dayNumber}`);
      const icon = createElement("span", "script-card-icon");
      icon.setAttribute("aria-hidden", "true");
      image.append(badge, icon);
      const body = createElement("div", "script-card-body");
      const title = createElement("p", "script-card-title", day.title || "");
      body.appendChild(title);

      if (parts.length === 1) {
        const link = createElement("a", "btn-download");
        link.href = parts[0].url || "#";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = '<i class="fa-solid fa-download" aria-hidden="true"></i> View';
        body.appendChild(link);
      } else if (parts.length > 1) {
        const modalId = `admin-modal-day${dayNumber}`;
        const button = createElement("button", "btn-download");
        button.type = "button";
        button.innerHTML = '<i class="fa-solid fa-layer-group" aria-hidden="true"></i> View more';
        button.addEventListener("click", () => window.openModal(modalId));
        body.appendChild(button);
        const modal = createElement("div", "overlay-backdrop");
        modal.id = modalId;
        const modalBody = createElement("div", "overlay-modal");
        const close = createElement("button", "overlay-close", "×");
        close.type = "button";
        close.setAttribute("aria-label", "Close");
        close.addEventListener("click", () => window.closeModal(modalId));
        modalBody.append(close, createElement("h3", "", day.title || ""));
        parts.forEach(part => {
          const row = createElement("div", "overlay-part");
          row.appendChild(createElement("span", "overlay-part-name", part.label || "PDF"));
          const link = createElement("a", "btn-download");
          link.href = part.url || "#";
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.innerHTML = '<i class="fa-solid fa-download" aria-hidden="true"></i> View';
          row.appendChild(link);
          modalBody.appendChild(row);
        });
        modal.appendChild(modalBody);
        modal.addEventListener("click", event => {
          if (event.target === modal) window.closeModal(modalId);
        });
        document.body.appendChild(modal);
      } else {
        const button = createElement("button", "btn-download", "PDF जल्द उपलब्ध होगा");
        button.type = "button";
        button.disabled = true;
        body.appendChild(button);
      }
      card.append(image, body);
      grid.appendChild(card);
    });
  }

  function renderResources(resources) {
    const grid = document.querySelector(".spiritual-grid");
    if (!grid || !Array.isArray(resources)) return;
    const section = document.getElementById("spiritual");
    const cards = resources.filter(resource => resource && (resource.title || resource.url || resource.description));
    if (section) section.hidden = cards.length === 0;
    grid.replaceChildren();
    cards.forEach((resource, index) => {
      const card = createElement("article", "spiritual-card fade-up");
      card.style.animationDelay = `${Math.min(index, 8) * 0.06}s`;
      card.appendChild(createElement("div", "spiritual-card-strip"));
      const body = createElement("div", "spiritual-card-body");
      body.appendChild(createElement("div", "spiritual-card-title", resource.title || ""));
      body.appendChild(createElement("div", "spiritual-card-author", resource.author || ""));
      body.appendChild(createElement("p", "spiritual-card-desc", resource.description || ""));
      const link = createElement("a", "btn-download");
      link.href = resource.url || "#";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.innerHTML = '<i class="fa-solid fa-download" aria-hidden="true"></i> डाउनलोड करें';
      body.appendChild(link);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  function renderCast(cast) {
    const grid = document.querySelector(".cast-grid");
    if (!grid || !Array.isArray(cast.people)) return;
    const section = document.getElementById("cast");
    const featuredPeople = cast.people.filter(person => person && person.featured !== false && (person.name || person.imageUrl));
    if (section) section.hidden = featuredPeople.length === 0;
    grid.replaceChildren();
    featuredPeople.forEach((person, index) => {
      const card = createElement("article", "cast-card fade-up");
      card.style.animationDelay = `${Math.min(index, 8) * 0.06}s`;
      const image = createElement("img", "cast-card-img");
      image.src = person.imageUrl || "";
      image.alt = person.name || "";
      image.loading = "lazy";
      image.addEventListener("error", () => {
        image.style.background = "var(--gradient-media-fallback)";
      });
      const overlay = createElement("div", "cast-card-overlay");
      overlay.append(
        createElement("div", "cast-card-name", person.name || ""),
        createElement("div", "cast-card-role", person.role || ""),
        createElement("div", "cast-card-since", person.since || ""),
      );
      if (person.description) {
        const description = createElement("p", "cast-card-description", person.description);
        description.hidden = true;
        overlay.appendChild(description);
      }
      card.append(image, overlay);
      if (person.instagram) {
        const instagram = createElement("a", "cast-insta");
        instagram.href = person.instagram;
        instagram.target = "_blank";
        instagram.rel = "noopener noreferrer";
        instagram.setAttribute("aria-label", `Instagram: ${person.name || "Cast member"}`);
        instagram.innerHTML = '<i class="fa-brands fa-instagram" aria-hidden="true"></i>';
        card.appendChild(instagram);
      }
      grid.appendChild(card);
    });
    if (Array.isArray(cast.stats)) {
      const stats = document.querySelector(".stats-inner");
      if (stats) {
        stats.replaceChildren();
        cast.stats.forEach(stat => {
          const item = createElement("div", "stat-item");
          item.append(
            createElement("div", "stat-number", stat.value || ""),
            createElement("div", "stat-label", stat.label || ""),
          );
          stats.appendChild(item);
        });
      }
    }
  }

  function applyContent(content) {
    if (!content || typeof content !== "object") return;
    window.MGD_PUBLIC_CONTENT = content;

    if (content.notices && window.MGDNoticeStore) {
      const active = content.notices.filter(notice => notice.enabled !== false);
      window.MGDNoticeStore.set(active, active.length > 0);
    }
    if (content.poster) {
      const poster = document.querySelector(".poster-image");
      if (poster && content.poster.image) {
        poster.src = content.poster.image;
        poster.alt = content.poster.alt || "Festival poster";
      }
      window.MGDNoticeStore?.setPosterEnabled(content.poster.enabled !== false);
    }
    if (content.highlights && window.MGDGalleryStore) {
      window.MGDGalleryStore.set(content.highlights);
    }
    if (content.live) {
      const section = document.querySelector(".live-telecast-today");
      if (section) {
        section.style.display = content.live.enabled === false ? "none" : "";
        const title = section.querySelector(".section-title");
        const eyebrow = section.querySelector(".section-eyebrow");
        const image = section.querySelector("img");
        const link = section.querySelector(".live-telecast-card a");
        if (title) title.textContent = content.live.title || "";
        if (eyebrow) eyebrow.textContent = content.live.eyebrow || "";
        if (image && content.live.thumbnail) image.src = content.live.thumbnail;
        if (link) {
          link.href = content.live.url || "#";
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
      }
    }
    if (content.event && window.MGDEventStore) window.MGDEventStore.set(content.event);
    if (content.scripts) renderScripts(content.scripts);
    if (content.resources) renderResources(content.resources);
    if (content.shorts && window.MGDShorts) {
      const { enabled, items, ...shortsConfig } = content.shorts;
      window.MGDShorts.setContent(shortsConfig, items || [], enabled !== false);
    }
    if (Array.isArray(content.videos) && window.VideoStore) {
      window.VideoStore.setAll(content.videos);
      const homeVideos = document.getElementById("ytLatest");
      if (homeVideos && window.VideoUI) window.VideoUI.renderInto(homeVideos, window.VideoStore.getLatest(4));
    }
    if (content.cast) renderCast(content.cast);
    if (content.contacts) {
      const values = content.contacts;
      const contactItems = Array.from(document.querySelectorAll("#contact .contact-item"));
      const emailItem = contactItems.find(item => item.querySelector("h4")?.textContent.includes("ई-मेल"));
      const phoneItem = contactItems.find(item => item.querySelector("h4")?.textContent.includes("मोबाइल"));
      const addressItem = contactItems.find(item => item.querySelector("h4")?.textContent.includes("पता"));
      if (emailItem) {
        emailItem.href = values.email ? `mailto:${values.email}` : "#";
        emailItem.querySelector("p").textContent = values.email || "";
      }
      if (phoneItem) {
        phoneItem.href = values.phone ? `tel:${values.phone.replace(/[^\d+]/g, "")}` : "#";
        phoneItem.querySelector("p").textContent = values.phone || "";
      }
      if (addressItem) addressItem.querySelector("p").textContent = values.address || "";
      const socials = document.querySelectorAll(".footer-socials a");
      [values.youtube, values.instagram].forEach((url, index) => {
        if (!socials[index]) return;
        socials[index].href = url || "#";
        socials[index].hidden = !url;
      });
      if (socials[2]) {
        if (values.facebook) {
          socials[2].href = values.facebook;
          socials[2].setAttribute("aria-label", "Facebook");
          socials[2].innerHTML = '<i class="fa-brands fa-facebook" aria-hidden="true"></i>';
        } else {
          socials[2].href = values.contactUrl || socials[2].href;
          socials[2].hidden = false;
        }
      }
      const footerEmail = document.querySelector(".footer-contact-row .fa-envelope")?.parentElement?.querySelector("span");
      if (footerEmail) footerEmail.textContent = values.email || "";
      const footerPhone = document.querySelector(".footer-contact-row .fa-phone")?.parentElement?.querySelector("span");
      if (footerPhone) footerPhone.textContent = values.phone || "";
    }
  }

  window.MGDApplyContent = applyContent;
  client
    .from("site_content")
    .select("payload")
    .eq("id", "public")
    .maybeSingle()
    .then(({ data, error }) => {
      if (error) {
        console.error("Unable to load published website content; static content remains active:", error.message);
        return;
      }
      if (data?.payload) applyContent(data.payload);
    })
    .catch(error => {
      console.error("Unable to load published website content; static content remains active:", error);
    });
})();
