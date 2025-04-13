export interface AuthorshipRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface ProcessRequestData {
  id: string;
  status: 'APPROVED' | 'REJECTED';
}
