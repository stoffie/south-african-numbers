import supertest from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import {server} from '../src/app.js';

chai.use(sinonChai);
chai.config.truncateThreshold = 0;
export const { expect } = chai;
export const agent = supertest.agent(server);