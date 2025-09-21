import { useState, useEffect } from 'react';
import type React from 'react';

interface Theme {
  bg: string;
  text: string;
  textSecondary: string;
  cardBg: string;
  border: string;
  accent: string;
}

interface ExamDomain {
  title: string;
  percentage: string;
}

interface ExamInfo {
  label: string;
  value: string;
}

const AWSExamLandingPage: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [poolCount, setPoolCount] = useState<number | null>(null);
  
  const handleStartExam = (): void => {
    if (onStart) {
      onStart();
      return;
    }
    alert('Starting AWS SAA-C03 Practice Exam...');
  };
  
  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Apply theme to entire document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    } else {
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, [isDarkMode]);

  // Load dynamic question bank count (merged JSON + advanced text)
  useEffect(() => {
    let cancelled = false;
    const normalizeChoice = (s: string): string => {
      const m = s.match(/^\s*[A-Za-z]\s*[\).]\s*(.*)$/);
      return (m ? m[1] : s).trim();
    };
    const load = async () => {
      try {
        const res = await fetch('/questions.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('failed questions.json');
        const json = await res.json();
        const rawList: Array<{ text?: unknown; question?: unknown; choices?: unknown[]; options?: unknown[] }> = Array.isArray(json?.questions) ? json.questions : [];
        const jsonQs: { text: string; choices: string[] }[] = rawList.map((q) => ({
          text: String((q?.text as string | undefined) ?? (q?.question as string | undefined) ?? '').trim(),
          choices: (Array.isArray(q?.choices ?? q?.options) ? ((q?.choices ?? q?.options) as unknown[]) : []).map((c: unknown) => normalizeChoice(String(c ?? '')))
        })).filter((q: { text: string; choices: string[] }) => q.text && q.choices.length > 0);
        let advQs: { text: string; choices: string[] }[] = [];
        try {
          const resTxt = await fetch('/advanced-65.txt', { cache: 'no-store' });
          if (resTxt.ok) {
            const txt = await resTxt.text();
            const lines = txt.split(/\r?\n/);
            let qText: string[] = [];
            let choices: string[] = [];
            const push = () => {
              if (qText.length && choices.length) {
                advQs.push({ text: qText.join(' ').trim(), choices: choices.map(normalizeChoice) });
              }
              qText = [];
              choices = [];
            };
            for (const raw of lines) {
              const line = raw.trimEnd();
              const qStart = line.match(/^Question\s+\d+/i);
              if (qStart) { push(); continue; }
              if (/^[A-Da-d][\).]/.test(line)) { choices.push(line); continue; }
              if (/^Answer Key/i.test(line)) { push(); break; }
              if (line) qText.push(line);
            }
            push();
          }
        } catch {}
        const seen = new Set<string>();
        const keyFor = (q: { text: string; choices: string[] }) => `${q.text.toLowerCase()}\u0000${q.choices.map(c => c.toLowerCase()).join('\u0001')}`;
        let count = 0;
        for (const q of jsonQs) { const k = keyFor(q); if (!seen.has(k)) { seen.add(k); count++; } }
        for (const q of advQs) { const k = keyFor(q); if (!seen.has(k)) { seen.add(k); count++; } }
        if (!cancelled) setPoolCount(count);
      } catch {
        if (!cancelled) setPoolCount(null);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);
  
  const theme: { dark: Theme; light: Theme } = {
    dark: {
      bg: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#cccccc',
      cardBg: '#2d2d2d',
      border: '#404040',
      accent: '#ff9800'
    },
    light: {
      bg: '#f5f5f5',
      text: '#1a1a1a',
      textSecondary: '#666666',
      cardBg: '#ffffff',
      border: '#e0e0e0',
      accent: '#ff9800'
    }
  };
  
  const currentTheme: Theme = isDarkMode ? theme.dark : theme.light;

  const examInfo: ExamInfo[] = [
    { label: 'Duration:', value: '130 minutes' },
    { label: 'Questions:', value: `65 questions (randomly selected from ${poolCount ?? '…'} question bank)` },
    { label: 'Passing Score:', value: '720/1000 (72%)' },
    { label: 'Question Types:', value: 'Multiple choice' }
  ];

  const domains: ExamDomain[] = [
    { title: 'Design Resilient Architectures', percentage: '30% (20 questions)' },
    { title: 'Design High-Performing Architectures', percentage: '26% (17 questions)' },
    { title: 'Design Secure Applications and Architectures', percentage: '24% (16 questions)' },
    { title: 'Design Cost-Optimized Architectures', percentage: '10% (7 questions)' },
    { title: 'Design Operationally Excellent Architectures', percentage: '10% (5 questions)' }
  ];

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.borderColor = currentTheme.accent;
    target.style.transform = 'translateY(-2px)';
    target.style.boxShadow = `0 8px 20px ${currentTheme.accent}33`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.borderColor = currentTheme.border;
    target.style.transform = 'translateY(0)';
    target.style.boxShadow = 'none';
  };

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget as HTMLButtonElement;
    target.style.backgroundColor = '#e68900';
    target.style.transform = 'translateY(-1px)';
    target.style.boxShadow = `0 4px 12px ${currentTheme.accent}50`;
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget as HTMLButtonElement;
    target.style.backgroundColor = currentTheme.accent;
    target.style.transform = 'translateY(0)';
    target.style.boxShadow = 'none';
  };

  return (
    <div style={{
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      minHeight: '100vh',
      padding: '0',
      margin: '0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Dark Mode Toggle - Top Right */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000
      }}>
        <button
          onClick={toggleDarkMode}
          style={{
            backgroundColor: currentTheme.accent,
            color: '#000000',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.8rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e68900';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.accent;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Content - Direct on background, no container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: currentTheme.text,
            marginBottom: '0.5rem',
            lineHeight: '1.1'
          }}>
            AWS Solutions Architect Associate SAA-C03
          </h1>
          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: '400',
            color: currentTheme.accent,
            margin: '0'
          }}>
            Practice Exam Simulator
          </h2>
        </header>

        {/* Exam Information Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: currentTheme.text
          }}>
            Exam Information
          </h3>
          
          {/* Simple text layout */}
          <div style={{
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {examInfo.map((info, index) => (
              <p key={index} style={{ 
                margin: index === examInfo.length - 1 ? '0.5rem 0 2rem 0' : '0.5rem 0', 
                color: currentTheme.text 
              }}>
                <strong>{info.label}</strong> {info.value}
              </p>
            ))}
          </div>
        </section>

        {/* Domain Cards - Single horizontal line */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {domains.map((domain, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: currentTheme.cardBg,
                  border: `1px solid ${currentTheme.border}`,
                  borderLeft: `4px solid ${currentTheme.accent}`,
                  borderRadius: '4px',
                  padding: '1rem',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <h4 style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: currentTheme.text,
                  marginBottom: '0.5rem',
                  lineHeight: '1.2',
                  margin: '0 0 0.5rem 0',
                  minHeight: '2.4rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {domain.title}
                </h4>
                <p style={{
                  fontSize: '0.8rem',
                  color: currentTheme.accent,
                  fontWeight: '500',
                  margin: '0'
                }}>
                  {domain.percentage}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Start Button */}
        <section style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={handleStartExam}
            style={{
              backgroundColor: currentTheme.accent,
              color: '#000000',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Start Practice Exam
          </button>
        </section>
      </div>
    </div>
  );
};

export default AWSExamLandingPage;

