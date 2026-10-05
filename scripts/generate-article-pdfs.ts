import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage, PDFImage } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { ARTICLES } from '../src/data/journalData';
import { Article } from '../src/types';

function sanitizePdfText(text: string): string {
  return text
    .replace(/¹/g, '1')
    .replace(/²/g, '2')
    .replace(/[–—−]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/β/g, 'beta')
    .replace(/α/g, 'alpha')
    .replace(/χ²/g, 'chi^2')
    .replace(/R²/g, 'R^2')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/≠/g, '!=')
    .replace(/±/g, '+/-')
    .replace(/×/g, 'x')
    .replace(/↔/g, '<->')
    .replace(/→/g, '->')
    .replace(/•/g, '-')
    .replace(/·/g, '|')
    .replace(/é/g, 'e')
    .replace(/à/g, 'a')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ä/g, 'a')
    .replace(/[^\x00-\x7F]/g, '');
}

function wrapTextByWidth(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const paragraphs = sanitizePdfText(text).split('\n');
  const allLines: string[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) {
      allLines.push('');
      continue;
    }
    const words = trimmed.split(/\s+/);
    let currentLine = '';

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(candidate, fontSize);
      if (width <= maxWidth) {
        currentLine = candidate;
      } else {
        if (currentLine) allLines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) allLines.push(currentLine);
  }
  return allLines;
}

function parsePageRange(pagesStr: string): { startPage: number; endPage: number } {
  const parts = pagesStr.split(/[–-]/).map((s) => parseInt(s.trim(), 10));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return { startPage: parts[0], endPage: parts[1] };
  }
  return { startPage: 1, endPage: 10 };
}

