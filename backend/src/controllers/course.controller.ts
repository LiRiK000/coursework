import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CustomError } from '../shared/errors/CustomError';

class CourseController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    const authorId = req.user.id;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        authorId,
      },
    });

    res.status(201).json(course);
  }

  async getAll(req: Request, res: Response) {
    const courses = await prisma.course.findMany({
      include: {
        sections: true,
        author: {
          select: {
            id: true,
            email: true,
            fullname: true,
          },
        },
      },
    });

    res.json(courses);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        sections: true,
        author: {
          select: {
            id: true,
            email: true,
            fullname: true,
          },
        },
      },
    });

    if (!course) {
      throw new CustomError('Курс не найден', 404);
    }

    res.json(course);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new CustomError('Курс не найден', 404);
    }

    if (course.authorId !== req.user.id) {
      throw new CustomError('Нет прав для редактирования этого курса', 403);
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    res.json(updatedCourse);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new CustomError('Курс не найден', 404);
    }

    if (course.authorId !== req.user.id) {
      throw new CustomError('Нет прав для удаления этого курса', 403);
    }

    await prisma.course.delete({
      where: { id },
    });

    res.status(204).send();
  }
}

export const courseController = new CourseController();
