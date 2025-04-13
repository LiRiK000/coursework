export { USER_ROLES } from './types';
export type { UserProfile } from './types';

import { UserService } from './UserService';

export const userService = new UserService();
