export class LotStats {
  [lotId: string]: {
    [hour: string]: {
      mean: number,
      count: number
    }
  }
};