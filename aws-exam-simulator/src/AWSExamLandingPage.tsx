import { useState } from 'react';

const AWSExamLandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const handleStartExam = () => {
    alert('Starting AWS SAA-C03 Practice Exam...');
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const theme = {
    dark: {
      bg: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#cccccc',
      cardBg: '#2d2d2d',
      border: '#404040',
      accent: '#ff9800'
    },
    light: {
      bg: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      cardBg: '#f5f5f5',
      border: '#e0e0e0',
      accent: '#ff9800'
    }
  };
  
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      minHeight: '100vh',
      padding: '2rem 1rem',
      lineHeight: '1.6',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem 0'
      }}>
        
        {/* DARK MODE TOGGLE BUTTON */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '2rem' 
        }}>
          <button
            onClick={toggleDarkMode}
            style={{
              background: currentTheme.accent,
              color: '#000000',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              boxShadow: `0 2px 8px ${currentTheme.accent}30`
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
              (e.target as HTMLButtonElement).style.boxShadow = `0 4px 12px ${currentTheme.accent}40`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = `0 2px 8px ${currentTheme.accent}30`;
            }}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        {/* HEADER SECTION */}
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
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

        {/* EXAM INFORMATION SECTION */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '2rem',
            color: currentTheme.text
          }}>
            Exam Information
          </h3>
          
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
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
                borderBottom: index === array.length - 1 ? 'none' : '1px solid #333'
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

        {/* DOMAIN CARDS SECTION */}
        <section style={{ margin: '3rem 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            margin: '2rem 0'
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
                  padding: '1.75rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.borderColor = currentTheme.accent;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = `0 8px 25px ${currentTheme.accent}33`;
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.borderColor = currentTheme.border;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = 'none';
                }}
              >
                {/* Orange accent bar */}
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
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: currentTheme.text,
                  marginBottom: '0.75rem',
                  lineHeight: '1.4',
                  margin: '0 0 0.75rem 0'
                }}>
                  {domain.title}
                </h4>
                <p style={{
                  fontSize: '1rem',
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

        {/* START BUTTON */}
        <section style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={handleStartExam}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.accent}, #e68900)`,
              color: '#000000',
              border: 'none',
              padding: '1.25rem 3rem',
              fontSize: '1.1rem',
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

