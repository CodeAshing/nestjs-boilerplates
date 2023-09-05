import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { connectionEnum } from 'src/app/common/enum';

import {
  Employers,
  EmployersDocument,
  DealerDocument,
  Dealer,
} from 'src/app/schema';
import { Type, TypeDocument } from '../type/schema';
import { Permission, PermissionDocument } from '../permission/schema';
import { responseEnum } from './enum';
import { Client, ClientDocument } from './schema';
import {
  CreateClientDTO,
  CreateNonEmployeeDTO,
  GetClientWithCNIC,
  GetDealerWithCnic,
  UpdateClientDTO,
  UpdateDealerDTO,
} from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Employers.name, connectionEnum.ERP)
    private readonly employeeModel: Model<EmployersDocument>,

    @InjectModel(Type.name, connectionEnum.ERP)
    private readonly typeModel: Model<TypeDocument>,

    @InjectModel(Client.name, connectionEnum.ERP)
    private readonly clientModel: Model<ClientDocument>,

    @InjectModel(Dealer.name, connectionEnum.ERP)
    private readonly dealerModel: Model<DealerDocument>,

    @InjectModel(Permission.name, connectionEnum.ERP)
    private readonly PermissionModel: Model<PermissionDocument>,

    @InjectConnection(connectionEnum.ERP)
    private readonly erp_connection: Connection,
  ) { }

  async createClient(body: CreateClientDTO): Promise<any> {
    const exists = await this.clientModel
      .exists({ CNIC: body.CNIC })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (exists)
      throw new InternalServerErrorException(responseEnum.USERS_ALREADY_EXISTS);

    const client = await this.clientModel.create(body).catch((e) => {
      throw new InternalServerErrorException(e);
    });
    return { client: client._id };
  }

  async createDealer(body: CreateNonEmployeeDTO): Promise<any> {
    const exists = await this.dealerModel
      .exists({ CNIC: body.CNIC })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (exists)
      throw new InternalServerErrorException(responseEnum.USERS_ALREADY_EXISTS);

    const dealer = await this.dealerModel.create(body).catch((e) => {
      throw new InternalServerErrorException(e);
    });
    return { dealer: dealer._id };
  }

  async updateDealer(body: UpdateDealerDTO): Promise<any> {
    const exists = await this.dealerModel.exists({ CNIC: body.CNIC });
    if (!exists) throw new NotFoundException(responseEnum.DEALER_NOT_FOUND);

    const dealer = await this.dealerModel
      .findOneAndReplace({ CNIC: body.CNIC }, body, { upsert: false })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (!dealer)
      throw new InternalServerErrorException(responseEnum.USER_UPDATE_FAILED);

    return;
  }

  async updateClient(body: UpdateClientDTO): Promise<any> {
    const exists = await this.clientModel.exists({ CNIC: body.CNIC });
    if (!exists) throw new NotFoundException(responseEnum.CLIENT_NOT_FOUND);

    const client = await this.clientModel
      .findOneAndReplace({ CNIC: body.CNIC }, body, { upsert: false })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });

    if (!client) throw new ConflictException(responseEnum.USER_UPDATE_FAILED);
    return;
  }

  async getDealerWithCnic({ CNIC }: GetDealerWithCnic): Promise<any> {
    const dealer = await this.dealerModel.findOne({ CNIC: CNIC }).catch((e) => {
      throw new InternalServerErrorException(e);
    });
    if (!dealer) throw new NotFoundException(responseEnum.CLIENT_NOT_FOUND);

    if (
      dealer?.additionalInformation?.length === 0 ||
      dealer?.additionalInformation === undefined
    ) {
      const dealerObj: any = {
        _id: dealer._id,
      };

      if (dealer?.state) dealerObj.state = dealer.state;
      if (dealer?.active) dealerObj.active = dealer.active;
      if (dealer?.city) dealerObj.city = dealer.city;
      if (dealer?.phone) dealerObj.phone = dealer.phone;
      if (dealer?.country) dealerObj.country = dealer.country;
      if (dealer?.address) dealerObj.address = dealer.address;
      if (dealer?.leadSource) dealerObj.leadSource = dealer.leadSource;
      if (dealer?.agency) dealerObj.agency = dealer.agency;
      if (dealer?.email) dealerObj.email = dealer.email;
      if (dealer?.name) dealerObj.name = dealer.name;
      if (dealer?.CNIC) dealerObj.CNIC = dealer.CNIC;
      return dealerObj;
    }

    return dealer;
  }

  async getAllDealers(): Promise<any> {
    const dealers = await this.dealerModel.find();

    if (!dealers.length)
      throw new NotFoundException(responseEnum.DEALER_NOT_FOUND);

    return dealers.map((dealer) => {
      if (
        dealer?.additionalInformation?.length === 0 ||
        dealer?.additionalInformation === undefined
      ) {
        const dealerObj: any = {
          _id: dealer._id,
        };

        if (dealer?.state) dealerObj.state = dealer.state;
        if (dealer?.active) dealerObj.active = dealer.active;
        if (dealer?.city) dealerObj.city = dealer.city;
        if (dealer?.phone) dealerObj.phone = dealer.phone;
        if (dealer?.country) dealerObj.country = dealer.country;
        if (dealer?.address) dealerObj.address = dealer.address;
        if (dealer?.leadSource) dealerObj.leadSource = dealer.leadSource;
        if (dealer?.agency) dealerObj.agency = dealer.agency;
        if (dealer?.email) dealerObj.email = dealer.email;
        if (dealer?.name) dealerObj.name = dealer.name;
        if (dealer?.CNIC) dealerObj.CNIC = dealer.CNIC;
        return dealerObj;
      }
      return dealer;
    });
  }

  async getDealers(): Promise<any> {
    const dealers = await this.dealerModel.aggregate([
      {
        $match: { active: true },
      },
      {
        $group: {
          _id: {
            label: { $concat: ['$country', ' - ', '$city'] },
            countryCode: { $substr: ['$country', 0, 1] },
            cityCode: { $substr: ['$city', 0, 1] },
          },
          data: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          label: '$_id.label',
          value: {
            $concat: ['$_id.countryCode', '$_id.cityCode'],
          },
          items: {
            $map: {
              input: '$data',
              as: 'dealer',
              in: {
                label: '$$dealer._id',
                value: {
                  $concat: ['$$dealer.agency', ' - ', '$$dealer.name'],
                },
              },
            },
          },
          _id: 0,
        },
      },
    ]);
    if (!dealers.length)
      throw new NotFoundException(responseEnum.DEALER_NOT_FOUND);

    return dealers;
  }

  async getClientWithCnic({ CNIC }: GetClientWithCNIC): Promise<any> {
    const client = await this.clientModel.findOne({ CNIC }).catch((e) => {
      throw new InternalServerErrorException(e);
    });

    if (!client) throw new NotFoundException(responseEnum.CLIENT_NOT_FOUND);
    return client;
  }

  async getEmployees(): Promise<any> {
    const employees = await this.employeeModel.aggregate([
      {
        $lookup: {
          from: 'regions',
          localField: 'region',
          foreignField: '_id',
          as: 'region',
        },
      },
      {
        $unwind: '$region',
      },
      {
        $group: {
          _id: '$region.regionSlug',
          data: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          label: { $arrayElemAt: ['$data.region.regionSlug', 0] },
          value: { $arrayElemAt: ['$data.region.regionCode', 0] },
          items: {
            $map: {
              input: '$data',
              as: 'emp',
              in: {
                label: '$$emp._id',
                value: {
                  $concat: ['$$emp.name', ' - ', '$$emp.empCode'],
                },
              },
            },
          },
        },
      },
    ]);
    if (!employees.length)
      throw new NotFoundException(responseEnum.EMPLOYEE_NOT_FOUND);

    return employees;
  }

  async getDealerWithName(): Promise<any> {
    const dealer = await this.typeModel
      .findOne({ slug: 'agentDealer' }, { _id: 1 })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (!dealer)
      throw new InternalServerErrorException('Status(DEALER) not found');

    const dealers = await this.clientModel
      .find({ type: dealer._id }, { name: 1, phone: 1, cnic: 1, email: 1 })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (dealers?.length === 0) throw new NotFoundException('Dealers not found');

    return { dealers };
  }

  async getClients(): Promise<any> {
    const statusClient = await this.typeModel
      .findOne({ slug: 'client' }, { _id: 1 })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (!statusClient)
      throw new InternalServerErrorException('Status(Client) not found');

    const clients = await this.clientModel
      .find({ type: statusClient._id })
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
    if (clients?.length === 0) throw new NotFoundException('Clients not found');

    return { clients };
  }

  async getEmployeeProfile(userData: Employers): Promise<any> {
    const permissions = await this.PermissionModel.findOne({
      code: userData.role.erp,
    }).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });

    if (!permissions)
      throw new NotFoundException(responseEnum.PERMISSIONS_NOT_FOUND);

    userData['_doc']['permissions'] = permissions;

    return userData;
  }

  async clientProfile(user: any): Promise<any> {
    const client = {
      name: user.name,
      relation: user?.nextToKin[0]?.relation,
      mobile: user.phone,
      email: user.email,
      cnic: user.CNIC,
      country: user.country,
      state: user.state,
      city: user.city,
      address: user.address,
    };
    return client;
  }
}
