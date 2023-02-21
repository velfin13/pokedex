import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new BadRequestException('This register is ready in DB')
      }
      throw new InternalServerErrorException('Error in the server')
    }
  }

  async findAll() {
    return this.pokemonModel.find();
  }

  async findOne(termino: string) {
    let pokemon: Pokemon;

    if (!isNaN(+termino)) {
      pokemon = await this.pokemonModel.findOne({ no: termino });
    }

    if (!pokemon && isValidObjectId(termino)) {
      pokemon = await this.pokemonModel.findById(termino);
    }


    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: termino });
    }

    if (!pokemon) throw new NotFoundException('Pokemon is not found');

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
