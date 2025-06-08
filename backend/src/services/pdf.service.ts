import PDFDocument from 'pdfkit';
import { Response } from 'express';
import path from 'path';

interface CertificateData {
  email: string;
  fullname: string;
  courseName: string;
  completionDate: Date;
}

export class PDFService {
  static async generateCertificate(res: Response, data: CertificateData) {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margins: { top: 40, bottom: 40, left: 40, right: 40 },
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

    // Пытаемся добавить фоновое изображение, если оно существует
    const bgImagePath = path.join(
      __dirname,
      '..',
      '..',
      'images',
      'certificate-bg.png',
    );
    try {
      doc.image(bgImagePath, 0, 0, {
        width: doc.page.width,
        height: doc.page.height,
      });
    } catch (err) {
      // Если не найдено изображение, заливаем нежный бежевый фон
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#FFF8DC');
    }

    // Настройка заголовков ответа
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodeURIComponent(`certificate-${data.fullname}.pdf`)}`,
    );
    doc.pipe(res);

    // Рисуем декоративную рамку с пунктирной линией
    const borderMargin = 30;
    doc
      .lineWidth(5)
      .dash(10, { space: 5 })
      .strokeColor('#FF4500')
      .rect(
        borderMargin,
        borderMargin,
        doc.page.width - borderMargin * 2,
        doc.page.height - borderMargin * 2,
      )
      .stroke();
    doc.undash();

    // Декоративные круги в углах рамки
    const circleRadius = 15;
    const circleColor = '#FFD700';
    doc
      .circle(
        borderMargin + circleRadius,
        borderMargin + circleRadius,
        circleRadius,
      )
      .fill(circleColor);
    doc
      .circle(
        doc.page.width - borderMargin - circleRadius,
        borderMargin + circleRadius,
        circleRadius,
      )
      .fill(circleColor);
    doc
      .circle(
        borderMargin + circleRadius,
        doc.page.height - borderMargin - circleRadius,
        circleRadius,
      )
      .fill(circleColor);
    doc
      .circle(
        doc.page.width - borderMargin - circleRadius,
        doc.page.height - borderMargin - circleRadius,
        circleRadius,
      )
      .fill(circleColor);

    // Заголовок сертификата с имитацией тени
    const headerText = 'СЕРТИФИКАТ';
    // Рисуем тень
    doc
      .fontSize(48)
      .fillColor('rgba(0, 0, 0, 0.2)')
      .text(headerText, 2, 102, { align: 'center' });
    // Собственно текст
    doc
      .fontSize(48)
      .fillColor('#8A2BE2')
      .text(headerText, 0, 100, { align: 'center' });
    doc.moveDown(2);

    // Основной текст сертификата
    doc
      .fontSize(24)
      .fillColor('#00008B')
      .text('Выдано удостоверение о прохождении курса', { align: 'center' });
    doc.moveDown(1);

    // Вывод email участника
    doc
      .fontSize(28)
      .fillColor('#B22222')
      .text(data.fullname, { align: 'center' });
    doc.moveDown(0.5);

    // Название курса с акцентом
    doc
      .fontSize(32)
      .fillColor('#2E8B57')
      .text(`Курс: ${data.courseName}`, { align: 'center' });
    doc.moveDown(1);

    // Дата завершения курса
    doc
      .fontSize(18)
      .fillColor('#000000')
      .text(
        `Дата прохождения: ${data.completionDate.toLocaleDateString('ru-RU')}`,
        { align: 'center' },
      );
    doc.moveDown(2);

    // Мотивирующая фраза или дополнительное сообщение
    doc
      .fontSize(16)
      .fillColor('#4B0082')
      .text('Пусть знания освещают ваш путь!', {
        align: 'center',
        oblique: true,
      });

    doc.save();
    doc.restore();

    // Завершаем документ
    doc.end();
  }
}
