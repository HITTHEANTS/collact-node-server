import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as short from 'short-uuid';

@Injectable()
export class AwsService {
  private readonly s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
    this.s3 = new AWS.S3();
  }

  async upload(file: Express.Multer.File, imgPath: string): Promise<string> {
    const filename = `${imgPath}/${short.generate()}-${file.originalname}`;
    const uploadParams = {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: filename,
      Body: file.buffer,
    };

    await this.s3.upload(uploadParams).promise();
    return filename;
  }
}
