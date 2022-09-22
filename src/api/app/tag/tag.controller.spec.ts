import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import { ApiModule } from '@api/api.module';

const TestCreateDto = {
    name: "Test",
    sortOrder: 1
}

describe('Tags Controller (unit)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ApiModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (POST)', () => {
        return request(app.getHttpServer())
            .post('/api/tag')
            .send(TestCreateDto)
            .expect(201)
            .expect({
                name: TestCreateDto.name,
                sortOrder: TestCreateDto.sortOrder
            })
    })

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/tag/2')
            .expect(200)
            .expect({
                "creator": {
                    "nickname": "onemgvv",
                    "uid": "22c8b45a-4acd-4adb-bcca-5f47e65bcc92"
                },
                "name": "backend",
                "sortOrder": 1
            });
    });
});
