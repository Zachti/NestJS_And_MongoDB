import { IsBoolean, IsOptional } from 'class-validator';

export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveSms?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;
}
