//配列からランダムに単語を選んで返す関数
const pickRandomWord = (wordList: string[]): string => {
  if (wordList.length === 0) {
    console.error("Answer words list is empty");
    return "";
  }
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};

export { pickRandomWord };