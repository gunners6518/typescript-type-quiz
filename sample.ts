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

// 3-2 Partial

type MyRartial<T> = {
  [P in keyof T]?: T[P];
};

// 3-3 イベント
class EventDischarger<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: E[Ev]) {
    // 省略
  }
}

// EventDischarger<E>なのでイベントの型はE
// 引数で与えられたeventNameに応じて、payloadの型を変えたい → 文字列をリテラル型で取得(Ev)
// Evがkey、Eがイベント
// <Ev extends keyof E> でEvはEで定義されていないeventNameを拒否
// E(イベントから)、Ev(key)を使ってE[Ev](プロパティ)を取得してpayloadの型に

// 3-4 reducer

type Action =
  | {
      type: "increment";
      amount: number;
    }
  | {
      type: "decrement";
      amount: number;
    }
  | {
      type: "reset";
      value: number;
    };

const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case "increment":
      return state + action.amount;
    case "decrement":
      return state - action.amount;
    case "reset":
      return action.value;
  }
};

// 今回はアクションが「increment,decrement,reset」と決め打ちだった為、ユニオン型で定義
// reducerあるあるっぽい

// 3-5 undefinedな引数

type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;

// 使用例
const f1: Func<number, number> = (num) => num + 10;
const v1: number = f1(10);

const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);

const f3: Func<number | undefined, number> = (num) => (num || 0) + 10;
const v4: number = f3(123);
const v5: number = f3();

// 条件によって型を変えたい場合はconditional type
// 型Aがundefinedかどうかで型を変えたい
// undefined extends A(Aの部分型としてundefinedがある => Aがundefined！)
// Aがundefinedなら (arg?:A) => R 引数を省略可能にする
// Aがundefinedじゃないなら (arg:A) => R 引数を必須にする
// 要するにAがundefinedかどうかで、引数のオプショナルを変化させている

// 4-1 ない場合はunknown

// 引数のオブジェクトのfooプロパティーを返す(fooの型)
// fooプロパティを持たない引数なら戻り値はunknown型

// オブジェクトの型をT。<T extend object>としてobject型固定
//  inferを使う典型！！→ cnditional typeでさらに型変数を導入できる
// fooがあればfooの型、なければunknownなので→ {foo : infer E}? E :unknownとする

function getFoo<T extends object>(
  obj: T extends { foo: infer E } ? E : unknown
) {
  return (obj as any).foo;
}

// fooがあれば戻り値はfooの型、なけれなunknownとするオブジェクトTの型
// fooの型をinferで定義
//  T extends { foo: infer E } ? E : unknown

// 4-2　プロパティを上書きする関数

// giveId2はオブジェクトにid:stringを代入して返す関数
// idが既にある場合も考える。その場合は上書き

// Pickを使う。→　Pick<T,K>は「オブジェクトTのうち、kのプロパティを含むオブジェクトだけ返す」
// 例) Pick<{foo:"string",bar:number},foo>　→　{foo:string}

// Excludeを使う。→　Excliude<U,T>  Tがユニオン型の時、Tの構成要素のうち、Uの部分型を除いた型。
// 要するにTからUだけ省く

// 今回の考え方
// idを上書きする為に、一旦Tからid以外の構成要素の型を取る
// Pick<T , Exclude<keyof T,id >>

// これに インターセクション型でid:stringを足す
// xx & {id:string}

// ちなみにPick + Excludeはよく使うので、Omitと呼んだりもするらしい。
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

function giveId2<T>(obj: T): Pick<T, Exclude<keyof T, "id">> & { id: string } {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id,
  };
}
