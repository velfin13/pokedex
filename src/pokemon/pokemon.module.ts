import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';


@Module({
  controllers: [PokemonController],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test')
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
