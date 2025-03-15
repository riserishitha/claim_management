import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, IsEmail } from 'class-validator';

export class UpdateClaimDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  claimAmount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['Pending', 'Approved', 'Rejected'])
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  approvedAmount?: number;

  @IsOptional()
  @IsString()
  insurerComments?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}
