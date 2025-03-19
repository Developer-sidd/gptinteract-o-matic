
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ContentType } from './ChatMessage';
import { motion } from 'framer-motion';

interface ContentRendererProps {
  content: string;
  type: ContentType;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, type }) => {
  // Animation variants for different content types
  const contentVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  switch (type) {
    case 'image':
      return (
        <motion.div 
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="mt-2"
        >
          <motion.img 
            whileHover={{ scale: 1.02 }}
            src={content} 
            alt="Message attachment" 
            className="max-w-full rounded-md shadow-sm max-h-[400px]" 
          />
        </motion.div>
      );
      
    case 'html':
      return (
        <motion.div 
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="mt-2 p-3 bg-slate-50 rounded-md border"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
      
    case 'table':
      try {
        const tableData = JSON.parse(content);
        return (
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="mt-2 overflow-x-auto rounded-md border"
          >
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
          </motion.div>
        );
      } catch (error) {
        return (
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="text-red-500"
          >
            Error rendering table
          </motion.div>
        );
      }
      
    case 'text':
    default:
      return (
        <motion.div 
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="whitespace-pre-wrap"
        >
          {content}
        </motion.div>
      );
  }
};

export default ContentRenderer;
