import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Int)
  price: number;

  @Field()
  description: string;

  @Field()
  image: string;
}
