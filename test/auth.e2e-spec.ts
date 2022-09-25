import { Test, TestingModule } from '@nestjs/testing';
import {RegisterDto} from "../src/api/auth/dto/register.dto";
import {LoginDto} from "../src/api/auth/dto/login.dto";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";

const email = `${Date.now()}@mail.ru`;

const regData: RegisterDto = {
    email,
    nickname: `tester-${Date.now()}`,
    password: "tester123"
};

const loginData: LoginDto = {
    email,
    password: "tester123"
};

describe('Auth Controller (unit)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it("should be defined", () => {
        expect(app).toBeDefined();
    });

    it("/auth/register (POST)", (done) => {
        let regId: number;

        request(app.getHttpServer())
          .post("/auth/register")
          .send(regData)
          .expect(201)
          .then(({ body }: request.Response) => {
              regId = body.data.id;
              expect(regId).toBeDefined();
              done();
        });
    });

    it("/auth/login (POST)", (done) => {
        let uId: number;

        request(app.getHttpServer())
          .post("/auth/login")
          .send(loginData)
          .expect(200)
          .then(({ body }: request.Response) => {
              uId = body.data.id;
              expect(uId).toBeDefined();
              done();
        });
    });
});