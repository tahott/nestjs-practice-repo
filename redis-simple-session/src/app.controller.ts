import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggedInGuard } from './logged-in.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    return this.appService.getHello();
  }

  @UseGuards(LoggedInGuard)
  @Get('profile')
  getTest(@Req() req): string {
    return req.session.passport.user.email;
  }

  @Get('view')
  @Render('index')
  root(@Req() req) {
    return { user: req.session?.passport?.user?.email };
  }
}
