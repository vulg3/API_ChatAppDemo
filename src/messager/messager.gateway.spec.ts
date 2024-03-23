import { Test, TestingModule } from '@nestjs/testing';
import { MessagerGateway } from './messager.gateway';

describe('MessagerGateway', () => {
  let gateway: MessagerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagerGateway],
    }).compile();

    gateway = module.get<MessagerGateway>(MessagerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
