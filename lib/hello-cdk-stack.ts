import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stage = 'beta';
    const regionNa = 'na'
    const regionGb = 'gb'
    const regionJp = 'jp'

    // S3 bucket that stores the trace
    const myBucketNa = new s3.Bucket(this, 'myBucketNa', {
      bucketName: `my-bucket-${stage}-${regionNa}`,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const myBucketGb = new s3.Bucket(this, 'myBucketGb', {
      bucketName: `my-bucket-${stage}-${regionGb}`,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const myBucketJp = new s3.Bucket(this, 'myBucketJp', {
      bucketName: `my-bucket-${stage}-${regionJp}`,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const traceRole = new iam.Role(this, 'TraceRole', {
      assumedBy: new iam.ArnPrincipal('arn:aws:iam::160980718118:user/test-USAmazon-AssumeRoleUser'),
      externalId: 'ShiptrackUIHandlerService',
      description: 'An IAM role for trace system to assume'});
      traceRole.addToPolicy(new iam.PolicyStatement({
      resources: [
        `${myBucketNa.bucketArn}/*`,
        `${myBucketGb.bucketArn}/*`,
        `${myBucketJp.bucketArn}/*`,
      ],
      actions: ['s3:PutObject', 's3:GetObject'],
    }));

    console.log(traceRole.roleArn);
  }
}
