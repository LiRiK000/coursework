import { Card } from 'antd';
import MDEditor from '@uiw/react-md-editor';

interface TheoryBlockProps {
  content: string;
}

export const TheoryBlock = ({ content }: TheoryBlockProps) => {
  return (
    <Card title="Теоретический материал" style={{ marginBottom: 16 }}>
      <MDEditor.Markdown source={content} />
    </Card>
  );
};