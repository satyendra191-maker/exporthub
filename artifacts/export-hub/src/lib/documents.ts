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

export function generateCommercialInvoice(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Commercial Invoice</title>
  <style>${baseStyles}</style></head><body>
  <h1>Commercial Invoice</h1>
  <p class="subtitle">For Export Purposes Only &nbsp;|&nbsp; Original</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter / Seller</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">City / State / PIN:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">GSTIN:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">PAN:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Bank A/C:</span><span class="field-value"></span></div>
    </div>
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
        <th style="width:5%">Sr.</th>
        <th style="width:30%">Description of Goods</th>
        <th style="width:10%">HS Code</th>
        <th style="width:10%">Qty</th>
        <th style="width:10%">Unit</th>
        <th style="width:15%">Unit Price</th>
        <th style="width:10%">Disc. %</th>
        <th style="width:10%">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4,5].map(i => `<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="7" style="text-align:right; padding-right:12px;">Sub-Total</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right; padding-right:12px;">Freight</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right; padding-right:12px;">Insurance</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right; padding-right:12px;">Discount</td><td></td></tr>
      <tr class="total-row"><td colspan="7" style="text-align:right; padding-right:12px;">Grand Total</td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Declaration</div>
  <p style="font-size:11px; color:#374151;">We hereby certify that the goods described above are of Indian origin and that the particulars given in this invoice are true and correct.</p>

  <div class="sign-section">
    <div class="sign-box">Authorized Signatory &amp; Stamp<br><br><br></div>
    <div class="sign-box">Buyer's Acceptance / Signature<br><br><br></div>
  </div>
  <div class="footer">Generated by Export Intelligence Hub &nbsp;|&nbsp; niryat.gov.in · dgft.gov.in &nbsp;|&nbsp; For official use, attach company letterhead</div>
  </body></html>`;
}

