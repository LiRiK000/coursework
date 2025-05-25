import { Request, Response, NextFunction } from 'express';
import { CreateCourseDto, CourseBlock } from '../types/course.types';
import { ApiError } from '../lib/ApiError';
import { CourseService } from '../services/course.service';
import path from 'path';

class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const courseData: CreateCourseDto = req.body;
      const userId = req.user?.id;

      if (!userId) {
        throw ApiError.Unauthorized();
      }

      const fullCoverImagePath = files?.coverImage?.[0]?.path;
      const coverImagePath = fullCoverImagePath
        ? '/uploads/' +
          path.relative(
            path.join(__dirname, '../../uploads'),
            fullCoverImagePath,
          )
        : undefined;

      const blocks = courseData.blocks?.map(
        (block: CourseBlock, index: number) => {
          const fullTheoreticalMaterialPath =
            files?.[`theoreticalMaterial_${index}`]?.[0]?.path;

          const theoreticalMaterialPath = fullTheoreticalMaterialPath
            ? '/uploads/' +
              path.relative(
                path.join(__dirname, '../../uploads'),
                fullTheoreticalMaterialPath,
              )
            : undefined;

          return {
            ...block,
            theoreticalMaterialPath,
          };
        },
      );

      const course = await this.courseService.createCourse(
        {
          ...courseData,
          coverImagePath,
          blocks,
        },
        userId,
      );
      res.status(201).json({ course });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query;
      const courses = await this.courseService.getAllCourses(search as string);
      res.json({ courses, total: courses.length });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await this.courseService.getCourseById(id);

      if (!course) {
        throw ApiError.NotFound('Курс не найден');
      }

      res.json({ course });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        throw ApiError.Unauthorized();
      }

      await this.courseService.deleteCourse(id, userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        throw ApiError.Unauthorized();
      }

      const courses = await this.courseService.getFavoriteCourses(userId);
      res.json({ courses, total: courses.length });
    } catch (error) {
      next(error);
    }
  };

  addToFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        throw ApiError.Unauthorized();
      }

      await this.courseService.addToFavorites(id, userId);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  removeFromFavorites = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        throw ApiError.Unauthorized();
      }

      await this.courseService.removeFromFavorites(id, userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export const courseController = new CourseController();
