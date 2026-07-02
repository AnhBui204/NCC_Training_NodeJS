import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@/entities/schemas/users.schema';
import { DatabaseService } from '@/db/database.service';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

describe('UsersService', () => {
  let service: UsersService;
  let model: any;

  const mockUserModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }

  const mockDatabaseService = {
    findAll: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel
        },
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name))
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getUserById
  describe('getUserById', () => {
    it('nên trả về thông tin user khi tìm thấy ID',
      async () => {
        const mockUser =
        {
          _id: '64a1b2c3d4e5f6',
          name: 'Nguyen Van A',
          email: 'test123@gmail.com'
        }
        mockUserModel.findById.mockResolvedValue(mockUser as any)
        const result = await service.getUserById('64a1b2c3d4e5f6')
        expect(mockUserModel.findById).toHaveBeenCalledWith('64a1b2c3d4e5f6')
        expect(result).toEqual(mockUser)
      }
    )
  })

  // create
  describe('createUser', () => {
    it('nên ném ra lỗi ConflictException nếu email đã tồn tại', async () => {

      const createDto = { email: 'exist@gmail.com', password: '123', name: 'A', age: 20 };
      mockUserModel.findOne.mockResolvedValue({ email: 'exist@gmail.com' });

      await expect(service.createUser(createDto)).rejects.toThrow(ConflictException);
      expect(mockUserModel.create).not.toHaveBeenCalled();
    });
    it('nên tạo mới user thành công nếu email chưa tồn tại',
      async () => {
        const createDto = {
          email: 'testNew@gmail.com',
          password: '123456',
          name: 'New A',
          age: 20,
        }
        const createdUser = { ...createDto, _id: '123', role: 'USER' }

        mockUserModel.findOne.mockResolvedValue(null)
        mockUserModel.create.mockResolvedValue(createdUser as any)
        const result = await service.createUser(createDto)

        expect(mockUserModel.findOne).toHaveBeenCalledWith({
          email: 'testNew@gmail.com'
        })
        expect(mockUserModel.create).toHaveBeenCalled()
        expect(result).toEqual(createdUser)
      });
  });
});
