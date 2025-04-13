import { Request, Response } from 'express';
import { authorshipRequestService } from '../services/authorshipRequest.service';

export const authorshipRequestController = {
  async create(req: Request, res: Response) {
    try {
      const { id } = req.user;
      const request = await authorshipRequestService.create(id);
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании заявки' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const requests = await authorshipRequestService.getAll();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении заявок' });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const request = await authorshipRequestService.updateStatus(id, status);
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении статуса заявки' });
    }
  },
  async userRequest(req: Request, res: Response) {
    try {
      const { id } = req.user;
      const request = await authorshipRequestService.userRequest(id);
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении статуса заявки' });
    }
  },
};
