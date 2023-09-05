import { IsNotEmpty, Length } from '@nestjs/class-validator';
import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type AdministrationDocument = Administration & Document;

@Schema({
  strict: true,
  timestamps: { createdAt: true, updatedAt: true },
  collection: 'AdministrationData',
})
export class Administration {
  @Prop({ required: true })
  onAccountOf: string;

  @Prop({ required: false })
  recordType: string;

  @Prop({ required: false, type: Object })
  nationalHolidays: any;

  //   @Prop({ required: true })
  //   accessPermissions: {
  //     type: [
  //     {
  //         permissions: [
  //           {
  //             Category: { type: String, required: true },
  //             permissions: { type: [], required: true },
  //           },
  //         ],
  //         role: { type: String, required: true },
  //       },
  //     ],
  //       required: false,
  // },

  // @Prop({ required: false })
  //   appUpdates: {
  //     type: [
  //       {
  //         _id: { type: String, required: true },
  //         version: { type: String, required: true },
  //         link: { type: String, required: true },
  //       },
  //     ],
  //       required: false,
  //     }

  // @Prop({ required: false })
  // maintenance: {
  //   type: {
  //     _id: false,
  //       message: { type: String, required: true },
  //     startingTime: { type: String, required: true },
  //     endingTime: { type: String, required: true },
  //     underMaintenance: { type: Boolean, required: true },
  //     title: { type: String, required: true },
  //   },
  //   required: false,
  // }

  @Prop({ required: false })
  annualLeaves: string;

  @Prop({ required: false })
  sickLeaves: string;

  @Prop({ required: false })
  casualLeaves: string;

  // @Prop({ required: false })
  //   annualLeavesColor: {
  //     type: {
  //       color: { type: String, required: true },
  //       text: { type: String, required: true },
  //     },
  //     required: false,
  //   }

  // @Prop({ required: false })
  //   casualLeavesColor: {
  //     type: {
  //       color: { type: String, required: true },
  //       text: { type: String, required: true },
  //     },
  //     required: false,
  //   }

  // @Prop({ required: false })
  //   sickLeavesColor: {
  //     type: {
  //       color: { type: String, required: true },
  //       text: { type: String, required: true },
  //     },
  //     required: false,
  //   }

  // @Prop({ required: false })
  // offLeavesColor: {
  //   type: {
  //     color: { type: String, required: true },
  //     text: { type: String, required: true },
  //   },
  //   required: false,
  //   }

  // @Prop({ required: false })
  // absentLeavesColor: {
  //   type: {
  //     color: { type: String, required: true },
  //     text: { type: String, required: true },
  //   },
  //   required: false,
  //   }

  // @Prop({ required: false })
  // defaultLeavesColor: {
  //   type: {
  //     color: { type: String, required: true },
  //     text: { type: String, required: true },
  //   },
  //   required: false,
  // }

  // @Prop({ required: false })
  // holidayLeavesColor: {
  //   type: {
  //     color: { type: String, required: true },
  //     text: { type: String, required: true },
  //   },
  //   required: false,
  //   }

  // @Prop({ required: false })
  // helpCenterLogin: {
  //   type: [
  //     {
  //       key: { type: Number, required: true },
  //       label: { type: String, required: true },
  //       value: { type: String, required: true },
  //       show: { type: String, required: true },
  //       icon: { type: String, required: true },
  //       subQuestion: [
  //         {
  //           label: { type: String, required: true },
  //           value: { type: String, required: true },
  //           answer: { type: String, required: true },
  //           form: { type: String, required: true },
  //           empcode: { type: String, required: true },
  //           phone: { type: String, required: true },
  //           description: { type: String, required: true },
  //           attachment: { type: String, required: true },
  //           furtherSubQuestion: [
  //             {
  //               label: { type: String, required: false },
  //               value: { type: String, required: false },
  //               answer: { type: String, required: false },
  //               form: { type: String, required: false },
  //               empcode: { type: String, required: false },
  //               phone: { type: String, required: false },
  //               description: { type: String, required: false },
  //               attachment: { type: String, required: false },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //     required: false,
  // }

  // @Prop({ required: false })
  // helpCenterHome: [
  //   {
  //     key: { type: Number, required: true },
  //     label: { type: String, required: true },
  //     value: { type: String, required: true },
  //     show: { type: String, required: true },
  //     icon: { type: String, required: true },
  //     subQuestion: [
  //       {
  //         label: { type: String, required: true },
  //         value: { type: String, required: true },
  //         answer: { type: String, required: true },
  //         form: { type: String, required: true },
  //         empcode: { type: String, required: true },
  //         phone: { type: String, required: true },
  //         description: { type: String, required: true },
  //         attachment: { type: String, required: true },
  //         furtherSubQuestion: [
  //           {
  //             label: { type: String, required: false },
  //             value: { type: String, required: false },
  //             answer: { type: String, required: false },
  //             form: { type: String, required: false },
  //             empcode: { type: String, required: false },
  //             phone: { type: String, required: false },
  //             description: { type: String, required: false },
  //             attachment: { type: String, required: false },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]

  // @Prop({ required: false })
  //   pointsGuideline: {
  //   type: [
  //     {
  //       _id: { type: String, required: true },
  //       Title: { type: String, required: true },
  //       decription: { type: String, required: true },
  //       point: { type: String, required: true },
  //       textcolor: { type: String, required: true },
  //       color: { type: String, required: true },
  //     },
  //   ],
  //     required: false,
  //   }

  @Prop({ required: true, type: Object })
  hadith: any;

  // @Prop({ required: false })
  // schedule: {
  //   type: [
  //     {
  //       code: { type: String, required: true },
  //       title: { type: String, required: true },
  //       schedule: { type: {}, required: true },
  //       settings: { type: {}, required: true },
  //     },
  //   ],
  //     required: false,
  //   }

  // @Prop({ required: false })
  // color: {
  //   type: {
  //     morning: { type: String, required: true },
  //     evening: { type: String, required: true },
  //     night: { type: String, required: true },
  //     holidays: { type: String, required: true },
  //     off: { type: String, required: true },
  //   },
  //   required: false,
  //   }

  // @Prop({ required: false })
  // messages: {
  //   type: [
  //     {
  //       _id: { type: String, required: true },
  //       type: { type: String, required: true },
  //       subType: { type: String, required: true },
  //       message: { type: String, required: true },
  //       imageUrl: { type: String, required: true },
  //     },
  //   ],
  //     required: false,
  // }

  // @Prop({ required: false })
  // resetPassword: {
  //   type: [
  //     {
  //       empCode: { type: String, required: true },
  //       resetString: { type: String, required: true },
  //       createdAt: { type: String, required: true },
  //       expireAt: { type: String, required: true },
  //     },
  //   ],
  //     required: false,
  //   }
}

export const AdministrationSchema =
  SchemaFactory.createForClass(Administration);
