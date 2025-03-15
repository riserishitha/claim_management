import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  UsePipes, 
  ValidationPipe, 
  UseGuards, 
  Req, 
  Logger 
} from '@nestjs/common';
import { AppService } from './app.service';
import { Claim } from './schemas/claim.schema';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './protector/rolebased.protector';
import { Roles } from './decorator/rolebased.decorator';

@Controller('claims')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('insurer')
  async getAllClaims(@Req() req): Promise<Claim[]> {
    this.logger.log(`🔍 User Role: ${req.user?.role}`);
    return this.appService.getAllClaims();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('patient', 'insurer')
  async getClaimById(@Param('id') id: string, @Req() req): Promise<Claim> {
    this.logger.log(`🔍 User Role: ${req.user?.role}, Fetching Claim ID: ${id}`);
    return this.appService.getClaimById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('patient')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createClaim(@Body() createClaimDto: CreateClaimDto, @Req() req): Promise<Claim> {
    this.logger.log(`🔍 User Role: ${req.user?.role}, Creating Claim: ${JSON.stringify(createClaimDto)}`);
    return this.appService.createClaim(createClaimDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('insurer')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateClaim(
    @Param('id') id: string,
    @Body() updateClaimDto: UpdateClaimDto,
    @Req() req
  ): Promise<Claim> {
    this.logger.log(`🔍 User Role: ${req.user?.role}, Updating Claim ID: ${id}`);
    return this.appService.updateClaim(id, updateClaimDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('insurer')
  async deleteClaim(@Param('id') id: string, @Req() req): Promise<{ message: string }> {
    this.logger.log(`🔍 User Role: ${req.user?.role}, Deleting Claim ID: ${id}`);
    return this.appService.deleteClaim(id);
  }
}
