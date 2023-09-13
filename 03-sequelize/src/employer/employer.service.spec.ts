import { Test, TestingModule } from '@nestjs/testing';
import { EmployerService } from './employer.service';

describe('EmployerService', () => {
  let service: EmployerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployerService],
    }).compile();

    service = module.get<EmployerService>(EmployerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