export function generatePackingList(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Packing List</title>
  <style>${baseStyles}</style></head><body>
  <h1>Packing List</h1>
  <p class="subtitle">Annexure to Commercial Invoice &nbsp;|&nbsp; Original</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Exporter / Seller</h3>
      <div class="field"><span class="field-label">Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value"></span></div>
    </div>
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
        <th>Pkg No.</th>
        <th>Description of Goods</th>
        <th>HS Code</th>
        <th>Qty per Pkg</th>
        <th>No. of Pkgs</th>
        <th>Total Qty</th>
        <th>Net Wt (kg)</th>
        <th>Gross Wt (kg)</th>
        <th>Dimensions (cm)</th>
        <th>Volume (CBM)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4,5,6].map(i => `<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>L× W× H</td><td></td></tr>`).join("")}
      <tr class="total-row"><td colspan="4" style="text-align:right">Totals</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Marks &amp; Numbers on Packages</div>
  <table>
    <tr><td class="label">Marks &amp; Numbers:</td><td style="height:50px"></td></tr>
    <tr><td class="label">Special Instructions:</td><td style="height:40px"></td></tr>
  </table>

  <div class="sign-section">
    <div class="sign-box">Exporter's Signature &amp; Stamp<br><br><br></div>
    <div class="sign-box">CHA / Freight Forwarder<br><br><br></div>
  </div>
  <div class="footer">Generated by Export Intelligence Hub &nbsp;|&nbsp; Verify all weights at port of loading</div>
  </body></html>`;
}

export function generateProformaInvoice(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Proforma Invoice</title>
  <style>${baseStyles}</style></head><body>
  <h1>Proforma Invoice</h1>
  <p class="subtitle">Preliminary Bill of Sale — Not for Payment &nbsp;|&nbsp; Valid till: ${validUntil}</p>

  <div class="header-grid">
    <div class="header-box">
      <h3>Seller / Exporter</h3>
      <div class="field"><span class="field-label">Company Name:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Address:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">GSTIN:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">IEC No.:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Phone:</span><span class="field-value"></span></div>
      <div class="field"><span class="field-label">Bank &amp; SWIFT Code:</span><span class="field-value"></span></div>
    </div>
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
        <th>Sr.</th>
        <th>Product Description</th>
        <th>HS Code</th>
        <th>Specification</th>
        <th>Qty</th>
        <th>Unit</th>
        <th>Unit Price (USD)</th>
        <th>Total (USD)</th>
      </tr>
    </thead>
    <tbody>
      ${[1,2,3,4].map(i=>`<tr><td>${i}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join("")}
      <tr><td colspan="7" style="text-align:right;padding-right:12px;">Packaging &amp; Handling</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right;padding-right:12px;">Freight (if CIF)</td><td></td></tr>
      <tr><td colspan="7" style="text-align:right;padding-right:12px;">Insurance</td><td></td></tr>
      <tr class="total-row"><td colspan="7" style="text-align:right;padding-right:12px;">Grand Total</td><td></td></tr>
    </tbody>
  </table>

  <div class="section-title">Bank Details for Payment</div>
  <table>
    <tr><td class="label">Bank Name:</td><td></td><td class="label">Branch:</td><td></td></tr>
    <tr><td class="label">Account Name:</td><td></td><td class="label">A/C No.:</td><td></td></tr>
    <tr><td class="label">IFSC Code:</td><td></td><td class="label">SWIFT Code:</td><td></td></tr>
    <tr><td class="label">IBAN (if applicable):</td><td colspan="3"></td></tr>
  </table>

  <p style="font-size:11px;color:#374151;margin-top:12px;">This is a Proforma Invoice only. A Commercial Invoice will be issued after receipt of advance payment and confirmation of order.</p>

  <div class="sign-section">
    <div class="sign-box">Authorized Signatory &amp; Company Seal<br><br><br></div>
    <div class="sign-box">Buyer Confirmation &amp; Date<br><br><br></div>
  </div>
  <div class="footer">Generated by Export Intelligence Hub &nbsp;|&nbsp; This document is for quotation purposes only and does not constitute a legal obligation</div>
  </body></html>`;
}

export function generateCOOChecklist(): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Certificate of Origin Checklist</title>
  <style>${baseStyles}</style></head><body>
  <h1>Certificate of Origin — Issuance Checklist</h1>
  <p class="subtitle">Applicable for Non-Preferential &amp; Preferential COO &nbsp;|&nbsp; Authority: DGFT / Chamber of Commerce / APEDA</p>

  <div class="section-title">1. Applicant / Exporter Information</div>
  ${[
    ["Company Name (as per IEC)", ""],
    ["IEC Number", ""],
    ["GSTIN", ""],
    ["Registered Office Address", ""],
    ["Contact Person & Designation", ""],
    ["Email / Phone", ""],
    ["RCMC Number (if applicable)", ""],
  ].map(([l]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${l}:</strong> <span style="border-bottom:1px dotted #999; display:inline-block; width:300px; min-height:14px">&nbsp;</span></div></div>`).join("")}

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
    "Previous COO copies (if back-to-back)",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">3. COO Type &amp; Applicable Rules</div>
  <table>
    <thead><tr><th>COO Type</th><th>Used For</th><th>Issuing Authority</th><th>Fee</th><th>Applicable</th></tr></thead>
    <tbody>
      <tr><td>Non-Preferential COO</td><td>General exports (no FTA)</td><td>Chamber of Commerce / FIEO</td><td>~₹250–500</td><td><div class="check-box"></div></td></tr>
      <tr><td>GSP (Form A)</td><td>EU / USA / Japan concession</td><td>Export Inspection Council</td><td>~₹500</td><td><div class="check-box"></div></td></tr>
      <tr><td>SAFTA COO</td><td>South Asian FTA countries</td><td>DGFT</td><td>Free</td><td><div class="check-box"></div></td></tr>
      <tr><td>ASEAN COO (Form AI)</td><td>ASEAN member countries</td><td>DGFT</td><td>Free</td><td><div class="check-box"></div></td></tr>
      <tr><td>India–UAE CEPA</td><td>UAE exports</td><td>DGFT</td><td>Free</td><td><div class="check-box"></div></td></tr>
      <tr><td>India–Australia ECTA</td><td>Australia exports</td><td>DGFT</td><td>Free</td><td><div class="check-box"></div></td></tr>
      <tr><td>APEDA COO</td><td>Agri / food products</td><td>APEDA</td><td>As per APEDA schedule</td><td><div class="check-box"></div></td></tr>
    </tbody>
  </table>

  <div class="section-title">4. Key Rules of Origin Criteria</div>
  ${[
    "Product is wholly obtained / manufactured in India",
    "Minimum Value Addition of 30–35% (varies by FTA)",
    "HS Code change at 4-digit level (CTH rule) — if applicable",
    "Specific Manufacturing Process compliance verified",
    "No third-country inputs exceed the threshold",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">5. Submission Checklist</div>
  ${[
    "Application submitted on official portal (DGFT / Chamber) with correct HS Codes",
    "All fields filled in capital letters on COO form",
    "Notarized documents attached (where required)",
    "Application fee paid via NEFT/online",
    "Physical COO collected or e-COO downloaded after approval",
    "COO endorsed by issuing authority (wet signature / e-seal)",
    "Copy retained for 5 years for audit purposes",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">Useful Contacts</div>
  <table>
    <tr><td class="label">DGFT Helpdesk:</td><td>1800-111-550 &nbsp;|&nbsp; helpdesk@dgft.gov.in</td></tr>
    <tr><td class="label">APEDA:</td><td>1800-111-175 &nbsp;|&nbsp; helpdesk@apeda.gov.in</td></tr>
    <tr><td class="label">FIEO:</td><td>011-26153040 &nbsp;|&nbsp; fieo@fieo.org</td></tr>
  </table>
  <div class="footer">Generated by Export Intelligence Hub &nbsp;|&nbsp; dgft.gov.in · apeda.gov.in · fieo.org</div>
  </body></html>`;
}

export function generateShippingBillChecklist(): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Shipping Bill Checklist</title>
  <style>${baseStyles}</style></head><body>
  <h1>Shipping Bill Filing Checklist</h1>
  <p class="subtitle">Indian Customs (ICEGATE) &nbsp;|&nbsp; cbic.gov.in &nbsp;|&nbsp; icegate.gov.in</p>

  <div class="section-title">1. Types of Shipping Bill</div>
  <table>
    <thead><tr><th>Type</th><th>Applicable For</th><th>Colour</th><th>Applicable</th></tr></thead>
    <tbody>
      <tr><td>Free Shipping Bill</td><td>Goods exported without drawback / duty claim</td><td>White</td><td><div class="check-box"></div></td></tr>
      <tr><td>Drawback Shipping Bill</td><td>Claim of Customs &amp; Central Excise Drawback</td><td>Green</td><td><div class="check-box"></div></td></tr>
      <tr><td>DEPB Shipping Bill</td><td>Duty Entitlement Pass Book Scheme</td><td>Yellow</td><td><div class="check-box"></div></td></tr>
      <tr><td>Ex-Bond Shipping Bill</td><td>Goods from bonded warehouse</td><td>Pink</td><td><div class="check-box"></div></td></tr>
      <tr><td>Coastal Shipping Bill</td><td>Coastal trade between Indian ports</td><td>Blue</td><td><div class="check-box"></div></td></tr>
    </tbody>
  </table>

  <div class="section-title">2. Pre-Filing Documents (check when ready)</div>
  ${[
    "Commercial Invoice (3 copies) — with correct HS Code",
    "Packing List (3 copies)",
    "GST Invoice / Tax Invoice",
    "Proforma Invoice (if advance shipment)",
    "Letter of Credit / Advance Payment proof",
    "IEC Certificate",
    "GSTIN Certificate",
    "RCMC / Export Promotion Council Certificate",
    "Product License / NOC (if restricted goods)",
    "Quality Certificate / Test Report (if required by buyer)",
    "Certificate of Origin (if required)",
    "Fumigation Certificate (for food / wooden packaging)",
    "Phytosanitary Certificate (for plant-origin goods)",
    "Drug License / FDA approval (for pharma exports)",
    "APEDA Registration Certificate (for agri products)",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">3. Mandatory Fields in ICEGATE Shipping Bill Form</div>
  <table>
    <thead><tr><th>Field</th><th>Details Required</th><th>Verified</th></tr></thead>
    <tbody>
      ${[
        ["Exporter Name & IEC", "As per DGFT records"],
        ["Consignee Details", "Full name, address, country"],
        ["Port of Loading", "IATA / Port code"],
        ["Port of Discharge", "Destination port code"],
        ["Country of Destination", "ISO country code"],
        ["HS Code (8-digit)", "Custom Tariff heading"],
        ["Description of Goods", "Technical description"],
        ["Quantity & Unit", "As per packing list"],
        ["FOB Value (INR & Foreign Currency)", "Invoice value at port"],
        ["Invoice Number & Date", "From commercial invoice"],
        ["GSTIN & LUT/Bond No.", "For GST zero-rating"],
        ["Drawback / RoDTEP Serial No.", "If claiming benefits"],
        ["Shipping Line / IATA Agent", "Name & code"],
        ["Container No. / Seal No.", "After stuffing"],
        ["Gross Weight / Net Weight", "In kg"],
      ].map(([f,d]) => `<tr><td>${f}</td><td>${d}</td><td><div class="check-box"></div></td></tr>`).join("")}
    </tbody>
  </table>

  <div class="section-title">4. Post-Filing Actions</div>
  ${[
    "Shipping Bill number noted and filed",
    "Let Export Order (LEO) obtained from Customs",
    "Examination of cargo completed at port / CFS",
    "Customs-examined goods sealed and loaded",
    "Export General Manifest (EGM) filed by shipping line",
    "FIRC (Foreign Inward Remittance Certificate) obtained after payment",
    "Bank Realization Certificate (BRC) submitted to AD Bank",
    "RoDTEP / Drawback claim filed on ICEGATE",
    "GST refund claimed (if applicable)",
  ].map(item => `<div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join("")}

  <div class="section-title">Useful Contacts</div>
  <table>
    <tr><td class="label">ICEGATE Helpdesk:</td><td>1800-3010-1000 &nbsp;|&nbsp; helpdesk@icegate.gov.in &nbsp;|&nbsp; 24×7</td></tr>
    <tr><td class="label">CBIC:</td><td>cbic.gov.in &nbsp;|&nbsp; Local Custom House contact</td></tr>
    <tr><td class="label">DGFT:</td><td>1800-111-550 &nbsp;|&nbsp; helpdesk@dgft.gov.in</td></tr>
  </table>
  <div class="footer">Generated by Export Intelligence Hub &nbsp;|&nbsp; icegate.gov.in · cbic.gov.in</div>
  </body></html>`;
}

export function generateExportReadinessChecklist(): string {
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Export Readiness Checklist</title>
  <style>${baseStyles}
  .phase { background:#1e3a5f; color:#fff; padding:6px 12px; border-radius:4px; font-size:12px; font-weight:bold; margin-top:20px; margin-bottom:8px; }
  .score-box { border:2px solid #1e3a5f; border-radius:8px; padding:16px; text-align:center; margin-bottom:20px; }
  .score-box h2 { margin:0; font-size:28px; color:#1e3a5f; }
  .score-box p { margin:4px 0 0; color:#555; }
  </style></head><body>
  <h1>Export Readiness Checklist</h1>
  <p class="subtitle">Self-Assessment for Indian Exporters &nbsp;|&nbsp; Date: ${today}</p>

  <div class="header-grid">
    <div class="header-box">
      <div class="field"><span class="field-label">Company Name:</span><span class="field-value"></span></div>
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
    ["Bank Account — AD Category Bank", "Authorised Dealer bank for foreign exchange transactions"],
    ["Company Registration", "Pvt. Ltd. / LLP / Partnership / Proprietorship certificate"],
    ["MSME Registration (Udyam)", "Optional but recommended for benefits (udyamregistration.gov.in)"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 2 — Product &amp; Market Research</div>
  ${[
    ["HS Code Identification", "8-digit HS Code for your product (indiantradeportal.in)"],
    ["Export Market Identified", "Country with highest demand — research via NIRYAT / TradeStat"],
    ["Competitor Analysis Done", "Price benchmarking with other exporting countries"],
    ["Tariff &amp; Duty Research", "Import duty in target country (indiantradeportal.in)"],
    ["Buyer Identified", "At least one confirmed buyer or enquiry"],
    ["Proforma Invoice Sent", "Quote shared with buyer with all commercial terms"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 3 — Sector Certification &amp; Compliance</div>
  ${[
    ["RCMC Certificate", "Registration-cum-Membership Certificate from relevant EPC / FIEO"],
    ["APEDA Registration", "Required if exporting scheduled agri products (apeda.gov.in)"],
    ["Product Standard Compliance", "BIS, FSSAI, BEE, or other applicable Indian / International standards"],
    ["Packaging Standards", "Country-specific labelling, barcode, and packaging norms verified"],
    ["Quality Certificate / Lab Report", "SGS, Bureau Veritas, or NABL-accredited lab test report ready"],
    ["Export Insurance", "ECGC policy taken for credit risk protection (ecgc.in)"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 4 — Logistics &amp; Shipping</div>
  ${[
    ["CHA (Customs House Agent) Appointed", "Licensed CHA for customs clearance (cbic.gov.in/list of CHAs)"],
    ["Freight Forwarder Identified", "Sea / Air freight rates compared and booked"],
    ["Shipping Line / Airline Confirmed", "Booking number received"],
    ["Incoterms Agreed", "FOB / CIF / EXW / DAP — clearly stated in contract"],
    ["Container / Space Booked", "20ft / 40ft container or LCL space confirmed"],
    ["LUT / Bond Filed with GST Dept.", "Letter of Undertaking filed for zero-rated supply"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="phase">Phase 5 — Documentation &amp; Financial</div>
  ${[
    ["Commercial Invoice Prepared", "Signed, stamped invoice with all mandatory fields"],
    ["Packing List Ready", "Accurate weight, volume, and package count"],
    ["Certificate of Origin Obtained", "From Chamber / DGFT / APEDA as applicable"],
    ["Shipping Bill Filed on ICEGATE", "LEO obtained; cargo cleared by customs"],
    ["Payment Terms Confirmed", "LC / TT / DA / DP — payment secured"],
    ["FIRC &amp; BRC Submitted", "Bank Realization Certificate filed within 9 months"],
  ].map(([t,d]) => `<div class="checklist-item"><div class="check-box"></div><div><strong>${t}</strong><br><span style="font-size:10px;color:#6b7280">${d}</span></div></div>`).join("")}

  <div class="section-title">Key Helplines</div>
  <table>
    <tr><td class="label">DGFT (IEC / Licenses):</td><td>1800-111-550 &nbsp;|&nbsp; helpdesk@dgft.gov.in</td></tr>
    <tr><td class="label">ICEGATE (Customs):</td><td>1800-3010-1000 &nbsp;|&nbsp; helpdesk@icegate.gov.in (24×7)</td></tr>
    <tr><td class="label">APEDA (Agri Exports):</td><td>1800-111-175 &nbsp;|&nbsp; helpdesk@apeda.gov.in</td></tr>
    <tr><td class="label">FIEO (RCMC / Guidance):</td><td>011-26153040 &nbsp;|&nbsp; fieo@fieo.org</td></tr>
    <tr><td class="label">ECGC (Insurance):</td><td>022-22178300 &nbsp;|&nbsp; ecgc.in</td></tr>
  </table>
  <div class="footer">Generated by Export Intelligence Hub &nbsp;|&nbsp; exportintelligencehub.in &nbsp;|&nbsp; For queries visit dgft.gov.in or call 1800-111-550</div>
  </body></html>`;
}
