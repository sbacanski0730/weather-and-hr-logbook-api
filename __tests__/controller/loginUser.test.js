import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app.js';
import UserModel from '../../models/userModel.js';

beforeAll(async () => {
  const testUser = await UserModel.findOne({ email: 'test-login@gmail.com' });
  if (!testUser) {
    await UserModel.create({
      email: 'test-login@gmail.com',
      password: await bcrypt.hash('test123', 5),
    });
    await UserModel.findOneAndUpdate({ email: 'test-login@gmail.com' }, { verified: true });
  }
});

afterAll(async () => {
  const testUser = await UserModel.findOne({ email: 'test-login@gmail.com' });
  if (testUser) {
    await UserModel.findByIdAndDelete({ _id: testUser._id });
  }
});

describe('Testing user login logic - loginUser controller', () => {
  it('Check proper user login', () => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'test-login@gmail.com',
        password: 'test123',
      })
      .expect(202);
  });

  //   ========================
  it("Validation - Check error message for user which doesn't exist", async () => {
    const wrongUser = await UserModel.findOne({ email: 'example_wrong_user@gmail.com' });
    if (wrongUser) {
      await UserModel.findByIdAndDelete({ _id: wrongUser._id });
    }

    const res = await request(app).post('/auth/login').send({
      email: 'example_wrong_user@gmail.com',
      password: '123456',
    });
    const { status } = res.error;
    const { message } = JSON.parse(res.error.text);
    expect(status).toBe(400);
    expect(message).toBe("This user doesn't exist");
  });

  //   ========================
  it('Validation - Checks information after login with wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test-login@gmail.com', password: 'wrongPassword' });

    const { status } = res.error;
    const { message } = JSON.parse(res.error.text);
    expect(status).toBe(400);
    expect(message).toBe('Wrong credentials');
  });
});
