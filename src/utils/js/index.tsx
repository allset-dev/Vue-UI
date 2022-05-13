export function isEqual(a: any, b: any) {
  if (typeof a === "object") {
    JSON.stringify(a) === JSON.stringify(b);
  } else {
    return a === b;
  }
}

export async function delay(delayTime: number) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("");
    }, delayTime);
  });
}

const CharToAdd: { [key: string]: string } = {
  y: "ies",
  s: "es",
  h: "es",
};

export function pluralize(word: string) {
  const lastChar = word.at(-1) as string;

  if (
    lastChar === "s" ||
    word.endsWith("sh") ||
    word.endsWith("ch") ||
    lastChar === "x" ||
    lastChar === "z"
  ) {
    return word + "es";
  } else if (lastChar === "y") {
    return word.substring(0, word.length - 1) + "ies";
  } else {
    return word + "s";
  }
}

export function pluralizeByCount(count = 0, word = "", showCount = true) {
  const countText = `${showCount ? `${count} ` : ""}`;
  const updatedWord = `${count === 1 ? word : pluralize(word)}`;

  return `${countText}${updatedWord}`;
}
