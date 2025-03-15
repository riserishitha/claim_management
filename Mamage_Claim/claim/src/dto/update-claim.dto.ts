import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateClaimDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  claimAmount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsNumber()
  approvedAmount?: number;

  @IsOptional()
  @IsString()
  insurerComments?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}
