import { ApiProperty } from "@nestjs/swagger";

export class PartnerDto { 
    @ApiProperty()
    Company: string; 
    
    @ApiProperty()
    Slogan: string; 
    
    @ApiProperty()
    PhotoURL: string; 
    
    @ApiProperty()
    Description: string; 
    
    @ApiProperty()
    PhoneNumber: string; 
    
    @ApiProperty()
    Email: string; 
    
    @ApiProperty()
    Address: string; 
    
    @ApiProperty()
    MapsURL: string; 
    
    @ApiProperty()
    JsonData: string;
}