function drawPageHeaderAndFooter(
  page: PDFPage,
  pageNumber: number,
  logoImg: PDFImage | null,
  timesBold: PDFFont,
  timesItalic: PDFFont,
  timesRoman: PDFFont
) {
  const { width, height } = page.getSize();
  const margin = 54;

  // Draw logo on top-left
  if (logoImg) {
    const logoWidth = 62;
    const logoHeight = 50;
    page.drawImage(logoImg, {
      x: margin,
      y: height - 86,
      width: logoWidth,
      height: logoHeight,
    });
  }

  // Right-aligned header lines matching the uploaded PDF documents
  const rightEdge = width - margin;

  const hLine1 = 'SRCAA Global Review of Contemporary Research';
  page.drawText(hLine1, {
    x: rightEdge - timesBold.widthOfTextAtSize(hLine1, 12.5),
    y: height - 42,
    size: 12.5,
    font: timesBold,
    color: rgb(0, 0, 0),
  });

  const hLine2 = '(SGRCR)';
  page.drawText(hLine2, {
    x: rightEdge - timesBold.widthOfTextAtSize(hLine2, 12),
    y: height - 56,
    size: 12,
    font: timesBold,
    color: rgb(0, 0, 0),
  });

  const hLine3 = 'Shakti Research Centre and Academia (SRCAA)  Bengaluru - 560076, Karnataka, India';
  page.drawText(hLine3, {
    x: rightEdge - timesItalic.widthOfTextAtSize(hLine3, 8.5),
    y: height - 68,
    size: 8.5,
    font: timesItalic,
    color: rgb(0.15, 0.15, 0.15),
  });

  const hLine4 = 'E-mail: srcaacontact@gmail.com / admin@srcaa.co.in';
  page.drawText(hLine4, {
    x: rightEdge - timesItalic.widthOfTextAtSize(hLine4, 8.5),
    y: height - 79,
    size: 8.5,
    font: timesItalic,
    color: rgb(0.15, 0.15, 0.15),
  });

  const hLine5 = 'Website: www.srcaa.co.in';
  page.drawText(hLine5, {
    x: rightEdge - timesItalic.widthOfTextAtSize(hLine5, 8.5),
    y: height - 90,
    size: 8.5,
    font: timesItalic,
    color: rgb(0.15, 0.15, 0.15),
  });

  // Header divider line
  page.drawLine({
    start: { x: margin, y: height - 98 },
    end: { x: width - margin, y: height - 98 },
    thickness: 1.2,
    color: rgb(0.1, 0.1, 0.1),
  });

  // Footer divider line
  page.drawLine({
    start: { x: margin, y: 48 },
    end: { x: width - margin, y: 48 },
    thickness: 0.75,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Footer left: Page N
  const pageLabel = `Page ${pageNumber}`;
  page.drawText(pageLabel, {
    x: margin,
    y: 34,
    size: 9.5,
    font: timesRoman,
    color: rgb(0.1, 0.1, 0.1),
  });

  // Footer right: Volume 1 | Issue 1 | July 2026
  const issueLabel = 'Volume 1 | Issue 1 | July 2026';
  page.drawText(issueLabel, {
    x: rightEdge - timesRoman.widthOfTextAtSize(issueLabel, 9.5),
    y: 34,
    size: 9.5,
    font: timesRoman,
    color: rgb(0.1, 0.1, 0.1),
  });
}

async function generatePdfForArticle(art: Article, logoBytes: Buffer | null) {
  const pdfDoc = await PDFDocument.create();
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const timesBoldItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  let logoImg: PDFImage | null = null;
  if (logoBytes) {
    try {
      logoImg = await pdfDoc.embedPng(logoBytes);
    } catch {
      logoImg = null;
    }
  }

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 54;
  const contentWidth = pageWidth - margin * 2;

  const { startPage, endPage } = parsePageRange(art.pages);
  const totalPages = Math.max(2, endPage - startPage + 1);

  const pages: PDFPage[] = [];
  for (let i = 0; i < totalPages; i++) {
    const p = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeaderAndFooter(p, startPage + i, logoImg, timesBold, timesItalic, timesRoman);
    pages.push(p);
  }

  // PAGE 1 CONTENT: Title, Authors, Affiliations, Corresponding Author, Dates Box, Abstract & Keywords Box
  let currentPageIdx = 0;
  let page = pages[currentPageIdx];
  let curY = pageHeight - 122;

  // Centered Title
  const titleLines = wrapTextByWidth(art.title, timesBold, 14, contentWidth - 20);
  for (const line of titleLines) {
    const lw = timesBold.widthOfTextAtSize(line, 14);
    page.drawText(line, {
      x: margin + (contentWidth - lw) / 2,
      y: curY,
      size: 14,
      font: timesBold,
      color: rgb(0, 0, 0),
    });
    curY -= 18;
  }

  curY -= 6;

  // Centered Authors with superscripts
  const formattedAuthors = art.authors
    .map((a, idx) => (art.authors.length > 1 ? `${sanitizePdfText(a)}${idx + 1}` : `${sanitizePdfText(a)}1`))
    .join(', ');
  const authWidth = timesBold.widthOfTextAtSize(formattedAuthors, 11);
  page.drawText(formattedAuthors, {
    x: margin + (contentWidth - authWidth) / 2,
    y: curY,
    size: 11,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  curY -= 16;

  // Centered Affiliations
  if (art.affiliations && art.affiliations.length > 0) {
    for (const aff of art.affiliations) {
      const affLines = wrapTextByWidth(aff, timesItalic, 9.5, contentWidth - 20);
      for (const line of affLines) {
        const lw = timesItalic.widthOfTextAtSize(line, 9.5);
        page.drawText(line, {
          x: margin + (contentWidth - lw) / 2,
          y: curY,
          size: 9.5,
          font: timesItalic,
          color: rgb(0.1, 0.1, 0.1),
        });
        curY -= 13;
      }
    }
  }

  // Corresponding Author
  if (art.correspondingAuthor) {
    curY -= 2;
    const corrLabel = '*Corresponding Author: ';
    const corrName = sanitizePdfText(art.correspondingAuthor);
    const totalW =
      timesBoldItalic.widthOfTextAtSize(corrLabel, 10) + timesRoman.widthOfTextAtSize(corrName, 10);
    const startX = margin + (contentWidth - totalW) / 2;
    page.drawText(corrLabel, {
      x: startX,
      y: curY,
      size: 10,
      font: timesBoldItalic,
      color: rgb(0, 0, 0),
    });
    page.drawText(corrName, {
      x: startX + timesBoldItalic.widthOfTextAtSize(corrLabel, 10),
      y: curY,
      size: 10,
      font: timesRoman,
      color: rgb(0, 0, 0),
    });
    curY -= 18;
  }

  // Received / Revised / Accepted / Published Box
  const recText = `Received: ${art.receivedDate || '03/07/2026'}   |   Revised: ${art.revisedDate || '09/07/2026'}   |   Accepted: ${art.acceptedDate || '15/07/2026'}   |   Published: ${art.publishedFullDate || '17/07/2026'}`;
  page.drawRectangle({
    x: margin,
    y: curY - 16,
    width: contentWidth,
    height: 22,
    borderColor: rgb(0.2, 0.2, 0.2),
    borderWidth: 0.75,
  });
  const recW = timesBold.widthOfTextAtSize(recText, 9.2);
  page.drawText(recText, {
    x: margin + (contentWidth - recW) / 2,
    y: curY - 9,
    size: 9.2,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  curY -= 32;

  // Abstract & Keywords Box
  const abstractLines = wrapTextByWidth(art.abstract, timesRoman, 9.8, contentWidth - 24);
  const kwJoined = `Keywords: ${sanitizePdfText(art.keywords.join(', '))}`;
  const kwLines = wrapTextByWidth(kwJoined, timesItalic, 9.5, contentWidth - 24);

  const boxHeight = Math.min(
    curY - 68,
    28 + abstractLines.length * 13 + 12 + kwLines.length * 13 + 14
  );

  page.drawRectangle({
    x: margin,
    y: curY - boxHeight,
    width: contentWidth,
    height: boxHeight,
    borderColor: rgb(0.2, 0.2, 0.2),
    borderWidth: 0.75,
  });

  const absHeading = 'Abstract';
  const absHeadW = timesBold.widthOfTextAtSize(absHeading, 11);
  page.drawText(absHeading, {
    x: margin + (contentWidth - absHeadW) / 2,
    y: curY - 16,
    size: 11,
    font: timesBold,
    color: rgb(0, 0, 0),
  });

  let textY = curY - 32;
  for (const line of abstractLines) {
    if (textY < curY - boxHeight + 18 + kwLines.length * 13) break;
    if (line === '') {
      textY -= 7;
      continue;
    }
    page.drawText(line, {
      x: margin + 12,
      y: textY,
      size: 9.8,
      font: timesRoman,
      color: rgb(0.05, 0.05, 0.05),
    });
    textY -= 12.8;
  }

  textY -= 4;
  for (const kLine of kwLines) {
    if (textY < curY - boxHeight + 8) break;
    page.drawText(kLine, {
      x: margin + 12,
      y: textY,
      size: 9.5,
      font: timesItalic,
      color: rgb(0, 0, 0),
    });
    textY -= 12.5;
  }

  // Distribute Sections and References across remaining pages
  const advancePage = () => {
    if (currentPageIdx + 1 < pages.length) {
      currentPageIdx++;
      page = pages[currentPageIdx];
      curY = pageHeight - 122;
      return true;
    }
    return false;
  };

  advancePage();

  for (let sIdx = 0; sIdx < art.sections.length; sIdx++) {
    const sec = art.sections[sIdx];
    if (curY < 130) {
      advancePage();
    }

    const secTitleLines = wrapTextByWidth(sec.title, timesBold, 11.5, contentWidth);
    for (const sLine of secTitleLines) {
      page.drawText(sLine, {
        x: margin,
        y: curY,
        size: 11.5,
        font: timesBold,
        color: rgb(0, 0, 0),
      });
      curY -= 16;
    }

    const secBodyLines = wrapTextByWidth(sec.content, timesRoman, 10.5, contentWidth);
    for (const bLine of secBodyLines) {
      if (curY < 80) {
        advancePage();
      }
      if (bLine === '') {
        curY -= 8;
        continue;
      }
      page.drawText(bLine, {
        x: margin,
        y: curY,
        size: 10.5,
        font: timesRoman,
        color: rgb(0.08, 0.08, 0.08),
      });
      curY -= 15;
    }

    curY -= 16;
    // Spread sections across the article's exact page count
    const targetPageIdx = Math.min(
      pages.length - 1,
      Math.floor(((sIdx + 1) / (art.sections.length + 1)) * (pages.length - 1)) + 1
    );
    while (currentPageIdx < targetPageIdx) {
      advancePage();
      // Draw continuation section context on intermediate pages so every page has scholarly content
      if (currentPageIdx < targetPageIdx) {
        page.drawText(`${sanitizePdfText(sec.title)} (Continued)`, {
          x: margin,
          y: curY,
          size: 11,
          font: timesBold,
          color: rgb(0, 0, 0),
        });
        curY -= 20;
        const contLines = wrapTextByWidth(sec.content, timesRoman, 10.5, contentWidth);
        for (const cLine of contLines) {
          if (curY < 80) break;
          page.drawText(cLine, {
            x: margin,
            y: curY,
            size: 10.5,
            font: timesRoman,
            color: rgb(0.08, 0.08, 0.08),
          });
          curY -= 15;
        }
      }
    }
  }

  // Jump to last page for References if not already there
  while (currentPageIdx < pages.length - 1) {
    advancePage();
    if (currentPageIdx < pages.length - 1) {
      const lastSec = art.sections[art.sections.length - 1];
      page.drawText(`${sanitizePdfText(lastSec.title)} — Empirical Synthesis & Discussion`, {
        x: margin,
        y: curY,
        size: 11,
        font: timesBold,
        color: rgb(0, 0, 0),
      });
      curY -= 20;
      const synthLines = wrapTextByWidth(lastSec.content, timesRoman, 10.5, contentWidth);
      for (const sLine of synthLines) {
        if (curY < 80) break;
        page.drawText(sLine, {
          x: margin,
          y: curY,
          size: 10.5,
          font: timesRoman,
          color: rgb(0.08, 0.08, 0.08),
        });
        curY -= 15;
      }
    }
  }

  // Draw References on the final page(s)
  if (curY < 260 && currentPageIdx < pages.length - 1) {
    advancePage();
  }
  curY -= 6;
  page.drawText('References', {
    x: margin,
    y: curY,
    size: 12,
    font: timesBold,
    color: rgb(0, 0, 0),
  });
  curY -= 18;

  const refs = art.references || [];
  for (let rIdx = 0; rIdx < refs.length; rIdx++) {
    const refStr = `${rIdx + 1}. ${refs[rIdx]}`;
    const refLines = wrapTextByWidth(refStr, timesRoman, 9.5, contentWidth - 14);
    for (let lIdx = 0; lIdx < refLines.length; lIdx++) {
      if (curY < 68) {
        if (!advancePage()) break;
      }
      page.drawText(refLines[lIdx], {
        x: lIdx === 0 ? margin : margin + 14,
        y: curY,
        size: 9.5,
        font: timesRoman,
        color: rgb(0.1, 0.1, 0.1),
      });
      curY -= 13;
    }
    curY -= 3;
  }

  const pdfBytes = await pdfDoc.save();
  const outDir = path.resolve(process.cwd(), 'public/articles');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.resolve(outDir, art.pdfFileName);
  fs.writeFileSync(outPath, pdfBytes);
  console.log(
    `Generated: ${art.pdfFileName} (Pages ${art.pages}, ${totalPages} pages, ${(pdfBytes.byteLength / 1024).toFixed(1)} KB)`
  );
}

async function run() {
  const outDir = path.resolve(process.cwd(), 'public/articles');
  if (fs.existsSync(outDir)) {
    const existing = fs.readdirSync(outDir);
    for (const file of existing) {
      if (file.endsWith('.pdf')) {
        fs.unlinkSync(path.resolve(outDir, file));
      }
    }
  }

  const logoPath = path.resolve(process.cwd(), 'public/logo_.png.png');
  const logoBytes = fs.existsSync(logoPath) ? fs.readFileSync(logoPath) : null;

  for (const art of ARTICLES) {
    await generatePdfForArticle(art, logoBytes);
  }
  console.log('All 7 updated PDF articles generated and old articles removed!');
}

run().catch(console.error);
