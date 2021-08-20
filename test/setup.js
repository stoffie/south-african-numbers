import supertest from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import app from '../src/app';

chai.use(sinonChai);
chai.config.truncateThreshold = 0;
export const { expect } = chai;
export const server = supertest.agent(app);