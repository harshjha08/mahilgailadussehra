(() => {
  "use strict";

  const dayNames = [
    "प्रथम नवरात्रि",
    "द्वितीय नवरात्रि",
    "तृतीय नवरात्रि",
    "चतुर्थ नवरात्रि",
    "पंचम नवरात्रि",
    "षष्ठ नवरात्रि",
    "सप्तम नवरात्रि",
    "अष्टम नवरात्रि",
    "नवम नवरात्रि",
  ];

  function text(root, selector) {
    return root.querySelector(selector)?.textContent.trim() || "";
  }

  function relativeDayLink(day) {
    const card = document.getElementById(`script-card${day}`);
    const title = card?.closest(".script-card");
    const modal = document.getElementById(`modal-day${day}`);
    let parts = [];

    if (title) {
      const directLink = title.querySelector(".script-card-body .btn-download[href]");
      if (directLink) {
        parts = [{ label: "PDF", url: directLink.getAttribute("href") || "" }];
      }
    }

    if (modal) {
      parts = Array.from(modal.querySelectorAll(".overlay-part")).map(part => ({
        label: text(part, ".overlay-part-name"),
        url: part.querySelector("a.btn-download")?.getAttribute("href") || "",
      }));
    }

    return {
      day,
      dayLabel: card ? text(card, ".script-card-day-badge") : dayNames[day - 1],
      title: title ? text(title, ".script-card-title") : `नवरात्रि ${day}`,
      parts,
    };
  }

  window.MGD_EXPORT_CURRENT_CONTENT = function () {
    const eventSection = document.getElementById("events");
    const castPeople = Array.from(document.querySelectorAll("#cast .cast-card"), card => {
      const name = text(card, ".cast-card-name");
      const instagram = card.querySelector(".cast-insta")?.href || "";
      return {
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        name,
        role: text(card, ".cast-card-role"),
        since: text(card, ".cast-card-since"),
        description: text(card, ".cast-card-description"),
        imageUrl: card.querySelector(".cast-card-img")?.getAttribute("src") || "",
        instagram,
        featured: true,
      };
    });
    const contactItems = Array.from(document.querySelectorAll("#contact .contact-item"));
    const email = contactItems.find(item => text(item, "h4").toLowerCase().includes("ई-मेल"));
    const phone = contactItems.find(item => text(item, "h4").toLowerCase().includes("मोबाइल"));
    const footerSocials = document.querySelectorAll(".footer-socials a");
    const statItems = Array.from(document.querySelectorAll(".stats-bar .stat-item"));
    const eventDates = Array.from(eventSection.querySelectorAll(".event-dates-list li"), item => ({
      name: text(item, ".event-date-name"),
      date: text(item, ".event-date-val"),
    }));
    const dateMatch = eventDates.at(-1)?.date.match(/(\d{1,2})\s+([^\s]+)\s+(\d{4})/);
    const monthNumbers = {
      जनवरी: "01", फरवरी: "02", मार्च: "03", अप्रैल: "04", मई: "05", जून: "06",
      जुलाई: "07", अगस्त: "08", सितंबर: "09", अक्टूबर: "10", नवंबर: "11", दिसंबर: "12",
    };
    const countdownDate = dateMatch
      ? `${dateMatch[3]}-${monthNumbers[dateMatch[2]] || "01"}-${dateMatch[1].padStart(2, "0")}T00:00:00`
      : "2027-10-09T00:00:00";

    return {
      notices: (window.MGDNoticeStore?.getAll() || []).map(notice => ({ ...notice, enabled: true })),
      poster: {
        enabled: true,
        image: document.querySelector(".poster-image")?.getAttribute("src") || "",
      },
      highlights: { enabled: true, ...(window.MGDGalleryStore?.get() || { eyebrow: "", title: "", allPhotosLabel: "", slides: [] }) },
      videos: window.VideoStore?.getAll() || [],
      live: {
        enabled: getComputedStyle(document.querySelector(".live-telecast-today") || document.body).display !== "none",
        eyebrow: text(document, ".live-telecast-today .section-eyebrow"),
        title: text(document, ".live-telecast-today .section-title"),
        thumbnail: document.querySelector(".live-telecast-today img")?.getAttribute("src") || "",
        url: document.querySelector(".live-telecast-today .live-telecast-card a")?.getAttribute("href") || "",
      },
      event: {
        enabled: true,
        eyebrow: text(eventSection, ".section-eyebrow"),
        title: text(eventSection, ".section-title"),
        badge: text(eventSection, ".event-year-badge"),
        eventTitle: eventSection.querySelector(".event-title")?.innerText.trim().replace(/\s+/g, " ") || "",
        dates: eventDates,
        countdownDate,
        note: text(eventSection, ".event-note"),
      },
      scripts: Array.from({ length: 9 }, (_, index) => relativeDayLink(index + 1)),
      resources: Array.from(document.querySelectorAll(".spiritual-card"), card => ({
        title: text(card, ".spiritual-card-title"),
        author: text(card, ".spiritual-card-author"),
        description: text(card, ".spiritual-card-desc"),
        url: card.querySelector("a.btn-download")?.getAttribute("href") || "",
      })),
      shorts: {
        enabled: true,
        ...(window.MGDShorts?.getConfig() || {}),
        items: window.MGDShorts?.getAll() || [],
      },
      contacts: {
        email: text(email || document, ".contact-item-text p"),
        phone: text(phone || document, ".contact-item-text p"),
        address: text(contactItems.find(item => text(item, "h4").toLowerCase().includes("पता")) || document, ".contact-item-text p"),
        youtube: footerSocials[0]?.href || "",
        instagram: footerSocials[1]?.href || "",
        facebook: "",
        contactUrl: footerSocials[2]?.getAttribute("href") || "",
      },
      cast: {
        people: castPeople,
        stats: statItems.map(item => ({
          value: text(item, ".stat-number"),
          label: text(item, ".stat-label"),
        })),
      },
    };
  };
})();
