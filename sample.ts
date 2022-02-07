// 1-1
function isPositive(num: number): boolean {
  return num >= 0;
}

// 1-2
type User = {
  name: string;
  age: number;
  private: boolean;
};

function showUserInfo(user: User) {
  // 省略
}

// 1-3
type IsPositiveFunc = (arg: number) => boolean;

const isPositive_2: IsPositiveFunc = (num) => num >= 0;

// 1-4

function sumOfPos(arr: number[]): number {
  return arr.filter((num) => num >= 0).reduce((acc, num) => acc + num, 0);
}

// 2-1

function myFilter<T>(arr: T[], predicate: (elm: T) => boolean): T[] {
  const result = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
}

// 2-2
type Speed = "slow" | "medium" | "fast";

function getSpeed(speed: Speed): number {
  switch (speed) {
    case "slow":
      return 10;
    case "medium":
      return 50;
    case "fast":
      return 200;
  }
}

// 2-3
type addEventListenerObject = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

declare function addEventListener(
  type: string,
  handler: () => void,
  options?: boolean | addEventListenerObject
): void;

// 2-4
function giveId<T>(obj: T): T & { id: string } {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id,
  };
}

// 2-5 useState
type UseStateUpdateArgument<T> = T | ((oldValue: T) => T);

declare function useState<T>(
  initialVAlue: T
): [T, (updatar: UseStateUpdateArgument<T>) => void];

// 3-1 配列からmapを作る
function mapFromArray<T, K extends keyof T>(arr: T[], key: K): Map<T[K], T> {
  const result = new Map();
  for (const obj of arr) {
    result.set(obj[key], obj);
  }
  return result;
}
