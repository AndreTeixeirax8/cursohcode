import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { UserEntity } from "./entity/user.entity";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports:[forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity]) ],/** Aqui vai os modulos que ele vai importar, receber outros modulos */
    controllers: [UserController],/**Controllers disponibilizados por esse modulo */
    providers:[UserService], /**Quais são os serviços que poderão ser injetados ou providos pelo modulo */
    exports:[UserService],/**Quais os recursos que eu tenho no module que eu quero exportar para outros modulos  */
})
export class UserModule implements NestModule{

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path:'users/:id',
            method:RequestMethod.ALL
        })
    }

}