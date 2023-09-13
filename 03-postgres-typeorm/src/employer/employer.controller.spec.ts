import { Test, TestingModule } from '@nestjs/testing';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';

describe('EmployerController', () => {
  let controller: EmployerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployerController],
      providers: [EmployerService],
    }).compile();

    controller = module.get<EmployerController>(EmployerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
