export const PORT = process.env.PORT || 3000;

export function delai(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

