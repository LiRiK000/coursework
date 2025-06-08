import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CustomError } from '../shared/errors/CustomError';

export const sectionController = {
  async create(req: Request, res: Response) {
    const { courseId } = req.params;
    const { title, description, order } = req.body;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { author: true },
    });

    if (!course) throw new CustomError('Курс не найден', 404);
    if (course.author.id !== req.user.id)
      throw new CustomError('Нет прав доступа', 403);

    const [section] = await prisma.$transaction([
      prisma.section.create({
        data: {
          title,
          description,
          order: order || 0,
          courseId,
        },
      }),
      prisma.course.update({
        where: { id: courseId },
        data: { updatedAt: new Date() },
      }),
    ]);

    res.status(201).json(section);
  },

  async getAll(req: Request, res: Response) {
    const { courseId } = req.params;
    const sections = await prisma.section.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: { tasks: true },
    });
    res.json(sections);
  },

  async getById(req: Request, res: Response) {
    const section = await prisma.section.findUnique({
      where: { id: req.params.id },
      include: { tasks: true },
    });
    if (!section) throw new CustomError('Раздел не найден', 404);
    res.json(section);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, order } = req.body;

    const section = await prisma.section.findUnique({
      where: { id },
      include: { course: { include: { author: true } } },
    });

    if (!section) throw new CustomError('Раздел не найден', 404);
    if (section.course.author.id !== req.user.id)
      throw new CustomError('Нет прав доступа', 403);

    const updatedSection = await prisma.section.update({
      where: { id },
      data: { title, description, order },
    });

    res.json(updatedSection);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const section = await prisma.section.findUnique({
      where: { id },
      include: { course: { include: { author: true } } },
    });

    if (!section) throw new CustomError('Раздел не найден', 404);
    if (section.course.author.id !== req.user.id)
      throw new CustomError('Нет прав доступа', 403);

    await prisma.section.delete({ where: { id } });
    res.sendStatus(204);
  },
};
