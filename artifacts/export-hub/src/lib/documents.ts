export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const CO = {
  name:    "Savita Global Interprises",
  addr1:   "Parth A Apartment, 3/11, Patel Colony",
  addr2:   "Jamnagar – 361008, Gujarat, India",
  phone:   "+91-8299770889",
  wa:      "8299770889",
  email:   "satyendra191@gmail.com",
  gstin:   "",
  iec:     "",
  pan:     "",
  bank:    "",
};

const baseStyles = `
  body { font-family: Arial, sans-serif; font-size: 12px; color: #111; margin: 0; padding: 20px; }
  h1 { font-size: 18px; text-align: center; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .subtitle { text-align: center; font-size: 11px; color: #555; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  th { background: #1e3a5f; color: #fff; padding: 8px; text-align: left; font-size: 11px; }
  td { padding: 7px 8px; border: 1px solid #d1d5db; vertical-align: top; font-size: 11px; }
  tr:nth-child(even) td { background: #f9fafb; }
  .label { font-weight: bold; color: #374151; width: 180px; }
  .section-title { font-size: 13px; font-weight: bold; color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 4px; margin: 18px 0 10px; }
  .header-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .header-box { border: 1px solid #d1d5db; padding: 10px; border-radius: 4px; }
  .header-box h3 { margin: 0 0 8px; font-size: 12px; color: #1e3a5f; }
  .field { display: flex; gap: 6px; margin-bottom: 4px; }
  .field-label { font-weight: bold; min-width: 120px; color: #374151; }
  .field-value { border-bottom: 1px dotted #999; flex: 1; min-height: 14px; }
  .prefilled { color: #1e3a5f; font-weight: 600; }
  .total-row td { font-weight: bold; background: #eff6ff !important; }
  .sign-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px; }
  .sign-box { border-top: 1px solid #374151; padding-top: 6px; text-align: center; font-size: 11px; color: #555; }
  .footer { font-size: 10px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 10px; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; }
  .badge-green { background: #dcfce7; color: #166534; }
  .badge-blue { background: #dbeafe; color: #1e40af; }
  .checklist-item { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
  .check-box { width: 14px; height: 14px; border: 2px solid #374151; border-radius: 2px; flex-shrink: 0; margin-top: 1px; }
  @media print { body { padding: 0; } }
`;

function exporterBox(title = "Exporter / Seller"): string {
  return `
    <div class="header-box">
      <h3>${title}</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}</span></div>
      <div class="field"><span class="field-label">City / State / PIN:</span><span class="field-value prefilled">${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WhatsApp:</span><span class="field-value prefilled">${CO.phone} &nbsp;|&nbsp; WA: ${CO.wa}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">GSTIN:</span><span class="field-value">${CO.gstin}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
      <div class="field"><span class="field-label">PAN:</span><span class="field-value">${CO.pan}</span></div>
    </div>`;
}

