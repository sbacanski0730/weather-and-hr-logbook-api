import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app';
import UserModel from '../../models/userModel.js';

describe('Test getUser logic - getUser controller', () => {
  beforeAll(async () => {
    const user = await UserModel.findOne({ email: 'test@gmail.com' });
    if (!user) {
      await UserModel.create({
        email: 'test-get-user@gmail.com',
        password: `${await bcrypt.hash('123456789', 5)}`,
      });
    }
  });

  afterAll(async () => {
    const testUser = await UserModel.findOne({ email: 'test-get-user@gmail.com' });
    if (testUser) {
      await UserModel.findByIdAndDelete({ _id: testUser._id });
    }
  });

  it('Checks proper user get', async () => {
    const { headers } = await request(app)
      .post('/auth/login')
      .send({ email: 'test-get-user@gmail.com', password: '123456789' });
    const res = await request(app).get('/user/get-user').set('token', headers.token);
    // console.log(headers.token);
    const { content } = JSON.parse(res.res.text);

    expect(content.email).toBe('test-get-user@gmail.com');
  });

  // ===================
  it('Validation - Check error after invalid token has been provided ', async () => {
    const res = await request(app)
      .get('/user/get-user')
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiIsImlhdCI6MTcwNDcxNTk4MH0.FhOHNHKVkc9_eenZCe5WyeJC6YBwjuZnUVNO2ztRz-U'
      );
    const { message } = JSON.parse(res.error.text);
    expect(res.error.status).toBe(401);
    expect(message).toBe('invalid signature');
  });

  // =================
  it('Validation - Check error after valid token but with wrong data has been provided ', async () => {
    const res = await request(app)
      .get('/user/get-user')
      .set(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWJlNmNjNDI5YzlkNTFlYzdhNDBhYSIsImlhdCI6MTcwNDcxNTk4MH0.ugnp8HHHHk6_N5ndr9KQ9zOhX6bTVYIxAJjXk1N_OhY'
      );
    const { message } = JSON.parse(res.error.text);
    expect(res.error.status).toBe(400);
    expect(message).toBe("This user doesn't exist");
  });
});
