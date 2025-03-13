import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument } from './schemas/claim.schema';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<ClaimDocument>) {}

  async getAllClaims(): Promise<Claim[]> {
    return this.claimModel.find().exec();
  }

  async getClaimById(id: string): Promise<Claim> {
    const claim = await this.claimModel.findById(id).exec();
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    return claim;
  }

  async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
    const newClaim = new this.claimModel(createClaimDto);
    return newClaim.save();
  }

  async updateClaim(id: string, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    const updatedClaim = await this.claimModel.findByIdAndUpdate(id, updateClaimDto, { new: true }).exec();
    if (!updatedClaim) {
      throw new NotFoundException('Claim not found');
    }
    return updatedClaim;
  }

  async deleteClaim(id: string): Promise<{ message: string }> {
    const claim = await this.claimModel.findById(id).exec();
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    await this.claimModel.findByIdAndDelete(id).exec();
    return { message: 'Claim deleted successfully' };
  }
}
