import PDFDocument from 'pdfkit';
import { Response } from 'express';
import path from 'path';

interface CertificateData {
  email: string;
  courseName: string;
  completionDate: Date;
}

export class PDFService {
  static async generateCertificate(res: Response, data: CertificateData) {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Регистрация шрифта для поддержки кириллицы
    const fontPath = path.join(
      __dirname,
      '..',
      '..',
      'fonts',
      'DejaVuSans.ttf',
    );
    doc.registerFont('DejaVuSans', fontPath);
    doc.font('DejaVuSans');

    // Настройка потока для отправки PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=certificate-${data.email}.pdf`,
    );

    doc.pipe(res);

    // Добавление стилей и контента
    doc
      .fontSize(30)
      .text('Сертификат о прохождении курса', {
        align: 'center',
        characterSpacing: 0.5,
      })
      .moveDown(2);

    doc
      .fontSize(16)
      .text(
        `Настоящим подтверждается, что ${data.email} успешно прошел(а) курс:`,
        { align: 'center', characterSpacing: 0.5 },
      )
      .moveDown();

    doc
      .fontSize(20)
      .text(data.courseName, { align: 'center', characterSpacing: 0.5 })
      .moveDown(2);

    doc
      .fontSize(14)
      .text(`Дата выдачи: ${data.completionDate.toLocaleDateString('ru-RU')}`, {
        align: 'center',
      });

    // Добавление подписи
    doc
      .moveDown(4)
      .fontSize(12)
      .text('Подпись:', 50)
      .moveDown(0.5)
      .text('____________________', 50);

    // Завершение документа
    doc.end();
  }
}
