import { useEffect, useState } from 'react';

const AWSExamLandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Keep for future responsive tweaks; not used in single-line layout.
  // const [isNarrow, setIsNarrow] = useState(false);

  const handleStartExam = () => {
    alert('Starting AWS SAA-C03 Practice Exam...');
  };

  const toggleDarkMode = () => {
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
    // Disable scrolling for full-window centered layout
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isDarkMode]);

  // Track viewport for responsive layout
  // Responsive observer removed for single-line card layout.

  const theme = {
    dark: {
      bg: '#1a1a1a',
      containerBg: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#cccccc',
      cardBg: '#404040',
      border: '#666666',
      accent: '#ff9800'
    },
    light: {
      bg: '#f5f5f5',
      containerBg: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      cardBg: '#f8f9fa',
      border: '#e0e0e0',
      accent: '#ff9800'
    }
  } as const;

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div style={{
      backgroundColor: currentTheme.bg,
      minHeight: '100vh',
      padding: '0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Dark Mode Toggle - Top Right */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 1000
      }}>
        <button
          onClick={toggleDarkMode}
          style={{
            backgroundColor: currentTheme.accent,
            color: '#000000',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)'
          }}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Main Container - Centered */}
      <div style={{
        width: '100vw',
        maxWidth: '2560px',
        margin: '0 auto',
        backgroundColor: currentTheme.containerBg,
        borderRadius: '0',
        padding: '1rem',
        boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: '700',
            color: currentTheme.text,
            marginBottom: '1rem',
            lineHeight: '1.2',
            margin: '0 0 1rem 0'
          }}>
            AWS Solutions Architect Associate SAA-C03
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '400',
            color: currentTheme.accent,
            margin: '0'
          }}>
            Practice Exam Simulator
          </h2>
        </header>

        {/* Exam Information */}
        <section style={{ marginBottom: '1.25rem' }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '2rem',
            color: currentTheme.text
          }}>
            Exam Information
          </h3>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {[
              { label: 'Duration:', value: '130 minutes' },
              { label: 'Questions:', value: '65 questions (randomly selected from 372 question bank)' },
              { label: 'Passing Score:', value: '720/1000 (72%)' },
              { label: 'Question Types:', value: 'Multiple choice' }
            ].map((item, index, array) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '1rem 0',
                borderBottom: index === array.length - 1 ? 'none' : `1px solid ${currentTheme.border}`
              }}>
                <span style={{
                  fontWeight: '600',
                  color: currentTheme.text,
                  flexShrink: 0,
                  marginRight: '2rem'
                }}>
                  {item.label}
                </span>
                <span style={{
                  color: currentTheme.textSecondary,
                  textAlign: 'right',
                  flex: 1
                }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Domain cards in a single horizontal line below exam info */}
        <section style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '12px',
            justifyContent: 'center',
            overflowX: 'visible',
            paddingBottom: '0.5rem'
          }}>
            {[
              { title: 'Design Resilient Architectures', percentage: '30% (20 questions)' },
              { title: 'Design High-Performing Architectures', percentage: '26% (17 questions)' },
              { title: 'Design Secure Applications and Architectures', percentage: '24% (16 questions)' },
              { title: 'Design Cost-Optimized Architectures', percentage: '10% (7 questions)' },
              { title: 'Design Operationally Excellent Architectures', percentage: '10% (5 questions)' }
            ].map((domain, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: currentTheme.cardBg,
                  border: `2px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  padding: '1.1rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  flex: '0 0 auto'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.borderColor = currentTheme.accent;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = `0 8px 20px ${currentTheme.accent}33`;
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.borderColor = currentTheme.border;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${currentTheme.accent}, #e68900)`,
                  borderRadius: '8px 8px 0 0'
                }}></div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: currentTheme.text,
                  marginBottom: '0.6rem',
                  lineHeight: '1.4',
                  margin: '0 0 0.6rem 0'
                }}>
                  {domain.title}
                </h4>
                <p style={{
                  fontSize: '0.9rem',
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
        <section style={{ textAlign: 'center' }}>
          <button
            onClick={handleStartExam}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.accent}, #e68900)`,
              color: '#000000',
              border: 'none',
              padding: '1.1rem 2.5rem',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: `0 4px 15px ${currentTheme.accent}50`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.background = 'linear-gradient(135deg, #e68900, #cc7700)';
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = `0 6px 20px ${currentTheme.accent}66`;
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.background = `linear-gradient(135deg, ${currentTheme.accent}, #e68900)`;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = `0 4px 15px ${currentTheme.accent}50`;
            }}
            onMouseDown={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.transform = 'translateY(0)';
            }}
          >
            Start Practice Exam
          </button>
        </section>
      </div>
    </div>
  );
};

export default AWSExamLandingPage;