export function generateCommercialInvoice(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Commercial Invoice – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Commercial Invoice</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; ${CO.addr2} &nbsp;|&nbsp; For Export Purposes Only</p>

  <div class="header-grid">
    ${exporterBox("Exporter / Seller")}
    <div class="header-box">
      <h3>Invoice Details</h3>
      <div class="field"><span class="field-label">Invoice No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Invoice Date:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Buyer's Order No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Order Date:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Mode of Payment:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Currency:</span><span class="field-value">USD / EUR / INR</span></div>
      <div class="field"><span class="field-label">Terms of Delivery:</span><span class="field-value">FOB / CIF / EXW</span></div>
    </div>
  </div>

  <div class="header-grid">
    <div class="header-box">
      <h3>Consignee / Buyer</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">City / Country:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Contact / Email:</span><span class="field-value"></span></div>
    </div>
    <div class="header-box">
      <h3>Shipment Details</h3>
      <div class="field"><span class="field-label">Port of Loading:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Port of Discharge:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Final Destination:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Vessel / Flight No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">B/L or AWB No.:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Item Description</div>
  <table>
    <thead>
      <tr>
        <th style="width:5%">Sr.</th><th style="width:30%">Description of Goods</th><th style="width:10%">HS Code</th>
        <th style="width:10%">Qty</th><th style="width:10%">Unit</th><th style="width:15%">Unit Price</th>
        <th style="width:10%">Disc. %</th><th style="width:10%">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4,5].map(i => `<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="7" style="text-align:right;padding-right:12px">Sub-Total</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right;padding-right:12px">Freight</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right;padding-right:12px">Insurance</td><td></td></tr>
      <tr class="total-row"><td colspan="7" style="text-align:right;padding-right:12px">Grand Total</td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Declaration</div>
  <p style="font-size:11px;color:#374151">We, <strong>${CO.name}</strong>, hereby certify that the goods described above are of Indian origin and that the particulars given in this invoice are true and correct.</p>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Stamp<br><br><br></div>
    <div class="sign-box">Buyer's Acceptance / Signature<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

export function generatePackingList(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Packing List – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Packing List</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Annexure to Commercial Invoice &nbsp;|&nbsp; Original</p>

  <div class="header-grid">
    ${exporterBox("Exporter / Seller")}
    <div class="header-box">
      <h3>Reference Details</h3>
      <div class="field"><span class="field-label">Packing List No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Invoice Ref No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">LUT / Bond No.:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="header-grid">
    <div class="header-box">
      <h3>Consignee</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Country:</span><span class="field-value"></span></div>
    </div>
    <div class="header-box">
      <h3>Shipment</h3>
      <div class="field"><span class="field-label">Port of Loading:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Port of Discharge:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Vessel / Flight:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">ETD:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Package Details</div>
  <table>
    <thead>
      <tr>
        <th>Pkg No.</th><th>Description of Goods</th><th>HS Code</th><th>Qty/Pkg</th>
        <th>No. of Pkgs</th><th>Total Qty</th><th>Net Wt (kg)</th><th>Gross Wt (kg)</th>
        <th>Dimensions (cm)</th><th>Volume (CBM)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4,5,6].map(i => `<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>L× W× H</td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="4" style="text-align:right">Totals</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Stamp<br><br><br></div>
    <div class="sign-box">CHA / Freight Forwarder<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

export function generateProformaInvoice(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Proforma Invoice – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Proforma Invoice</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Preliminary Bill of Sale — Not for Payment &nbsp;|&nbsp; Valid till: ${validUntil}</p>

  <div class="header-grid">
    ${exporterBox("Seller / Exporter")}
    <div class="header-box">
      <h3>Proforma Details</h3>
      <div class="field"><span class="field-label">PI Number:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">PI Date:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Valid Until:</span><span class="field-value">${validUntil}</span></div>
      <div class="field"><span class="field-label">Payment Terms:</span><span class="field-value">50% advance, 50% before dispatch</span></div>
      <div class="field"><span class="field-label">Currency:</span><span class="field-value">USD</span></div>
      <div class="field"><span class="field-label">Delivery Terms:</span><span class="field-value">CIF / FOB / EXW</span></div>
      <div class="field"><span class="field-label">Lead Time:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="header-box" style="margin-bottom:16px">
    <h3>Buyer / Importer</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div>
        <div class="field"><span class="field-label">Company Name:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Address:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Country:</span><span class="field-value"></span></div>
      </div>
      <div>
        <div class="field"><span class="field-label">Contact Person:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Email:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Phone / WhatsApp:</span><span class="field-value"></span></div>
      </div>
    </div>
  </div>

  <div class="section-title">Products / Services Quoted</div>
  <table>
    <thead>
      <tr>
        <th>Sr.</th><th>Product Description</th><th>HS Code</th><th>Specification</th>
        <th>Qty</th><th>Unit</th><th>Unit Price (USD)</th><th>Total (USD)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr><td colspan="7" style="text-align:right;padding-right:12px">Freight (if CIF)</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right;padding-right:12px">Insurance</td><td></td></tr>
      <tr class="total-row"><td colspan="7" style="text-align:right;padding-right:12px">Grand Total</td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Bank Details for Payment</div>
  <table>
    <tr><td class="label">Bank Name:</td><td></td><td class="label">Branch:</td><td></td></tr>
    <tr><td class="label">Account Name:</td><td class="prefilled">${CO.name}</td><td class="label">A/C No.:</td><td></td></tr>
    <tr><td class="label">IFSC Code:</td><td></td><td class="label">SWIFT Code:</td><td></td></tr>
  </table>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Company Seal<br><br><br></div>
    <div class="sign-box">Buyer Confirmation &amp; Date<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

export function generateCOOChecklist(): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>COO Checklist – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Certificate of Origin — Issuance Checklist</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Authority: DGFT / Chamber of Commerce / APEDA</p>

  <div class="section-title">1. Applicant / Exporter Information</div>
  ${[
    ["Company Name (as per IEC)", CO.name],
    ["IEC Number", CO.iec || ""],
    ["GSTIN", CO.gstin || ""],
    ["Registered Office Address", `${CO.addr1}, ${CO.addr2}`],
    ["Contact Person & Designation", ""],
    ["Email / Phone", `${CO.email} / ${CO.phone}`],
    ["RCMC Number (if applicable)", ""],
  ].map(([l, v]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${l}:</strong>&nbsp;<span class="prefilled">${v}</span></div></div>`).join("")}

  <div class="section-title">2. Documents Required (check when ready)</div>
  ${[
    "Commercial Invoice (signed & stamped)",
    "Packing List",
    "Shipping Bill / Export Declaration",
    "Bill of Lading / Airway Bill",
    "Buyer's Purchase Order",
    "Product Description / Specifications sheet",
    "Manufacturing / Process flow chart (if required)",
    "Factory Inspection Certificate (for preferential COO)",
    "Self-declaration of Indian Origin",
    "Board Resolution / Authority Letter",
    "Company Registration / MSME certificate",
    "GST Returns (for self-certification)",
    "Lab Test Report / Quality Certificate (if applicable)",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">3. COO Type &amp; Applicable Rules</div>
  <table>
    <thead><tr><th>COO Type</th><th>Used For</th><th>Issuing Authority</th><th>Fee</th><th>✓</th></tr></thead>
    <tbody>
      <tr><td>Non-Preferential COO</td><td>General exports (no FTA)</td><td>Chamber of Commerce / FIEO</td><td>~₹250–500</td><td><div class="check-box"></div></td></tr>
      <tr><td>GSP (Form A)</td><td>EU / USA concession</td><td>Export Inspection Council</td><td>~₹500</td><td><div class="check-box"></div></td></tr>
      <tr><td>SAFTA COO</td><td>South Asian FTA countries</td><td>DGFT</td><td>Free</td><td><div class="check-box"></div></td></tr>
      <tr><td>ASEAN COO (Form AI)</td><td>ASEAN member countries</td><td>DGFT</td><td>Free</td><td><div class="check-box"></div></td></tr>
      <tr><td>India–UAE CEPA</td><td>UAE exports</td><td>DGFT</td><td>Free</td><td><div class="check-box"></div></td></tr>
      <tr><td>APEDA COO</td><td>Agri / food products</td><td>APEDA</td><td>As per schedule</td><td><div class="check-box"></div></td></tr>
    </tbody>
  </table>

  <div class="section-title">4. Submission Checklist</div>
  ${[
    "Application submitted on official portal (DGFT / Chamber) with correct HS Codes",
    "All fields filled in capital letters on COO form",
    "Notarized documents attached (where required)",
    "Application fee paid via NEFT / online",
    "Physical COO collected or e-COO downloaded after approval",
    "Copy retained for 5 years for audit purposes",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

export function generateShippingBillChecklist(): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Shipping Bill Checklist – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Shipping Bill Filing Checklist</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Indian Customs (ICEGATE) &nbsp;|&nbsp; icegate.gov.in</p>

  <div class="header-box" style="margin-bottom:16px">
    <h3>Exporter Details</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div>
        <div class="field"><span class="field-label">Company:</span><span class="field-value prefilled">${CO.name}</span></div>
        <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
        <div class="field"><span class="field-label">IEC:</span><span class="field-value">${CO.iec}</span></div>
      </div>
      <div>
        <div class="field"><span class="field-label">GSTIN:</span><span class="field-value">${CO.gstin}</span></div>
        <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
        <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      </div>
    </div>
  </div>

  <div class="section-title">1. Types of Shipping Bill</div>
  <table>
    <thead><tr><th>Type</th><th>Applicable For</th><th>Colour</th><th>✓</th></tr></thead>
    <tbody>
      <tr><td>Free Shipping Bill</td><td>Goods exported without drawback / duty claim</td><td>White</td><td><div class="check-box"></div></td></tr>
      <tr><td>Drawback Shipping Bill</td><td>Claim of Customs &amp; Central Excise Drawback</td><td>Green</td><td><div class="check-box"></div></td></tr>
      <tr><td>DEPB Shipping Bill</td><td>Duty Entitlement Pass Book Scheme</td><td>Yellow</td><td><div class="check-box"></div></td></tr>
      <tr><td>Ex-Bond Shipping Bill</td><td>Goods from bonded warehouse</td><td>Pink</td><td><div class="check-box"></div></td></tr>
    </tbody>
  </table>

  <div class="section-title">2. Pre-Filing Documents (check when ready)</div>
  ${[
    "Commercial Invoice (3 copies) — with correct HS Code",
    "Packing List (3 copies)",
    "GST Invoice / Tax Invoice",
    "Letter of Credit / Advance Payment proof",
    "IEC Certificate",
    "GSTIN Certificate",
    "RCMC / Export Promotion Council Certificate",
    "Product License / NOC (if restricted goods)",
    "Certificate of Origin (if required by buyer)",
    "Fumigation Certificate (for food / wooden packaging)",
    "Phytosanitary Certificate (for plant-origin goods)",
    "APEDA Registration Certificate (for agri products)",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">3. Post-Filing Actions</div>
  ${[
    "Shipping Bill number noted and filed",
    "Let Export Order (LEO) obtained from Customs",
    "EGM filed by shipping line",
    "FIRC (Foreign Inward Remittance Certificate) obtained after payment",
    "Bank Realization Certificate (BRC) submitted to AD Bank",
    "RoDTEP / Drawback claim filed on ICEGATE",
    "GST refund claimed (if applicable)",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

export function generateExportReadinessChecklist(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Export Readiness – ${CO.name}</title>
  <style>${baseStyles}
  .phase { background:#1e3a5f; color:#fff; padding:6px 12px; border-radius:4px; font-size:12px; font-weight:bold; margin-top:20px; margin-bottom:8px; }
  .score-box { border:2px solid #1e3a5f; border-radius:8px; padding:16px; text-align:center; margin-bottom:20px; }
  .score-box h2 { margin:0; font-size:28px; color:#1e3a5f; }
  </style></head><body>
  <h1>Export Readiness Checklist</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Self-Assessment &nbsp;|&nbsp; Date: ${today}</p>

  <div class="header-grid">
    <div class="header-box">
      <div class="field"><span class="field-label">Company Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">Product / HS Code:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Target Market:</span><span class="field-value"></span></div>
    </div>
    <div class="score-box">
      <h2>&nbsp;&nbsp;&nbsp;/ 30</h2>
      <p>Items Completed / Total</p>
      <p style="font-size:10px;color:#888;margin-top:4px;">Tick each item when done</p>
    </div>
  </div>

  <div class="phase">Phase 1 — Legal &amp; Registration (Must-Have)</div>
  ${[
    ["PAN Card", "Permanent Account Number for the business entity"],
    ["GST Registration", "GSTIN mandatory for exports under LUT/Bond"],
    ["IEC Registration", "Importer Exporter Code from DGFT — ₹500 fee (dgft.gov.in)"],
    ["Bank Account — AD Category Bank", "Authorised Dealer bank for foreign exchange"],
    ["Company Registration", "Pvt. Ltd. / LLP / Partnership / Proprietorship"],
    ["MSME Registration (Udyam)", "Recommended for benefits (udyamregistration.gov.in)"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 2 — Product &amp; Market Research</div>
  ${[
    ["HS Code Identification", "8-digit HS Code (indiantradeportal.in)"],
    ["Export Market Identified", "Country with highest demand — NIRYAT / TradeStat"],
    ["Competitor Analysis Done", "Price benchmarking with other exporting countries"],
    ["Tariff &amp; Duty Research", "Import duty in target country (indiantradeportal.in)"],
    ["Buyer Identified", "At least one confirmed buyer or enquiry"],
    ["Proforma Invoice Sent", "Quote shared with buyer with all commercial terms"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 3 — Certification &amp; Compliance</div>
  ${[
    ["RCMC Certificate", "From relevant EPC / FIEO"],
    ["APEDA Registration", "Required for scheduled agri products"],
    ["Product Standard Compliance", "BIS, FSSAI, BEE, or applicable standards"],
    ["Quality Certificate / Lab Report", "SGS / NABL-accredited lab test report"],
    ["Export Insurance", "ECGC policy for credit risk (ecgc.in)"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 4 — Logistics &amp; Shipping</div>
  ${[
    ["CHA Appointed", "Licensed Customs House Agent"],
    ["Freight Forwarder Identified", "Sea / Air freight rates compared"],
    ["Incoterms Agreed", "FOB / CIF / EXW / DAP"],
    ["Container / Space Booked", "20ft / 40ft container or LCL"],
    ["LUT / Bond Filed with GST Dept.", "For zero-rated supply"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 5 — Documentation &amp; Financial</div>
  ${[
    ["Commercial Invoice Prepared", "Signed, stamped with all mandatory fields"],
    ["Packing List Ready", "Accurate weight, volume, and package count"],
    ["Certificate of Origin Obtained", "From Chamber / DGFT / APEDA"],
    ["Shipping Bill Filed on ICEGATE", "LEO obtained; cargo cleared by customs"],
    ["Payment Terms Confirmed", "LC / TT / DA / DP"],
    ["FIRC &amp; BRC Submitted", "Bank Realization Certificate filed within 9 months"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="section-title">Key Helplines</div>
  <table>
    <tr><td class="label">DGFT (IEC / Licenses):</td><td>1800-111-550 &nbsp;|&nbsp; helpdesk@dgft.gov.in</td></tr>
    <tr><td class="label">ICEGATE (Customs):</td><td>1800-3010-1000 &nbsp;|&nbsp; helpdesk@icegate.gov.in (24×7)</td></tr>
    <tr><td class="label">APEDA (Agri):</td><td>1800-111-175 &nbsp;|&nbsp; helpdesk@apeda.gov.in</td></tr>
    <tr><td class="label">FIEO (RCMC):</td><td>011-26153040 &nbsp;|&nbsp; fieo@fieo.org</td></tr>
  </table>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 7. Fumigation Certificate (ISPM-15) ─────────────────────────────────── */
export function generateFumigationCertificate(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Fumigation Certificate – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Fumigation Certificate</h1>
  <p class="subtitle">ISPM-15 Compliance — Wooden Packaging Material (WPM) Treatment &nbsp;|&nbsp; ${today}</p>
  <p style="text-align:center;font-size:10px;color:#555">As per International Standards for Phytosanitary Measures No. 15 (ISPM-15) — FAO / NPPO India</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter / Shipper</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
    </div>
    <div class="header-box">
      <h3>Certificate Reference</h3>
      <div class="field"><span class="field-label">Certificate No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Treatment:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Issue:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Fumigation Agency:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Agency Licence No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Destination Country:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Shipment Details</div>
  <table>
    <tr><td class="label">Commercial Invoice No.:</td><td></td><td class="label">B/L or AWB No.:</td><td></td></tr>
    <tr><td class="label">Port of Loading:</td><td></td><td class="label">Port of Discharge:</td><td></td></tr>
    <tr><td class="label">Vessel / Airline:</td><td></td><td class="label">ETD / Flight Date:</td><td></td></tr>
    <tr><td class="label">Commodity Description:</td><td></td><td class="label">HS Code:</td><td></td></tr>
  </table>

  <div class="section-title">Wooden Packaging Material (WPM) Description</div>
  <table>
    <thead><tr><th>Sr.</th><th>Type of WPM</th><th>Quantity</th><th>Dimensions (L×W×H cm)</th><th>Mark / ID No.</th><th>Treatment Applied</th></tr></thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td>${i}</td><td>□ Pallet &nbsp;□ Crate &nbsp;□ Dunnage &nbsp;□ Spool &nbsp;□ Other</td><td></td><td></td><td></td><td></td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">Treatment Details</div>
  <table>
    <tr>
      <td class="label">Treatment Method:</td>
      <td>□ Heat Treatment (HT — 56°C for 30 min) &nbsp; □ Methyl Bromide (MB) &nbsp; □ Dielectric Heating (DH) &nbsp; □ Sulfuryl Fluoride (SF)</td>
    </tr>
    <tr><td class="label">Chemical Used (if MB/SF):</td><td></td></tr>
    <tr><td class="label">Dosage / Concentration:</td><td></td></tr>
    <tr><td class="label">Exposure Period:</td><td></td></tr>
    <tr><td class="label">Temperature During Treatment:</td><td></td></tr>
    <tr><td class="label">Treatment Location / Address:</td><td></td></tr>
    <tr><td class="label">ISPM-15 Mark Applied:</td><td>□ Yes — HT or MB mark affixed on each WPM &nbsp; □ No (explain): ___________</td></tr>
  </table>

  <div class="section-title">ISPM-15 Mark Format (must appear on all WPM)</div>
  <div style="border:2px solid #1e3a5f;display:inline-block;padding:12px 20px;font-family:monospace;font-size:13px;margin:8px 0;border-radius:4px">
    <strong>▶ IN – _____ – _____ ◀</strong><br>
    <span style="font-size:10px;color:#555">[Country Code] – [Producer/Treatment Provider Code] – [Treatment Type: HT/MB/DH/SF]</span>
  </div>

  <div class="section-title">Declaration</div>
  <p style="font-size:11px;color:#374151">I hereby certify that the wooden packaging material described above has been treated in accordance with ISPM-15 requirements and that the treatment mark has been affixed. The WPM is free from living regulated pests.</p>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory<br><br><br></div>
    <div class="sign-box">Fumigation Agency Stamp &amp; Signature<br>Licence No.: _______________<br><br><br></div>
  </div>
  <p style="font-size:10px;text-align:center;color:#6b7280">Countries requiring ISPM-15: USA, EU, UK, Australia, New Zealand, China, Japan, South Korea, Canada, Brazil, and 180+ others</p>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; nbpgr.ernet.in (NPPO India)</div>
  </body></html>`;
}

/* ─── 8. Pre-Shipment Inspection (PSI) Certificate ────────────────────────── */
export function generatePSICertificate(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>PSI Certificate – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Pre-Shipment Inspection (PSI) Certificate</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Third-Party Inspection Report &nbsp;|&nbsp; ${today}</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter / Manufacturer</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC / GSTIN:</span><span class="field-value">${CO.iec} / ${CO.gstin}</span></div>
    </div>
    <div class="header-box">
      <h3>Inspection Reference</h3>
      <div class="field"><span class="field-label">PSI Report No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Inspection:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Report:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Inspection Agency:</span><span class="field-value">□ SGS &nbsp;□ Bureau Veritas &nbsp;□ Intertek &nbsp;□ Other</span></div>
      <div class="field"><span class="field-label">Inspector Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">LC / Contract No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Destination Country:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Shipment &amp; Product Details</div>
  <table>
    <tr><td class="label">Invoice No. &amp; Date:</td><td></td><td class="label">PO / Contract No.:</td><td></td></tr>
    <tr><td class="label">Port of Loading:</td><td></td><td class="label">Port of Discharge:</td><td></td></tr>
    <tr><td class="label">Vessel / Airline:</td><td></td><td class="label">ETD:</td><td></td></tr>
  </table>

  <div class="section-title">Goods Inspected</div>
  <table>
    <thead><tr><th>Sr.</th><th>Description of Goods</th><th>HS Code</th><th>PO Quantity</th><th>Inspected Qty</th><th>Accepted Qty</th><th>Rejected Qty</th><th>Remarks</th></tr></thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">Inspection Scope &amp; Findings</div>
  <table>
    <thead><tr><th>Inspection Parameter</th><th>Standard / Specification</th><th>Finding</th><th>Result</th></tr></thead>
    <tbody>
      ${[
        ["Visual / Workmanship Inspection","Buyer's spec / ISO","","□ Pass □ Fail"],
        ["Quantity / Count Verification","Invoice / PO","","□ Pass □ Fail"],
        ["Dimensional / Size Check","Drawing / Spec","","□ Pass □ Fail"],
        ["Weight Verification (Net / Gross)","Packing List","","□ Pass □ Fail"],
        ["Packaging & Labelling","Buyer's instructions","","□ Pass □ Fail"],
        ["Marking (Carton, ISPM-15, etc.)","Shipping Marks","","□ Pass □ Fail"],
        ["Sampling (AQL Level)","AQL 2.5 / 4.0","","□ Pass □ Fail"],
        ["Functional / Performance Test","Applicable standard","","□ Pass □ Fail"],
        ["Safety Requirements","CE / BIS / Others","","□ Pass □ Fail"],
        ["Country-Specific Requirements","As per importing country","","□ Pass □ Fail"],
      ].map(([p,s,f,r])=>`<tr><td>${p}</td><td style="font-size:10px;color:#6b7280">${s}</td><td>${f}</td><td>${r}</td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">Overall Inspection Result</div>
  <table>
    <tr>
      <td class="label">Overall Status:</td>
      <td><strong>□ SATISFACTORY — Cleared for Shipment &nbsp;&nbsp; □ UNSATISFACTORY — Hold for Rework &nbsp;&nbsp; □ CONDITIONAL</strong></td>
    </tr>
    <tr><td class="label">Defects Found:</td><td></td></tr>
    <tr><td class="label">Corrective Action Required:</td><td></td></tr>
    <tr><td class="label">Re-inspection Required:</td><td>□ Yes &nbsp; □ No</td></tr>
  </table>
  <p style="font-size:10px;color:#6b7280;margin-top:6px">Countries commonly requiring PSI: Indonesia (Sucofindo/Surveyor Indonesia), Saudi Arabia, Iran, Bangladesh, Tanzania, Ethiopia, Burkina Faso, Nigeria, and several African &amp; South-East Asian nations.</p>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory<br><br><br></div>
    <div class="sign-box">Inspection Agency<br>Inspector Signature, Stamp &amp; Licence No.<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 9. Dangerous Goods Declaration (IATA/IMO DGD) ──────────────────────── */
export function generateDangerousGoodsDeclaration(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Dangerous Goods Declaration – ${CO.name}</title>
  <style>${baseStyles}
  .dgd-warning { background:#fef2f2; border:2px solid #dc2626; border-radius:4px; padding:10px; margin-bottom:14px; text-align:center; }
  </style></head><body>
  <div class="dgd-warning">
    <strong style="color:#dc2626;font-size:13px">⚠ SHIPPER'S DECLARATION FOR DANGEROUS GOODS</strong><br>
    <span style="font-size:10px;color:#7f1d1d">Air Transport — IATA DGR Edition 65 / Sea Transport — IMDG Code Amendment 41-22</span>
  </div>
  <h1 style="margin-top:0">Dangerous Goods Declaration</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; ${today}</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Shipper / Exporter</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
      <div class="field"><span class="field-label">Emergency Contact:</span><span class="field-value">${CO.phone}</span></div>
    </div>
    <div class="header-box">
      <h3>Consignee / Transport Reference</h3>
      <div class="field"><span class="field-label">Consignee Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Consignee Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Transport Mode:</span><span class="field-value">□ Air (IATA) &nbsp;□ Sea (IMDG) &nbsp;□ Road</span></div>
      <div class="field"><span class="field-label">Vessel / Flight No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Airport/Port of Departure:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Airport/Port of Destination:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Nature &amp; Quantity of Dangerous Goods</div>
  <table>
    <thead>
      <tr>
        <th>UN No.</th><th>Proper Shipping Name (PSN)</th><th>Hazard Class / Division</th>
        <th>Packing Group (I/II/III)</th><th>Subsidiary Risk</th>
        <th>Quantity &amp; Type of Packing</th><th>Net Qty / Wt per Package</th><th>No. of Packages</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3].map(i=>`<tr><td>UN</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">IATA Hazard Class Reference</div>
  <table>
    <thead><tr><th>Class</th><th>Type</th><th>Class</th><th>Type</th></tr></thead>
    <tbody>
      <tr><td><strong>Class 1</strong></td><td>Explosives</td><td><strong>Class 5</strong></td><td>Oxidising Substances &amp; Organic Peroxides</td></tr>
      <tr><td><strong>Class 2</strong></td><td>Gases (Flammable, Non-Flammable, Toxic)</td><td><strong>Class 6</strong></td><td>Toxic &amp; Infectious Substances</td></tr>
      <tr><td><strong>Class 3</strong></td><td>Flammable Liquids</td><td><strong>Class 7</strong></td><td>Radioactive Material</td></tr>
      <tr><td><strong>Class 4</strong></td><td>Flammable Solids</td><td><strong>Class 8</strong></td><td>Corrosives</td></tr>
      <tr><td><strong>Class 9</strong></td><td colspan="3">Miscellaneous (Lithium Batteries, Dry Ice, Magnetised Material, etc.)</td></tr>
    </tbody>
  </table>

  <div class="section-title">Packing &amp; Marking Details</div>
  ${[
    "Goods are properly classified, described, packaged, marked, and labelled",
    "Packing instruction (IATA / IMDG) number followed: _______________",
    "UN specification packaging used with certification mark",
    "Inner and outer packaging compatible with contents",
    "Cushioning and absorbent material adequate for liquids",
    "Hazard labels (primary + subsidiary) affixed on all packages",
    "UN number and PSN marked on outer packaging",
    "Orientation arrows ('This Way Up') applied where required",
    "Net quantity per package does not exceed regulatory maximum",
    "Over-pack (if used) marked and labelled correctly",
    "Safety Data Sheet (SDS/MSDS) attached",
    "Emergency response information available at all times",
  ].map(item=>`<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">Shipper's Declaration</div>
  <p style="font-size:11px;color:#374151;line-height:1.8">
    I hereby declare that the contents of this consignment are fully and accurately described above by the proper shipping name, and are classified, packaged, marked and labelled/placarded, and are in all respects in proper condition for transport according to applicable international and national governmental regulations.
    <br><br>
    <strong>Name: ${CO.name}</strong> &nbsp;|&nbsp; <strong>Place: Jamnagar, Gujarat, India</strong>
  </p>

  <div class="sign-section">
    <div class="sign-box">Shipper's Signature &amp; Date<br>(${CO.name})<br><br><br></div>
    <div class="sign-box">Carrier Acceptance<br>Name, Date &amp; Signature<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; IATA DGR · IMDG Code</div>
  </body></html>`;
}

/* ─── 10. Halal Certificate Application ──────────────────────────────────── */
export function generateHalalCertificate(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Halal Certificate Application – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Halal Certificate — Application Form</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; For Export to OIC / Muslim-Majority Countries &nbsp;|&nbsp; ${today}</p>
  <p style="text-align:center;font-size:10px;color:#555">Countries: Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, Malaysia, Indonesia, Turkey, Iran, Egypt, Jordan &amp; 45 other OIC nations</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Applicant / Exporter</h3>
      <div class="field"><span class="field-label">Company Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
      <div class="field"><span class="field-label">FSSAI Licence No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Factory / Plant Address:</span><span class="field-value"></span></div>
    </div>
    <div class="header-box">
      <h3>Certification Details</h3>
      <div class="field"><span class="field-label">Certificate No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Application:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Certifying Body:</span><span class="field-value">□ Halal India &nbsp;□ HFSAA &nbsp;□ JIM Malaysia &nbsp;□ MUI Indonesia &nbsp;□ ESMA UAE &nbsp;□ SFDA Saudi &nbsp;□ Other</span></div>
      <div class="field"><span class="field-label">Certificate Type:</span><span class="field-value">□ Product &nbsp;□ Facility &nbsp;□ Both</span></div>
      <div class="field"><span class="field-label">Validity Period:</span><span class="field-value">1 Year / 2 Years (tick)</span></div>
      <div class="field"><span class="field-label">Target Market(s):</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Products Applied for Halal Certification</div>
  <table>
    <thead><tr><th>Sr.</th><th>Product Name / Brand</th><th>Category</th><th>HS Code</th><th>Annual Export Qty</th><th>Packaging</th></tr></thead>
    <tbody>
      ${[1,2,3,4,5].map(i=>`<tr><td>${i}</td><td></td><td>□ Food &nbsp;□ Beverage &nbsp;□ Cosmetic &nbsp;□ Pharmaceutical &nbsp;□ Other</td><td></td><td></td><td></td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">Ingredients &amp; Supply Chain Declaration</div>
  <table>
    <thead><tr><th>Ingredient Name</th><th>Source (Animal/Plant/Synthetic)</th><th>Supplier</th><th>Country of Origin</th><th>Halal Status</th></tr></thead>
    <tbody>
      ${[1,2,3,4,5,6].map(i=>`<tr><td></td><td>□ Animal &nbsp;□ Plant &nbsp;□ Synthetic &nbsp;□ Mineral</td><td></td><td></td><td>□ Certified &nbsp;□ Acceptable &nbsp;□ Unknown</td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">Facility &amp; Process Compliance Checklist</div>
  ${[
    "No pork, pork by-products, or lard used in any product or process",
    "No alcohol (ethanol) as ingredient (permitted as process solvent only if fully removed)",
    "All animal-derived ingredients from Halal-slaughtered animals only",
    "Dedicated Halal production line OR adequate cleaning between Halal/non-Halal runs",
    "No cross-contamination with Haram substances at any stage",
    "All packaging materials free of gelatin or animal-based adhesives (unless Halal-certified)",
    "Storage, transport, and handling areas segregated from non-Halal products",
    "Cleaning and sanitation procedures documented and Halal-compliant",
    "Halal logo / mark correctly displayed on packaging as per certifying body guidelines",
    "Supplier Halal certificates maintained for all animal-derived ingredients",
    "Quality control records available for audit",
    "Muslim personnel or Halal supervisor present for slaughter/processing (if applicable)",
  ].map(item=>`<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">Documents to Submit with Application</div>
  ${[
    "Company registration / incorporation certificate",
    "FSSAI Licence",
    "IEC Certificate",
    "Product formulation / recipe (confidential — for certifying body only)",
    "List of all ingredients with supplier details and their Halal certificates",
    "Process flow chart",
    "Factory layout plan",
    "Quality Control / HACCP documentation",
    "Previous Halal certificate (if renewal)",
    "Labels / artworks of all products",
  ].map(item=>`<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Date<br><br><br></div>
    <div class="sign-box">Certifying Body Stamp &amp; Signature<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; halalindiagroup.com · esma.gov.ae · sfda.gov.sa</div>
  </body></html>`;
}

/* ─── 11. EUR.1 Movement Certificate (EU / FTA Preferential Origin) ────────── */
export function generateEUR1Certificate(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>EUR.1 Certificate – ${CO.name}</title>
  <style>${baseStyles}
  .eur-border { border:3px double #1e3a5f; padding:14px; border-radius:4px; margin-bottom:14px; }
  .box-no { font-size:10px;font-weight:bold;color:#1e3a5f;margin-bottom:4px; }
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
  </style></head><body>
  <div style="text-align:center;margin-bottom:10px">
    <div style="font-size:10px;color:#555">EUROPEAN UNION &nbsp;/&nbsp; PREFERENTIAL TRADE AGREEMENT</div>
    <h1 style="margin:4px 0">EUR.1 MOVEMENT CERTIFICATE</h1>
    <div style="font-size:10px;color:#555">Issued under the India-EU FTA / GSP+ / EPA / Bilateral Trade Agreement &nbsp;|&nbsp; ${today}</div>
  </div>

  <div class="eur-border">
    <div class="two-col">
      <div>
        <div class="box-no">Box 1 — EXPORTER (Name, Full Address, Country)</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:60px;border-radius:2px">
          <span class="prefilled">${CO.name}</span><br>
          <span class="prefilled">${CO.addr1}</span><br>
          <span class="prefilled">${CO.addr2}</span><br>
          <span class="prefilled">India</span>
        </div>
      </div>
      <div>
        <div class="box-no">Box 2 — CERTIFICATE NO.</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:30px;border-radius:2px;font-size:14px;font-weight:bold"></div>
        <div class="box-no" style="margin-top:8px">Box 3 — CONSIGNEE (Name, Full Address, Country) (Optional)</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:40px;border-radius:2px"></div>
      </div>
    </div>

    <div class="two-col">
      <div>
        <div class="box-no">Box 4 — COUNTRY, GROUP OF COUNTRIES, OR TERRITORY IN WHICH THE PRODUCTS ARE CONSIDERED AS ORIGINATING</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:30px;border-radius:2px"><span class="prefilled">INDIA</span></div>
      </div>
      <div>
        <div class="box-no">Box 5 — COUNTRY, GROUP OF COUNTRIES, OR TERRITORY OF DESTINATION</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:30px;border-radius:2px"></div>
      </div>
    </div>

    <div class="box-no">Box 6 — TRANSPORT DETAILS (Optional)</div>
    <div style="border:1px solid #d1d5db;padding:8px;min-height:30px;border-radius:2px;margin-bottom:10px"></div>

    <div class="box-no">Box 7 — REMARKS</div>
    <div style="border:1px solid #d1d5db;padding:8px;min-height:30px;border-radius:2px;margin-bottom:10px"></div>

    <div class="box-no">Box 8 — ITEM NUMBER; MARKS AND NUMBERS; NUMBER AND KIND OF PACKAGES; DESCRIPTION OF GOODS; HS CODE; GROSS WEIGHT (kg) OR OTHER MEASURE</div>
    <div style="border:1px solid #d1d5db;padding:8px;min-height:80px;border-radius:2px;margin-bottom:10px;font-size:11px">
      <table style="width:100%;border:none;margin:0">
        <thead><tr><th style="background:none;color:#374151;border:none;padding:2px">Item No.</th><th style="background:none;color:#374151;border:none;padding:2px">Marks &amp; Nos.</th><th style="background:none;color:#374151;border:none;padding:2px">Description of Goods</th><th style="background:none;color:#374151;border:none;padding:2px">HS Code</th><th style="background:none;color:#374151;border:none;padding:2px">Gross Wt (kg)</th></tr></thead>
        <tbody>${[1,2,3].map(i=>`<tr><td style="border:none;padding:3px">${i}</td><td style="border:none;padding:3px"></td><td style="border:none;padding:3px"></td><td style="border:none;padding:3px"></td><td style="border:none;padding:3px"></td></tr>`).join("")}</tbody>
      </table>
    </div>

    <div class="two-col">
      <div>
        <div class="box-no">Box 9 — GROSS WEIGHT (kg) OR OTHER MEASURE (litres, m³, etc.)</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:30px;border-radius:2px;margin-bottom:10px"></div>
        <div class="box-no">Box 10 — INVOICES (Number &amp; Date)</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:30px;border-radius:2px"></div>
      </div>
      <div>
        <div class="box-no">Box 11 — CUSTOMS ENDORSEMENT (Issuing Authority)</div>
        <div style="border:1px solid #d1d5db;padding:8px;min-height:80px;border-radius:2px;font-size:10px;color:#555">
          Declaration certified<br>
          Export document: ___________<br>
          Serial No.: ________________<br>
          Customs Office: ____________<br>
          Date: _______________________<br>
          Stamp &amp; Signature: __________
        </div>
      </div>
    </div>

    <div class="box-no">Box 12 — DECLARATION BY THE EXPORTER</div>
    <div style="border:1px solid #d1d5db;padding:8px;border-radius:2px;font-size:10px">
      I, the undersigned, declare that the goods described above originate in India (in accordance with the rules of origin applicable) and that the particulars given in this certificate are correct.<br><br>
      <strong class="prefilled">${CO.name}</strong> &nbsp;|&nbsp; Place: <strong class="prefilled">Jamnagar, Gujarat, India</strong> &nbsp;|&nbsp; Date: <strong>${today}</strong><br><br>
      Signature: ________________________ &nbsp;|&nbsp; Stamp (if applicable): ________________
    </div>
  </div>

  <div class="section-title">EUR.1 Eligibility &amp; Checklist</div>
  ${[
    "Goods are 'originating products' under the applicable Protocol on Rules of Origin",
    "Wholly obtained in India OR have undergone sufficient working/processing as per FTA",
    "HS Code and origin criterion noted for each product",
    "Invoice/shipping documents match description and value on EUR.1",
    "Certificate issued by authorised body (DGFT / Customs / Chamber of Commerce as per FTA)",
    "EUR.1 presented to importing country customs for preferential duty claim",
    "Exporter's long-term supplier declaration maintained if applicable",
    "GSP Form A used instead of EUR.1 for EU-GSP (check applicable scheme)",
    "REX (Registered Exporter) number obtained if required by EU (for exports &gt; EUR 6,000)",
  ].map(item=>`<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}
  <p style="font-size:10px;color:#6b7280;margin-top:8px">Applicable for: EU-27, UK (DCTS), EFTA (Norway, Switzerland, Iceland, Liechtenstein), and other FTA partners with India. Check MFN vs. preferential rate before use.</p>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; DGFT · dgft.gov.in</div>
  </body></html>`;
}

/* ─── 12. SAFTA Certificate of Origin (SAARC Countries) ─────────────────── */
export function generateSAFTACertificate(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SAFTA COO – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>SAFTA Certificate of Origin</h1>
  <p class="subtitle">South Asian Free Trade Area Agreement &nbsp;|&nbsp; Form COO &nbsp;|&nbsp; ${today}</p>
  <p style="text-align:center;font-size:10px;color:#555">Applicable Countries: Bangladesh · Sri Lanka · Nepal · Pakistan · Bhutan · Maldives · Afghanistan</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Box 1 — Exporter</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}</span></div>
      <div class="field"><span class="field-label">City / State / PIN:</span><span class="field-value prefilled">${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Country:</span><span class="field-value prefilled">India</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
    </div>
    <div class="header-box">
      <h3>Box 2 — Reference &amp; Destination</h3>
      <div class="field"><span class="field-label">COO Reference No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Issue:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Issuing Authority:</span><span class="field-value">DGFT / EPC / FIEO / Chamber</span></div>
      <div class="field"><span class="field-label">Consignee Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Consignee Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Destination Country:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Invoice No. &amp; Date:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Box 3 — Transport Details</div>
  <table>
    <tr><td class="label">Mode of Transport:</td><td>□ Sea &nbsp;□ Air &nbsp;□ Land &nbsp;□ Multi-modal</td><td class="label">Vessel / Flight / Truck No.:</td><td></td></tr>
    <tr><td class="label">Port of Loading:</td><td></td><td class="label">Port of Discharge:</td><td></td></tr>
  </table>

  <div class="section-title">Box 4 — Description of Goods</div>
  <table>
    <thead>
      <tr>
        <th>Item No.</th><th>Marks &amp; Numbers on Packages</th><th>Number &amp; Kind of Packages</th>
        <th>Description of Goods</th><th>HS Code (6-digit)</th>
        <th>Origin Criterion</th><th>Gross Weight (kg)</th><th>FOB Value (USD)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td>${i}</td><td></td><td></td><td></td><td></td><td>WO / PE / PSR (tick)</td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="6" style="text-align:right">Total</td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Origin Criterion (Box 5)</div>
  <table>
    <tr><td class="label">WO (Wholly Obtained):</td><td>Goods entirely grown, produced, or manufactured in India</td></tr>
    <tr><td class="label">PE (Produced Exclusively):</td><td>From materials wholly originating in SAARC countries</td></tr>
    <tr><td class="label">PSR (Product-Specific Rule):</td><td>Change in tariff classification + value addition ≥ 35% FOB (India) or 25% FOB (LLDC)</td></tr>
  </table>

  <div class="section-title">Declaration by Exporter (Box 6)</div>
  <p style="font-size:11px;color:#374151">The undersigned hereby declares that the above details and statements are correct, that all the goods were produced in <strong>India</strong> and that they comply with the origin requirements specified for these goods in the SAFTA Agreement.</p>
  <p style="font-size:11px"><strong class="prefilled">${CO.name}</strong> &nbsp;|&nbsp; Place: <strong class="prefilled">Jamnagar, Gujarat, India</strong> &nbsp;|&nbsp; Date: <strong>${today}</strong></p>

  <div class="sign-section">
    <div class="sign-box">Exporter's Signature &amp; Stamp<br>(${CO.name})<br><br><br></div>
    <div class="sign-box">Box 7 — Certification by Issuing Authority<br>It is hereby certified that the declaration by the exporter is correct.<br>Official Stamp &amp; Signature: ___________<br>Date: ________________________</div>
  </div>
  <p style="font-size:10px;color:#6b7280;text-align:center">Apply at: DGFT · Regional Authority · EPC / FIEO / APEDA / Chamber of Commerce &amp; Industry</p>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; dgft.gov.in</div>
  </body></html>`;
}

/* ─── 13. Arab League Certificate of Origin (AACO Form) ─────────────────── */
export function generateArabLeagueCOO(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Arab League COO – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Arab League Certificate of Origin</h1>
  <p class="subtitle">AACO Form — League of Arab States &nbsp;|&nbsp; ${today}</p>
  <p style="text-align:center;font-size:10px;color:#555">Applicable: Saudi Arabia · UAE · Qatar · Kuwait · Bahrain · Oman · Jordan · Egypt · Iraq · Libya · Morocco · Algeria · Tunisia · Yemen · Sudan · Syria · Lebanon · Palestine · Comoros · Djibouti · Mauritania · Somalia</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter / Manufacturer</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}</span></div>
      <div class="field"><span class="field-label">City / State / PIN:</span><span class="field-value prefilled">${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Country of Export:</span><span class="field-value prefilled">India</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
    </div>
    <div class="header-box">
      <h3>Reference &amp; Consignee</h3>
      <div class="field"><span class="field-label">COO No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Issue:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Issuing Chamber:</span><span class="field-value">Chamber of Commerce &amp; Industry, Jamnagar / Gujarat</span></div>
      <div class="field"><span class="field-label">Consignee Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Consignee Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Destination Country:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Invoice No. &amp; Date:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Transport Details</div>
  <table>
    <tr><td class="label">Mode of Transport:</td><td>□ Sea &nbsp;□ Air &nbsp;□ Land &nbsp;□ Multi-modal</td><td class="label">Vessel / Airline / Truck:</td><td></td></tr>
    <tr><td class="label">Port of Departure:</td><td></td><td class="label">Port of Destination:</td><td></td></tr>
  </table>

  <div class="section-title">Description of Goods</div>
  <table>
    <thead>
      <tr>
        <th>Marks &amp; Nos.</th><th>No. &amp; Kind of Packages</th>
        <th>Description of Goods (in English &amp; Arabic if required)</th>
        <th>HS Code</th><th>Net Wt (kg)</th><th>Gross Wt (kg)</th><th>FOB Value (USD)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="4" style="text-align:right">Totals</td><td></td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Country of Origin Declaration</div>
  <table>
    <tr><td class="label">Country of Origin:</td><td><strong class="prefilled">INDIA</strong></td></tr>
    <tr><td class="label">Manufacturer Name:</td><td class="prefilled">${CO.name}</td></tr>
    <tr><td class="label">Manufacturer Address:</td><td class="prefilled">${CO.addr1}, ${CO.addr2}</td></tr>
    <tr><td class="label">Origin Basis:</td><td>□ Wholly Produced in India &nbsp;□ Substantially Transformed &nbsp;□ Value Addition ≥ ____% of FOB</td></tr>
  </table>

  <div class="section-title">Special Notes for Arab Countries</div>
  ${[
    "Arabic translation of goods description recommended for Saudi Arabia, Egypt, Iraq, Libya, Algeria, Yemen",
    "Chamber of Commerce attestation + Ministry of External Affairs (MEA) legalisation often required",
    "Saudi Arabia: COO must be attested by Saudi Embassy / SASO for certain HS codes",
    "UAE: COO required for all commercial shipments — attestation by UAE Embassy in India for sensitive goods",
    "For perishable / food products: FSSAI + APEDA certificates must accompany COO",
    "Halal Certificate mandatory for food, cosmetics, and pharmaceuticals for GCC countries",
    "Ensure GSTIN on invoice matches COO exporter details exactly",
    "COO must be original (not photocopy) for customs clearance in most Arab League countries",
  ].map(item=>`<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Stamp<br><br><br></div>
    <div class="sign-box">Chamber of Commerce &amp; Industry<br>Official Attestation, Stamp &amp; Seal<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; Chamber of Commerce, Jamnagar / Gujarat</div>
  </body></html>`;
}

/* ─── 14. Bill of Exchange / Trade Draft ─────────────────────────────────── */
export function generateBillOfExchange(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bill of Exchange – ${CO.name}</title>
  <style>${baseStyles}
  .boe-box { border:2px solid #1e3a5f; padding:16px; border-radius:6px; margin-bottom:16px; }
  .boe-amount { font-size:18px; font-weight:bold; color:#1e3a5f; border:2px solid #1e3a5f; padding:8px 14px; display:inline-block; border-radius:4px; margin:8px 0; }
  </style></head><body>
  <h1>Bill of Exchange (Trade Draft)</h1>
  <p class="subtitle">Negotiable Instrument under Negotiable Instruments Act 1881 &nbsp;|&nbsp; ${today}</p>

  <div class="boe-box">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px">
      <div>
        <div class="box-no" style="font-size:11px;font-weight:bold;color:#1e3a5f">Draft No.:</div>
        <div style="border-bottom:1px solid #999;min-width:180px;margin-top:4px"></div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:bold;color:#1e3a5f">Date &amp; Place of Issue:</div>
        <div style="margin-top:4px"><span class="prefilled">Jamnagar, Gujarat, India</span> &nbsp;|&nbsp; ${today}</div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:bold;color:#1e3a5f">Exchange For:</div>
        <div class="boe-amount">_______________ (AMOUNT IN WORDS: _________________________________)</div>
      </div>
    </div>

    <div style="font-size:12px;line-height:2;color:#111">
      <strong>At &nbsp;□ SIGHT &nbsp;/ &nbsp;□ _____ days after sight &nbsp;/ &nbsp;□ _____ days after date</strong> &nbsp;of this Bill of Exchange &nbsp;<strong>□ First &nbsp;□ Second</strong> &nbsp;(First being unpaid),
      Pay to the order of <span style="border-bottom:1px solid #999;padding:0 80px"><strong>${CO.name}</strong></span><br>
      the sum of <span style="border-bottom:1px solid #999;padding:0 80px"></span><br>
      Value received and charge the same to account of: <span style="border-bottom:1px solid #999;padding:0 60px"></span>
    </div>

    <div style="margin-top:16px">
      <div style="font-size:11px;font-weight:bold;color:#1e3a5f">Drawn under LC / Contract No.:</div>
      <div style="border-bottom:1px solid #999;margin-top:4px;min-height:16px"></div>
    </div>
    <div style="margin-top:10px">
      <div style="font-size:11px;font-weight:bold;color:#1e3a5f">Issuing Bank / LC Bank:</div>
      <div style="border-bottom:1px solid #999;margin-top:4px;min-height:16px"></div>
    </div>
    <div style="margin-top:10px">
      <div style="font-size:11px;font-weight:bold;color:#1e3a5f">To (Drawee — Buyer / Importer / Accepting Bank):</div>
      <div style="border:1px solid #d1d5db;padding:8px;margin-top:4px;min-height:50px;border-radius:2px"></div>
    </div>
  </div>

  <div class="header-grid">
    <div class="header-box">
      <h3>Drawer (Exporter / Beneficiary)</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
      <div class="field"><span class="field-label">Bank A/C for Credit:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Bank Name &amp; IFSC:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">SWIFT / BIC Code:</span><span class="field-value"></span></div>
    </div>
    <div class="header-box">
      <h3>Drawee (Buyer / Accepting Bank)</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Country:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Bank:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">SWIFT / BIC:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Terms:</span><span class="field-value">□ D/P (Documents against Payment) &nbsp;□ D/A (Documents against Acceptance) &nbsp;□ LC Sight &nbsp;□ LC Usance</span></div>
    </div>
  </div>

  <div class="section-title">Accompanying Documents (tick all enclosed)</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
    ${["Commercial Invoice (originals)","Packing List","Bill of Lading / AWB (full set originals)","Certificate of Origin","Marine Insurance Certificate","Inspection Certificate","Health / Phytosanitary Certificate","Beneficiary's Certificate","Weight &amp; Measurement Certificate","Pre-shipment Inspection Report"].map(item=>`<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}
  </div>

  <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
    <div style="border-top:1px solid #374151;padding-top:6px;text-align:center;font-size:11px;color:#555">
      Drawer's Signature &amp; Stamp<br><strong>${CO.name}</strong><br><br><br>
    </div>
    <div style="border-top:1px solid #374151;padding-top:6px;text-align:center;font-size:11px;color:#555">
      Accepted by Drawee<br>Name: _______________ &nbsp;|&nbsp; Date: _______________<br>Signature &amp; Bank Stamp<br><br>
    </div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 15. Bank Realisation Certificate (BRC) / FIRC Declaration ──────────── */
export function generateBRCDeclaration(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>BRC / FIRC Declaration – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Bank Realisation Certificate (BRC) &amp; FIRC Declaration</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Mandatory for DGFT / Export Obligation Discharge / RoDTEP &nbsp;|&nbsp; ${today}</p>
  <p style="text-align:center;font-size:10px;color:#555">As per FEMA 1999 · RBI Master Direction on Export of Goods &amp; Services · DGFT Policy Circular</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter Details</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
      <div class="field"><span class="field-label">GSTIN:</span><span class="field-value">${CO.gstin}</span></div>
      <div class="field"><span class="field-label">PAN:</span><span class="field-value">${CO.pan}</span></div>
    </div>
    <div class="header-box">
      <h3>Bank Details</h3>
      <div class="field"><span class="field-label">Bank Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Branch &amp; Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Account No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">IFSC Code:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">AD Category (I / II):</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">AD Code (registered with Customs):</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">SWIFT / BIC:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Shipment &amp; Payment Details</div>
  <table>
    <thead>
      <tr>
        <th>Sr.</th><th>Shipping Bill No. &amp; Date</th><th>Port of Export</th>
        <th>Invoice No. &amp; Date</th><th>Invoice Value (USD/EUR/etc.)</th>
        <th>Currency Received</th><th>Amount Received (INR)</th>
        <th>Date of Realisation</th><th>FIRC / UTR No.</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4,5].map(i=>`<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="4" style="text-align:right">Total</td><td></td><td></td><td></td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Part-Realisation / Deduction Details (if applicable)</div>
  <table>
    <tr><td class="label">Foreign Bank Charges Deducted:</td><td></td><td class="label">Remitted Net Amount:</td><td></td></tr>
    <tr><td class="label">Commission / Agency Fees:</td><td></td><td class="label">Discount Allowed:</td><td></td></tr>
    <tr><td class="label">Reason for Part-Realisation:</td><td colspan="3"></td></tr>
    <tr><td class="label">Balance Pending (if any):</td><td></td><td class="label">Extended EDF/SDF Period:</td><td></td></tr>
  </table>

  <div class="section-title">Exporter's Declaration</div>
  <p style="font-size:11px;color:#374151;line-height:1.8">
    I / We, <strong>${CO.name}</strong> (IEC: ${CO.iec || "_________________"}), hereby declare that:
    <ol style="padding-left:20px;line-height:2">
      <li>The above export proceeds have been realised and repatriated to India within the prescribed period under FEMA 1999.</li>
      <li>The foreign exchange received is as per the terms of the export contract / LC.</li>
      <li>No part of the proceeds is held abroad except as permitted by RBI.</li>
      <li>The FIRC / UTR numbers mentioned above are authentic and available for verification.</li>
      <li>This declaration is submitted for the purpose of DGFT export obligation discharge / RoDTEP / Drawback compliance.</li>
    </ol>
  </p>

  <div class="section-title">Bank's Certification (BRC)</div>
  <p style="font-size:11px;color:#374151">Certified that the foreign exchange as detailed above has been received and credited to the account of the above-named exporter.</p>
  <table>
    <tr><td class="label">BRC No.:</td><td></td><td class="label">Date of BRC:</td><td>${today}</td></tr>
    <tr><td class="label">Authorised Dealer Code:</td><td></td><td class="label">Bank Certificate No.:</td><td></td></tr>
  </table>

  <div class="section-title">eBRC / DGFT Portal Checklist</div>
  ${[
    "Login to DGFT portal (dgft.gov.in) → Services → eBRC",
    "Bank has transmitted BRC details electronically (eBRC)",
    "eBRC linked to corresponding Shipping Bill on ICEGATE",
    "BRC / FIRC filed within 21 days of export realisation (extended by AD Bank if required)",
    "Copy of FIRC / SWIFT message retained for records",
    "Export obligation discharge certificate (EODC) applied if under Advance Authorisation / EPCG",
    "RoDTEP / Drawback claim filed after BRC realisation",
  ].map(item=>`<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Stamp<br><br><br></div>
    <div class="sign-box">Authorised Dealer Bank<br>Official Stamp, Signature &amp; Date<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; dgft.gov.in · rbi.org.in</div>
  </body></html>`;
}

/* ─── 16. Safety Data Sheet (SDS / MSDS) ────────────────────────────────── */
export function generateSafetyDataSheet(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SDS / MSDS – ${CO.name}</title>
  <style>${baseStyles}
  .section-num { display:inline-block;background:#1e3a5f;color:#fff;padding:2px 8px;border-radius:2px;font-size:11px;font-weight:bold;margin-bottom:4px; }
  .ghs-box { display:inline-block;border:2px solid #dc2626;width:50px;height:50px;text-align:center;line-height:50px;font-size:22px;margin:4px;border-radius:4px; }
  </style></head><body>
  <h1>Safety Data Sheet (SDS / MSDS)</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; GHS Rev. 9 / UN GHS Compliant &nbsp;|&nbsp; Version 1.0 &nbsp;|&nbsp; ${today}</p>
  <p style="text-align:center;font-size:10px;color:#555">Required for: Chemicals · Cosmetics · Paints · Adhesives · Batteries (Li-ion) · Cleaning Products · Fertilisers · Pesticides · Petroleum Products · Pharmaceuticals API</p>

  <div style="background:#fef2f2;border:1px solid #fca5a5;padding:8px;border-radius:4px;margin-bottom:12px;font-size:10px;color:#7f1d1d">
    <strong>⚠ Note:</strong> This template covers all 16 mandatory SDS sections as per UN GHS / ISO 11014 / REACH Regulation (EU) 2020/878 / OSHA HazCom Standard (USA). Fill all sections accurately for each specific product.
  </div>

  <div class="section-title"><span class="section-num">SECTION 1</span> Identification of the Substance / Mixture and of the Company / Undertaking</div>
  <table>
    <tr><td class="label">Product Name / Trade Name:</td><td></td><td class="label">Product Code:</td><td></td></tr>
    <tr><td class="label">Chemical Name (IUPAC):</td><td></td><td class="label">CAS No.:</td><td></td></tr>
    <tr><td class="label">UN No. (if applicable):</td><td></td><td class="label">EC / EINECS No.:</td><td></td></tr>
    <tr><td class="label">Intended Use:</td><td></td><td class="label">Restricted Use:</td><td></td></tr>
    <tr><td class="label">Supplier / Manufacturer:</td><td class="prefilled">${CO.name}</td><td class="label">Address:</td><td class="prefilled">${CO.addr1}, ${CO.addr2}</td></tr>
    <tr><td class="label">Phone / WA:</td><td class="prefilled">${CO.phone}</td><td class="label">Email:</td><td class="prefilled">${CO.email}</td></tr>
    <tr><td class="label">24-Hour Emergency No.:</td><td class="prefilled">${CO.phone}</td><td class="label">Poison Control (India):</td><td>1800-116-117</td></tr>
  </table>

  <div class="section-title"><span class="section-num">SECTION 2</span> Hazard Identification</div>
  <table>
    <tr><td class="label">GHS Classification:</td><td></td></tr>
    <tr><td class="label">Signal Word:</td><td>□ DANGER &nbsp;□ WARNING &nbsp;□ Not classified as hazardous</td></tr>
    <tr><td class="label">Hazard Statements (H-codes):</td><td></td></tr>
    <tr><td class="label">Precautionary Statements (P-codes):</td><td></td></tr>
  </table>
  <div style="margin:8px 0">
    <strong style="font-size:10px">GHS Hazard Pictograms (tick applicable):</strong><br>
    ${["💣 Explosive","🔥 Flammable","💥 Oxidiser","⚡ Gas Under Pressure","☠ Acute Toxicity","⚠ Irritant","🧫 Health Hazard","☣ Env. Hazard","☢ Corrosive"].map(p=>`<span style="border:1px solid #d1d5db;padding:3px 7px;margin:2px;display:inline-block;font-size:10px;border-radius:2px">□ ${p}</span>`).join("")}
  </div>

  <div class="section-title"><span class="section-num">SECTION 3</span> Composition / Information on Ingredients</div>
  <table>
    <thead><tr><th>Chemical Name</th><th>CAS No.</th><th>Concentration (%)</th><th>Classification (GHS)</th><th>REACH Reg. No.</th></tr></thead>
    <tbody>${[1,2,3,4].map(i=>`<tr><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}</tbody>
  </table>

  <div class="section-title"><span class="section-num">SECTION 4</span> First Aid Measures</div>
  <table>
    <tr><td class="label">Inhalation:</td><td>Remove to fresh air. If not breathing, give artificial respiration. Seek medical attention.</td></tr>
    <tr><td class="label">Skin Contact:</td><td>Wash with soap and water for 15 minutes. Remove contaminated clothing. Seek medical attention if irritation persists.</td></tr>
    <tr><td class="label">Eye Contact:</td><td>Flush with water for 15 minutes holding eyelids open. Seek immediate medical attention.</td></tr>
    <tr><td class="label">Ingestion:</td><td>Do NOT induce vomiting. Rinse mouth. Seek immediate medical attention. Show this SDS to physician.</td></tr>
    <tr><td class="label">Most Important Symptoms:</td><td></td></tr>
    <tr><td class="label">Medical Attention Required:</td><td>□ Immediately &nbsp;□ If symptoms persist &nbsp;□ Not normally required</td></tr>
  </table>

  <div class="section-title"><span class="section-num">SECTION 5</span> Firefighting Measures</div>
  <table>
    <tr><td class="label">Suitable Extinguishing Media:</td><td>□ CO₂ &nbsp;□ Dry Chemical Powder &nbsp;□ Foam &nbsp;□ Water Spray &nbsp;□ Sand</td></tr>
    <tr><td class="label">Unsuitable Extinguishing Media:</td><td></td></tr>
    <tr><td class="label">Special Hazards:</td><td></td></tr>
    <tr><td class="label">PPE for Firefighters:</td><td>Self-contained breathing apparatus (SCBA) and full protective clothing</td></tr>
  </table>

  <div class="section-title"><span class="section-num">SECTION 6</span> Accidental Release Measures &nbsp;|&nbsp; <span class="section-num">SECTION 7</span> Handling &amp; Storage</div>
  <table>
    <tr><td class="label">Spill / Leak Procedure:</td><td>Evacuate area. Wear PPE. Contain spill with inert absorbent material. Dispose as per Section 13.</td></tr>
    <tr><td class="label">Handling Precautions:</td><td></td></tr>
    <tr><td class="label">Storage Conditions:</td><td></td></tr>
    <tr><td class="label">Incompatible Materials:</td><td></td></tr>
    <tr><td class="label">Storage Temperature:</td><td></td></tr>
  </table>

  <div class="section-title"><span class="section-num">SECTION 8</span> Exposure Controls / PPE &nbsp;|&nbsp; <span class="section-num">SECTION 9</span> Physical &amp; Chemical Properties</div>
  <table>
    <tr><td class="label">Occupational Exposure Limit (OEL):</td><td></td><td class="label">Physical State:</td><td>□ Solid &nbsp;□ Liquid &nbsp;□ Gas &nbsp;□ Paste</td></tr>
    <tr><td class="label">Engineering Controls:</td><td></td><td class="label">Colour / Odour:</td><td></td></tr>
    <tr><td class="label">PPE — Eyes:</td><td>□ Safety goggles &nbsp;□ Face shield</td><td class="label">pH:</td><td></td></tr>
    <tr><td class="label">PPE — Hands:</td><td>□ Nitrile gloves &nbsp;□ Rubber gloves</td><td class="label">Flash Point:</td><td></td></tr>
    <tr><td class="label">PPE — Respiratory:</td><td>□ Dust mask &nbsp;□ Half-face respirator &nbsp;□ SCBA</td><td class="label">Boiling Point:</td><td></td></tr>
    <tr><td class="label">PPE — Body:</td><td>□ Lab coat &nbsp;□ Chemical suit</td><td class="label">Density (g/mL):</td><td></td></tr>
  </table>

  <div class="section-title"><span class="section-num">SECTION 10–16</span> Additional Required Sections</div>
  <table>
    <tr><td class="label">Sec 10 — Reactivity &amp; Stability:</td><td>Chemical stability: □ Stable □ Unstable &nbsp;|&nbsp; Conditions to avoid: &nbsp;|&nbsp; Hazardous decomposition products:</td></tr>
    <tr><td class="label">Sec 11 — Toxicological Info:</td><td>LD50 (oral/dermal/inhalation): &nbsp;|&nbsp; Carcinogenicity: □ IARC Group ___ &nbsp;|&nbsp; Mutagenicity / Reproductive toxicity:</td></tr>
    <tr><td class="label">Sec 12 — Ecological Info:</td><td>Ecotoxicity: &nbsp;|&nbsp; Persistence / Biodegradability: &nbsp;|&nbsp; Bioaccumulative potential:</td></tr>
    <tr><td class="label">Sec 13 — Disposal:</td><td>Disposal method: &nbsp;|&nbsp; Container disposal: &nbsp;|&nbsp; Applicable regulations:</td></tr>
    <tr><td class="label">Sec 14 — Transport Info:</td><td>UN No.: &nbsp;|&nbsp; PSN: &nbsp;|&nbsp; Hazard Class: &nbsp;|&nbsp; PG: &nbsp;|&nbsp; Marine Pollutant: □ Yes □ No</td></tr>
    <tr><td class="label">Sec 15 — Regulatory Info:</td><td>REACH: &nbsp;|&nbsp; RoHS: &nbsp;|&nbsp; TSCA (USA): &nbsp;|&nbsp; BIS / IS Standard: &nbsp;|&nbsp; CPCB Hazardous Waste Rules:</td></tr>
    <tr><td class="label">Sec 16 — Other Info:</td><td>Prepared by: <span class="prefilled">${CO.name}</span> &nbsp;|&nbsp; Date: ${today} &nbsp;|&nbsp; Version: 1.0 &nbsp;|&nbsp; Supersedes: N/A</td></tr>
  </table>

  <div class="sign-section">
    <div class="sign-box">Prepared by<br><strong>${CO.name}</strong><br>Name &amp; Qualification: ____________<br><br></div>
    <div class="sign-box">Reviewed / Approved by<br>Name &amp; Date: ____________<br>Quality / EHS Manager<br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; GHS Rev.9 · REACH · OSHA HazCom · IS 1991</div>
  </body></html>`;
}

/* ─── 17. Bill of Lading (Sea Freight) ─────────────────────────────────────── */
export function generateBillOfLading(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bill of Lading – ${CO.name}</title>
  <style>${baseStyles}
  .bl-box { border:2px solid #1e3a5f; padding:12px; border-radius:4px; margin-bottom:14px; }
  .bl-title { font-size:22px; font-weight:bold; text-align:center; letter-spacing:2px; color:#1e3a5f; margin-bottom:2px; }
  .bl-sub { text-align:center; font-size:11px; color:#555; margin-bottom:16px; }
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .three-col { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }
  </style></head><body>
  <div class="bl-title">BILL OF LADING</div>
  <div class="bl-sub">Original — Non-Negotiable / Negotiable (tick applicable) &nbsp;|&nbsp; ${today}</div>

  <div class="two-col">
    <div>
      <div class="bl-box">
        <strong style="color:#1e3a5f;font-size:11px">1. SHIPPER / EXPORTER</strong><br>
        <span style="color:#1e3a5f;font-weight:600">${CO.name}</span><br>
        ${CO.addr1}<br>${CO.addr2}<br>
        Ph: ${CO.phone} &nbsp;|&nbsp; ${CO.email}<br>
        IEC: ${CO.iec || "_________________"} &nbsp;|&nbsp; GSTIN: ${CO.gstin || "_________________"}
      </div>
      <div class="bl-box">
        <strong style="color:#1e3a5f;font-size:11px">2. CONSIGNEE (or ORDER)</strong><br>
        <span style="font-size:11px">Name: _________________________________</span><br>
        Address: _______________________________<br>
        City / Country: ________________________<br>
        Phone / Email: _________________________
      </div>
      <div class="bl-box">
        <strong style="color:#1e3a5f;font-size:11px">3. NOTIFY PARTY</strong><br>
        Name: _________________________________<br>
        Address: _______________________________<br>
        Phone / Email: _________________________
      </div>
    </div>
    <div>
      <div class="bl-box">
        <strong style="color:#1e3a5f;font-size:11px">4. B/L REFERENCE DETAILS</strong><br>
        <div class="field"><span class="field-label">B/L Number:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">B/L Date:</span><span class="field-value">${today}</span></div>
        <div class="field"><span class="field-label">Booking No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Commercial Invoice No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">LC / Contract No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Freight Terms:</span><span class="field-value">PREPAID / COLLECT (tick)</span></div>
      </div>
      <div class="bl-box">
        <strong style="color:#1e3a5f;font-size:11px">5. VESSEL & VOYAGE</strong><br>
        <div class="field"><span class="field-label">Vessel Name:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Voyage No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Shipping Line:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Container No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Seal No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Type:</span><span class="field-value">20' / 40' / LCL (tick)</span></div>
      </div>
    </div>
  </div>

  <div class="three-col" style="margin-bottom:14px">
    <div class="bl-box">
      <strong style="color:#1e3a5f;font-size:11px">6. PORT OF LOADING</strong><br>
      Port: ____________________<br>
      Country: India<br>
      ETD: ____________________
    </div>
    <div class="bl-box">
      <strong style="color:#1e3a5f;font-size:11px">7. PORT OF DISCHARGE</strong><br>
      Port: ____________________<br>
      Country: ________________<br>
      ETA: ____________________
    </div>
    <div class="bl-box">
      <strong style="color:#1e3a5f;font-size:11px">8. FINAL DESTINATION</strong><br>
      Place: ___________________<br>
      Country: ________________<br>
      Delivery Terms: __________
    </div>
  </div>

  <div class="section-title">9. Description of Cargo</div>
  <table>
    <thead>
      <tr>
        <th>Sr.</th><th>Marks &amp; Nos.</th><th>No. &amp; Kind of Packages</th>
        <th>Description of Goods</th><th>HS Code</th>
        <th>Gross Weight (kg)</th><th>Net Weight (kg)</th><th>Measurement (CBM)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="5" style="text-align:right">TOTALS</td><td></td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:14px">
    <div class="bl-box">
      <strong style="color:#1e3a5f;font-size:11px">10. FREIGHT &amp; CHARGES</strong><br>
      <div class="field"><span class="field-label">Ocean Freight:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">THC / Surcharge:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Documentation Fee:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Total Freight:</span><span class="field-value"></span></div>
    </div>
    <div class="bl-box">
      <strong style="color:#1e3a5f;font-size:11px">11. DECLARATION</strong><br>
      <p style="font-size:10px;color:#374151">The goods described herein are received in apparent good order and condition unless otherwise stated. This Bill of Lading is subject to the terms and conditions on the reverse side.</p>
      <p style="font-size:10px;margin-top:8px">Number of Original B/Ls issued: <strong>_____</strong></p>
    </div>
  </div>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Shipper's Signature &amp; Date<br><br><br></div>
    <div class="sign-box">For Carrier / Shipping Line<br>Authorised Agent Signature<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 8. Air Waybill (AWB) ─────────────────────────────────────────────────── */
export function generateAirWaybill(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Air Waybill – ${CO.name}</title>
  <style>${baseStyles}
  .awb-header { background:#1e3a5f; color:#fff; padding:10px 14px; border-radius:4px 4px 0 0; font-size:16px; font-weight:bold; letter-spacing:1px; }
  .awb-no { text-align:right; font-size:13px; }
  .iata-box { border:1px solid #d1d5db; padding:8px; font-size:11px; }
  .three-col { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:10px; }
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px; }
  </style></head><body>
  <div style="border:2px solid #1e3a5f;border-radius:4px;overflow:hidden;margin-bottom:14px">
    <div style="display:flex;justify-content:space-between;align-items:center;background:#1e3a5f;color:#fff;padding:10px 14px">
      <span style="font-size:16px;font-weight:bold;letter-spacing:1px">AIR WAYBILL (AWB)</span>
      <span style="font-size:11px">Not Negotiable &nbsp;|&nbsp; ${today}</span>
    </div>
    <div class="two-col" style="padding:10px;margin-bottom:0">
      <div>
        <strong style="font-size:10px;color:#1e3a5f">SHIPPER'S NAME &amp; ADDRESS</strong><br>
        <span style="color:#1e3a5f;font-weight:600">${CO.name}</span><br>
        ${CO.addr1}, ${CO.addr2}<br>
        Ph: ${CO.phone}<br>
        Email: ${CO.email}<br>
        IEC: ${CO.iec || "_________________"}
      </div>
      <div>
        <div class="field"><span class="field-label">AWB No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">MAWB / HAWB:</span><span class="field-value">MAWB / HAWB (tick)</span></div>
        <div class="field"><span class="field-label">Airline / IATA Code:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Date of Issue:</span><span class="field-value">${today}</span></div>
        <div class="field"><span class="field-label">Place of Issue:</span><span class="field-value"></span></div>
      </div>
    </div>
  </div>

  <div class="two-col">
    <div class="iata-box">
      <strong style="color:#1e3a5f;font-size:10px">CONSIGNEE'S NAME &amp; ADDRESS</strong><br>
      Name: _________________________________<br>
      Address: _______________________________<br>
      City / Country: ________________________<br>
      Phone: _________________________________<br>
      Email: _________________________________
    </div>
    <div class="iata-box">
      <strong style="color:#1e3a5f;font-size:10px">AGENT'S IATA CODE / ACCOUNT NO.</strong><br>
      IATA Code: ___________________________<br>
      Account No.: _________________________<br>
      Agent Name: __________________________<br>
      Address: _____________________________
    </div>
  </div>

  <div class="three-col" style="margin-top:10px">
    <div class="iata-box">
      <strong style="color:#1e3a5f;font-size:10px">AIRPORT OF DEPARTURE</strong><br>
      Airport / City: ____________________<br>
      IATA Code: ________________________<br>
      Country: India<br>
      Routing: Direct / Via (tick)
    </div>
    <div class="iata-box">
      <strong style="color:#1e3a5f;font-size:10px">ROUTING &amp; DESTINATION</strong><br>
      Via (Transit): _____________________<br>
      To (Final): _______________________<br>
      Airport Code: _____________________<br>
      Country: _________________________
    </div>
    <div class="iata-box">
      <strong style="color:#1e3a5f;font-size:10px">FLIGHT DETAILS</strong><br>
      Flight No.: _______________________<br>
      Date: _____________________________<br>
      Carrier: __________________________<br>
      Freight Class: ____________________
    </div>
  </div>

  <div class="section-title" style="margin-top:12px">Goods Description &amp; Rating</div>
  <table>
    <thead>
      <tr>
        <th>No. of Pieces</th><th>Gross Weight (kg)</th><th>Rate Class</th>
        <th>Commodity No.</th><th>Chargeable Wt (kg)</th><th>Rate/Charge</th>
        <th>Total</th><th>Nature &amp; Quantity of Goods (HS Code)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3].map(i=>`<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="6" style="text-align:right">Sub Total</td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="two-col" style="margin-top:10px">
    <div class="iata-box">
      <strong style="color:#1e3a5f;font-size:10px">CHARGES SUMMARY</strong><br>
      <div class="field"><span class="field-label">Weight Charge:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Valuation Charge:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Tax:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Other Charges:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Total Charges:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Prepaid / Collect:</span><span class="field-value">PP / CC (tick)</span></div>
    </div>
    <div class="iata-box">
      <strong style="color:#1e3a5f;font-size:10px">SPECIAL INSTRUCTIONS</strong><br>
      <div style="height:60px"></div>
      <strong style="color:#1e3a5f;font-size:10px">HANDLING INFORMATION</strong><br>
      □ Fragile &nbsp; □ Keep Cool &nbsp; □ Perishable &nbsp; □ Dangerous Goods<br>
      □ Live Animals &nbsp; □ This Way Up &nbsp; □ Other: _______________
    </div>
  </div>

  <div style="margin-top:10px;font-size:10px;color:#374151;border:1px solid #d1d5db;padding:8px;border-radius:4px">
    <strong>Shipper's Certification:</strong> I hereby certify that the particulars on the face hereof are correct and that insofar as any part of the consignment contains dangerous goods, such part is properly described by name and is in proper condition for carriage by air according to applicable Dangerous Goods Regulations.
  </div>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Shipper's Signature &amp; Date<br><br><br></div>
    <div class="sign-box">Issuing Carrier / Agent Signature<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 9. Marine / Cargo Insurance Certificate ─────────────────────────────── */
export function generateInsuranceCertificate(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Marine Insurance Certificate – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Marine / Cargo Insurance Certificate</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Original — All Risks Cover</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Insured / Exporter</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
    </div>
    <div class="header-box">
      <h3>Policy / Certificate Details</h3>
      <div class="field"><span class="field-label">Policy / Cert No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Issue:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Insurance Company:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Agent / Broker:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Cover Type:</span><span class="field-value">All Risks (ICC-A) / ICC-B / ICC-C</span></div>
      <div class="field"><span class="field-label">Validity:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Shipment Details</div>
  <table>
    <tr><td class="label">Conveyance / Vessel / Airline:</td><td></td><td class="label">Voyage / Flight No.:</td><td></td></tr>
    <tr><td class="label">Port of Loading:</td><td></td><td class="label">Port of Discharge:</td><td></td></tr>
    <tr><td class="label">Final Destination:</td><td></td><td class="label">Shipment Date:</td><td></td></tr>
    <tr><td class="label">B/L or AWB No.:</td><td></td><td class="label">Commercial Invoice No.:</td><td></td></tr>
  </table>

  <div class="section-title">Cargo Description &amp; Insured Value</div>
  <table>
    <thead>
      <tr><th>Description of Goods</th><th>HS Code</th><th>No. of Packages</th><th>Gross Weight</th><th>Invoice Value</th><th>Insured Value (110%)</th></tr>
    </thead>
    <tbody>
      ${[1,2,3].map(i=>`<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="4" style="text-align:right">Total Insured Sum</td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Risks Covered &amp; Exclusions</div>
  <table>
    <tr>
      <td class="label">Risks Covered:</td>
      <td>All Risks including theft, pilferage, non-delivery, water damage, fire, explosion as per Institute Cargo Clauses (A)</td>
    </tr>
    <tr>
      <td class="label">War &amp; Strike Cover:</td>
      <td>□ Included &nbsp; □ Excluded &nbsp; (tick applicable)</td>
    </tr>
    <tr>
      <td class="label">Exclusions:</td>
      <td>Inherent vice, willful misconduct, ordinary leakage, improper packing unless otherwise agreed</td>
    </tr>
    <tr><td class="label">Premium Rate:</td><td></td></tr>
    <tr><td class="label">Premium Amount:</td><td></td></tr>
    <tr><td class="label">Deductible / Excess:</td><td></td></tr>
  </table>

  <div class="section-title">Claims Settlement</div>
  <table>
    <tr><td class="label">Claims Payable At:</td><td></td><td class="label">Claims Agent:</td><td></td></tr>
    <tr><td class="label">Survey Agent:</td><td></td><td class="label">Contact:</td><td></td></tr>
  </table>
  <p style="font-size:11px;color:#374151;margin-top:10px">In the event of a claim, immediately notify the nearest Lloyd's agent or the survey agent listed above. Present original certificate, B/L, invoice, packing list, and survey report.</p>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signature<br><br><br></div>
    <div class="sign-box">For Insurance Company<br>Authorised Signatory &amp; Stamp<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 10. Letter of Credit (LC) Compliance Checklist ──────────────────────── */
export function generateLCChecklist(): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>LC Checklist – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Letter of Credit — Compliance Checklist</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; UCP 600 / ISBP 821 Compliant</p>

  <div class="header-box" style="margin-bottom:16px">
    <h3>LC Details &amp; Exporter Info</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div>
        <div class="field"><span class="field-label">Exporter:</span><span class="field-value prefilled">${CO.name}</span></div>
        <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
        <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
        <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      </div>
      <div>
        <div class="field"><span class="field-label">LC Number:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">LC Date:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Issuing Bank:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Advising Bank (India):</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Expiry Date &amp; Place:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">LC Type:</span><span class="field-value">Sight / Usance / Deferred (tick)</span></div>
        <div class="field"><span class="field-label">LC Currency &amp; Amount:</span><span class="field-value"></span></div>
      </div>
    </div>
  </div>

  <div class="section-title">1. LC Terms Verification (before shipment)</div>
  ${[
    ["LC amount matches Proforma Invoice value", ""],
    ["Beneficiary name &amp; address exactly as per LC", `${CO.name}, ${CO.addr1}, ${CO.addr2}`],
    ["Applicant name &amp; address verified with buyer", ""],
    ["Shipment date / latest shipment date checked", ""],
    ["Port of loading matches LC requirement", ""],
    ["Port of discharge / final destination verified", ""],
    ["Partial shipments — allowed / prohibited (tick)", ""],
    ["Transhipment — allowed / prohibited (tick)", ""],
    ["Incoterms in LC match contract (FOB/CIF/etc.)", ""],
    ["Tolerance on amount: +/- ____% noted", ""],
    ["Goods description in LC matches invoice description exactly", ""],
    ["HS Code / Commodity Code verified", ""],
  ].map(([t, v]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong>${v ? `<br><span class="prefilled" style="font-size:10px">${v}</span>` : ""}</div></div>`).join("")}

  <div class="section-title">2. Documents Required as per LC (check each when prepared)</div>
  <table>
    <thead><tr><th>Document</th><th>Copies (Originals + Copies)</th><th>Special LC Requirements</th><th>Ready</th></tr></thead>
    <tbody>
      ${[
        ["Commercial Invoice", "3 originals + 3 copies", "Must show LC No., Incoterms, Unit Price"],
        ["Full Set Bill of Lading / AWB", "3/3 originals OR Full set", "Consigned to: Order of Issuing Bank"],
        ["Packing List", "2 originals + 2 copies", "Net / Gross weight per package"],
        ["Certificate of Origin", "1 original + 1 copy", "DGFT / Chamber / APEDA as specified"],
        ["Marine Insurance Certificate", "2 originals", "Value: 110% of CIF, All Risks (ICC-A)"],
        ["Inspection Certificate", "1 original", "SGS / Bureau Veritas or as specified"],
        ["Phytosanitary / Health Certificate", "1 original", "If agri / food products"],
        ["Beneficiary's Certificate", "1 original", "Self-declaration as per LC wording"],
        ["Weight &amp; Measurement Certificate", "1 original", "Port / CHA stamp"],
        ["Pre-shipment Inspection Report", "1 copy", "If LC mandates third-party inspection"],
      ].map(([d,c,r]) => `<tr><td>${d}</td><td>${c}</td><td style="font-size:10px;color:#6b7280">${r}</td><td><div class="check-box"></div></td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">3. Common Discrepancy Checklist (avoid these errors)</div>
  ${[
    "Invoice amount exceeds LC amount without tolerance provision",
    "Shipment made after the latest shipment date",
    "Documents presented after the presentation period (usually 21 days from B/L)",
    "Goods description on invoice does not match LC exactly",
    "LC number not quoted on documents",
    "Consignee on B/L not as per LC requirement",
    "Insurance value insufficient (should be min. 110% CIF)",
    "Port of loading / discharge differs from LC",
    "Marks &amp; numbers on B/L don't match packing list",
    "Signature / seal missing on required documents",
    "Draft / Bill of Exchange amount or tenor incorrect",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">4. Presentation to Advising / Negotiating Bank</div>
  ${[
    "All original documents collated in correct number of copies",
    "Documents presented within LC expiry AND presentation period",
    "Covering letter to bank drafted with full document list",
    "Bank charges agreed upon",
    "SWIFT message / Bank confirmation received",
    "Discrepancies (if any) communicated to buyer for waiver",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 11. GST Letter of Undertaking (LUT) Application ─────────────────────── */
export function generateLUTApplication(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const fy = (() => { const d = new Date(); const y = d.getFullYear(); return d.getMonth() >= 3 ? `${y}-${y+1}` : `${y-1}-${y}`; })();
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>LUT Application – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>GST Letter of Undertaking (LUT)</h1>
  <p class="subtitle">Form GST RFD-11 — Zero-Rated Supply Without Payment of IGST &nbsp;|&nbsp; Financial Year ${fy}</p>

  <div class="header-box" style="margin-bottom:16px">
    <h3>Applicant Details</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div>
        <div class="field"><span class="field-label">Legal Name:</span><span class="field-value prefilled">${CO.name}</span></div>
        <div class="field"><span class="field-label">Trade Name:</span><span class="field-value prefilled">${CO.name}</span></div>
        <div class="field"><span class="field-label">Principal Place of Business:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
        <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
        <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      </div>
      <div>
        <div class="field"><span class="field-label">GSTIN:</span><span class="field-value">${CO.gstin}</span></div>
        <div class="field"><span class="field-label">PAN:</span><span class="field-value">${CO.pan}</span></div>
        <div class="field"><span class="field-label">IEC No.:</span><span class="field-label">${CO.iec}</span></div>
        <div class="field"><span class="field-label">Financial Year:</span><span class="field-value">${fy}</span></div>
        <div class="field"><span class="field-label">ARN / Reference No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Date of Application:</span><span class="field-value">${today}</span></div>
      </div>
    </div>
  </div>

  <div class="section-title">Undertaking / Declaration</div>
  <p style="font-size:11px;color:#374151;line-height:1.8">
    I / We, <strong>${CO.name}</strong>, holder of GSTIN: <strong>${CO.gstin || "_________________"}</strong>,
    having principal place of business at <strong>${CO.addr1}, ${CO.addr2}</strong>,
    do hereby undertake to:
  </p>
  <ol style="font-size:11px;color:#374151;line-height:2;padding-left:20px">
    <li>Export goods / services within time prescribed under Section 16(3) of IGST Act, 2017.</li>
    <li>Pay IGST along with applicable interest (18% p.a.) if export not made within prescribed period.</li>
    <li>Comply with all conditions and restrictions under the CGST Act, 2017 and rules made thereunder.</li>
    <li>Not avail the drawback of IGST paid on inputs, if any, used in making zero-rated supply.</li>
    <li>This undertaking is valid for the entire Financial Year <strong>${fy}</strong>.</li>
  </ol>

  <div class="section-title">Witnesses (Two Required)</div>
  <table>
    <thead><tr><th>Details</th><th>Witness 1</th><th>Witness 2</th></tr></thead>
    <tbody>
      <tr><td>Full Name</td><td></td><td></td></tr>
      <tr><td>Occupation</td><td></td><td></td></tr>
      <tr><td>Address</td><td></td><td></td></tr>
      <tr><td>PAN / Aadhaar</td><td></td><td></td></tr>
      <tr><td>Signature</td><td style="height:40px"></td><td style="height:40px"></td></tr>
    </tbody>
  </table>

  <div class="section-title">Documents to Attach with LUT Application</div>
  ${[
    "GSTIN Registration Certificate",
    "IEC Certificate copy",
    "PAN Card copy",
    "Board Resolution / Authority Letter (if company)",
    "Copy of previous year's LUT (if applicable)",
    "Self-declaration of no prosecution under GST / Customs",
    "List of authorized signatories",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <p style="font-size:10px;color:#6b7280;margin-top:12px">File online at: <strong>gst.gov.in → Services → User Services → Furnish Letter of Undertaking (LUT)</strong></p>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory<br>Name &amp; Designation: ____________<br><br></div>
    <div class="sign-box">Jurisdictional GST Officer<br>Acknowledgement &amp; Stamp<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 12. Health & Sanitary Certificate (Food / Agri Exports) ─────────────── */
export function generateHealthCertificate(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Health Certificate – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>Health / Sanitary Certificate</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; For Export of Food / Agricultural Products &nbsp;|&nbsp; Date: ${today}</p>
  <p style="text-align:center;font-size:10px;color:#555">Issued under the Food Safety &amp; Standards Act 2006 / APEDA Act / FSSAI / Ministry of Agriculture</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter / Manufacturer</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">FSSAI Lic. No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">APEDA Reg. No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
    </div>
    <div class="header-box">
      <h3>Certificate Details</h3>
      <div class="field"><span class="field-label">Certificate No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Date of Issue:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Issuing Authority:</span><span class="field-value">FSSAI / APEDA / EIC / State Agri Dept.</span></div>
      <div class="field"><span class="field-label">Validity:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Destination Country:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Importing Country Authority:</span><span class="field-value"></span></div>
    </div>
  </div>

  <div class="section-title">Shipment &amp; Product Details</div>
  <table>
    <tr><td class="label">Product Name / Description:</td><td></td><td class="label">HS Code:</td><td></td></tr>
    <tr><td class="label">Brand Name:</td><td></td><td class="label">Batch / Lot No.:</td><td></td></tr>
    <tr><td class="label">Net Quantity / Weight:</td><td></td><td class="label">Gross Weight:</td><td></td></tr>
    <tr><td class="label">No. of Packages:</td><td></td><td class="label">Packaging Type:</td><td></td></tr>
    <tr><td class="label">Manufacturing Date:</td><td></td><td class="label">Best Before / Expiry:</td><td></td></tr>
    <tr><td class="label">Country of Origin:</td><td>India</td><td class="label">Place of Manufacture:</td><td></td></tr>
    <tr><td class="label">Storage Conditions:</td><td></td><td class="label">Transport Conditions:</td><td></td></tr>
  </table>

  <div class="section-title">Laboratory Test Results</div>
  <table>
    <thead><tr><th>Parameter / Test</th><th>Method / Standard</th><th>Result</th><th>Permissible Limit</th><th>Status</th></tr></thead>
    <tbody>
      ${[
        ["Microbial Count (TPC)", "IS / ISO 4833", "", "As per CODEX / Importing Country", ""],
        ["Coliform / E. coli", "IS / ISO 4832", "", "Absent in 1g / 25g", ""],
        ["Salmonella", "IS / ISO 6579", "", "Absent in 25g", ""],
        ["Pesticide Residue", "As per MRL Table", "", "As per Codex / Importing Country MRL", ""],
        ["Heavy Metals (Pb/Cd/Hg/As)", "ICP-MS / AAS", "", "As per FSSAI / Codex limits", ""],
        ["Aflatoxin (if applicable)", "ELISA / HPLC", "", "≤ 10 ppb (total)", ""],
        ["Moisture Content (%)", "", "", "", ""],
        ["pH / Brix (if applicable)", "", "", "", ""],
      ].map(([p,m,r,l,s]) => `<tr><td>${p}</td><td>${m}</td><td>${r}</td><td style="font-size:10px;color:#6b7280">${l}</td><td>${s}</td></tr>`).join("")}
    </tbody>
  </table>
  <p style="font-size:10px;color:#6b7280">Test report from: _________________________ (NABL / FSSAI approved lab) &nbsp;|&nbsp; Report No.: _______________ &nbsp;|&nbsp; Date: _______________</p>

  <div class="section-title">Official Declaration</div>
  <p style="font-size:11px;color:#374151">I, the undersigned official, certify that the product described above has been inspected and found to be fit for human consumption and complies with the food safety standards of India and the requirements of the importing country.</p>

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Company Seal<br><br><br></div>
    <div class="sign-box">Issuing Authority<br>Official Seal &amp; Signature<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; fssai.gov.in · apeda.gov.in</div>
  </body></html>`;
}

/* ─── 13. US FDA Prior Notice (Food Exports to USA) ───────────────────────── */
export function generateFDAPriorNotice(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>US FDA Prior Notice – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>US FDA Prior Notice — Filing Checklist</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Mandatory for All Food Exports to the United States (21 CFR Part 1, Subpart I)</p>

  <div class="header-box" style="margin-bottom:16px">
    <h3>Submitter / Exporter Details</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div>
        <div class="field"><span class="field-label">Company Name:</span><span class="field-value prefilled">${CO.name}</span></div>
        <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
        <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
        <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      </div>
      <div>
        <div class="field"><span class="field-label">FDA Registration No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">DUNS / EIN No.:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">US Agent Name:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">US Agent Phone:</span><span class="field-value"></span></div>
        <div class="field"><span class="field-label">Prior Notice Submission Date:</span><span class="field-value">${today}</span></div>
      </div>
    </div>
  </div>

  <div class="section-title">1. FDA Facility Registration (Mandatory First Step)</div>
  ${[
    "Food facility registered on FDA Bioterrorism Registration Portal (registration.fda.gov)",
    "Registration renewed (biennial renewal — even-numbered years)",
    "US Agent appointed (mandatory for foreign facilities)",
    "US Agent contact info updated in FDA system",
    "FDA Registration Number noted: ____________________________",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">2. Prior Notice Filing Details (Submit via FDA PN System or ABI)</div>
  <table>
    <tr><td class="label">Product Name / Description:</td><td></td></tr>
    <tr><td class="label">FDA Product Code:</td><td></td></tr>
    <tr><td class="label">Quantity (amount &amp; unit):</td><td></td></tr>
    <tr><td class="label">Lot / Code / Batch No.:</td><td></td></tr>
    <tr><td class="label">Country of Origin:</td><td>India</td></tr>
    <tr><td class="label">Manufacturer / Grower Name:</td><td class="prefilled">${CO.name}</td></tr>
    <tr><td class="label">Manufacturer Address:</td><td class="prefilled">${CO.addr1}, ${CO.addr2}</td></tr>
    <tr><td class="label">Shipper Name &amp; Address:</td><td class="prefilled">${CO.name}, ${CO.addr1}</td></tr>
    <tr><td class="label">Carrier Name (Vessel / Airline):</td><td></td></tr>
    <tr><td class="label">Port of Entry (USA):</td><td></td></tr>
    <tr><td class="label">Anticipated Arrival Date (USA):</td><td></td></tr>
    <tr><td class="label">Bill of Lading / AWB No.:</td><td></td></tr>
    <tr><td class="label">US Consignee Name &amp; Address:</td><td></td></tr>
    <tr><td class="label">US Importer of Record:</td><td></td></tr>
  </table>

  <div class="section-title">3. Timing Requirements</div>
  <table>
    <thead><tr><th>Mode of Transport</th><th>Submit Prior Notice At Least</th></tr></thead>
    <tbody>
      <tr><td>Sea (water)</td><td><strong>8 hours</strong> before arrival at US port</td></tr>
      <tr><td>Air</td><td><strong>4 hours</strong> before arrival</td></tr>
      <tr><td>Land / Rail</td><td><strong>2 hours</strong> before arrival</td></tr>
      <tr><td>Other (express courier, mail)</td><td><strong>8 hours</strong> before arrival</td></tr>
    </tbody>
  </table>

  <div class="section-title">4. Additional US Requirements Checklist</div>
  ${[
    "FSVP (Foreign Supplier Verification Program) — US importer must have FSVP for your facility",
    "FSMA Compliance — Food Safety Modernization Act preventive controls met",
    "Labeling: English labels with Nutrition Facts / Supplement Facts panel",
    "USDA Organic Certification (if claiming organic on label)",
    "Allergen declarations correct and complete (FDA Big 9 allergens)",
    "Country of Origin Labeling (COOL) — 'Product of India' clearly stated",
    "Bioterrorism Act compliance — facility security procedures documented",
    "FDA Import Alert check — product / facility not on DWPE (Detention Without Physical Examination) list",
    "CBP (Customs &amp; Border Protection) entry filing by licensed US Customs Broker",
    "USDA APHIS permit (if fresh fruits, vegetables, or plant products)",
    "FDA Prior Notice confirmation number obtained and shared with US importer / customs broker",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">Useful Contacts &amp; Links</div>
  <table>
    <tr><td class="label">FDA PN System:</td><td>www.access.fda.gov/prior-notice</td></tr>
    <tr><td class="label">FDA Facility Reg.:</td><td>registration.fda.gov</td></tr>
    <tr><td class="label">FDA Helpdesk:</td><td>1-800-216-7331 (USA) &nbsp;|&nbsp; prior.notice@fda.hhs.gov</td></tr>
    <tr><td class="label">APEDA (India):</td><td>1800-111-175 &nbsp;|&nbsp; helpdesk@apeda.gov.in</td></tr>
    <tr><td class="label">FSSAI (India):</td><td>1800-112-100 &nbsp;|&nbsp; regd@fssai.gov.in</td></tr>
  </table>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email}</div>
  </body></html>`;
}

/* ─── 14. RoDTEP / Duty Drawback Claim Form ───────────────────────────────── */
export function generateRoDTEPClaim(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const fy = (() => { const d = new Date(); const y = d.getFullYear(); return d.getMonth() >= 3 ? `${y}-${y+1}` : `${y-1}-${y}`; })();
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>RoDTEP / Drawback Claim – ${CO.name}</title>
  <style>${baseStyles}</style></head><body>
  <h1>RoDTEP / Duty Drawback Claim Form</h1>
  <p class="subtitle">${CO.name} &nbsp;|&nbsp; Remission of Duties &amp; Taxes on Exported Products &nbsp;|&nbsp; FY ${fy}</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter Details</h3>
      <div class="field"><span class="field-label">Company Name:</span><span class="field-value prefilled">${CO.name}</span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value prefilled">${CO.addr1}, ${CO.addr2}</span></div>
      <div class="field"><span class="field-label">Phone / WA:</span><span class="field-value prefilled">${CO.phone}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value prefilled">${CO.email}</span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value">${CO.iec}</span></div>
      <div class="field"><span class="field-label">GSTIN:</span><span class="field-value">${CO.gstin}</span></div>
      <div class="field"><span class="field-label">Bank A/C for Credit:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">IFSC Code:</span><span class="field-value"></span></div>
    </div>
    <div class="header-box">
      <h3>Shipment / Claim Reference</h3>
      <div class="field"><span class="field-label">Shipping Bill No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Shipping Bill Date:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Port of Export:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Custom House (AD Code):</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Claim Filing Date:</span><span class="field-value">${today}</span></div>
      <div class="field"><span class="field-label">Financial Year:</span><span class="field-value">${fy}</span></div>
      <div class="field"><span class="field-label">Scheme Applied:</span><span class="field-value">□ RoDTEP &nbsp; □ Drawback &nbsp; □ Both</span></div>
    </div>
  </div>

  <div class="section-title">Goods &amp; HS Code Details</div>
  <table>
    <thead>
      <tr>
        <th>Sr.</th><th>Description of Goods</th><th>HS Code (8-digit)</th>
        <th>Qty Exported</th><th>FOB Value (INR)</th>
        <th>RoDTEP Rate (%)</th><th>RoDTEP Amount (INR)</th>
        <th>DBK Rate (%)</th><th>DBK Amount (INR)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="4" style="text-align:right">Total FOB / Claim</td><td></td><td></td><td></td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">RoDTEP — Key Points</div>
  <table>
    <tr><td class="label">Notification:</td><td>Customs (N.T.) No. 75/2021 &amp; subsequent amendments</td></tr>
    <tr><td class="label">Credit Type:</td><td>Transferable duty credit e-scrip (credited to ICEGATE ledger)</td></tr>
    <tr><td class="label">How to Claim:</td><td>Auto-claimed via Shipping Bill declaration on ICEGATE (select RoDTEP = Y)</td></tr>
    <tr><td class="label">Credit Use:</td><td>Pay Basic Customs Duty on imports or transfer/sell to other importers</td></tr>
    <tr><td class="label">Time Limit:</td><td>Scrip validity: 1 year from date of issuance</td></tr>
    <tr><td class="label">Exclusions:</td><td>SEZ exports, AA / DFIA holders, EOUs (separate schemes apply)</td></tr>
  </table>

  <div class="section-title">Duty Drawback — Key Points</div>
  <table>
    <tr><td class="label">Types:</td><td>All Industry Rate (AIR) &nbsp;|&nbsp; Brand Rate (BR) — apply if AIR insufficient</td></tr>
    <tr><td class="label">Rate Schedule:</td><td>Customs &amp; Central Excise Drawback Rules 2017 — CBIC notification</td></tr>
    <tr><td class="label">Time Limit:</td><td>Claim within 3 years of export date (Section 75A Customs Act)</td></tr>
    <tr><td class="label">Payment:</td><td>Directly to exporter's bank account via PFMS (Public Financial Management System)</td></tr>
  </table>

  <div class="section-title">Documents to Attach</div>
  ${[
    "Copy of Shipping Bill with LEO (Let Export Order)",
    "Commercial Invoice copy",
    "Packing List copy",
    "Bill of Lading / AWB copy",
    "Bank Realization Certificate (BRC) — for completed payments",
    "FIRC (Foreign Inward Remittance Certificate)",
    "AD Code registration letter from bank",
    "Self-declaration of inputs used (for Brand Rate drawback)",
    "CA certificate for Brand Rate claim (if AIR insufficient)",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="sign-section">
    <div class="sign-box">For <strong>${CO.name}</strong><br>Authorised Signatory &amp; Date<br><br><br></div>
    <div class="sign-box">Customs Officer<br>Verification &amp; Stamp<br><br><br></div>
  </div>
  <div class="footer">${CO.name} &nbsp;|&nbsp; ${CO.addr1}, ${CO.addr2} &nbsp;|&nbsp; ${CO.phone} &nbsp;|&nbsp; ${CO.email} &nbsp;|&nbsp; icegate.gov.in · cbic.gov.in</div>
  </body></html>`;
}
