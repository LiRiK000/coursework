import { REQUEST_STATUS, USER_ROLES } from '@prisma/client';
import { prisma } from '../lib/prisma';

export const authorshipRequestService = {
  async create(userId: string) {
    return prisma.authorshipRequest.create({
      data: {
        userId,
      },
      include: {
        user: true,
      },
    });
  },

  async getAll() {
    return prisma.authorshipRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async updateStatus(id: string, status: REQUEST_STATUS) {
    const request = await prisma.authorshipRequest.update({
      where: { id },
      data: { status },
    });

    if (status === REQUEST_STATUS.APPROVED) {
      await prisma.user.update({
        where: { id: request.userId },
        data: { role: USER_ROLES.AUTHOR },
      });
    }

    await prisma.authorshipRequest.delete({
      where: { id },
    });

    return request;
  },
  async userRequest(userId: string) {
    const request = await prisma.authorshipRequest.findFirst({
      where: { userId },
    });

    return request;
  },
};
