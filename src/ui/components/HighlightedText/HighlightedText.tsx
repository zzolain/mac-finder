type Props = {
  target: string;
  keyword: string;
};
export function HighlightedText(props: Props) {
  if (props.target.length < 1 || props.keyword.length < 1)
    return <span>{props.target}</span>;
  const keyword = props.keyword.toLowerCase();
  const regex = new RegExp(`(${keyword})`, "gi");
  const splitted = props.target.split(regex);
  return (
    <>
      {splitted.map((word, index) =>
        word.toLowerCase() === keyword ? (
          <mark key={`${word}-${index}`}>{word}</mark>
        ) : (
          <span key={`${word}-${index}`}>{word}</span>
        )
      )}
    </>
  );
}
