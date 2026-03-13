/**
 * Export a resume template element to a high-quality A4 PDF with real
 * selectable/OCR-readable text.
 *
 * Uses the browser's native print rendering engine which preserves actual
 * text (not rasterized images), ensuring ATS compatibility and perfect
 * visual fidelity with the on-screen template.
 */
export async function exportResumeToPdf(
  element: HTMLElement,
  fileName: string
): Promise<void> {
  // Collect all stylesheets from the current page so the print window
  // renders the template identically.
  let cssText = '';
  const sheets = Array.from(document.styleSheets);
  for (const sheet of sheets) {
    try {
      const rules = Array.from(sheet.cssRules);
      cssText += rules.map((r) => r.cssText).join('\n');
    } catch {
      // Cross-origin sheets can't be read — import them by URL instead
      if (sheet.href) {
        cssText += `@import url("${sheet.href}");\n`;
      }
    }
  }

  // Build a self-contained HTML document with A4 print rules
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${fileName}</title>
  <style>
    ${cssText}

    @page {
      size: A4;
      margin: 0;
    }

    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 210mm !important;
        background: #fff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      /* Hide anything outside the resume */
      body > * { display: none !important; }
      body > .rb-print-root { display: block !important; }
    }

    html, body {
      margin: 0;
      padding: 0;
      background: #fff;
    }

    /* Centre the resume on screen (before user hits print) */
    body {
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }

    .rb-print-root {
      /* Ensure the content keeps its natural width */
    }
  </style>
</head>
<body>
  <div class="rb-print-root">${element.outerHTML}</div>
</body>
</html>`;

  // Open in a new window — the user's browser renders the real HTML/CSS
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error(
      'Popup blocked. Please allow popups for this site and try again.'
    );
  }

  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for all resources (fonts, stylesheets) to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      // The window stays open so the user can re-print or close it
    }, 500);
  };
}
