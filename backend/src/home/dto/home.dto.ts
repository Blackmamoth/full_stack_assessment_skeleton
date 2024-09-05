import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class FindByUserDTO {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsInt()
  limit: number = 50;

  @IsInt()
  offset: number = 0;
}

export class UpdateUsers {
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @IsInt({ each: true })
  unchecked_users: number[];

  @IsNotEmpty()
  @IsInt()
  home_id: number;
}
