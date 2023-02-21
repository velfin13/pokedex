import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name: string;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Min(1)
    no: number;
}
