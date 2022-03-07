import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    if (this.isLogIn(context)) return false;
  
    await super.logIn(context.switchToHttp().getRequest());

    return result;
  }

  private isLogIn(context: ExecutionContext) {
    return context.switchToHttp().getRequest().session.passport;
  }
}