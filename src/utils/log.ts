import chalk from "chalk";

abstract class Logger {
  protected logMain: string;
  constructor(name: string) {
    this.logMain = name;
  }
  public abstract debug(message: string): void;
  public abstract info(message: string): void;
  public abstract warning(message: string): void;
  public abstract error(message: string, exit: boolean): void;
  public abstract success(message: string): void;
}

export class ConsoleLogger extends Logger {
  constructor(name: string) {
    super(name);
  }

  debug(message: string) {
    if (process.env.development) {
      console.debug(chalk.gray(`[${this.logMain}][DEBUG] ${message}`));
    }
  }

  info(message: string) {
    console.info(chalk.white(`[${this.logMain}][INFO] ${message}`));
  }

  warning(message: string) {
    console.warn(chalk.yellow(`[${this.logMain}][WARN] ${message}`));
  }

  error(message: string, exit: boolean) {
    console.info(chalk.red(`[${this.logMain}][ERROR] ${message}`));
    if (exit) {
      process.exit();
    }
  }

  success(message: string) {
    console.log(chalk.green(`[${this.logMain}][SUCCESS] ${message}`));
  }
}

export default Logger;
