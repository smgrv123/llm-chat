/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Logger {
  /**
   * @loggingSystem
   */
  public static log(...logData: any[]) {
    // ! add env variable handling
    if (process.env.NODE_ENV !== 'production') console.log(logData);
  }

  public static error(...errData: any) {
    console.error(errData);
  }
}
