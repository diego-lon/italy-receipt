const inputs = [
  "lordo",
  "percentuale",
  "customTaxInput",
  "numero",
  "mittente",
  "destinatario",
  "descrizione",
  "bolloID",
  "metodoPagamento",
  "data",
];

window.togglePolicy = function () {
  const modal = document.getElementById("policyModal");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
};

window.toggleCustomTax = function () {
  const select = document.getElementById("percentuale");
  document
    .getElementById("customTaxDiv")
    .classList.toggle("hidden", select.value !== "custom");
  updatePreview();
};

// Auto-load data from localStorage
window.onload = () => {
  ["mittente", "destinatario", "metodoPagamento"].forEach((id) => {
    const savedValue = localStorage.getItem("italyReceipt_" + id);
    if (savedValue) document.getElementById(id).value = savedValue;
  });
  document.getElementById("data").valueAsDate = new Date();
  updatePreview();
};

inputs.forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    // Auto-save specific fields
    if (["mittente", "destinatario", "metodoPagamento"].includes(id)) {
      localStorage.setItem(
        "italyReceipt_" + id,
        document.getElementById(id).value,
      );
    }
    updatePreview();
  });
});

function getActiveTax() {
  const select = document.getElementById("percentuale");
  return select.value === "custom"
    ? (parseFloat(document.getElementById("customTaxInput").value) || 0) / 100
    : parseFloat(select.value);
}

function updatePreview() {
  const lordo = parseFloat(document.getElementById("lordo").value) || 0;
  const needsBollo = lordo > 77.47;
  document
    .getElementById("bolloChargeDiv")
    .classList.toggle("hidden", !needsBollo);

  const chargeBollo =
    needsBollo && document.getElementById("chargeBollo").checked;
  const bolloToCharge = chargeBollo ? 2.0 : 0;

  const perc = getActiveTax();
  const ritenuta = lordo * perc;
  const netto = lordo - ritenuta + bolloToCharge;

  document.getElementById("prevLordo").innerText = `€ ${lordo.toLocaleString(
    "it-IT",
    { minimumFractionDigits: 2 },
  )}`;
  document.getElementById(
    "prevRitenuta",
  ).innerText = `- € ${ritenuta.toLocaleString("it-IT", {
    minimumFractionDigits: 2,
  })}`;

  const bolloRow = document.getElementById("prevBolloRow");
  if (chargeBollo) {
    bolloRow.classList.remove("hidden");
  } else {
    bolloRow.classList.add("hidden");
  }

  document.getElementById("prevNetto").innerText = `€ ${netto.toLocaleString(
    "it-IT",
    { minimumFractionDigits: 2 },
  )}`;
  document.getElementById("prevNum").innerText = `#${
    document.getElementById("numero").value || "___"
  }`;
  document.getElementById("pSender").innerText =
    document.getElementById("mittente").value || "---";
  document.getElementById("pClient").innerText =
    document.getElementById("destinatario").value || "---";
}

