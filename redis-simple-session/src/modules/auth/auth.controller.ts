import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { AuthService } from "./auth.service";
import { LocalGuard } from "./local.auth.guard";

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) { }

  @UseGuards(LocalGuard)
  @Post('session')
  login(@Req() req: Request) {
    return { sessionId: req.sessionID }
  }
}