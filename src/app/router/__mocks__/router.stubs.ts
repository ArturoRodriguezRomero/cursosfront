import { of } from 'rxjs';

export const routeStub = {
  params: of({ courseId: 1 }),
  queryParams: of({ name: 'test', page: 1 })
};
