
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ContentType } from './ChatMessage';

interface ContentRendererProps {
  content: string;
  type: ContentType;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, type }) => {
  switch (type) {
    case 'image':
      return (
        <div className="mt-2">
          <img 
            src={content} 
            alt="Message attachment" 
            className="max-w-full rounded-md shadow-sm max-h-[400px]" 
          />
        </div>
      );
      
    case 'html':
      return (
        <div 
          className="mt-2 p-3 bg-slate-50 rounded-md border"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
      
    case 'table':
      try {
        const tableData = JSON.parse(content);
        return (
          <div className="mt-2 overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableData.headers.map((header: string, index: number) => (
                    <TableHead key={index} className="text-[#1A1F71] font-semibold">{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.rows.map((row: string[], rowIndex: number) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      } catch (error) {
        return <div className="text-red-500">Error rendering table</div>;
      }
      
    case 'text':
    default:
      return <div className="whitespace-pre-wrap">{content}</div>;
  }
};

export default ContentRenderer;
