import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
      private jwt: JwtService,
      private db: PrismaService,
   ) { }
   async canActivate(
      context: ExecutionContext,
   ): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.token;


      if (!token) {
         return false;
      }

      try {
         const decoded = await this.jwt.verifyAsync(token, { secret: "SECRET" })
         if (!decoded) {
            req.user = undefined;
            req.token = undefined;
            return false;
         }

         if (!decoded.user) {
            req.user = undefined;
            req.token = undefined;
            return false;
         }

         const user = decoded.user;

         const newToken = this.jwt.sign({ user }, { secret: "SECRET" });

         req.user = user;
         req.token = newToken;
         return true;
      } catch (error) {
         req.user = undefined;
         req.token = undefined;
         return false
      }
   }
}
