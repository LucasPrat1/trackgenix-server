import request from 'supertest';
import Projects from '../models/Projects';
import projectSeed from '../seeds/projects';
import app from '../app';

beforeAll(async () => {
  await Projects.collection.insertMany(projectSeed);
});
let projectId;
describe('Test GET /projects', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });
  test('Response should return error false', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBeFalsy();
  });
  test('Response should return at least one employee', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Response should return message Project found', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.message).toBe('Project found');
  });
});

describe('Test POST /projects', () => {
  test('Project should be created', async () => {
    const response = await request(app).post('/projects').send({
      project_name: 'The Little Prince',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: true,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });
});

describe('Test PUT ', () => {
  test('project should be updated', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(200);
  });

  test('response should return error false', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.error).toBeFalsy();
  });

  test('Response should return message Project has been successfully updated', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.body.message).toBe('Project has been successfully updated');
  });

  test('project name should be require', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(400);
  });

  test('A valid start date should be required', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: 'shbdnfmn',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(400);
  });

  test('Employee id should be required', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(400);
  });

  test('Employee rate should be required', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(400);
  });

  test('Active should be a boolean', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: 'pepito',
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(400);
  });

  test('Project name should not be longer tha 50 characters', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'gjbaofvbsubksnbipksdnbvoidbn iokdmnbi prnbk mntntmnlgmnlglmmy,',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(400);
  });

  test('Client should not be longer tha 50 characters', async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry pjkvbjbviownsbinenidbryknfbiopeabiohd{obhitn',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(400);
  });

  test('Project should not be found', async () => {
    const projectIdWrong = 'p6283baefcd44998f831522aa';
    const response = await request(app).put(`/projects/${projectIdWrong}`).send({
      project_name: 'The Little pepe',
      start_date: '1943-01-06T03:00:00.000Z',
      finish_date: '1943-04-06T03:00:00.000Z',
      client: 'Antoine de Saint-Exupéry',
      active: false,
      employees: [
        {
          role: 'DEV',
          rate: '10',
          id: 12,
        },
      ],
      admin_id: '43',
    });

    expect(response.status).toBe(404);
  });
});
