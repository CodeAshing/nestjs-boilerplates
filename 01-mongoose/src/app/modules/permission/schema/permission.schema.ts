import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type PermissionDocument = Permission & Document;

class SecondTierPermissions extends Document {
  @Prop({ required: true })
  permissionTitle: string;

  @Prop({ required: true })
  permissionSlug: string;

  @Prop({ required: true })
  canView: boolean;

  @Prop({ required: true })
  canCreate: boolean;

  @Prop({ required: true, type: Boolean })
  canUpdate: boolean;

  @Prop({ required: true })
  canDelete: boolean;
}

class AlertPermissions extends Document {
  @Prop({ required: true })
  token: boolean;
  @Prop({ required: true })
  booking: boolean;
  @Prop({ required: true })
  confirmation: boolean;
  @Prop({ required: true })
  downPayment: boolean;
  @Prop({ required: true })
  installment: boolean;
  @Prop({ required: true })
  hold: boolean;
  @Prop({ required: true })
  unHold: boolean;
  @Prop({ required: true })
  sale: boolean;
  @Prop({ required: true })
  saleCancel: boolean;
}

class AccessPermission extends Document {
  @Prop({ required: true })
  index: string;

  @Prop({ required: true })
  category: boolean;

  @Prop({ required: true })
  permissions: SecondTierPermissions[];
}

class AccessModules extends Document {
  @Prop({ required: true })
  index: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  access: boolean;
}

class FirstTierPermissions extends Document {
  @Prop({ required: true })
  canAccessDashboard: true;

  @Prop({ required: true })
  alertPermissions: AlertPermissions;

  @Prop({ required: true })
  accessModules: AccessModules[];

  @Prop({ required: true })
  accessPermission: AccessPermission[];
}

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'permissions',
})
export class Permission {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  permissions: FirstTierPermissions;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
