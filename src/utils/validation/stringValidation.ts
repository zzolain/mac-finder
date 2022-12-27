export const isAlaphanumeric = (value: string) => {
  const regex = /[^a-zA-Z\d.\-_]/g;
  const hasError = regex.test(value);
  if (hasError) {
    throw new Error("영문, 숫자, 특수기호 .-_ 만 입력할 수 있습니다.");
  }
  return true;
};
