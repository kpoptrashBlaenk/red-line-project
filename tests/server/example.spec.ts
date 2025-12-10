import app from '#/app'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('API Tests', () => {
  it('GET /api/test which doesnt exist', async () => {
    const res = await request(app).get('/')
    console.log(res.body)
    expect(res.body).toStrictEqual({ answer: 'Hello from Express!' })
  })
})
