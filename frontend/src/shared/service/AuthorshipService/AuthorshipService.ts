import { api } from '@/shared/api';
import { AuthorshipRequest, ProcessRequestData } from './types';

export class AuthorshipService {
  async createRequest() {
    const { data } = await api.post<AuthorshipRequest>('/authorship/request');
    return data;
  }

  async fetchRequests() {
    const { data } = await api.get<AuthorshipRequest[]>('/authorship/request');
    return data;
  }

  async processRequest({ id, status }: ProcessRequestData) {
    const { data } = await api.patch<AuthorshipRequest>(
      `/authorship/request/${id}`,
      {
        status,
      },
    );
    return data;
  }

  async getUserRequest() {
    const { data } = await api.get<AuthorshipRequest>('/authorship/request/me');
    return data;
  }
}
