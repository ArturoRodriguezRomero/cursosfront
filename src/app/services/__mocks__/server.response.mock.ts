import { Course } from '../../models/Course';
import { Teacher } from '../../models/Teacher';
import { Subject } from '../../models/Subject';
import { ServerResponse } from '../../models/ServerResponse';

export namespace ServerResponseMocks {
  export const COURSES_MOCK: Course[] = [
    {
      id: 1,
      name: 'Metodologías ágiles',
      active: true,
      level: 'ELEMENTARY',
      teacher: {
        id: 1,
        name: 'Roberto Canales'
      }
    },
    {
      id: 2,
      name: 'Backup y Restore en GitLab',
      active: true,
      level: 'ELEMENTARY',
      teacher: {
        id: 2,
        name: 'Rubén Aguilera Díaz-Heredero'
      }
    },
    {
      id: 3,
      name: 'Instalación de GitLab con HTTPS',
      active: true,
      level: 'ELEMENTARY',
      teacher: {
        id: 2,
        name: 'Rubén Aguilera Díaz-Heredero'
      }
    },
    {
      id: 4,
      name: 'Kubernetes en AWS con Kops',
      active: true,
      level: 'ELEMENTARY',
      teacher: {
        id: 2,
        name: 'Rubén Aguilera Díaz-Heredero'
      }
    }
  ];

  export const COURSE_MOCK: Course = {
    id: 1,
    name: 'Metodologías ágiles',
    active: true,
    level: 'ELEMENTARY',
    teacher: {
      id: 1,
      name: 'Roberto Canales'
    }
  };

  export const TEACHERS_MOCK: Teacher[] = [
    {
      id: 1,
      name: 'Roberto Canales'
    },
    {
      id: 2,
      name: 'Rubén Aguilera Díaz-Heredero'
    }
  ];

  export const TEACHER_MOCK: Teacher = {
    id: 1,
    name: 'Roberto Canales'
  };

  export const SUBJECTS_MOCK: Subject[] = [
    {
      id: 1,
      name: 'Scrum',
      course: {
        id: 1,
        name: 'Metodologías ágiles',
        active: true,
        level: 'ELEMENTARY',
        teacher: {
          id: 1,
          name: 'Roberto Canales'
        }
      }
    },
    {
      id: 2,
      name: 'Kanban',
      course: {
        id: 1,
        name: 'Metodologías ágiles',
        active: true,
        level: 'ELEMENTARY',
        teacher: {
          id: 1,
          name: 'Roberto Canales'
        }
      }
    },
    {
      id: 3,
      name: 'Historias de usuario',
      course: {
        id: 1,
        name: 'Metodologías ágiles',
        active: true,
        level: 'ELEMENTARY',
        teacher: {
          id: 1,
          name: 'Roberto Canales'
        }
      }
    }
  ];

  export const SUBJECT_MOCK: Subject = {
    id: 1,
    name: 'Scrum',
    course: {
      id: 1,
      name: 'Metodologías ágiles',
      active: true,
      level: 'ELEMENTARY',
      teacher: {
        id: 1,
        name: 'Roberto Canales'
      }
    }
  };

  export const TEACHERS_RESPONSE: ServerResponse = {
    content: [
      {
        id: 1,
        name: 'Roberto Canales'
      },
      {
        id: 2,
        name: 'Rubén Aguilera Díaz-Heredero'
      }
    ],
    pageable: {
      sort: {
        sorted: false,
        unsorted: true
      },
      offset: 0,
      pageSize: 20,
      pageNumber: 0,
      paged: true,
      unpaged: false
    },
    last: true,
    totalPages: 1,
    totalElements: 2,
    size: 20,
    number: 0,
    numberOfElements: 2,
    first: true,
    sort: {
      sorted: false,
      unsorted: true
    }
  };
}
