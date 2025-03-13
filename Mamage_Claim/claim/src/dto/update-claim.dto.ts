import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateClaimDto {
  @IsEnum(['Pending', 'Approved', 'Rejected'])
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  approvedAmount?: number;

  @IsOptional()
  @IsString()
  insurerComments?: string;
}
