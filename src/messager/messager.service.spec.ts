import { Test, TestingModule } from '@nestjs/testing';
import { MessagerService } from './messager.service';

describe('MessagerService', () => {
  let service: MessagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagerService],
    }).compile();

    service = module.get<MessagerService>(MessagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