window.downloadPDF = async function () {
  trackPDFDownload(document.getElementById("lordo").value);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const lang = document.getElementById("pdfLang").value;

  const lordo = parseFloat(document.getElementById("lordo").value) || 0;
  const needsBollo = lordo > 77.47;
  const chargeBollo =
    needsBollo && document.getElementById("chargeBollo").checked;
  const bolloToCharge = chargeBollo ? 2.0 : 0;
  const bolloTot = needsBollo ? 2.0 : 0;

  const perc = getActiveTax();
  const ritenuta = lordo * perc;
  const netto = lordo - ritenuta + bolloToCharge;
  const payVal = document.getElementById("metodoPagamento").value.trim();
  const bolloVal = document.getElementById("bolloID").value.trim();

  const labels = {
    it: {
      nr: "Ricevuta nr.",
      del: "del",
      prestatore: "DATI PRESTATORE",
      committente: "DESTINATARIO",
      desc: "DESCRIZIONE",
      importo: "IMPORTO",
      ritenuta: "Ritenuta d'acconto",
      bolloCharge: "Rivalsa Marca da Bollo",
      bollo: "BOLLO",
      comp: "COMPENSO RICEVUTO",
      statement:
        "Dichiaro di aver ricevuto la somma sotto indicata quale compenso per prestazione occasionale eseguita per lo svolgimento del lavoro specificato:",
      footer:
        "- prestazione occasionale non professionale;\n- entro la franchigia di € 5.000;\n- fuori campo IVA (Art. 5 DPR 633/72).",
      pay: "Pagamento:",
      bolloID: "ID MARCA DA BOLLO:",
    },
    en: {
      nr: "Receipt no.",
      del: "date",
      prestatore: "SENDER DETAILS",
      committente: "RECIPIENT",
      desc: "DESCRIPTION",
      importo: "AMOUNT",
      ritenuta: "Withholding tax",
      bolloCharge: "Stamp Duty Charge",
      bollo: "STAMP",
      comp: "NET RECEIVED",
      statement:
        "I declare to have received the sum indicated below as compensation for occasional performance carried out for the following work:",
      footer:
        "- occasional non-professional performance;\n- within the € 5,000 threshold;\n- exempt from VAT (Art. 5 DPR 633/72).",
      pay: "Pagamento:",
      bolloID: "STAMP ID:",
    },
  }[lang];

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(labels.nr, 140, 20);
  doc.text(labels.del, 175, 20);
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text(document.getElementById("numero").value || "1", 140, 28);
  doc.text(document.getElementById("data").value || "---", 175, 28);

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(labels.prestatore, 20, 45);
  doc.text(labels.committente, 110, 45);
  doc.setFontSize(10);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.text(
    doc.splitTextToSize(document.getElementById("mittente").value, 70),
    20,
    52,
  );
  doc.setFont("helvetica", "bold");
  doc.text(
    doc.splitTextToSize(document.getElementById("destinatario").value, 80),
    110,
    52,
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(doc.splitTextToSize(labels.statement, 170), 20, 85);

  doc.setFillColor(245);
  doc.rect(20, 95, 170, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.text(labels.desc, 25, 100);
  doc.text(labels.importo, 185, 100, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(document.getElementById("descrizione").value || "Work", 25, 110);
  doc.text(`€ ${lordo.toFixed(2)}`, 185, 110, { align: "right" });

  doc.text(`${labels.ritenuta} ${(perc * 100).toFixed(0)}%`, 25, 130);
  doc.text(`- € ${ritenuta.toFixed(2)}`, 185, 130, { align: "right" });

  if (chargeBollo) {
    doc.text(labels.bolloCharge, 25, 140);
    doc.text(`+ € 2.00`, 185, 140, { align: "right" });
  }

  doc.line(20, 150, 190, 150);
  doc.setFontSize(7);
  doc.text(doc.splitTextToSize(labels.footer, 100), 20, 160);

  if (payVal) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(labels.pay, 125, 160);
    doc.setFont("helvetica", "bold");
    doc.text(payVal, 125, 165);
  }
  if (bolloVal) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(labels.bolloID, 125, 175);
    doc.setFont("helvetica", "bold");
    doc.text(bolloVal, 125, 180);
  }

  doc.setFillColor(252);
  doc.rect(120, 195, 70, 20, "F");
  doc.text(labels.comp, 145, 200);
  doc.setFontSize(16);
  doc.text(`€ ${netto.toFixed(2)}`, 185, 210, { align: "right" });

  doc.save(`Ritenuta d'acconto ${document.getElementById("numero").value}.pdf`);
};
function handleConsent(choice) {
  localStorage.setItem("cookie_consent", choice);
  document.getElementById("cookieBanner").classList.add("hidden");

  if (choice === "accepted") {
    updateConsent("granted");
  } else {
    updateConsent("denied");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("downloadBtn");
  if (btn) {
    btn.addEventListener("click", window.downloadPDF);
  }
});
