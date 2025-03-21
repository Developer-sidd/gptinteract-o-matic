
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  isListening, 
  setIsListening 
}) => {
  const [transcript, setTranscript] = useState<string>('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const timeoutRef = useRef<number | null>(null);
  
  // Longer duration for voice recording - 2 minutes (120000ms)
  const LISTENING_TIMEOUT = 120000;

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
          }
        }
        
        if (currentTranscript) {
          setTranscript(currentTranscript);
          onTranscript(currentTranscript);
          
          // Reset the timeout on new speech detected
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = window.setTimeout(() => {
            if (isListening) {
              // Auto-stop after the extended timeout
              toggleListening();
            }
          }, LISTENING_TIMEOUT);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [onTranscript, setIsListening]);

  const toggleListening = useCallback(() => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
      
      // Set timeout to automatically stop listening after the extended period
      timeoutRef.current = window.setTimeout(() => {
        if (recognition) {
          recognition.stop();
          setIsListening(false);
        }
      }, LISTENING_TIMEOUT);
    }
  }, [isListening, recognition, setIsListening]);

  const pulseVariants: Variants = {
    active: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    },
    inactive: {
      scale: 1,
      opacity: 1
    }
  };

  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    return null; // Don't render if speech recognition isn't supported
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <Button
        onClick={toggleListening}
        variant={isListening ? "default" : "outline"}
        size="icon"
        className={`
          relative overflow-hidden
          ${isListening ? 'bg-[#EB001B] hover:bg-[#EB001B]/90' : 'border-[#1A1F71] text-[#1A1F71] hover:bg-[#1A1F71]/10'}
        `}
        aria-label={isListening ? "Stop Voice Input" : "Start Voice Input"}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial="inactive"
              animate="active"
              exit="inactive"
              variants={pulseVariants}
            >
              <Mic size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="not-listening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MicOff size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      
      {isListening && (
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-1 bg-[#EB001B]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default VoiceInput;
