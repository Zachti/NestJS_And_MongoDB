import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ required: false })
  receiveNotifications?: boolean;

  @Prop({ required: false })
  receiveSms?: boolean;

  @Prop({ required: false })
  receiveEmails?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
