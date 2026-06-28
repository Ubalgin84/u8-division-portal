type Props = {
  content: string;
};

export default function RaceContent({ content }: Props) {
  return (
    <div className="whitespace-pre-wrap text-xl leading-[2.2] text-gray-200">
      {content}
    </div>
  );
}