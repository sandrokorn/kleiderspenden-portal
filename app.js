// --- DOM-Elemente & Variablen ---

const form = document.getElementById("donation-form");
const addressBlock = document.getElementById("address-block");
const alertBox = document.getElementById("alert");
const confirmation = document.getElementById("confirmation");
const confirmationList = document.getElementById("confirmation-list");
const sideCard = document.getElementById("side-card");
const newEntryBtn = document.getElementById("new-entry");

const handoverOffice = document.getElementById("handover-office");
const handoverPickup = document.getElementById("handover-pickup");

const streetInput = document.getElementById("street");
const zipInput = document.getElementById("zip");
const cityInput = document.getElementById("city");
const clothesSelect = document.getElementById("clothes");
const regionSelect = document.getElementById("region");
const languageSelect = document.getElementById('languageSelect');

// PLZ-Präfix der Geschäftsstelle (Leipzig)
const HQ_ZIP_PREFIX = "04";

const showAlert = (message) => {
  alertBox.textContent = message;
  alertBox.classList.remove("d-none");
};

const clearAlert = () => {
  alertBox.textContent = "";
  alertBox.classList.add("d-none");
};

const toggleAddressBlock = () => {
  if (handoverPickup.checked) {
    addressBlock.classList.remove("d-none");
    addressBlock.setAttribute("aria-hidden", "false");
    streetInput.setAttribute("required", "required");
    zipInput.setAttribute("required", "required");
    cityInput.setAttribute("required", "required");
  } else {
    addressBlock.classList.add("d-none");
    addressBlock.setAttribute("aria-hidden", "true");
    streetInput.removeAttribute("required");
    zipInput.removeAttribute("required");
    cityInput.removeAttribute("required");
  }
};

const formatDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
};

// Sichere Datenausgabe via textContent (XSS-Prävention)
const buildConfirmation = (data) => {
  confirmationList.innerHTML = ""; 
  const items = [
    ["Übergabeart", data.handover],
    ["Kleidungsart", data.clothes],
    ["Krisenregion", data.region],
    ["Datum", data.date],
    ["Uhrzeit", data.time],
    ["Ort", data.location],
  ];

  items.forEach(([label, value]) => {
    const dt = document.createElement("dt");
    dt.className = "col-sm-4 text-muted font-weight-normal"; // Bootstrap Klassen
    dt.textContent = label;
    
    const dd = document.createElement("dd");
    dd.className = "col-sm-8 text-sm-end fw-bold text-break"; // Rechtsbündig auf größeren Screens
    dd.textContent = value;
    
    confirmationList.appendChild(dt);
    confirmationList.appendChild(dd);
  });
};

// --- Event-Listener & UI ---

if (languageSelect) {
  languageSelect.addEventListener('change', function() {
    if (this.value === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'de');
    }
  });
}

handoverOffice.addEventListener("change", toggleAddressBlock);
handoverPickup.addEventListener("change", toggleAddressBlock);

// --- Formular-Validierung & State Management ---

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearAlert();

  if (!clothesSelect.value || !regionSelect.value) {
    showAlert("Bitte wähle eine Kleidungsart und eine Krisenregion aus.");
    return;
  }

  if (handoverPickup.checked) {
    if (!streetInput.value || !zipInput.value || !cityInput.value) {
      showAlert("Bitte fülle die vollständige Abholadresse aus.");
      return;
    }

    const zipRegex = new RegExp(`^${HQ_ZIP_PREFIX}\\d{3}$`);
    
    if (!zipRegex.test(zipInput.value)) {
      showAlert(
        `Fehler: Die Postleitzahl muss exakt 5 Ziffern lang sein und mit ${HQ_ZIP_PREFIX} beginnen (z.B. 04109).`
      );
      return;
    }
  }

  const { date, time } = formatDateTime();
  const handover = handoverPickup.checked
    ? "Abholung durch Sammelfahrzeug"
    : "Übergabe an der Geschäftsstelle";
  const location = handoverPickup.checked
    ? `${streetInput.value}, ${zipInput.value} ${cityInput.value}`
    : "Geschäftsstelle (Musterstraße 12, 04109 Leipzig)";

  buildConfirmation({
    handover,
    clothes: clothesSelect.value,
    region: regionSelect.value,
    date,
    time,
    location,
  });

  form.reset();
  toggleAddressBlock();
  confirmation.hidden = false;
  sideCard.hidden = true;
  confirmation.scrollIntoView({ behavior: "smooth" });
});

newEntryBtn.addEventListener("click", () => {
  confirmation.hidden = true;
  sideCard.hidden = false;
  clearAlert();
  form.scrollIntoView({ behavior: "smooth" });
});

toggleAddressBlock();