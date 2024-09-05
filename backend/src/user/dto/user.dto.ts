import { IsInt, IsNotEmpty } from 'class-validator';

export class FindByHomeDTO {
  @IsNotEmpty()
  @IsInt()
  home_id: number;
}
