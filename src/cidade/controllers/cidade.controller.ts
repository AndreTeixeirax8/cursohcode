import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CidadeService } from 'src/cidade';
import { CriaCidadeDto, AlteraCidadePutDTO } from 'src/cidade/dtos';

@UseGuards(AuthGuard, RoleGuard) //não inverter as ordens porem o ThrottlerGuard tem que vir primeiro para proteger a api
@Controller('cidades')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Roles(Role.Admin)
  @Post()
  async criar(@Body() body: CriaCidadeDto) {
    return this.cidadeService.criar(body);
  }

  @Roles(Role.Admin)
  @Get()
  async buscaTodos() {
    return this.cidadeService.buscaTodos();
  }

  @Get(':id')
  async buscaPorId(@ParamId() id: number) {
    return this.cidadeService.buscaPorId(id);
  }

  @Put(':id')
  async alteraUmRegistro(
    @Body() data: AlteraCidadePutDTO,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.cidadeService.alteraUmRegistro(id, data);
  }
}
