// import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
// import { AppService } from './app.service';
// import { Claim } from './schemas/claim.schema';
// import { CreateClaimDto } from './dto/create-claim.dto';
// import { UpdateClaimDto } from './dto/update-claim.dto';

// @Controller('claims')
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   async getAllClaims(): Promise<Claim[]> {
//     return this.appService.getAllClaims();
//   }

//   @Post()
//   async createClaim(@Body() createClaimDto: CreateClaimDto): Promise<Claim> {
//     return this.appService.createClaim(createClaimDto);
//   }

//   @Put(':id')
//   async updateClaim(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto): Promise<Claim> {
//     return this.appService.updateClaim(id, updateClaimDto);
//   }
// }

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Claim } from './schemas/claim.schema';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Controller('claims')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllClaims(): Promise<Claim[]> {
    return this.appService.getAllClaims();
  }

  @Get(':id')
  async getClaimById(@Param('id') id: string): Promise<Claim> {
    return this.appService.getClaimById(id);
  }

  @Post()
  async createClaim(@Body() createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.appService.createClaim(createClaimDto);
  }

  @Put(':id')
  async updateClaim(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto): Promise<Claim> {
    return this.appService.updateClaim(id, updateClaimDto);
  }

  @Delete(':id')
  async deleteClaim(@Param('id') id: string): Promise<{ message: string }> {
    return this.appService.deleteClaim(id);
  }
}
