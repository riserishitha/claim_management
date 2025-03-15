import {IsEnum, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClaimDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => Number(value))
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
  @IsMongoId()
  patientId: string;

  @IsOptional()
  @IsString()
  insurerComments?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}
