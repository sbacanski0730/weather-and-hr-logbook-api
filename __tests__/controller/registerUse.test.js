import request from 'supertest';
import app from '../../app.js';
import UserModel from '../../models/userModel.js';

beforeEach(async () => {
  const user = await UserModel.findOne({ email: 'test-register@gmail.com' });
  if (user) await UserModel.findByIdAndDelete({ _id: user._id });
});

describe('Testing user registration logic - registerUser controller', () => {
  it('Checks proper response status after success', async () => {
    await request(app)
      .post('/auth/register')
      .send({ email: 'test-register@gmail.com', password: 'test123' })
      .expect(201);
  });

  //   =====================================================

  it('Validation - Checks error after invalid email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test-gmail.com', password: '123456' });
    const error = JSON.parse(res.error.text);
    expect(res.error.status).toBe(409);
    expect(error.message).toBe('User validation failed: email: Please enter a valid email');
  });

  //   ========================
  it('Validation - Checks error after invalid password', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test-register@gmail.com', password: '123' });
    expect(res.error.status).toBe(409);
    expect(JSON.parse(res.error.text).message).toBe('Password must be at least 5 characters long');
  });
});
